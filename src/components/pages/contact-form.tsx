'use client';

import { useState } from 'react';
import { whatsappLink } from '@/lib/site';

const SUBJECTS = ['Orçamento de produtos', 'Compra para empresa ou equipe', 'Disponibilidade e retirada na loja', 'Envio para outra cidade', 'Outro assunto'];

export function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const text = [
    `Olá! Meu nome é ${name.trim() || '(sem nome)'}${company.trim() ? `, da empresa ${company.trim()}` : ''}.`,
    `Assunto: ${subject}.`,
    message.trim(),
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) {
          setError('Preencha seu nome e escreva a mensagem para continuar.');
          return;
        }
        setError('');
        window.open(whatsappLink(text), '_blank', 'noopener');
      }}
      noValidate
    >
      <label className="field">
        <span>Seu nome</span>
        <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(error) && !name.trim()} />
      </label>
      <label className="field">
        <span>Empresa (opcional)</span>
        <input autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>
      <label className="field">
        <span>Assunto</span>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Mensagem</span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Produtos, quantidades, tamanhos e prazo"
          aria-invalid={Boolean(error) && !message.trim()}
        />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-accent btn-large btn-block">
        Continuar no WhatsApp
      </button>
      <p className="muted small">A mensagem abre no WhatsApp para você revisar antes de enviar. Nada é guardado neste site.</p>
    </form>
  );
}
