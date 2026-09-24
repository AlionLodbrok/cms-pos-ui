import type { movement } from '../types/arqueo.types';

interface Init {
  movimientos: movement[];
}

export function Show({ movimientos }: Init) {
  // Formateador de moneda en MXN
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl flex flex-col">
      {/* Encabezado del módulo */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Libro Mayor de Caja
          </h3>
          <p className="text-[11px] text-slate-400">
            Registro detallado de entradas y salidas del turno activo
          </p>
        </div>
        <span className="text-xs font-mono bg-slate-800 text-nextbet-cyan px-2.5 py-1 rounded-md border border-slate-700">
          {movimientos.length} Registros
        </span>
      </div>

      {/* Tabla de Movimientos */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Hora</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Concepto / Referencia</th>
              <th className="p-3">Método</th>
              <th className="p-3 text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {movimientos.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 italic">
                  No hay movimientos registrados en este turno.
                </td>
              </tr>
            ) : (
              movimientos.map((m) => {
                const esEntrada = m.monto > 0;
                return (
                  <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono text-slate-400">{m.hora}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          esEntrada
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {m.tipo}
                      </span>
                    </td>
                    <td className="p-3 text-slate-200 font-medium">{m.concepto}</td>
                    <td className="p-3 text-slate-400 font-mono text-[11px]">{m.metodoPago}</td>
                    <td
                      className={`p-3 text-right font-mono font-bold text-sm ${
                        esEntrada ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {esEntrada ? '+' : ''}
                      {formatCurrency(m.monto)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}