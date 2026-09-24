import { useState } from 'react';
// Importación limpia desde tu carpeta de types local
import type { movement, resumenSession, typeMovement } from './types/arqueo.types';
import { Show as ShowButtons } from './components/uc_sidebar_buttons';
import { Show as ShowCaja } from './components/uc_libro_mayor'
import { Show as ShowKPIs} from './components/uc_resumen_kpi'
import { Show as ShowOperacion } from './modals/uc_modal_operacion';

export function Init() {
  const [movimientos, setMovimientos] = useState<movement[]>([
    { id: '1', hora: '08:00 AM', folio: 'SYS-001', tipo: 'APERTURA', concepto: 'Apertura de Caja', monto: 5000, saldoResultante: 5000, metodoPago: 'EFECTIVO' },
    { id: '2', hora: '08:30 AM', folio: 'TX-8801', tipo: 'FONDEO', concepto: 'Carga cliente #1024', monto: 1200, saldoResultante: 6200, metodoPago: 'TARJETA' },
    { id: '3', hora: '09:15 AM', folio: 'TX-8802', tipo: 'RETIRO', concepto: 'Pago premio cliente #1050', monto: -800, saldoResultante: 5400, metodoPago: 'TRANSFERENCIA' },
    { id: '4', hora: '10:00 AM', folio: 'BOV-012', tipo: 'DEPOSITO_BOVEDA', concepto: 'Entrada de Bóveda (Cambio)', monto: 3000, saldoResultante: 8400, metodoPago: 'EFECTIVO' },
  ]);

  const resumen: resumenSession = {
    fondoInicial: 5000,
    totalIngresos: 4200,
    totalEgresos: 800,
    saldoTeorico: 8400,
  };

  // Estado para controlar la apertura y tipo de modal
  const [modalTipo, setModalTipo] = useState<'FONDEO' | 'RETIRO' | null>(null);

  // Manejar click desde el Sidebar
  const handleAccionSelected = (accion: string) => {
    if (accion === 'FONDEO' || accion === 'RETIRO') {
      setModalTipo(accion);
    }
  };

  // Registrar el nuevo movimiento capturado en el modal
  const handleRegistrarMovimiento = (datos: {
    tipo: typeMovement;
    monto: number;
    concepto: string;
    metodoPago: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';
  }) => {
    const nuevoMovimiento: movement = {
      id: `MOV-${Date.now().toString().slice(-4)}`,
      hora: new Date().toLocaleTimeString('es-MX', { hour12: false }),
      folio: '',
      concepto: datos.concepto,
      tipo: datos.tipo,
      monto: datos.monto,
      metodoPago: datos.metodoPago,
      saldoResultante: datos.monto,
      usuario: 'Cajero',
    };

    setMovimientos((prev) => [nuevoMovimiento, ...prev]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 text-slate-100 h-full">
      
      {/* SECCIÓN IZQUIERDA: Libro Mayor y KPIs (Ocupa el espacio principal) */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* KPIs Resumen */}
        <ShowKPIs resumen={resumen}/>

        {/* Tabla Libro Mayor */}
        <ShowCaja movimientos={movimientos} />
      </div>

      {/* SECCIÓN DERECHA: Sidebar Operativo de Caja (Panel de Control) */}
      <ShowButtons onAccionSelect={handleAccionSelected}/>

      {/* Modal Operativo */}
      <ShowOperacion
        isOpen={modalTipo !== null}
        tipo={modalTipo}
        onClose={() => setModalTipo(null)}
        onSubmit={handleRegistrarMovimiento}
      />

    </div>
  );
}