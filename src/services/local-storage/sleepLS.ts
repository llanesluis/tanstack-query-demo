export default async function sleepLocalStorage(LSKey: string) {
  if (!LSKey) return;

  const delay = JSON.parse(localStorage.getItem(LSKey) ?? "0");
  const parsedDelay = Number(delay) || 0;

  return new Promise((res) => setTimeout(res, parsedDelay));
}

export const DELAY_KEY_LS = "delay";
