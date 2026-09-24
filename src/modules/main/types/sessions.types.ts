export interface loginResponse {
    userId: string;
    token: string;
  }

  export interface userProfile {
  profileId: string;
  name: string;
  rol: string;
  email?: string;
}

export interface activeShift {
  terminalId: string;
  turnoId: string;
  sucursal: string;
  fechaApertura: string;
}

export interface userSessionData {
  user: userProfile;
  shift: activeShift;
}