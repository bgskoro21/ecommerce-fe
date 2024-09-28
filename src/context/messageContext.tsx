// components/MessageProvider.tsx
"use client";

import React, { useState, ReactNode, createContext, useContext } from "react";

interface MessageData {
  success: boolean;
  message: string;
}

interface MessageContextType {
  data: MessageData;
  setData: (data: MessageData) => void;
  clearMessage: () => void;
}

interface MessageProviderProps {
  children: ReactNode;
}

const MessageContext = createContext<MessageContextType>({
  data: {
    success: true,
    message: "",
  },
  setData: () => {},
  clearMessage: () => {},
});

// Provider komponen
const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [data, setData] = useState<MessageData>({
    success: true,
    message: "",
  });

  const clearMessage = () =>
    setData({
      success: true,
      message: "",
    });

  return <MessageContext.Provider value={{ data, setData, clearMessage }}>{children}</MessageContext.Provider>;
};

export const useMessage = () => useContext(MessageContext);

export default MessageProvider;
