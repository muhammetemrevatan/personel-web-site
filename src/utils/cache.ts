const cache: { [key: string]: { data: unknown; timestamp: number } } = {};

export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 60 * 60 * 1000
): Promise<T> {
  const now = Date.now();
  const cached = cache[key];

  if (cached && now - cached.timestamp < ttl) {
    return cached.data as T;
  }

  const data = await fetchFn();
  cache[key] = { data, timestamp: now };
  return data;
}
