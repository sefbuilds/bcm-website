"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  submitIntake,
  type IntakeRole,
  type IntakeTier,
} from "./actions";

type Props = {
  initialRole?: IntakeRole | null;
  initialTier?: IntakeTier;
};

type SingleValue = string | null;
type MultiValue = string[];
type RankValue = Record<string, number>;

type Answers = {
  // Block 1
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  woonplaats: string;
  bedrijf: string;
  website: string;
  fase: SingleValue;
  // Block 2
  q_fundament_voor_wie: string;
  q_fundament_type: string;
  q_fundament_niet_voor: string;
  q_fundament_missen: string;
  q_fundament_schrappen: string;
  q_fundament_opschalen: string;
  // Block 3
  reden: SingleValue;
  gevoel: MultiValue;
  sectoren: MultiValue;
  q_netwerk_type: string;
  q_breng_waarde: string;
  // Block 4
  event_niveau: SingleValue;
  event_rank: RankValue;
  q_event_nogo: string;
  event_type: MultiValue;
  q_event_definitie: string;
  // Block 5
  prijs: SingleValue;
  reden_lid: SingleValue;
  verwachting_lid: MultiValue;
  q_lid_misgegaan: string;
  // Block 6
  sponsor_interesse: SingleValue;
  sponsor_rank: RankValue;
  excl_cat: SingleValue;
  q_sponsor_verwachting: string;
  // Block 7 — lid
  bron: SingleValue;
  q_referral: string;
  q_lid_open: string;
  // Block 7 — bestuur
  eigenaar: MultiValue;
  q_niet_eigenaar: string;
  q_knelpunt: string;
  q_kans: string;
  q_een_ding: string;
};

const INITIAL_ANSWERS: Answers = {
  voornaam: "",
  achternaam: "",
  email: "",
  telefoon: "",
  woonplaats: "",
  bedrijf: "",
  website: "",
  fase: null,
  q_fundament_voor_wie: "",
  q_fundament_type: "",
  q_fundament_niet_voor: "",
  q_fundament_missen: "",
  q_fundament_schrappen: "",
  q_fundament_opschalen: "",
  reden: null,
  gevoel: [],
  sectoren: [],
  q_netwerk_type: "",
  q_breng_waarde: "",
  event_niveau: null,
  event_rank: {},
  q_event_nogo: "",
  event_type: [],
  q_event_definitie: "",
  prijs: null,
  reden_lid: null,
  verwachting_lid: [],
  q_lid_misgegaan: "",
  sponsor_interesse: null,
  sponsor_rank: {},
  excl_cat: null,
  q_sponsor_verwachting: "",
  bron: null,
  q_referral: "",
  q_lid_open: "",
  eigenaar: [],
  q_niet_eigenaar: "",
  q_knelpunt: "",
  q_kans: "",
  q_een_ding: "",
};

type StepId =
  | "role"
  | "about"
  | "fundament"
  | "seeking"
  | "events"
  | "membership"
  | "sponsors"
  | "final";

type Step = { id: StepId; label: string; title: string };

const STEPS: Step[] = [
  { id: "role", label: "Intro", title: "Wie ben je?" },
  { id: "about", label: "Blok 1", title: "Over jou" },
  { id: "fundament", label: "Blok 2", title: "Fundament" },
  { id: "seeking", label: "Blok 3", title: "Wat zoek je?" },
  { id: "events", label: "Blok 4", title: "Events" },
  { id: "membership", label: "Blok 5", title: "Lidmaatschap" },
  { id: "sponsors", label: "Blok 6", title: "Partners & Sponsors" },
  { id: "final", label: "Blok 7", title: "Afronden" },
];

const TIER_COPY: Record<Exclude<IntakeTier, null> | "none", string> = {
  member: "Je bent verwezen via de Member-CTA.",
  partner: "Je bent verwezen via de Partner-CTA.",
  sponsor: "Je bent verwezen via de Sponsor-CTA.",
  none: "",
};

export default function IntakeForm({
  initialRole = null,
  initialTier = null,
}: Props) {
  const [role, setRole] = useState<IntakeRole | null>(initialRole);
  const [tier] = useState<IntakeTier>(initialTier ?? null);
  const [stepIndex, setStepIndex] = useState<number>(initialRole ? 1 : 0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isBestuur = role === "bestuur";
  const currentStep = STEPS[stepIndex];
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [stepIndex, submitted]);

  const update = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMulti = (
    key: keyof Answers,
    value: string,
    max?: number,
  ) => {
    setAnswers((prev) => {
      const current = (prev[key] as MultiValue) || [];
      const has = current.includes(value);
      let next = has
        ? current.filter((v) => v !== value)
        : [...current, value];
      if (max && next.length > max) {
        next = next.slice(next.length - max);
      }
      return { ...prev, [key]: next };
    });
  };

  const setRank = (key: keyof Answers, item: string, value: string) => {
    const n = parseInt(value, 10);
    setAnswers((prev) => {
      const current = (prev[key] as RankValue) || {};
      if (!value) {
        const { [item]: _, ...rest } = current;
        void _;
        return { ...prev, [key]: rest };
      }
      if (isNaN(n)) return prev;
      return { ...prev, [key]: { ...current, [item]: n } };
    });
  };

  const chooseRole = (next: IntakeRole) => {
    setRole(next);
    setStepIndex(1);
  };

  const goNext = () => {
    setError(null);
    if (currentStep.id === "about") {
      if (!answers.voornaam.trim() || !answers.email.trim()) {
        setError("Vul minimaal je voornaam en e-mail in.");
        return;
      }
      if (!/.+@.+\..+/.test(answers.email)) {
        setError("Vul een geldig e-mailadres in.");
        return;
      }
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStepIndex((i) => Math.max(i - 1, role ? 1 : 0));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!answers.voornaam.trim() || !answers.email.trim()) {
      setError("Vul minimaal je voornaam en e-mail in.");
      setStepIndex(1);
      return;
    }
    if (!role) {
      setError("Kies eerst of je lid of bestuurslid bent.");
      setStepIndex(0);
      return;
    }
    setSubmitting(true);
    const { voornaam, achternaam, email, telefoon, woonplaats, bedrijf, website, fase, ...rest } =
      answers;
    const res = await submitIntake({
      role,
      tier,
      voornaam,
      achternaam,
      email,
      telefoon,
      woonplaats,
      bedrijf,
      website,
      fase: fase ?? undefined,
      data: rest,
    });
    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError(res.error);
    }
  };

  if (submitted) {
    return (
      <div className="wrap">
        <div className="success">
          <h2>Bedankt!</h2>
          <p>
            {isBestuur
              ? "Je blauwdruk-input is ontvangen. We bundelen alle antwoorden en bespreken ze samen."
              : "Je aanmelding is ontvangen. We nemen snel persoonlijk contact met je op."}
          </p>
          <p style={{ marginTop: 20, fontSize: 13 }}>
            Je kunt dit tabblad nu sluiten.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap">
      <header className="header">
        <div className="crest">N</div>
        <div className="brand-line">NBCM</div>
        <h1>Intake &amp; Blauwdruk</h1>
        <div className="subtitle">
          Eén formulier — voor bestuur en nieuwe leden
        </div>
      </header>

      {role && (
        <div className="progress-wrap">
          <div className="progress-top">
            <span>
              <strong>{currentStep.label}</strong> — {currentStep.title}
            </span>
            <span>
              Stap {stepIndex + 1} / {STEPS.length}
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {tier && <TierBadge tier={tier} />}

      {!role && <RoleStep onChoose={chooseRole} />}

      {role && currentStep.id === "about" && (
        <AboutStep answers={answers} update={update} isBestuur={isBestuur} />
      )}
      {role && currentStep.id === "fundament" && (
        <FundamentStep
          answers={answers}
          update={update}
          isBestuur={isBestuur}
        />
      )}
      {role && currentStep.id === "seeking" && (
        <SeekingStep
          answers={answers}
          update={update}
          toggleMulti={toggleMulti}
        />
      )}
      {role && currentStep.id === "events" && (
        <EventsStep
          answers={answers}
          update={update}
          toggleMulti={toggleMulti}
          setRank={setRank}
          isBestuur={isBestuur}
        />
      )}
      {role && currentStep.id === "membership" && (
        <MembershipStep
          answers={answers}
          update={update}
          toggleMulti={toggleMulti}
          isBestuur={isBestuur}
        />
      )}
      {role && currentStep.id === "sponsors" && (
        <SponsorsStep
          answers={answers}
          update={update}
          setRank={setRank}
          isBestuur={isBestuur}
        />
      )}
      {role && currentStep.id === "final" && (
        <FinalStep answers={answers} update={update} toggleMulti={toggleMulti} isBestuur={isBestuur} />
      )}

      {role && (
        <div className="nav-bar">
          <button
            type="button"
            className="btn"
            onClick={goBack}
            disabled={stepIndex <= 1}
          >
            <ArrowLeft size={14} /> Terug
          </button>
          {stepIndex < STEPS.length - 1 ? (
            <button type="button" className="btn primary" onClick={goNext}>
              Volgende <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              className="btn primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Versturen..." : "Verstuur mijn input"}{" "}
              {!submitting && <Check size={14} />}
            </button>
          )}
        </div>
      )}

      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Individual step components                                          */
/* ------------------------------------------------------------------ */

function TierBadge({ tier }: { tier: Exclude<IntakeTier, null> }) {
  return (
    <div className="tier-badge">
      <span className="tier-badge-dot" />
      {tier === "member" && "Aanmelden als Member"}
      {tier === "partner" && "Aanmelden als Partner"}
      {tier === "sponsor" && "Aanmelden als Sponsor"}
    </div>
  );
}

function RoleStep({ onChoose }: { onChoose: (r: IntakeRole) => void }) {
  return (
    <>
      <div className="intro-box">
        <p>
          <strong>Welkom.</strong> Dit formulier kost 5 tot 8 minuten en
          helpt ons begrijpen wat je zoekt, wat je kunt brengen, en hoe wij
          NBCM voor jou relevant maken.
        </p>
        <p>Alles wat je deelt blijft intern bij het bestuur.</p>
      </div>
      <div className="role-selector">
        <button
          type="button"
          className="role-card"
          onClick={() => onChoose("lid")}
        >
          <div className="role-icon">◆</div>
          <div className="role-title">Nieuw lid</div>
          <div className="role-sub">Ik wil lid worden</div>
        </button>
        <button
          type="button"
          className="role-card"
          onClick={() => onChoose("bestuur")}
        >
          <div className="role-icon">◈</div>
          <div className="role-title">Bestuurslid</div>
          <div className="role-sub">Ik vul de blauwdruk in</div>
        </button>
      </div>
    </>
  );
}

type StepProps = {
  answers: Answers;
  update: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  toggleMulti: (key: keyof Answers, value: string, max?: number) => void;
  setRank: (key: keyof Answers, item: string, value: string) => void;
  isBestuur: boolean;
};

function AboutStep({
  answers,
  update,
  isBestuur: _isBestuur,
}: Pick<StepProps, "answers" | "update" | "isBestuur">) {
  return (
    <section className="section">
      <div className="section-label">Blok 1</div>
      <div className="section-title">Over jou</div>
      <hr className="section-rule" />

      <div className="grid-2">
        <div className="field">
          <label htmlFor="voornaam">Voornaam *</label>
          <input
            type="text"
            id="voornaam"
            value={answers.voornaam}
            onChange={(e) => update("voornaam", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="achternaam">Achternaam</label>
          <input
            type="text"
            id="achternaam"
            value={answers.achternaam}
            onChange={(e) => update("achternaam", e.target.value)}
          />
        </div>
      </div>
      <div className="grid-2">
        <div className="field">
          <label htmlFor="email">E-mail *</label>
          <input
            type="email"
            id="email"
            value={answers.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="telefoon">Telefoon / WhatsApp</label>
          <input
            type="tel"
            id="telefoon"
            placeholder="+34 600 ..."
            value={answers.telefoon}
            onChange={(e) => update("telefoon", e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="woonplaats">Waar op Mallorca woon/werk je?</label>
        <input
          type="text"
          id="woonplaats"
          placeholder="Palma / Sóller / Alcúdia / ..."
          value={answers.woonplaats}
          onChange={(e) => update("woonplaats", e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="bedrijf">Bedrijf of activiteit</label>
        <input
          type="text"
          id="bedrijf"
          placeholder="Naam, branche, of korte omschrijving"
          value={answers.bedrijf}
          onChange={(e) => update("bedrijf", e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="website">Website of LinkedIn (optioneel)</label>
        <input
          type="url"
          id="website"
          placeholder="https://..."
          value={answers.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="q" style={{ marginTop: 20 }}>
        <label className="q-label">In welke fase zit je op Mallorca?</label>
        <RadioGroup
          name="fase"
          value={answers.fase}
          onChange={(v) => update("fase", v)}
          options={[
            { value: "net_geland", label: "Net geland of aan het verkennen" },
            { value: "opbouwen", label: "Bezig met opbouwen (eerste 1-3 jaar)" },
            { value: "gevestigd", label: "Gevestigd ondernemer op het eiland" },
            { value: "remote", label: "Remote werkend, bedrijf elders" },
          ]}
        />
      </div>
    </section>
  );
}

function FundamentStep({
  answers,
  update,
  isBestuur,
}: Pick<StepProps, "answers" | "update" | "isBestuur">) {
  return (
    <section className="section">
      <div className="section-label">Blok 2</div>
      <div className="section-title">Fundament</div>
      <hr className="section-rule" />
      <div className="section-desc">
        Wat NBCM is, voor wie, en wat het niet is.
      </div>

      <div className="q">
        <label className="q-label">
          In één zin: voor wie is NBCM er, en wat krijgen zij hier wat ze
          elders niet krijgen?
        </label>
        <textarea
          value={answers.q_fundament_voor_wie}
          onChange={(e) => update("q_fundament_voor_wie", e.target.value)}
          placeholder="Bijv. 'Voor Nederlandstalige ondernemers op Mallorca die...'"
        />
      </div>

      <div className="q">
        <label className="q-label">
          Welk type ondernemer past bij NBCM — en welk type juist niet?
        </label>
        <textarea
          value={answers.q_fundament_type}
          onChange={(e) => update("q_fundament_type", e.target.value)}
          placeholder="Wel: ... / Niet: ..."
        />
      </div>

      <div className="q">
        <label className="q-label">
          Waar moet NBCM expliciet niet voor staan — ook al kost dat leden?
        </label>
        <span className="q-hint">
          Denk aan waarden, gedrag, of positionering die jullie bewust
          afwijzen.
        </span>
        <textarea
          value={answers.q_fundament_niet_voor}
          onChange={(e) => update("q_fundament_niet_voor", e.target.value)}
        />
      </div>

      {isBestuur && (
        <div className="board-only">
          <span className="board-tag">Bestuur</span>
          <div className="q">
            <label className="q-label">
              Als NBCM morgen zou stoppen — wat missen leden dan écht?
            </label>
            <span className="q-hint">
              Syb had het over community. Wat verstaan wij daaronder?
            </span>
            <textarea
              value={answers.q_fundament_missen}
              onChange={(e) => update("q_fundament_missen", e.target.value)}
            />
          </div>
          <div className="q">
            <label className="q-label">
              Stel: NBCM is jouw eigen bedrijf (niet een club). Wat zou je
              morgen zonder twijfel schrappen?
            </label>
            <textarea
              value={answers.q_fundament_schrappen}
              onChange={(e) =>
                update("q_fundament_schrappen", e.target.value)
              }
              placeholder="Activiteiten, processen, kosten, gewoontes..."
            />
          </div>
          <div className="q">
            <label className="q-label">
              En wat zou je verdubbelen of opschalen?
            </label>
            <textarea
              value={answers.q_fundament_opschalen}
              onChange={(e) =>
                update("q_fundament_opschalen", e.target.value)
              }
            />
          </div>
        </div>
      )}
    </section>
  );
}

function SeekingStep({
  answers,
  update,
  toggleMulti,
}: Pick<StepProps, "answers" | "update" | "toggleMulti">) {
  return (
    <section className="section">
      <div className="section-label">Blok 3</div>
      <div className="section-title">Wat zoek je?</div>
      <hr className="section-rule" />
      <div className="section-desc">
        Zodat we je meteen aan de juiste mensen en momenten koppelen.
      </div>

      <div className="q">
        <label className="q-label">
          Wat is de belangrijkste reden om bij NBCM te horen?
        </label>
        <RadioGroup
          name="reden"
          value={answers.reden}
          onChange={(v) => update("reden", v)}
          options={[
            { value: "netwerk", label: "Netwerk uitbreiden met relevante mensen" },
            { value: "business", label: "Directe business of deals genereren" },
            { value: "inspiratie", label: "Inspiratie en persoonlijke groei" },
            { value: "community", label: "Onderdeel zijn van een community" },
            { value: "exclusief", label: "Toegang tot exclusieve events en locaties" },
          ]}
        />
      </div>

      <div className="q">
        <label className="q-label">
          Wat zou je willen voelen na je eerste 3 NBCM-events?
        </label>
        <span className="q-hint">Kies maximaal 2</span>
        <CheckboxGroup
          value={answers.gevoel}
          onToggle={(v) => toggleMulti("gevoel", v, 2)}
          options={[
            { value: "thuis", label: '"Ik hoor hier thuis"' },
            { value: "business_direct", label: '"Dit levert mij direct business op"' },
            { value: "kwaliteit", label: '"De kwaliteit mensen hier is uitzonderlijk"' },
            { value: "geleerd", label: '"Ik heb iets geleerd dat ik nergens anders had gehoord"' },
            { value: "energie", label: '"Ik ga met meer energie weg dan ik kwam"' },
          ]}
        />
      </div>

      <div className="q">
        <label className="q-label">
          In welke sector(en) ben je actief? (meerdere mogelijk)
        </label>
        <CheckboxGroup
          value={answers.sectoren}
          onToggle={(v) => toggleMulti("sectoren", v)}
          options={[
            { value: "vastgoed", label: "Vastgoed / verhuur" },
            { value: "horeca", label: "Horeca / gastronomie" },
            { value: "tech", label: "Tech / digital / AI" },
            { value: "finance", label: "Financieel / juridisch / fiscaal" },
            { value: "health", label: "Health / wellness / sport" },
            { value: "creatief", label: "Creatief / media / design" },
            { value: "retail", label: "Retail / e-commerce" },
            { value: "consultancy", label: "Consultancy / coaching" },
            { value: "nautisch", label: "Nautisch / charter / maritiem" },
            { value: "bouw", label: "Bouw / renovatie / interieur" },
          ]}
        />
      </div>

      <div className="q">
        <label className="q-label">
          Wat voor type mensen zoek je in je netwerk?
        </label>
        <textarea
          value={answers.q_netwerk_type}
          onChange={(e) => update("q_netwerk_type", e.target.value)}
          placeholder="Bijv. vastgoedinvesteerders, andere tech-ondernemers, lokale dienstverleners..."
        />
      </div>

      <div className="q">
        <label className="q-label">Wat kun jij brengen voor andere leden?</label>
        <span className="q-hint">
          Kennis, connecties, diensten, ervaring — alles telt.
        </span>
        <textarea
          value={answers.q_breng_waarde}
          onChange={(e) => update("q_breng_waarde", e.target.value)}
        />
      </div>
    </section>
  );
}

function EventsStep({
  answers,
  update,
  toggleMulti,
  setRank,
  isBestuur,
}: StepProps) {
  return (
    <section className="section">
      <div className="section-label">Blok 4</div>
      <div className="section-title">Events</div>
      <hr className="section-rule" />

      <div className="q">
        <label className="q-label">
          Wat is voor jou het minimale niveau van een NBCM-event?
        </label>
        <RadioGroup
          name="event_niveau"
          value={answers.event_niveau}
          onChange={(v) => update("event_niveau", v)}
          options={[
            { value: "basis", label: "Basis netwerkborrel — low key, informeel" },
            { value: "mid", label: "Goed georganiseerd met verzorgd eten & drinken" },
            { value: "high", label: "High-end ervaring — luxe locatie, beleving centraal" },
          ]}
        />
      </div>

      <div className="q">
        <label className="q-label">Rangschik deze vijf op belangrijkheid</label>
        <span className="q-hint">
          1 = belangrijkst, 5 = minst. Geef elk een uniek cijfer.
        </span>
        <RankGroup
          value={answers.event_rank}
          max={5}
          onChange={(item, val) => setRank("event_rank", item, val)}
          rows={[
            { item: "eten", label: "Kwaliteit eten & drinken" },
            { item: "locatie", label: "Locatie & uitstraling" },
            { item: "mensen", label: "Type mensen in de zaal" },
            { item: "organisatie", label: "Strakke organisatie / flow" },
            { item: "exclusiviteit", label: "Exclusiviteit / besloten karakter" },
          ]}
        />
      </div>

      <div className="q">
        <label className="q-label">
          Wat is voor jou een absolute no-go bij een event?
        </label>
        <textarea
          value={answers.q_event_nogo}
          onChange={(e) => update("q_event_nogo", e.target.value)}
          placeholder="Bijv. slechte flow, massaal, verkooppraatjes..."
        />
      </div>

      <div className="q">
        <label className="q-label">
          Welk type event spreekt je het meest aan? (meerdere mogelijk)
        </label>
        <CheckboxGroup
          value={answers.event_type}
          onToggle={(v) => toggleMulti("event_type", v)}
          options={[
            { value: "diner", label: "Besloten diner (8-16 personen)" },
            { value: "borrel", label: "Borrel / cocktail met vaste locatie" },
            { value: "spreker", label: "Event met gastspreker of panel" },
            { value: "activiteit", label: "Activiteit (boot, golf, wijn, etc.)" },
            { value: "mastermind", label: "Mastermind / peer-to-peer sessie" },
            { value: "partner_familie", label: "Partner- of gezinsvriendelijk event" },
          ]}
        />
      </div>

      {isBestuur && (
        <div className="board-only">
          <span className="board-tag">Bestuur</span>
          <div className="q">
            <label className="q-label">
              Wat verstaan we onder &quot;het minimale niveau&quot; — wat zijn
              de concrete niet-onderhandelbare eisen per event?
            </label>
            <span className="q-hint">
              Vincent: dit is nu zwak gedefinieerd. Maak het concreet.
            </span>
            <textarea
              value={answers.q_event_definitie}
              onChange={(e) => update("q_event_definitie", e.target.value)}
              placeholder="Bijv. minimaal X kwaliteit locatie, altijd verzorgd eten, altijd bevestigde gastenlijst vooraf..."
            />
          </div>
        </div>
      )}
    </section>
  );
}

function MembershipStep({
  answers,
  update,
  toggleMulti,
  isBestuur,
}: Pick<StepProps, "answers" | "update" | "toggleMulti" | "isBestuur">) {
  return (
    <section className="section">
      <div className="section-label">Blok 5</div>
      <div className="section-title">Lidmaatschap</div>
      <hr className="section-rule" />

      <div className="q">
        <label className="q-label">
          Wat is de prijs van lidmaatschap die volgens jou past bij NBCM?
        </label>
        <RadioGroup
          name="prijs"
          value={answers.prijs}
          onChange={(v) => update("prijs", v)}
          options={[
            { value: "500", label: "€ 500 per jaar" },
            { value: "1000", label: "€ 1.000 per jaar" },
            { value: "2500", label: "€ 2.500 per jaar" },
            { value: "5000", label: "€ 5.000+ per jaar" },
          ]}
        />
      </div>

      <div className="q">
        <label className="q-label">
          Wat is volgens jou de #1 reden waarom iemand lid wordt?
        </label>
        <RadioGroup
          name="reden_lid"
          value={answers.reden_lid}
          onChange={(v) => update("reden_lid", v)}
          options={[
            { value: "netwerk", label: "Netwerk" },
            { value: "deals", label: "Deals / business" },
            { value: "inspiratie", label: "Inspiratie / groei" },
            { value: "exclusief", label: "Toegang tot exclusieve events / locaties" },
            { value: "community", label: "Community / erbij horen" },
          ]}
        />
      </div>

      <div className="q">
        <label className="q-label">
          Wat verwacht je concreet van een lid per jaar? (meerdere mogelijk)
        </label>
        <CheckboxGroup
          value={answers.verwachting_lid}
          onToggle={(v) => toggleMulti("verwachting_lid", v)}
          options={[
            { value: "events_aanwezig", label: "Aanwezig bij minimaal 3 events per jaar" },
            { value: "introducties", label: "Introduceert minimaal 1 nieuw relevant contact" },
            { value: "bijdrage", label: "Draagt actief bij aan minimaal 1 event of initiatief" },
            { value: "geen_verplichting", label: "Geen harde verwachting — lidmaatschap = toegang, niet verplichting" },
          ]}
        />
      </div>

      {isBestuur && (
        <div className="board-only">
          <span className="board-tag">Bestuur</span>
          <div className="q">
            <label className="q-label">
              Als een lid na 6 maanden niet tevreden is — wat is er dan
              misgegaan?
            </label>
            <textarea
              value={answers.q_lid_misgegaan}
              onChange={(e) => update("q_lid_misgegaan", e.target.value)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function SponsorsStep({
  answers,
  update,
  setRank,
  isBestuur,
}: Pick<StepProps, "answers" | "update" | "setRank" | "isBestuur">) {
  return (
    <section className="section">
      <div className="section-label">Blok 6</div>
      <div className="section-title">Partners &amp; Sponsors</div>
      <hr className="section-rule" />
      <div className="section-desc">
        Wat mogen leden en partners van sponsoring verwachten?
      </div>

      <div className="q">
        <label className="q-label">
          Ben je geïnteresseerd in sponsoring of partnership met NBCM?
        </label>
        <RadioGroup
          name="sponsor_interesse"
          value={answers.sponsor_interesse}
          onChange={(v) => update("sponsor_interesse", v)}
          options={[
            { value: "ja", label: "Ja, ik wil de mogelijkheden weten" },
            { value: "misschien", label: "Misschien later, nog niet nu" },
            { value: "nee", label: "Nee, niet relevant voor mij" },
          ]}
        />
      </div>

      {isBestuur && (
        <div className="board-only">
          <span className="board-tag">Bestuur</span>
          <div className="q">
            <label className="q-label">
              Wat moet een sponsor minimaal terugkrijgen?
            </label>
            <span className="q-hint">Rangschik 1 t/m 4 (1 = belangrijkst)</span>
            <RankGroup
              value={answers.sponsor_rank}
              max={4}
              onChange={(item, val) => setRank("sponsor_rank", item, val)}
              rows={[
                { item: "zichtbaarheid", label: "Zichtbaarheid / branding" },
                { item: "toegang", label: "Directe toegang tot leden" },
                { item: "podium", label: "Spreekmoment / podium" },
                { item: "leads", label: "Leads / concrete business kansen" },
              ]}
            />
          </div>

          <div className="q">
            <label className="q-label">
              Hoe belangrijk is exclusiviteit per categorie? (bv. één
              vastgoedpartner, één bank)
            </label>
            <RadioGroup
              name="excl_cat"
              value={answers.excl_cat}
              onChange={(v) => update("excl_cat", v)}
              options={[
                { value: "niet", label: "Niet belangrijk" },
                { value: "enigszins", label: "Enigszins belangrijk" },
                { value: "zeer", label: "Zeer belangrijk — anders devalueert het partnership" },
              ]}
            />
          </div>

          <div className="q">
            <label className="q-label">
              Wat is de verwachting richting sponsors qua commitment en
              bijdrage?
            </label>
            <span className="q-hint">
              Vincent: sponsorship verwachtingen moeten helder worden.
            </span>
            <textarea
              value={answers.q_sponsor_verwachting}
              onChange={(e) =>
                update("q_sponsor_verwachting", e.target.value)
              }
              placeholder="Financieel, in-kind, frequentie, exclusiviteit..."
            />
          </div>
        </div>
      )}
    </section>
  );
}

function FinalStep({
  answers,
  update,
  toggleMulti,
  isBestuur,
}: Pick<StepProps, "answers" | "update" | "toggleMulti" | "isBestuur">) {
  if (!isBestuur) {
    return (
      <section className="section">
        <div className="section-label">Blok 7</div>
        <div className="section-title">Praktisch</div>
        <hr className="section-rule" />

        <div className="q">
          <label className="q-label">Hoe ben je bij NBCM terechtgekomen?</label>
          <RadioGroup
            name="bron"
            value={answers.bron}
            onChange={(v) => update("bron", v)}
            options={[
              { value: "lid", label: "Via een bestaand lid" },
              { value: "event", label: "Via een event" },
              { value: "social", label: "Social media / online" },
              { value: "anders", label: "Anders" },
            ]}
          />
        </div>

        <div className="q">
          <label className="q-label">
            Als een bestaand lid je heeft doorverwezen, wie?
          </label>
          <input
            type="text"
            value={answers.q_referral}
            onChange={(e) => update("q_referral", e.target.value)}
            placeholder="Naam (optioneel)"
          />
        </div>

        <div className="q">
          <label className="q-label">Wil je verder nog iets kwijt?</label>
          <textarea
            value={answers.q_lid_open}
            onChange={(e) => update("q_lid_open", e.target.value)}
            placeholder="Vragen, verwachtingen, ideeën..."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section-label">Blok 7</div>
      <div className="section-title">Rolverdeling &amp; Richting</div>
      <hr className="section-rule" />

      <div className="q">
        <label className="q-label">
          Waar wil jij eigenaar van zijn binnen het bestuur?
        </label>
        <span className="q-hint">Kies maximaal 2</span>
        <CheckboxGroup
          value={answers.eigenaar}
          onToggle={(v) => toggleMulti("eigenaar", v, 2)}
          options={[
            { value: "netwerk", label: "Netwerk & ledenwerving" },
            { value: "deals", label: "Business / deals faciliteren tussen leden" },
            { value: "events", label: "Event-organisatie & operations" },
            { value: "marketing", label: "Marketing, content & zichtbaarheid" },
            { value: "strategie", label: "Strategie & partnerships" },
            { value: "financien", label: "Financiën & governance" },
          ]}
        />
      </div>

      <div className="q">
        <label className="q-label">Waar wil je juist niet over gaan?</label>
        <textarea
          value={answers.q_niet_eigenaar}
          onChange={(e) => update("q_niet_eigenaar", e.target.value)}
          placeholder="Omdat het niet je kracht of energie is..."
        />
      </div>

      <hr className="divider" />

      <div className="q">
        <label className="q-label">
          Wat is op dit moment het grootste knelpunt in hoe NBCM nu loopt?
        </label>
        <textarea
          value={answers.q_knelpunt}
          onChange={(e) => update("q_knelpunt", e.target.value)}
        />
      </div>

      <div className="q">
        <label className="q-label">Welke kans laten we nu liggen?</label>
        <textarea
          value={answers.q_kans}
          onChange={(e) => update("q_kans", e.target.value)}
        />
      </div>

      <div className="q">
        <label className="q-label">
          Als je één ding zou mogen veranderen aan NBCM vanaf morgen — wat is
          het?
        </label>
        <textarea
          value={answers.q_een_ding}
          onChange={(e) => update("q_een_ding", e.target.value)}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable controls                                                   */
/* ------------------------------------------------------------------ */

type Option = { value: string; label: string };

function RadioGroup({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string | null;
  onChange: (v: string) => void;
  options: Option[];
}) {
  return (
    <div className="options">
      {options.map((o) => (
        <label
          key={o.value}
          className={`opt${value === o.value ? " checked" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({
  value,
  onToggle,
  options,
}: {
  value: string[];
  onToggle: (v: string) => void;
  options: Option[];
}) {
  return (
    <div className="options">
      {options.map((o) => {
        const checked = value.includes(o.value);
        return (
          <label
            key={o.value}
            className={`opt${checked ? " checked" : ""}`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(o.value)}
            />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

function RankGroup({
  value,
  onChange,
  rows,
  max,
}: {
  value: RankValue;
  onChange: (item: string, v: string) => void;
  rows: { item: string; label: string }[];
  max: number;
}) {
  const sortedRows = useMemo(() => rows, [rows]);
  return (
    <div>
      {sortedRows.map((row) => (
        <div key={row.item} className="rank-row">
          <input
            type="number"
            min={1}
            max={max}
            value={value[row.item] ?? ""}
            onChange={(e) => onChange(row.item, e.target.value)}
          />
          <span>{row.label}</span>
        </div>
      ))}
    </div>
  );
}
