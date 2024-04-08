"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

const ChatSwitchContext = createContext<any>({ val1: undefined, val2: {} });

export const useChatSwitchContext = () => {
  const context = useContext(ChatSwitchContext);
  if (context === undefined) {
    throw new Error("useChatSwitchContext must be used within a ChatSwitchProvider");
  }
  return context;
};

const ChatSwitchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [store, action] = useState("");
  
  return (
    <>
      <ChatSwitchContext.Provider value={{ store, action }}>
        {children}
      </ChatSwitchContext.Provider>
    </>
  );
};

export default ChatSwitchProvider;
