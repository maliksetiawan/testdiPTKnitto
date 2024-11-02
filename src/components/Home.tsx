import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, Image, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchImages } from '../api/pixabayApi';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('nature');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarked, setBookmarked] = useState([]);

  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await fetchImages(query, page);
      setImages((prev) => [...prev, ...data.hits]);
    } catch (error) {
      console.error('Error fetching images:', error);
      Alert.alert('Gagal memuat gambar', error.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, [page, query]);

  const loadMoreImages = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 500);
    }
  };

  const handleSearch = () => {
    setImages([]);
    setPage(1);
    setQuery(searchQuery);
  };

  const toggleBookmark = (image) => {
    if (bookmarked.some(item => item.id === image.id)) {
      setBookmarked(prev => prev.filter(item => item.id !== image.id)); 
      Alert.alert('Notifikasi', 'Gambar berhasil diunbookmark');
    } else {
      setBookmarked(prev => {
        Alert.alert('Notifikasi', 'Gambar berhasil dibookmark');
        return [...prev, image]; 
      });
    }
  };

  const isBookmarked = (image) => {
    return bookmarked.some(item => item.id === image.id);
  };

  const goToBookmarks = () => {
    navigation.navigate('Bookmark', { bookmarks: bookmarked, setBookmarked });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Image Gallery</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search images..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.webformatURL }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.tags}>{item.tags}</Text>
              <TouchableOpacity onPress={() => toggleBookmark(item)}>
                <Icon name={isBookmarked(item) ? 'bookmark' : 'bookmark-o'} size={24} color={isBookmarked(item) ? 'red' : 'blue'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        onEndReached={loadMoreImages}
        onEndReachedThreshold={2}
      />
      <TouchableOpacity onPress={goToBookmarks} style={styles.goToBookmarks}>
    <Icon name="bookmark" size={24} color="blue" />
    <Text style={styles.bookmarkText}>INI KE BOOKMARKNYA</Text>
</TouchableOpacity>

      {loading && <ActivityIndicator style={styles.loader} />}
    </SafeAreaView>
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
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
  goToBookmarks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: '#f0f8ff', 
  },
  bookmarkText: {
    marginLeft: 8, 
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
});

export default Home;
