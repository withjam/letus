import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, COLORS, SIZES } from '../Styles';
import dayjs from '../dayjs-local';

export const PostView = ({ data }) => {
  const { post, poster, comments } = data;

  return post ? (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.postHeaderText}>{poster.properties.name}</Text>
        <View style={styles.postHeaderMeta}>
          <Ionicons
            name='ellipsis-horizontal'
            size={SIZES.icon_sm}
            color={COLORS.black}
          />
          <Text style={styles.postHeaderMetaText}>
            {dayjs(post.properties.created).fromNow()}
          </Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.properties.text}</Text>
      <View style={styles.postFooter}>
        <Text style={styles.postFooterText}>
          view {comments.length} comments
        </Text>
      </View>
    </View>
  ) : null;
};
