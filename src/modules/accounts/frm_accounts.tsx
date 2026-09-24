import { useState } from 'react';
import type { DatosJugador, OperacionJugador } from './types/accounts.types';

export function Show() {
  // Estado para el buscador por número de tarjeta
  const [searchTarjeta, setSearchTarjeta] = useState('');
  
  // Estado para el jugador encontrado
  const [jugador] = useState<DatosJugador | null>({
    id: 'JUG-9941',
    numeroTarjeta: '7788-9900-1234',
    nombre: 'Javicho',
    status: 'ACTIVO',
    saldoEfectivo: 4500.0,
    saldoBono: 500.0,
    puntosFidelidad: 1250,
    fechaRegistro: '2026-01-15',
  });

  // Estado para el historial de operaciones del jugador
  const [operaciones] = useState<OperacionJugador[]>([
    { id: 'OP-1001', fechaHora: '16/09/2026 14:20', tipo: 'RECARGA', monto: 1000, terminal: 'POS-01', metodoPago: 'EFECTIVO' },
    { id: 'OP-1002', fechaHora: '16/09/2026 15:05', tipo: 'APUESTA', monto: -250, terminal: 'TERMINAL-04', metodoPago: 'EFECTIVO' },
    { id: 'OP-1003', fechaHora: '16/09/2026 16:12', tipo: 'PREMIO_PAGADO', monto: 850, terminal: 'POS-01', metodoPago: 'EFECTIVO' },
    { id: 'OP-1004', fechaHora: '17/09/2026 10:30', tipo: 'RETIRO', monto: -500, terminal: 'POS-02', metodoPago: 'TRANSFERENCIA' },
  ]);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTarjeta.trim()) return;
    console.log('Buscando número de tarjeta:', searchTarjeta);
    // Aquí conectarás con tu servicio API para traer el jugador y sus operaciones
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
  };

  return (
    <div className="p-6 max-w-[1700px] mx-auto space-y-6 text-slate-100 font-sans">
      
      {/* ==========================================
          HEADER / TOPBAR CON BUSCADOR
         ========================================== */}
      <header className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-black uppercase tracking-wider text-white">
            Consulta & Gestión de Jugador
          </h2>
          <p className="text-xs text-slate-400">
            Escanea o ingresa el número de tarjeta del cliente
          </p>
        </div>

        {/* Formulario Buscador */}
        <form onSubmit={handleBuscar} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-96">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
              💳
            </span>
            <input
              type="text"
              placeholder="Ingrese o escanee N° de Tarjeta..."
              value={searchTarjeta}
              onChange={(e) => setSearchTarjeta(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white font-mono text-sm focus:outline-none focus:border-nextbet-cyan transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-nextbet-cyan/20 text-nextbet-cyan border border-nextbet-cyan/40 hover:bg-nextbet-cyan hover:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
          >
            Buscar
          </button>
        </form>
      </header>

      {/* ==========================================
          PANEL PRINCIPAL DE 4 SECCIONES (GRID 2x2)
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ------------------------------------------
            SECCIÓN 1: SUPERIOR IZQUIERDA
            Operaciones del Jugador
           ------------------------------------------ */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm shadow-xl flex flex-col h-[400px]">
          <div className="border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                Historial de Operaciones
              </h3>
              <p className="text-[11px] text-slate-400">Últimos movimientos registrados</p>
            </div>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              {operaciones.length} Registros
            </span>
          </div>

          <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800 sticky top-0">
                <tr>
                  <th className="p-2.5">Fecha/Hora</th>
                  <th className="p-2.5">Tipo</th>
                  <th className="p-2.5">Terminal</th>
                  <th className="p-2.5 text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {operaciones.map((op) => (
                  <tr key={op.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-2.5 font-mono text-slate-400 text-[11px]">{op.fechaHora}</td>
                    <td className="p-2.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        op.monto > 0
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {op.tipo}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-slate-300 text-[11px]">{op.terminal}</td>
                    <td className={`p-2.5 text-right font-mono font-bold text-xs ${
                      op.monto > 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {op.monto > 0 ? '+' : ''}{formatCurrency(op.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------
            SECCIÓN 2: SUPERIOR DERECHA
            Datos del Jugador
           ------------------------------------------ */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm shadow-xl flex flex-col h-[400px]">
          <div className="border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                Información del Jugador
              </h3>
              <p className="text-[11px] text-slate-400">Datos de la cuenta y saldos activos</p>
            </div>
            {jugador && (
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 uppercase tracking-wider">
                {jugador.status}
              </span>
            )}
          </div>

          {jugador ? (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {/* Info Personal Básica */}
              <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Nombre Cliente</span>
                  <p className="text-sm font-bold text-white mt-0.5">{jugador.nombre}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">N° Tarjeta</span>
                  <p className="text-sm font-mono font-bold text-nextbet-cyan mt-0.5">{jugador.numeroTarjeta}</p>
                </div>
              </div>

              {/* Cards de Saldos */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Saldo Efectivo</span>
                  <p className="text-sm font-mono font-black text-emerald-400 mt-1">
                    {formatCurrency(jugador.saldoEfectivo)}
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Saldo Bono</span>
                  <p className="text-sm font-mono font-black text-amber-400 mt-1">
                    {formatCurrency(jugador.saldoBono)}
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Puntos Fidelidad</span>
                  <p className="text-sm font-mono font-black text-blue-400 mt-1">
                    {jugador.puntosFidelidad} pts
                  </p>
                </div>
              </div>

              {/* Pie de Datos */}
              <div className="text-[11px] text-slate-400 font-mono flex justify-between pt-2 border-t border-slate-800/60">
                <span>ID Sistema: {jugador.id}</span>
                <span>Registro: {jugador.fechaRegistro}</span>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 italic text-xs">
              Ingrese un número de tarjeta para consultar los datos del cliente.
            </div>
          )}
        </section>

        {/* ------------------------------------------
            SECCIÓN 3: INFERIOR IZQUIERDA
            (Pendiente por definir función: Ej. Terminales / Apuestas activas)
           ------------------------------------------ */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm shadow-xl min-h-[250px]">
          <div className="border-b border-slate-800 pb-3 mb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Sección Inferior Izquierda
            </h3>
            <p className="text-[11px] text-slate-500">Módulo editable</p>
          </div>
          <div className="flex items-center justify-center h-40 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs font-mono">
            [ Espacio disponible ]
          </div>
        </section>

        {/* ------------------------------------------
            SECCIÓN 4: INFERIOR DERECHA
            (Pendiente por definir función: Ej. Acciones directas / Recargas / Canjes)
           ------------------------------------------ */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm shadow-xl min-h-[250px]">
          <div className="border-b border-slate-800 pb-3 mb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Sección Inferior Derecha
            </h3>
            <p className="text-[11px] text-slate-500">Módulo editable</p>
          </div>
          <div className="flex items-center justify-center h-40 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs font-mono">
            [ Espacio disponible ]
          </div>
        </section>

      </div>
    </div>
  );
}