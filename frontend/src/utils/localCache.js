const inFlightRequests = new Map();

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readCache = (key) => {
  if (!canUseStorage()) return null;

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.data ?? null;
  } catch (error) {
    localStorage.removeItem(key);
    return null;
  }
};

const writeCache = (key, data, ttlMs) => {
  if (!canUseStorage()) return;

  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        expiresAt: Date.now() + ttlMs,
      })
    );
  } catch (error) {
    // Ignore storage quota and serialization failures.
  }
};

export const getCachedData = async ({ key, fetcher, ttlMs = 5 * 60 * 1000 }) => {
  const cached = readCache(key);
  if (cached !== null) {
    return cached;
  }

  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }

  const request = (async () => {
    const data = await fetcher();
    writeCache(key, data, ttlMs);
    return data;
  })();

  inFlightRequests.set(key, request);

  try {
    return await request;
  } finally {
    inFlightRequests.delete(key);
  }
};

