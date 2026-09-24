import { useState, useEffect } from 'react';
import type { typeMovement } from '../types/arqueo.types';

interface Init {
  isOpen: boolean;
  tipo: 'FONDEO' | 'RETIRO' | null;
  onClose: () => void;
  onSubmit: (datos: { tipo: typeMovement; monto: number; concepto: string; metodoPago: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA' }) => void;
}

export function Show({ isOpen, tipo, onClose, onSubmit }: Init) {
  const [monto, setMonto] = useState<string>('');
  const [concepto, setConcepto] = useState<string>('');
  const [metodoPago, setMetodoPago] = useState<'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA'>('EFECTIVO');

  // Limpiar campos al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setMonto('');
      setConcepto('');
      setMetodoPago('EFECTIVO');
    }
  }, [isOpen]);

  if (!isOpen || !tipo) return null;

  const esFondeo = tipo === 'FONDEO';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const montoNumerico = parseFloat(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) return;

    // Si es retiro, guardamos el valor como negativo
    const valorFinal = esFondeo ? montoNumerico : -montoNumerico;

    onSubmit({
      tipo,
      monto: valorFinal,
      concepto: concepto.trim() || (esFondeo ? 'Fondeo manual de caja' : 'Retiro / Sangría de caja'),
      metodoPago,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Encabezado */}
        <div className={`p-5 border-b border-slate-800 flex items-center justify-between ${esFondeo ? 'bg-emerald-950/20' : 'bg-amber-950/20'}`}>
          <div>
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
              esFondeo ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {esFondeo ? '+ Entrada de Caja' : '- Salida de Caja'}
            </span>
            <h3 className="text-base font-black text-white mt-1">
              {esFondeo ? 'Registrar Fondeo' : 'Registrar Retiro / Sangría'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-mono p-1"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Campo Monto */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Monto (MXN) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="0.00"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-8 pr-4 text-white font-mono text-base focus:outline-none focus:border-nextbet-cyan transition-colors"
              />
            </div>
          </div>

          {/* Campo Método de Pago */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Método de Pago
            </label>
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs font-mono focus:outline-none focus:border-nextbet-cyan transition-colors"
            >
              <option value="EFECTIVO">EFECTIVO</option>
              <option value="TARJETA">TARJETA</option>
              <option value="TRANSFERENCIA">TRANSFERENCIA</option>
            </select>
          </div>

          {/* Campo Concepto / Justificación */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Concepto / Referencia
            </label>
            <textarea
              rows={2}
              placeholder={esFondeo ? 'Ej. Apoyo de cambio inicial' : 'Ej. Envío a bóveda principal'}
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-nextbet-cyan transition-colors resize-none"
            />
          </div>

          {/* Botones de Acción */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800/50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all ${
                esFondeo
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/50'
                  : 'bg-amber-600 hover:bg-amber-500 shadow-amber-950/50'
              }`}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}