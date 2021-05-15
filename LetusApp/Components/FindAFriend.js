import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { styles, COLORS, SIZES } from '../Styles';
import { AppContext } from '../AppContext';
import { Header } from './Header';
import { Ionicons } from '@expo/vector-icons';

export const FindAFriend = () => {
  const context = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const renderItem = ({ item }) => (
    <View key={item.them.id} style={myStyles.item}>
      <Text style={myStyles.name}>{item.them.properties.name}</Text>
      <Pressable
        style={[styles.row, { padding: SIZES.xs }]}
        onPress={() => addFriend(item.them.properties.userid)}
      >
        <Ionicons name='add-outline' size={SIZES.icon} color={COLORS.link} />
        <Text style={[styles.text, { color: COLORS.link, fontSize: SIZES.sm }]}>
          Add Friend
        </Text>
      </Pressable>
    </View>
  );

  const doSearch = async () => {
    if (query && query.length > 1) {
      const result = await context.client.findFriends(query);
      console.log('setting result', result);
      setResults(result);
    }
  };

  const addFriend = async (friendId) => {
    try {
      const res = await context.client.addFriend(friendId);
      context.reloadPosts();
      doSearch();
    } catch (ex) {
      console.log('Error adding friend', ex);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.row, { backgroundColor: COLORS.shadow }]}>
        <TextInput
          style={styles.textInput}
          placeholder='Search by name'
          autoCorrect={false}
          value={query}
          onChangeText={setQuery}
        />
        <Pressable onPress={doSearch} style={styles.pressable}>
          <Text
            style={[
              styles.textStrong,
              { fontSize: SIZES.md, color: COLORS.link },
            ]}
          >
            Search
          </Text>
        </Pressable>
      </View>
      <View style={[styles.main, { backgroundColor: COLORS.white }]}>
        {results && results.length ? (
          <FlatList
            contentContainerStyle={{ paddingBottom: 150 }}
            data={results}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return '' + (item && item.them ? item.them.id : index);
            }}
          />
        ) : (
          <View style={myStyles.noResults}>
            <Text style={styles.text}>No results</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styleDef = {};

styleDef.item = {
  ...styles.row,
  paddingRight: SIZES.xs,
  paddingVertical: SIZES.xl,
};

styleDef.noResults = {
  ...styles.row,
  justifyContent: 'center',
};

styleDef.name = {
  ...styles.textStrong,
  fontSize: SIZES.lg,
};

const myStyles = StyleSheet.create(styleDef);
