import { useState, useCallback } from "react";

import { STATUS } from "../constants";

type mutationFuncType = (...args: any[]) => Promise<Response>;

export function useMutation<T>(mutationFunc: mutationFuncType) {
  const [status, setStatus] = useState<
    | typeof STATUS.IDLE
    | typeof STATUS.LOADING
    | typeof STATUS.ERROR
    | typeof STATUS.SUCCESS
  >("idle");
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const mutate = useCallback(
    async (arg: any, mutationOptions = {}) => {
      try {
        setStatus(STATUS.LOADING);

        const response = await mutationFunc(arg);
        const resDataJSON = await response.json();
        const resData = JSON.parse(resDataJSON);

        if (!response.ok) {
          setStatus(STATUS.ERROR);
          throw new Error(resData.error);
        }

        setStatus(STATUS.SUCCESS);
        setData(resData);
        mutationOptions?.onSuccess?.();
      } catch (error) {
        setStatus(STATUS.ERROR);
        setError(error.message);
        mutationOptions?.onError?.();
      }
    },
    [mutationFunc]
  );

  return { data, error, status, mutate };
}
