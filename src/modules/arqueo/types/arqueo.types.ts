// Tipos de operaciones permitidas en caja
export type typeMovement = 'FONDEO' | 'RETIRO' | 'APERTURA' | 'DEPOSITO_BOVEDA' | 'VENTA' | 'PAGO_PREMIO' | 'AJUSTE';
export type typePaymentMode = 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';

// Estructura de un movimiento en el Libro Mayor
export interface movement {
  id: string;
  hora: string;
  folio: string;
  tipo: typeMovement;
  concepto: string;
  metodoPago: typePaymentMode;
  monto: number;
  saldoResultante: number;
  usuario?: string;
}

// Resumen acumulado de la sesión de caja
export interface resumenSession {
  fondoInicial: number;
  totalIngresos: number;
  totalEgresos: number;
  saldoTeorico: number;
}