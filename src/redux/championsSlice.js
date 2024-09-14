import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Función para obtener la última versión de Data Dragon
const getLatestVersion = async () => {
  const versionResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
  return versionResponse.data[0]; // La primera versión en el array es la más reciente
};

// Definimos una acción asíncrona para obtener los campeones desde la API
export const fetchChampions = createAsyncThunk(
  'champions/fetchChampions',
  async () => {
    const latestVersion = await getLatestVersion(); // Obtenemos la última versión
    const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
    return response.data.data; // Retornamos los campeones del objeto 'data'
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
        state.champions = Object.values(action.payload); // Convertimos el objeto en un array
        state.loading = false;
      })
      .addCase(fetchChampions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default championsSlice.reducer;
