import { useSyncExternalStore } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const cache = new Map<string, FetchState<unknown>>();
const subscribers = new Map<string, Set<() => void>>();

function notify(url: string) {
  const subs = subscribers.get(url);
  if (subs) for (const l of subs) l();
}

function fetchData<T>(url: string) {
  if (cache.has(url)) return;
  cache.set(url, { data: null, loading: true, error: null });
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    })
    .then((data) => {
      cache.set(url, { data: data as T, loading: false, error: null });
      notify(url);
    })
    .catch((err) => {
      cache.set(url, { data: null, loading: false, error: err.message });
      notify(url);
    });
}

const serverSnapshot: FetchState<never> = { data: null, loading: true, error: null };

export function useFetch<T>(url: string): FetchState<T> {
  // Trigger fetch on first access
  fetchData<T>(url);

  const subscribe = (listener: () => void) => {
    if (!subscribers.has(url)) subscribers.set(url, new Set());
    subscribers.get(url)!.add(listener);
    return () => { subscribers.get(url)?.delete(listener); };
  };

  const getSnapshot = () => (cache.get(url) as FetchState<T>) ?? { data: null, loading: true, error: null };
  const getServerSnapshot = () => serverSnapshot as FetchState<T>;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
