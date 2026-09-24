import { useState } from 'react';
import logoNextBet from '@/assets/logo.png';

export type CurrentModule = 'accounts' | 'movements' | 'arqueo' | 'configuration';

interface sideBarProps {
  currentModule: CurrentModule;
  onSelectedModule: (current: CurrentModule) => void;
  onClose: () => void;
}

export function Init({ currentModule, onSelectedModule, onClose }: sideBarProps) {
    const [colapsado, setColapsado] = useState(false);

    const opciones = [
    { id: 'accounts', label: 'Ventanilla POS', icon: '💳' },
    { id: 'movements', label: 'Historial / Aud.', icon: '📜' },
    { id: 'arqueo', label: 'Cierre / Arqueo', icon: '⚖️' },
    { id: 'configuration', label: 'Configuración', icon: '⚙️' },
  ];

  return (
    <aside
      className={`relative h-screen bg-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between p-4 z-30 ${
        colapsado ? 'w-30' : 'w-64'
      }`}
    >

        {/* Botón Semicircular de Colapso (Posicionado en la orilla derecha) */}
      <button
        onClick={() => setColapsado(!colapsado)}
        title={colapsado ? 'Expandir menú' : 'Colapsar menú'}
        className="absolute top-7 -right-4 z-20 w-8 h-8 hover:brightness-110 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-nextbet-cyan hover:border-nextbet-cyan hover:bg-slate-850 shadow-md flex items-center justify-center transition-all cursor-pointer group active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
            colapsado ? 'rotate-180' : ''
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div>
        {/* Cabecera con Logo desde resources */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between h-20 overflow-hidden">
            {!colapsado ? (
                /* Estado Expandido: Logo + Texto */
                <div className="flex items-center gap-3">
                <img src={logoNextBet} alt="NextBet Logo" className="w-25 h-25 object-contain shrink-0" />
                <div className="flex flex-col">
                    <span className="font-black text-white text-base tracking-wider leading-none">NextBet</span>
                    <span className="text-[10px] text-nextbet-cyan font-bold tracking-widest uppercase mt-0.5">
                    TECHNOLOGIES
                    </span>
                </div>
                </div>
            ) : (
                /* Estado Colapsado: Logo centrado y bien proporcionado */
                <div className="w-full flex justify-center items-center">
                <div className="w-25 h-25 rounded-xl bg-nextbet-cyan/10 border border-nextbet-cyan/30 flex items-center justify-center shrink-0 shadow-sm p-1">
                    <img src={logoNextBet} alt="NextBet Logo" className="w-full h-full object-contain" />
                </div>
                </div>
          )}

          
        </div>

        {/* Menú de Opciones */}
        <nav className="p-3 flex flex-col gap-1.5 mt-2">
          {opciones.map((item) => {
            const esActivo = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectedModule(item.id as CurrentModule)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all w-full ${
                  esActivo
                    ? 'bg-slate-800 text-nextbet-cyan border-l-4 border-nextbet-cyan shadow-lg font-bold'
                    : 'hover:bg-slate-800/50 hover:text-white text-slate-400'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!colapsado && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Salida */}
      <div className="p-3 border-t border-slate-800/80">
        <button
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full"
        >
          <span className="text-lg">🚪</span>
          {!colapsado && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}