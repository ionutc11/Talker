import React, {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { IUser } from "../interfaces";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IUserDetails {
  username: string;
  selectedContact: IUser | null;
}

interface IUserProvider {
  children: ReactNode;
}

type UserDetailsContextType = IUserDetails | undefined;
type UserDetailsDispatchContextType =
  | Dispatch<SetStateAction<Partial<IUserDetails>>>
  | undefined;

const UserDetailsContext = createContext<UserDetailsContextType>(undefined);
const UserDetailsDispatchContext =
  createContext<UserDetailsDispatchContextType>(undefined);

function UserProvider({ children }: IUserProvider) {
  const [getValue, setValue] = useLocalStorage();
  const userFromLocalStorage = getValue("user", {
    username: "",
    selectedContact: null,
  });
  const [userDetails, setUserDetails] =
    useState<IUserDetails>(userFromLocalStorage);

  const updateUserDetails: UserDetailsDispatchContextType = (details) => {
    setUserDetails((prevState) => ({ ...prevState, ...details }));
  };

  useEffect(() => {
    const userStoredInLocalStorage = getValue("user", {
      username: "",
      selectedContact: null,
    });

    if (
      JSON.stringify(userStoredInLocalStorage) !== JSON.stringify(userDetails)
    ) {
      setValue("user", userDetails);
    }
  }, [userDetails]);

  return (
    <UserDetailsContext.Provider value={userDetails}>
      <UserDetailsDispatchContext.Provider value={updateUserDetails}>
        {children}
      </UserDetailsDispatchContext.Provider>
    </UserDetailsContext.Provider>
  );
}

export { UserProvider, UserDetailsContext, UserDetailsDispatchContext };
