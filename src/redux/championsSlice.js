import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Function to get the latest Data Dragon version
const getLatestVersion = async () => {
  const versionResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/versions.json`);
  return versionResponse.data[0]; // The first version in the array is the most recent
};

// Define an async action to fetch champions from the API
export const fetchChampions = createAsyncThunk(
  'champions/fetchChampions',
  async () => {
    const latestVersion = await getLatestVersion(); // Get the latest version
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cdn/${latestVersion}/data/en_US/champion.json`);
    return response.data.data; // Return champions from the 'data' object
  }
);

const championsSlice = createSlice({
  name: 'champions',
  initialState: {
    champions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChampions.fulfilled, (state, action) => {
        state.champions = Object.values(action.payload); // Convert the object into an array
        state.loading = false;
      })
      .addCase(fetchChampions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default championsSlice.reducer;
