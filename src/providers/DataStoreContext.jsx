import { createContext, useContext, useState } from "react";

const DataStoreContext = createContext({});

export const useDataStore = () => useContext(DataStoreContext);

function DataStoreProvider({ children }) {
  const [data, setData] = useState({});

  const getDataByUrl = (url) => data[url];

  const setNewData = (url, newData) => {
    setData((prevData) => ({ ...prevData, [url]: newData }));
  };

  return (
    <DataStoreContext.Provider value={{ getDataByUrl, setNewData }}>
      {children}
    </DataStoreContext.Provider>
  );
}

export default DataStoreProvider;
