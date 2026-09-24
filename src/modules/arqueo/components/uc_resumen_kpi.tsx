import type { resumenSession } from '../types/arqueo.types';

interface Init {
  resumen: resumenSession;
}

export function Show({ resumen }: Init) {
    const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Fondo Inicial</span>
            <p className="text-xl font-black text-white mt-1">{formatCurrency(resumen.fondoInicial)}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Ingresos (+)</span>
            <p className="text-xl font-black text-nextbet-cyan mt-1">{formatCurrency(resumen.totalIngresos)}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Egresos (-)</span>
            <p className="text-xl font-black text-orange-400 mt-1">-{formatCurrency(resumen.totalEgresos)}</p>
          </div>
          <div className="bg-slate-900/80 border border-nextbet-cyan/30 p-3.5 rounded-2xl bg-nextbet-cyan/5">
            <span className="text-[11px] text-nextbet-cyan font-bold uppercase tracking-wider block">Saldo Teórico</span>
            <p className="text-xl font-black text-white mt-1">{formatCurrency(resumen.saldoTeorico)}</p>
          </div>
        </div>
  );
}