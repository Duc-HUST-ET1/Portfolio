export function isSafeExternalHref(href: string) {
  try {
    const url = new URL(href);
    return url.protocol === 'https:' || url.protocol === 'http:' || (url.protocol === 'mailto:' && Boolean(url.pathname.trim()));
  } catch {
    return false;
  }
}
