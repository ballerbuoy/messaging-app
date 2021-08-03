import { useEffect, useState } from "react";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

type useQueryParams = {
  url: string;
  method: string;
  payload?: Object;
  skip?: boolean;
};

export const useFetch = <T>(params: useQueryParams) => {
  const { url, method, payload } = params;
  const skip = params.skip || false;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const options = { method };
    if (payload) {
      Object.assign(options, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!skip) {
      let serverFailure = false;
      setLoading(true);
      fetch(BASE_URL + url, options)
        .then((res) => {
          if (!res.ok) {
            serverFailure = true;
          }
          return res.json();
        })
        .then((data) => {
          if (!serverFailure) {
            setData(JSON.parse(data));
          } else {
            throw new Error(data.error);
          }
        })
        .catch((error) => {
          setError(error);
          setData(null);
        })
        .finally(() => setLoading(false));
    }
  }, [url, skip, method, payload]);

  return { data, error, loading };
};
