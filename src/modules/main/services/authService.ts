import type { loginResponse } from "../types/sessions.types";

// Variable para alternar entre Mock y API Real
const USAR_MOCK = true; 
const API_BASE_URL = 'https://tu-api-backend.com/api';

export const authService = {

 async loginApi(username: string, pass: string, terminalId: string): Promise<loginResponse> {
  // --- MOCK SIMULADO ---
  if (USAR_MOCK) {
    // Simula latencia de red de 1 segundo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Credenciales de prueba
    if (username === 'admin' && pass === '1234') {
      return {
        token: 'mock-jwt-token-xyz-12345',
        userId: 'USR-001',
      };
    }

    if (username === 'cmendoza' && pass === 'cajero123') {
      return {
        token: 'mock-jwt-token-abc-67890',
        userId: 'USR-002',
        };
    }

    // Si las credenciales no coinciden, lanza error
    throw new Error('Usuario o contraseña incorrectos (Mock).');
  }

  // --- LLAMADA A API REAL (Se ejecuta si USAR_MOCK = false) ---
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, pass, terminalId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Credenciales inválidas o error de conexión.');
  }

  return response.json();
},

async logout() {
    // ...
  }
}