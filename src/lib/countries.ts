import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export type CountryOption = {
  code: string;
  name: string;
};

const NAME_OPTIONS = { select: "alias" } as const;

let cachedCountries: CountryOption[] | null = null;

export function getCountries(): CountryOption[] {
  if (cachedCountries) return cachedCountries;
  cachedCountries = Object.entries(countries.getNames("en", NAME_OPTIONS))
    .map(([code, name]) => ({ code, name }))
    .sort((left, right) => left.name.localeCompare(right.name, "en"));
  return cachedCountries;
}

export function getCountryName(code: string) {
  if (!code) return "";
  return countries.getName(code.toUpperCase(), "en", NAME_OPTIONS) ?? "";
}

export function isCountryCode(code: string) {
  return Boolean(code) && countries.isValid(code);
}

export function filterCountries(query: string) {
  const needle = query.trim().toLowerCase();
  const list = getCountries();
  if (!needle) return list;
  return list.filter(
    (country) =>
      country.name.toLowerCase().includes(needle) ||
      country.code.toLowerCase() === needle,
  );
}
