import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo, // Ajout de useMemo
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]); // Ajout de dépendance pour éviter des appels infinis

  // Utilisation de useMemo pour éviter de recréer l'objet à chaque rendu
  const contextValue = useMemo(() => ({
    data,
    error,
  }), [data, error]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
