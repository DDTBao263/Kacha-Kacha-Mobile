import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   getCurrentUser()
  //     .then((res) => {
  //       if (res) {
  //         setUser(res);
  //       } else {
  //         setUser(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }, []);

  const addNotification = (message) => {
    if (!message) {
      setNotifications([]);
    } else {
      setNotifications((prevNoti) => {
        const exists = prevNoti.some(
          (noti) => noti.messageId === message.messageId
        );
        return exists ? prevNoti : [...prevNoti, message];
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        notifications,
        token,
        setToken,
        addNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
