import { useEffect, useState } from "react";
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

    setState((prevState) => ({ ...prevState, isLoading: true }));

    ajaxClient
      .get({ url })
      .then(async (res) => {
        const resDataJSON = await res.json();
        const resData = await JSON.parse(resDataJSON);
        if (!res.ok) {
          throw new Error(resData.error);
        }

        setState((prevState) => ({
          ...prevState,
          error: undefined,
          data: resData,
          isLoading: false,
        }));
      })
      .catch((err) => {
        setState((prevState) => ({
          ...prevState,
          data: undefined,
          isLoading: false,
          error: err.message,
        }));
      });
  }, [url, skip, state.intervalState]);

  return { data: state.data, error: state.error, isLoading: state.isLoading };
};
