import { useState } from "react";

interface State<D> {
  stat: "idle" | "loading" | "error" | "success";
  data: null | D;
  error: Error | null;
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = { throwOnError: false };

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      stat: "success",
      data,
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      stat: "error",
      data: null,
      error,
    });

  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("Argument must be a promise");
    }
    setState({ ...state, stat: "loading" });
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    return promise.then(setData).catch((error) => {
      setError(error);
      if (config.throwOnError) return Promise.reject(error);
    });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
