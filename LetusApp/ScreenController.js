import React, { useContext } from 'react';
import { AppContext } from './AppContext';

import { Splash } from './Splash';
import { Login } from './Login';
import { Home } from './Home';

export const ScreenController = () => {
  const { user, loaded, posts } = useContext(AppContext);
  if (!loaded) {
    return <Splash />;
  }
  if (!user) {
    return <Login />;
  }
  return <Home />;
};
