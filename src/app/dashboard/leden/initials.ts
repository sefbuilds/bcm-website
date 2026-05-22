export function autoInitials(
  voornaam: string,
  achternaam: string,
): string {
  const v = (voornaam || "").trim();
  const a = (achternaam || "").trim();
  const strip = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (!v && !a) return "";
  const firstLetter = v ? strip(v)[0] : "";
  const achterWords = a
    ? strip(a).split(/\s+/).filter(Boolean)
    : [];
  const lastLetter = achterWords.length
    ? achterWords[achterWords.length - 1][0]
    : "";
  return `${firstLetter}${lastLetter}`.toUpperCase() || strip(v).slice(0, 2).toUpperCase();
}
