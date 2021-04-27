import React, { useContext, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { AppContext } from '../AppContext';
import { styles } from '../Styles';
import { Header } from '../Components/Header';
import { PostView } from '../Components/PostView';

export const Posts = () => {
  const context = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <FlatList
          keyExtractor={(item, index) => {
            return '' + (item && item.post ? item.post.id : index);
          }}
          data={context.posts}
          renderItem={({ item }) => <PostView data={item} />}
        />
      </View>
    </View>
  );
};
