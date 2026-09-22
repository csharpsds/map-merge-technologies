export function subscribeMediaQuery(query: string) {
  return (onStoreChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onStoreChange);
    return () => media.removeEventListener("change", onStoreChange);
  };
}

export function getMediaQuerySnapshot(query: string) {
  return window.matchMedia(query).matches;
}
