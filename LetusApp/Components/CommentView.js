import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AppContext } from '../AppContext';
import dayjs from '../dayjs-local';
import { styles } from '../Styles';

export const CommentView = ({ comment, commenter }) => {
  const context = useContext(AppContext);
  if (!comment || !commenter || !context.userInfo) return null;
  const myId = context.userInfo.properties.userid;
  const commenterId = commenter.properties.userid;
  const isMe = myId === commenterId;
  return (
    <View style={isMe ? styles.commentItemMine : styles.commentItem}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentHeaderText}>
          {isMe ? 'You' : commenter.properties.name}
        </Text>
        <Text style={styles.commentHeaderWhen}>
          {dayjs(comment.properties.created).fromNow()}
        </Text>
      </View>
      <View style={styles.commentTextArea}>
        <Text style={styles.commentText}>{comment.properties.text}</Text>
      </View>
    </View>
  );
};
