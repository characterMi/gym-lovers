import { useCallback, useEffect } from "react";
import { useSearchParams as useSearchParamsRRD } from "react-router-dom";

export const useSearchParams = (name, subscribe) => {
  const [searchParams, setSearchParams] = useSearchParamsRRD();
  const param = searchParams.get(name);

  useEffect(() => {
    subscribe?.(param);
  }, [param]);

  const handleChangeSearchParam = useCallback(
    (value) => {
      const newParams = new URLSearchParams(searchParams);

      newParams.set(name, value);

      setSearchParams(newParams);
    },
    [searchParams]
  );

  return { param, handleChangeSearchParam };
};
