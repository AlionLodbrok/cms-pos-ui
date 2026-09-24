import { useEffect, useState } from 'react';
import { sessionService } from '../services/sessionService';
import type { userSessionData, loginResponse } from '../types/sessions.types';

export function Init() {
  const [sessionData, setSessionData] = useState<userSessionData | null>(null);
  const [isOnline] = useState<boolean>(true);
  const [information] = useState<string>('Cargando...');
  const [user, _setUser] = useState<loginResponse | null>(() => {
    const storedData = localStorage.getItem('nextbet_userLogin');
    if (!storedData) return null;

    try {
      return JSON.parse(storedData) as loginResponse;
    } catch (error) {
      console.error('Error al parsear userLogin de localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    // 2. Consultar la información pasando ese ID coincidente
    sessionService.getSessionInfo(user?.userId).then((data) => {
      setSessionData(data);
    });
  }, []);

  const iniciales = sessionData?.user.name
    ? sessionData.user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '--';

  return (
    <header className="h-16 w-full bg-slate-900/90 border-b border-slate-800/80 px-6 flex items-center justify-between backdrop-blur-md sticky top-0 z-10">
      {/* 1. Terminal y Turno Activo */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-white tracking-wide uppercase">
              Caja: {sessionData?.shift.terminalId || information}
            </span>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              Turno #{sessionData?.shift.turnoId || information}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-sans">
            {sessionData?.shift.sucursal || information}
          </span>
        </div>
      </div>

      {/* 2. Estado Conexión y Usuario */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 border border-slate-800">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
            {isOnline ? 'En Línea' : 'Sin Conexión'}
          </span>
        </div>

        <div className="h-6 w-px bg-slate-800" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-nextbet-cyan/10 border border-nextbet-cyan/30 flex items-center justify-center text-nextbet-cyan font-black text-xs shadow-sm">
            {iniciales}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white leading-tight">
              {sessionData?.user.name || information}
            </span>
            <span className="text-[10px] text-nextbet-cyan font-mono uppercase tracking-wider">
              {sessionData?.user.rol || 'Sin Rol'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}