import React, { createContext, useEffect, useState } from 'react';
import { LetusApiClient } from './LetusApiClient';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(true);
  const [posts, setPosts] = useState([]);
  const [ignorePost, setIgnorePost] = useState({ poster: { properties: {} } });
  const [client, setClient] = useState();

  useEffect(() => {
    if (user) {
      // create instance of client bound to this user
      const apiClient = new LetusApiClient(user);
      setClient(apiClient);
      apiClient.editUser(user).then((res) => {
        console.log('editUser res', res);
      });
      apiClient.getPosts(user).then((records) => {
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
        client,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
