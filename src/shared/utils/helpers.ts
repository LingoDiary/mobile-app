
export function assets(path: string) : string {
  return `/assets/${path}`;
}

export function img(path: string) : string {
  return assets(`images/${path}`);
}

export function timezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone(),
  });
}
