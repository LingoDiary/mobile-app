
export function assets(path: string) : string {
  return `/assets/${path}`;
}

export function img(path: string) : string {
  return assets(`images/${path}`);
}

