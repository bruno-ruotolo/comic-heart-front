import { createContext, useState } from "react";

export const UserContext = createContext([]);

export default function UserProvider({ children }) {
  const [userInfos, setUserInfos] = useState(LocalStorage);

  function LocalStorage() {
    const userTokenStorage = localStorage.getItem("token");
    const userNameStorage = localStorage.getItem("name");
    if (userTokenStorage && userNameStorage) {
      return ({ token: userTokenStorage, name: userNameStorage });
    } else return ({ token: "", name: "" });
  }

  return (
    <UserContext.Provider value={{ userInfos, setUserInfos }}>
      {children}
    </UserContext.Provider>
  )
}