import React, { createContext, useContext, useEffect, useState } from "react";

// import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]); 

  // 🔥 Hàm thêm thông báo mới vào danh sách
  const addNotification = (message) => {
    if(message === "") {
      setNotifications([]);
    }else{
      setNotifications((prevNoti) => {
        const exists = prevNoti.some((noti) => noti.messageId === message.messageId);
        if (!exists) {
          return [...prevNoti, message];
        }
        return prevNoti;
      });
    }
    
  };

  // useEffect(() => {
  //   getCurrentUser()
  //     .then((res) => {
  //       if (res) {
  //         setIsLogged(true);
  //         setUser(res);
  //       } else {
  //         setIsLogged(false);
  //         setUser(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <GlobalContext.Provider
      value={{
        // isLogged,
        // setIsLogged,
        // user,
        // setUser,
        // loading,
        notifications, // 🔥 Danh sách thông báo
        addNotification, // 🔥 Hàm thêm thông báo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
