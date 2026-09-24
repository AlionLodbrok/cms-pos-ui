import { useState } from 'react';
import { authService } from '../main/services/authService';
import logoNextBet from '@/assets/logo.png';

interface loginProps {
  onLoginSuccess: (user: string) => void;
}

export function Init({ onLoginSuccess }: loginProps) {
  const [user, setUser] = useState('');
  const [pass, setPassword] = useState('');
  const [cargando, setLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !pass.trim()) return;

    setLoad(true);
    setError(null);

    try {
      // Llamada a la API de autenticación
      const data = await authService.loginApi(user, pass, 'Ventanilla01');
      
      // Guardar el token para futuras peticiones (opcional)
      localStorage.setItem('nextbet_userLogin', JSON.stringify(data));
      
      // Notificar éxito al componente padre con el nombre o usuario retornado
      onLoginSuccess(data.userId);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen bg-nextbet-bg flex items-center justify-center p-6 text-slate-100">
      <div className="w-[65vw] min-w-[700px] max-w-6xl min-h-[520px] bg-slate-900/60 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 backdrop-blur-sm">
        
        {/* Columna Izquierda: Logo */}
        <div className="md:col-span-6 bg-gradient-to-br from-slate-950/90 to-nextbet-bg p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-800/80">
          <img
            src={logoNextBet}
            alt="NextBet Technologies Logo"
            className="w-full h-full object-contain max-h-[460px] drop-shadow-[0_0_40px_rgba(0,212,255,0.25)]"
          />
        </div>

        {/* Columna Derecha: Formulario de Acceso */}
        <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between bg-nextbet-card/50">
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white tracking-wide">Acceso a Terminal</h2>
              <p className="text-slate-400 text-sm mt-1">
                Ingresa tus credenciales de cajero para abrir la sesión.
              </p>
            </div>

            {/* Mensaje de Error */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Usuario / ID Cajero
                </label>
                <input
                  type="text"
                  required
                  disabled={cargando}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Ej. cmendoza"
                  className="w-full bg-slate-950/80 border border-slate-700/80 text-white text-base rounded-xl p-3.5 focus:border-nextbet-cyan focus:ring-1 focus:ring-nextbet-cyan focus:outline-none transition-all placeholder:text-slate-600 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  disabled={cargando}
                  value={pass}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-slate-700/80 text-white text-base rounded-xl p-3.5 focus:border-nextbet-cyan focus:ring-1 focus:ring-nextbet-cyan focus:outline-none transition-all placeholder:text-slate-600 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-nextbet-cyan hover:brightness-110 text-slate-950 font-black py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all mt-3 active:scale-[0.98] uppercase tracking-wider text-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {cargando ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full"></span>
                    <span>Validando...</span>
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
            Estación: <span className="font-mono text-slate-400">POS-VENTANILLA-01</span> | v1.0.0
          </div>
        </div>

      </div>
    </div>
  );

}