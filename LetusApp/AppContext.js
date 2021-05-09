import React, { createContext, useEffect, useState } from 'react';
import { LetusApiClient } from './LetusApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({});
const USER_ID_KEY_STORAGE = 'letus.app.user.token';
export const USER_ID_KEY = 'idToken';

// context.setUser({ ...jsonInfo, token: idToken });

export const AppContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [ignorePost, setIgnorePost] = useState({ poster: { properties: {} } });
  const [client, setClient] = useState();
  const [userKey, setUserKey] = useState();
  const [bigError, setBigError] = useState(false);

  // When the app is first loaded...
  useEffect(() => {
    // attempt to fetch the cached user token if they were previously signed in
    (async () => {
      try {
        const key = await AsyncStorage.getItem(USER_ID_KEY_STORAGE);
        if (key !== null) {
          setUserKey(key);
        }
        setLoaded(true);
      } catch (e) {
        console.log('error initializing from storage', e);
        // error reading value
        setBigError(e);
      }
    })();
  }, []);

  // Whenever the user key changes...
  useEffect(() => {
    if (userKey) {
      console.log('new api client', userKey);
      // create instance of client bound to this user
      const apiClient = new LetusApiClient(userKey);
      setClient(apiClient);
      // load their posts
      apiClient.getPosts(userKey).then((records) => {
        setPosts(records);
      });
      // update local storage
      AsyncStorage.setItem(USER_ID_KEY_STORAGE, userKey);
    }
  }, [userKey]);

  // whenever the client or info changes...
  useEffect(() => {
    // fetch user info if not present
    if (client && !userInfo) {
      client
        .getUserInfo()
        .then((info) => {
          console.log('gotUserInfo', info);
          setUserInfo({ __new: true });
        })
        .catch((ex) => {
          console.log('error getting user info', typeof ex.message);
          if (ex.message === '401') {
            console.log('logging out');
            logout();
          }
        });
    }
  }, [client, userInfo]);

  function logout() {
    setUserKey(null);
    setUserInfo(null);
    AsyncStorage.removeItem(USER_ID_KEY_STORAGE);
  }

  return (
    <AppContext.Provider
      value={{
        loaded,
        setLoaded,
        userInfo,
        userKey,
        setUserInfo,
        setUserKey,
        posts,
        ignorePost,
        setIgnorePost,
        client,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
