import React, { createContext, useEffect, useState } from 'react';
import { LetusApiClient } from './LetusApiClient';
import * as firebase from 'firebase';

export const AppContext = createContext({});
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

  // when first initialized
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLoaded(true);
      if (user) {
        console.log('auth user change', user);
        const uid = user.uid;
        user.getIdToken(true).then((idToken) => {
          console.log(uid, idToken);
          setUserKey(idToken);
        });
      } else {
        console.log('user is null');
        setUserInfo(null);
        setUserKey(null);
      }
    });
  }, []);

  // Whenever the user key changes...
  useEffect(() => {
    if (userKey) {
      console.log('new api client', userKey);
      // create instance of client bound to this user
      const apiClient = new LetusApiClient(userKey);
      setClient(apiClient);
      (async () => {
        let deets = await apiClient.getUserInfo();
        console.log('got deets from apiClient ', deets, userInfo);
        // if no userInfo, create new user
        if (!deets && userInfo && userInfo.nickname) {
          deets = await apiClient.editUser({ name: userInfo.nickname });
          console.log('got new deets', deets);
          setUserInfo(deets);
        } else {
          setUserInfo(deets);
        }
        // load their posts
        // apiClient.getPosts(userKey).then((records) => {
        //   setPosts(records);
        // });
      })();
    }
  }, [userKey]);

  function logout() {
    setUserKey(null);
    setUserInfo(null);
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
