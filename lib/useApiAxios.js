import { Alert } from "react-native";
import { useEffect, useState } from "react";
const useApiAxios = (fn) => {
  const [data, setData] = useState(null); // Default to null for better error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); 
    try {
      const res = await fn();
      setData(res.data);
    } catch (error) {
      setError(error.message);
      // Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
};

export default useApiAxios;
