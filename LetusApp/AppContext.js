import React, { createContext, useEffect, useState } from 'react';
import { LetusApiClient } from './LetusApiClient';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(true);
  const [posts, setPosts] = useState([]);
  const [ignorePost, setIgnorePost] = useState({ poster: { properties: {} } });

  useEffect(() => {
    if (user) {
      LetusApiClient.getPosts(user).then((records) => {
        setPosts(records);
      });
    }
  }, [user]);
  return (
    <AppContext.Provider
      value={{
        loaded,
        setLoaded,
        user,
        setUser,
        posts,
        ignorePost,
        setIgnorePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
