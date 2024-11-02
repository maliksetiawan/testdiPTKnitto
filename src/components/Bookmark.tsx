import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Bookmark = ({ route }) => {
  const navigation = useNavigation();
  const { bookmarks, setBookmarked } = route.params; 
  const handleUnbookmark = (image) => {
    Alert.alert(
      'Konfirmasi',
      'Anda yakin ingin menghapus gambar ini dari bookmark?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: () => {
           
            setBookmarked(prev => {
              const updatedBookmarks = prev.filter(item => item.id !== image.id);
              return updatedBookmarks; 
            });
            Alert.alert('Notifikasi', 'Gambar berhasil diunbookmark');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmarked Images</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.webformatURL }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.tags}>{item.tags}</Text>
              <TouchableOpacity onPress={() => handleUnbookmark(item)}>
                <Text style={styles.unbookmark}>Unbookmark</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    padding: 8,
  },
  user: {
    fontWeight: 'bold',
  },
  tags: {
    color: 'gray',
  },
  unbookmark: {
    color: 'red',
    marginTop: 5,
  },
});

export default Bookmark;
