"use client";

import { useState, type FormEvent } from "react";

type Labels = {
  name: string;
  email: string;
  inquiry: string;
  message: string;
  options: string[];
  send: string;
  sending: string;
  sent: string;
  error: string;
  notReady: string;
};

export function ContactForm({ endpoint, labels, instagram }: { endpoint: string; labels: Labels; instagram: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) return;
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="form-message" role="status">{labels.sent}</p>;
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label className="field">
          {labels.name}
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          {labels.email}
          <input type="email" name="email" required autoComplete="email" />
        </label>
      </div>
      <label className="field">
        {labels.inquiry}
        <select name="inquiry">
          {labels.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="field">
        {labels.message}
        <textarea name="message" rows={4} required />
      </label>
      {/* スパム対策：人間には見えない欄。ここに入力があると送信は破棄される */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />

      {!endpoint && <p className="form-note">{labels.notReady}</p>}
      {status === "error" && <p className="form-note" role="alert">{labels.error}</p>}

      <div className="form-actions">
        <button type="submit" className="send-button" disabled={!endpoint || status === "sending"}>
          {status === "sending" ? labels.sending : labels.send}
        </button>
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-link">
          Instagram
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M3 11 L11 3 M5 3 H11 V9" />
          </svg>
        </a>
      </div>
    </form>
  );
}
