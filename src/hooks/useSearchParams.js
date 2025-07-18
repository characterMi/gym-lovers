import { useSearchParams as useSearchParamsRRD } from "react-router-dom";

export const useSearchParams = (name) => {
  const [searchParams, setSearchParams] = useSearchParamsRRD();
  const param = searchParams.get(name);

  const handleChangeSearchParam = (value) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(name, value);

    setSearchParams(newParams);
  };

  return { param, handleChangeSearchParam };
};
