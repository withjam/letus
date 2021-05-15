import React, { useContext, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, TextInput } from 'react-native';
import { COLORS, SIZES, styles } from '../Styles';
import dayjs from '../dayjs-local';
import { Meatballs } from './Meatballs';
import { IgnorePostSettings } from './IgnorePostSettings';
import { CommentView } from './CommentView';
import { AppContext } from '../AppContext';

export const PostView = ({ data }) => {
  const context = useContext(AppContext);
  const { post, poster, comments, commenters } = data;
  const [myComment, setMyComment] = useState('');
  const meatballRef = useRef();
  const [showIgnoreSettings, setShowIgnoreSettings] = useState(false);
  const [showingComments, setShowingComments] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  function showComments() {
    setShowingComments(true);
    Animated.timing(slideAnim, {
      toValue: comments.length * 100 + 100,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }

  function hideComments() {
    setShowingComments(false);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }

  function toggleComments() {
    if (showingComments) {
      hideComments();
    } else {
      showComments();
    }
  }

  function hideIgnore() {
    setShowIgnoreSettings(false);
  }

  function showIgnore() {
    setShowIgnoreSettings(true);
  }

  function saveIgnore({ poster, category, sentiment }) {
    context.client.addIgnoreSetting({ poster, category, sentiment });
    context.reloadPosts();
    hideIgnore();
  }

  async function addComment() {
    if (myComment && myComment.length) {
      const newComment = myComment;
      setMyComment('');
      await context.client.addComment(newComment, post.id);
      context.reloadPosts();
    }
  }

  return post ? (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.postHeaderText}>{poster.properties.name}</Text>
        <View style={styles.postHeaderMeta}>
          <Meatballs withRef={(ref) => (meatballRef.current = ref)}>
            <View style={styles.menu}>
              <Pressable
                style={styles.menuItem}
                onPress={() => {
                  showIgnore();
                }}
              >
                <Text style={styles.menuItemText}>Ignore posts like this</Text>
                <Text style={styles.menuItemSubText}>
                  See only what you want to see
                </Text>
              </Pressable>
              <Pressable style={styles.menuItem}>
                <Text style={styles.menuItemText}>Add your reaction</Text>
                <Text style={styles.menuItemSubText}>
                  Show others how you feel
                </Text>
              </Pressable>
              <IgnorePostSettings
                shown={showIgnoreSettings}
                onCancel={hideIgnore}
                onSave={saveIgnore}
                data={data}
              />
            </View>
          </Meatballs>
          <Text style={styles.postHeaderMetaText}>
            {dayjs(post.properties.created).fromNow()}
          </Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.properties.text}</Text>
      <View style={styles.postFooter}>
        <Pressable onPress={toggleComments}>
          <Text style={styles.postFooterText}>
            {comments.length ? (showingComments ? 'Hide ' : 'View ') : ''}
            {comments.length ? comments.length : 'no'} comment
            {comments.length === 1 ? '' : 's'}
          </Text>
        </Pressable>
      </View>
      <Animated.View style={[styles.commentArea, { height: slideAnim }]}>
        {showingComments
          ? comments.map((comment, index) => (
              <CommentView
                key={comment.id}
                comment={comment}
                commenter={commenters[index]}
              />
            ))
          : null}
        {showingComments ? (
          <View style={styles.addComment}>
            <TextInput
              style={styles.commentBox}
              value={myComment}
              onChangeText={setMyComment}
              placeholder='Add your comment...'
              multiline
              maxLength={1000}
            />
            <Pressable
              onPress={addComment}
              style={{
                paddingHorizontal: SIZES.sm,
                paddingVertical: 4,
              }}
            >
              <Text style={styles.textInputButton}>Send</Text>
            </Pressable>
          </View>
        ) : null}
      </Animated.View>
    </View>
  ) : null;
};
