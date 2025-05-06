export function objectToUrlParams(obj: Record<string, any>) {
  const params = new URLSearchParams();

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'boolean') {
      params.append(key, value.toString());
    } else {
      params.append(key, value);
    }
  }
  return params.toString();
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}
