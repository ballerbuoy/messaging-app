import { useState, useCallback } from "react";

type mutationFuncType = (...args: any[]) => Promise<Response>;

export function useMutation<T>(mutationFunc: mutationFuncType) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const mutate = useCallback(
    async (arg: any, mutationOptions: Object = {}) => {
      try {
        setStatus("loading");

        const response = await mutationFunc(arg);
        const resDataJSON = await response.json();
        const resData = JSON.parse(resDataJSON);
        console.log(resData);

        if (!response.ok) {
          setStatus("error");
          throw new Error(resData.error);
        }

        setStatus("success");
        setData(resData);
      } catch (error) {
        setStatus("error");
        setError(error.message);
      }
    },
    [mutationFunc]
  );

  return { data, error, status, mutate };
}
