'use client';

import { Minus, Plus } from 'lucide-react';

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Diminuir quantidade">
        <Minus size={16} strokeWidth={2} aria-hidden />
      </button>
      <input
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Quantidade"
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ''), 10);
          onChange(Number.isFinite(n) && n > 0 ? n : 1);
        }}
        onFocus={(e) => e.currentTarget.select()}
      />
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Aumentar quantidade">
        <Plus size={16} strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}
