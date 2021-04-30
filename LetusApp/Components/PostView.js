import React, { useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles, COLORS, SIZES } from '../Styles';
import dayjs from '../dayjs-local';
import { Meatballs } from './Meatballs';
import { IgnorePostSettings } from './IgnorePostSettings';

export const PostView = ({ data }) => {
  const { post, poster, comments } = data;
  const meatballRef = useRef();
  const [showIgnoreSettings, setShowIgnoreSettings] = useState(false);

  function hideIgnore() {
    setShowIgnoreSettings(false);
  }

  function showIgnore() {
    setShowIgnoreSettings(true);
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
                onSave={hideIgnore}
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
        <Text style={styles.postFooterText}>
          {comments.length ? comments.length : 'no'} comments
        </Text>
      </View>
    </View>
  ) : null;
};
