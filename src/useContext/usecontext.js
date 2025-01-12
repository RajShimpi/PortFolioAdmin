import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState("Initial Data");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateData = (newData) => setData(newData);

  return (
    <DataContext.Provider
      value={{ data, updateData, isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataProvider = () => {
  return useContext(DataContext);
};
