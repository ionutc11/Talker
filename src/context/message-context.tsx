import React, {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { IMessage } from "../interfaces";

interface IMessagesDetails {
  [key: string]: IMessage[];
}

interface IMessagesUpdate {
  username: string;
  messages: IMessage[];
}

type MessagesContextType = IMessagesDetails | undefined;
type MessagesDispatchContextType =
  | Dispatch<SetStateAction<IMessagesUpdate>>
  | undefined;

const MessagesContext = createContext<MessagesContextType>(undefined);
const MessagesDispatchContext =
  createContext<MessagesDispatchContextType>(undefined);

function MessagesProvider({ children }: { children: ReactNode }) {
  const [messagesWithContacts, setMessages] = useState<IMessagesDetails>({});

  const updateMessages: MessagesDispatchContextType = (data) => {
    console.log("update messages", data);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { username, messages } = data;
    let localMessages = messagesWithContacts;
    console.log(localMessages[username], { localMessages, messages });
    if (localMessages[username]) {
      console.log("in if, ca e username", username);
      localMessages[username] = messages;
    } else {
      localMessages = { ...localMessages, [username]: messages };
      console.log("in else, after set", localMessages);
    }
    setMessages({ ...localMessages });
  };

  console.log(messagesWithContacts);

  return (
    <MessagesContext.Provider value={messagesWithContacts}>
      <MessagesDispatchContext.Provider value={updateMessages}>
        {children}
      </MessagesDispatchContext.Provider>
    </MessagesContext.Provider>
  );
}

export { MessagesProvider, MessagesContext, MessagesDispatchContext };
