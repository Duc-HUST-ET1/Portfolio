export function byOrderThenId<T extends { id: string; order?: number }>(a: T, b: T) {
  return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id);
}
