"use client";

import { useState, FormEvent } from "react";

type Props = {
  variant?: "contact" | "signup";
};

export default function ContactForm({ variant = "contact" }: Props) {
  const isSignup = variant === "signup";
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl glass p-8 text-center"
      >
        <h3 className="font-heading text-xl font-semibold text-pearl">
          {isSignup
            ? "Bedankt voor je aanmelding!"
            : "Bedankt voor je bericht!"}
        </h3>
        <p className="mt-3 text-pearl-80">
          {isSignup
            ? "We nemen binnen enkele dagen persoonlijk contact met je op."
            : "We reageren zo snel mogelijk, meestal binnen twee werkdagen."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="naam"
          label="Naam"
          type="text"
          placeholder="Je volledige naam"
          required
        />
        <Field
          id="email"
          label="E-mail"
          type="email"
          placeholder="jij@bedrijf.nl"
          required
        />
      </div>
      <Field
        id="bedrijf"
        label={isSignup ? "Bedrijfsnaam" : "Bedrijf (optioneel)"}
        type="text"
        placeholder="Je bedrijfsnaam"
        required={isSignup}
      />
      {!isSignup && (
        <Field
          id="onderwerp"
          label="Onderwerp"
          type="text"
          placeholder="Waar kunnen we mee helpen?"
        />
      )}
      <div>
        <label
          htmlFor="bericht"
          className="block text-sm font-medium text-pearl mb-2"
        >
          {isSignup ? "Waarom wil je lid worden?" : "Bericht"}
        </label>
        <textarea
          id="bericht"
          name="bericht"
          rows={5}
          placeholder={
            isSignup
              ? "Vertel ons iets over jezelf en je onderneming..."
              : "Je bericht..."
          }
          className="w-full rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/70 focus:border-terracotta focus:outline-none transition-colors"
        />
      </div>
      <button
        type="submit"
        className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 text-white font-medium transition-all hover:bg-terracotta-light hover:scale-[1.02]"
      >
        {isSignup ? "Aanmelden" : "Verstuur bericht"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-pearl mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl glass px-4 py-3 text-pearl placeholder:text-pearl-60/70 focus:border-terracotta focus:outline-none transition-colors"
      />
    </div>
  );
}
