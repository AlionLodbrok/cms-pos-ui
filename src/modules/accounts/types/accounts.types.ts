export interface DatosJugador {
  id: string;
  numeroTarjeta: string;
  nombre: string;
  status: 'ACTIVO' | 'BLOQUEADO' | 'INACTIVO';
  saldoEfectivo: number;
  saldoBono: number;
  puntosFidelidad: number;
  fechaRegistro: string;
}

export interface OperacionJugador {
  id: string;
  fechaHora: string;
  tipo: 'RECARGA' | 'RETIRO' | 'APUESTA' | 'PREMIO_PAGADO';
  monto: number;
  terminal: string;
  metodoPago: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';
}