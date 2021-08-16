import { useEffect, useState, useCallback } from "react";
import { ajaxClient } from "../ajaxClient/ajaxClient";

type useQueryParams = {
  url: string;
  skip?: boolean;
  interval?: number;
};

type useQueryState<Type> = {
  data: Type | undefined;
  error: string | undefined;
  isLoading: boolean;
  intervalState: number;
};

export const useQuery = <T>(params: useQueryParams) => {
  const { url, interval } = params;
  const skip = params.skip || false;

  const [state, setState] = useState<useQueryState<T>>({
    data: undefined,
    error: undefined,
    isLoading: false,
    intervalState: 0,
  });

  const executeFetch = useCallback(async () => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const res = await ajaxClient.get({ url });
      const resDataJSON = await res.json();
      const resData = JSON.parse(resDataJSON);
      if (!res.ok) {
        throw new Error(resData.error);
      }

      setState((prevState) => ({
        ...prevState,
        error: undefined,
        data: resData,
        isLoading: false,
      }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        data: undefined,
        isLoading: false,
        error: err.message,
      }));
    }
  }, [url]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (interval) {
      timerId = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          intervalState: prevState.intervalState + 1,
        }));
      }, interval);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  });

  useEffect(() => {
    if (skip) {
      return;
    }

    executeFetch();
  }, [url, skip, state.intervalState, executeFetch]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    executeFetch,
  };
};
