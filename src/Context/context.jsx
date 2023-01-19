import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../../firebase/config";
export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <DataContext.Provider value={{ user, setPosts, posts }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
