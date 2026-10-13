 import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const primary = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
    const fallback = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`;

    fetch(primary)
      .then((res) => {
        if (!res.ok) throw new Error("primary failed");
        return res.json();
      })
      .catch(() => fetch(fallback).then((res) => res.json()))
      .then((res) => setData(res[currency] || {}))
      .catch(() => setData({}));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;