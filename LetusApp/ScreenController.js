import React, { useContext } from 'react';
import { AppContext } from './AppContext';

import { Splash } from './Screens/Splash';
import { Login } from './Screens/Login';
import { Posts } from './Screens/Posts';

export const ScreenController = () => {
  const { user, loaded, posts } = useContext(AppContext);
  if (!loaded) {
    return <Splash />;
  }
  if (!user) {
    return <Login />;
  }
  return <Posts />;
};
