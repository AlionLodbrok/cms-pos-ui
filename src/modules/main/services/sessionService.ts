import type { userSessionData, userProfile } from '../types/sessions.types';

export const sessionService = {
  /**
   * Obtiene la información del usuario autenticado y su turno activo desde la API.
   */
  async getSessionInfo(userId?: string): Promise<userSessionData> {
    // TODO: Reemplazar con la petición real Axios/Fetch a SQL Server / Backend API
    // const response = await api.get('/auth/session-info');
    // return response.data;

    // Retorno de datos de prueba
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            profileId: userId || 'No hay',
            name: 'Javier Ruiz',
            rol: 'Cajero Senior',
            email: 'javier.ruiz@nextbet.com',
          },
          shift: {
            terminalId: 'POS-01',
            turnoId: 'TRN-2026-0917',
            sucursal: 'Sucursal Principal — Ventanilla Cage',
            fechaApertura: '2026-09-17T08:00:00Z',
          },
        });
      }, 300);
    });
  },

  /**
   * Obtiene únicamente el perfil del usuario activo.
   */
  async getUserProfile(userId: string): Promise<userProfile> {
    // TODO: Endpoint para consultar perfil
    return {
      profileId: userId,
      name: 'Javier Ruiz',
      rol: 'Cajero Senior',
    };
  },
};