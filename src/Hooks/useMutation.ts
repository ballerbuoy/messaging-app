import { useState } from "react";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

type useMutationParams = {
  url: string;
  method: string;
};

export function useMutation<T>(params: useMutationParams) {
  const { url, method } = params;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const executeFetch = async (payload: Object | undefined = undefined) => {
    const options = { method };
    if (payload) {
      Object.assign(options, {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (error !== null) {
      setError(null);
    }
    try {
      let serverFailure = false;
      setLoading(true);
      const response = await fetch(BASE_URL + url, options);
      if (!response.ok) {
        serverFailure = true;
      }
      const dataJSON = await response.json();
      const dataObj = JSON.parse(dataJSON);
      if (!serverFailure) {
        setData(dataObj);
      } else {
        throw new Error(dataObj.error);
      }
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, executeFetch };
}
