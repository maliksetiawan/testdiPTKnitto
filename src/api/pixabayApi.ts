import axios from 'axios';

const API_KEY = '46854889-ee359d90b7fed1ae23b4d9969'; 
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query: string, page: number) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        per_page: 5,
        page: page,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; 
  }
};
