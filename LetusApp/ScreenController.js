import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { Splash } from './Screens/Splash';
import { Login } from './Screens/Login';
import { Posts } from './Screens/Posts';
import { NewUser } from './Components/NewUser';
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { COLORS, SIZES, styles } from './Styles';
import { FindAFriend } from './Components/FindAFriend';

export const ScreenController = () => {
  const { userInfo, userKey, loaded, findingFriends } = useContext(AppContext);
  if (!loaded) {
    return <Splash />;
  }
  if (!userKey) {
    return <Login />;
  }
  if (!userInfo || userInfo.nickname) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color={COLORS.secondary} size='large' />
      </SafeAreaView>
    );
  }
  if (userInfo.__new) {
    return <NewUser />;
  }
  if (findingFriends) {
    return <FindAFriend />;
  }
  return <Posts />;
};
