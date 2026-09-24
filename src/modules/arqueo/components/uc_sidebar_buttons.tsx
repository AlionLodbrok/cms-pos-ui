import { useState } from 'react';

interface Init {
  onAccionSelect?: (accion: string) => void;
}

export function Show({ onAccionSelect }: Init) {
  const [accionActiva, setAccionActiva] = useState<string | null>(null);

  const handleSelect = (accion: string) => {
    setAccionActiva(accion);
    if (onAccionSelect) onAccionSelect(accion);
  };

  return (
    <aside className="w-80 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 backdrop-blur-md shadow-2xl h-fit sticky top-20">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-xs font-black text-white uppercase tracking-wider">
          Panel Operativo
        </h3>
        <p className="text-[11px] text-slate-400">
          Acciones directas del turno
        </p>
      </div>

      {/* Botonera Principal */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={() => handleSelect('FONDEO')}
          className={`w-full py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-between border transition-all ${
            accionActiva === 'FONDEO'
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
              : 'bg-slate-950/60 text-slate-200 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50'
          }`}
        >
          <span>Ingresar Fondeo</span>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
            + ENTRADA
          </span>
        </button>

        <button
          onClick={() => handleSelect('RETIRO')}
          className={`w-full py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-between border transition-all ${
            accionActiva === 'RETIRO'
              ? 'bg-amber-500/20 text-amber-400 border-amber-500'
              : 'bg-slate-950/60 text-slate-200 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/50'
          }`}
        >
          <span>Retiro / Sangría</span>
          <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
            - SALIDA
          </span>
        </button>

        <button
          onClick={() => handleSelect('AJUSTE')}
          className={`w-full py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-between border transition-all ${
            accionActiva === 'AJUSTE'
              ? 'bg-blue-500/20 text-blue-400 border-blue-500'
              : 'bg-slate-950/60 text-slate-200 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/50'
          }`}
        >
          <span>Ajuste de Caja</span>
          <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
            ± CORRECCIÓN
          </span>
        </button>
      </div>

      <div className="h-px bg-slate-800/80 my-1" />

      {/* Botón Destacado de Cierre de Caja */}
      <button
        onClick={() => handleSelect('CORTE')}
        className="w-full py-3.5 px-4 rounded-lg font-black text-xs uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 shadow-lg shadow-rose-950/50 border border-rose-500/40 transition-all flex items-center justify-center gap-2"
      >
        <span>🔒 Realizar Corte de Caja</span>
      </button>
    </aside>
  );
}