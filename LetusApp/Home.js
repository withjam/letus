import React, { useContext } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { AppContext } from './AppContext';
import { styles } from './Styles';

export const Home = () => {
  const context = useContext(AppContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Home</Text>
      {context.posts.map((record) => (
        <Text style={styles.h1} key={record.post.id}>
          {record.post.properties.text}
        </Text>
      ))}
    </SafeAreaView>
  );
};
