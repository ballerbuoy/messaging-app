import { useCallback, useEffect, useState } from "react";

export const useFetch = (url = "", options = {}, immediate = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const executeFetch = useCallback(async () => {
    setLoading(true);
    await fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
        return data;
      })
      .catch((error) => {
        setError(error);
        setData(null);
        return error;
      })
      .finally(() => setLoading(false));
  }, [url, options]);

  useEffect(() => {
    if (immediate) {
      executeFetch();
    }
  }, [immediate, executeFetch]);

  return { data, error, loading, executeFetch };
};
