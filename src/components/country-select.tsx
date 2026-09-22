"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { filterCountries, getCountryName, type CountryOption } from "@/lib/countries";
import { cn } from "@/lib/utils";

export function CountrySelect({
  id,
  countryName,
  countryCode,
  onChange,
  required = false,
  disabled = false,
  error,
}: {
  id: string;
  countryName: string;
  countryCode: string;
  onChange: (country: CountryOption | null) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const options = useMemo(() => filterCountries(query), [query]);
  const selectedLabel = countryCode ? getCountryName(countryCode) || countryName : "";
  const displayValue = open ? query : selectedLabel;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const active = options[activeIndex];
    if (!active || !listRef.current) return;
    const item = document.getElementById(`${listId}-${active.code}`);
    item?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId, open, options]);

  function closeList() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  function selectCountry(country: CountryOption) {
    onChange(country);
    closeList();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeList();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.min(current + 1, Math.max(options.length - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(Math.max(options.length - 1, 0));
      return;
    }
    if (event.key === "Enter" && open) {
      event.preventDefault();
      const next = options[activeIndex];
      if (next) selectCountry(next);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <Input
          id={id}
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-haspopup="listbox"
          aria-activedescendant={
            open && options[activeIndex] ? `${listId}-${options[activeIndex].code}` : undefined
          }
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${errorId} ${helpId}` : helpId}
          aria-required={required}
          disabled={disabled}
          className="h-11 min-h-11 pr-10 text-base md:text-sm"
          value={displayValue}
          placeholder="Search for a country"
          onFocus={() => {
            if (disabled) return;
            setOpen(true);
            setQuery(selectedLabel);
            setActiveIndex(0);
          }}
          onChange={(event) => {
            const next = event.target.value;
            setQuery(next);
            setOpen(true);
            setActiveIndex(0);
            if (!next.trim()) onChange(null);
          }}
          onKeyDown={onKeyDown}
        />
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate"
          aria-hidden="true"
        />
      </div>
      <p id={helpId} className="sr-only">
        Type to filter countries, then use the arrow keys and Enter to select. Escape
        closes the list.
      </p>
      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-line bg-white py-1 shadow-lg"
        >
          {options.length === 0 ? (
            <li className="px-3 py-2 text-sm text-slate" role="status" aria-live="polite">
              No countries found
            </li>
          ) : (
            options.map((country, index) => (
              <li
                key={country.code}
                id={`${listId}-${country.code}`}
                role="option"
                aria-selected={country.code === countryCode}
                className={cn(
                  "cursor-pointer px-3 py-2.5 text-sm md:py-2",
                  index === activeIndex && "bg-canvas text-navy",
                  country.code === countryCode && "font-semibold",
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  selectCountry(country);
                }}
              >
                {country.name}
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
