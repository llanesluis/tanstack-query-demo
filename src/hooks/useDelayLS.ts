import { useEffect, useState } from "react";
import { DELAY_KEY_LS } from "../services/local-storage/sleepLS";

export default function useDelayLS() {
  const initialDelay = Number(
    JSON.parse(localStorage.getItem(DELAY_KEY_LS) || "0"),
  );

  const [delay, setDelay] = useState(initialDelay);

  useEffect(() => {
    localStorage.setItem(DELAY_KEY_LS, JSON.stringify(delay));

    return () => {
      localStorage.removeItem(DELAY_KEY_LS);
    };
  }, [delay]);

  return { delay, setDelay };
}
