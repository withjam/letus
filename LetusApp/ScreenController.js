import React, { useContext } from 'react';
import { AppContext } from './AppContext';

import { Splash } from './Screens/Splash';
import { Login } from './Screens/Login';
import { Posts } from './Screens/Posts';
import { NewUser } from './Components/NewUser';
import { View, Text } from 'react-native';

export const ScreenController = () => {
  const { userInfo, userKey, loaded, posts } = useContext(AppContext);
  if (!loaded) {
    return <Splash />;
  }
  if (!userKey) {
    return <Login />;
  }
  if (!userInfo) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (userInfo.__new) {
    return <NewUser />;
  }
  return <Posts />;
};
