/**
 * Sistema de Analytics y Registro de Uso
 * Wallpari Analytics - Módulo PROMPT
 */

const Analytics = {
  // Configuración
  STORAGE_KEY: 'wallpari_analytics',
  SESSION_KEY: 'wallpari_session',
  TEACHER_EMAIL: 'jonatan.figueroa.gil@gmail.com',

  /**
   * Inicializar analytics
   */
  init() {
    this.trackPageView();
    this.startSessionTimer();
    this.setupEventListeners();
  },

  /**
   * Obtener datos de analytics del localStorage
   */
  getData() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {
      visits: [],
      promptAccess: [],
      moduleViews: [],
      sessions: []
    };
  },

  /**
   * Guardar datos de analytics
   */
  saveData(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  /**
   * Registrar visita a la página
   */
  trackPageView() {
    const data = this.getData();
    const visit = {
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`
    };

    data.visits.push(visit);
    this.saveData(data);

    console.log('📊 Analytics: Visita registrada', visit);
  },

  /**
   * Registrar acceso al módulo PROMPT
   */
  trackPromptAccess(user) {
    const data = this.getData();
    const access = {
      timestamp: new Date().toISOString(),
      studentId: user['Student Id'],
      name: user['Nombre'],
      email: user['Email'] || '',
      isTeacher: user['Email']?.toLowerCase() === this.TEACHER_EMAIL.toLowerCase(),
      sessionId: this.getSessionId()
    };

    data.promptAccess.push(access);
    this.saveData(data);

    console.log('🎓 Analytics: Acceso a PROMPT registrado', access);

    // Iniciar tracking de tiempo en el módulo
    this.startPromptTimer(access);
  },

  /**
   * Registrar vista de módulo específico
   */
  trackModuleView(moduleId, moduleName) {
    const data = this.getData();
    const user = this.getCurrentUser();

    if (!user) return;

    const view = {
      timestamp: new Date().toISOString(),
      moduleId: moduleId,
      moduleName: moduleName,
      studentId: user['Student Id'],
      sessionId: this.getSessionId()
    };

    data.moduleViews.push(view);
    this.saveData(data);

    console.log('📖 Analytics: Módulo visto', view);
  },

  /**
   * Obtener ID de sesión actual
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  },

  /**
   * Generar ID único de sesión
   */
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  /**
   * Obtener usuario actual
   */
  getCurrentUser() {
    const userStr = sessionStorage.getItem('promptingUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Iniciar temporizador de sesión
   */
  startSessionTimer() {
    const sessionStart = Date.now();

    window.addEventListener('beforeunload', () => {
      const sessionEnd = Date.now();
      const duration = Math.round((sessionEnd - sessionStart) / 1000); // segundos

      const data = this.getData();
      data.sessions.push({
        sessionId: this.getSessionId(),
        timestamp: new Date().toISOString(),
        duration: duration,
        page: window.location.pathname
      });
      this.saveData(data);
    });
  },

  /**
   * Iniciar temporizador para módulo PROMPT
   */
  startPromptTimer(access) {
    const promptStart = Date.now();
    access.startTime = promptStart;

    // Guardar en sessionStorage para tracking
    sessionStorage.setItem('promptSession', JSON.stringify(access));
  },

  /**
   * Finalizar sesión de PROMPT y registrar duración
   */
  endPromptSession() {
    const sessionStr = sessionStorage.getItem('promptSession');
    if (!sessionStr) return;

    const session = JSON.parse(sessionStr);
    const endTime = Date.now();
    const duration = Math.round((endTime - session.startTime) / 1000); // segundos

    const data = this.getData();

    // Buscar el acceso correspondiente y actualizar duración
    const accessIndex = data.promptAccess.findIndex(
      a => a.timestamp === session.timestamp && a.studentId === session.studentId
    );

    if (accessIndex !== -1) {
      data.promptAccess[accessIndex].duration = duration;
      data.promptAccess[accessIndex].endTime = new Date().toISOString();
      this.saveData(data);

      console.log(`⏱️ Analytics: Sesión PROMPT finalizada - Duración: ${duration}s`);
    }

    sessionStorage.removeItem('promptSession');
  },

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
    // Detectar cuando se cierra la ventana de PROMPT
    document.addEventListener('promptWindowClosed', () => {
      this.endPromptSession();
    });
  },

  /**
   * Obtener estadísticas generales
   */
  getStats() {
    const data = this.getData();

    return {
      totalVisits: data.visits.length,
      totalPromptAccesses: data.promptAccess.length,
      totalModuleViews: data.moduleViews.length,
      totalSessions: data.sessions.length,
      uniqueStudents: [...new Set(data.promptAccess.map(a => a.studentId))].length,
      averageSessionDuration: this.calculateAverageSessionDuration(data.sessions),
      mostViewedModule: this.getMostViewedModule(data.moduleViews),
      recentAccesses: data.promptAccess.slice(-10).reverse()
    };
  },

  /**
   * Calcular duración promedio de sesión
   */
  calculateAverageSessionDuration(sessions) {
    if (sessions.length === 0) return 0;
    const total = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    return Math.round(total / sessions.length);
  },

  /**
   * Obtener módulo más visto
   */
  getMostViewedModule(moduleViews) {
    if (moduleViews.length === 0) return 'N/A';

    const counts = {};
    moduleViews.forEach(view => {
      counts[view.moduleName] = (counts[view.moduleName] || 0) + 1;
    });

    let max = 0;
    let mostViewed = 'N/A';
    for (const [module, count] of Object.entries(counts)) {
      if (count > max) {
        max = count;
        mostViewed = module;
      }
    }

    return mostViewed;
  },

  /**
   * Obtener accesos por estudiante
   */
  getAccessesByStudent(studentId) {
    const data = this.getData();
    return data.promptAccess.filter(a => a.studentId === studentId);
  },

  /**
   * Exportar datos para análisis
   */
  exportData() {
    const data = this.getData();
    const stats = this.getStats();

    const exportData = {
      exportDate: new Date().toISOString(),
      summary: stats,
      fullData: data
    };

    // Crear archivo JSON para descarga
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_wallpari_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    console.log('💾 Analytics: Datos exportados', exportData);
  },

  /**
   * Limpiar datos antiguos (opcional)
   */
  clearOldData(daysToKeep = 90) {
    const data = this.getData();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    data.visits = data.visits.filter(v => new Date(v.timestamp) > cutoffDate);
    data.promptAccess = data.promptAccess.filter(a => new Date(a.timestamp) > cutoffDate);
    data.moduleViews = data.moduleViews.filter(m => new Date(m.timestamp) > cutoffDate);
    data.sessions = data.sessions.filter(s => new Date(s.timestamp) > cutoffDate);

    this.saveData(data);
    console.log(`🗑️ Analytics: Datos anteriores a ${daysToKeep} días eliminados`);
  },

  /**
   * Verificar si el usuario actual es el docente
   */
  isTeacher() {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user['Email']?.toLowerCase() === this.TEACHER_EMAIL.toLowerCase();
  }
};

// Inicializar analytics cuando se carga el script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Analytics.init());
} else {
  Analytics.init();
}

// Exponer Analytics globalmente
window.Analytics = Analytics;
