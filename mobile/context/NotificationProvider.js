import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();
export const useNotificationContext = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [senderId, setSenderId] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  return (
    <NotificationContext.Provider value={{
      senderId,
      setSenderId,
      title,
      setTitle,
      content,
      setContent
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;