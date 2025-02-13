import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://platform.cs52.me/api/posts';
const API_KEY = '?key=p_soeung';

const usePostStore = create((set, get) => ({
  all: [],
  current: {},

  fetchAllPosts: async () => {
    try {
      const response = await axios.get(`${API_URL}${API_KEY}`);
      set({ all: response.data });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },

  fetchPost: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}${API_KEY}`);
      set({ current: response.data });
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  },

  createPost: async (post) => {
    try {
      await axios.post(`${API_URL}${API_KEY}`, post);
      get().fetchAllPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  },

  updatePost: async (id, post) => {
    try {
      await axios.put(`${API_URL}/${id}${API_KEY}`, post);
      get().fetchPost(id);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  },

  deletePost: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}${API_KEY}`);
      get().fetchAllPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  },
}));

export default usePostStore;
