import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { LocalStorage } from 'quasar'

export const useGiphyStore = defineStore('giphy', () => {
  const gifs = ref([])
  const categories = ref([])
  const favorites = ref(JSON.parse(LocalStorage.getItem('favorites') || '[]'))

  const fetchTrendingGifs = async () => {
    try {
      const { data } = await axios.get('https://api.giphy.com/v1/gifs/trending', {
        params: {
          api_key: '603NX4IqZqCQZN4xpCDIYJDRNvsZVKep',
          limit: 5,
          offset: 1,
          rating: 'g',
          random_id: 'e826c9fc5c929e0d6c6d423841a282aa',
          bundle: '',
          country_code: 'BR',
          region: 'south',
        },
      })
      gifs.value = data.data
    } catch (err) {
      console.error('Erro ao buscar GIFs em alta:', err)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://api.giphy.com/v1/gifs/categories', {
        params: {
          api_key: '603NX4IqZqCQZN4xpCDIYJDRNvsZVKep',
        },
      })
      categories.value = data.data
    } catch (err) {
      console.error('Erro ao buscar categorias do GIPHY:', err)
    }
  }

  const searchGifs = async (query) => {
    try {
      const { data } = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: '603NX4IqZqCQZN4xpCDIYJDRNvsZVKep',
          limit: 50,
          offset: 0,
          rating: 'g',
          q: query,
          random_id: 'e826c9fc5c929e0d6c6d423841a282aa',
          bundle: '',
          country_code: 'BR',
          region: 'south',
        },
      })
      gifs.value = data.data
    } catch (err) {
      console.error('Erro ao buscar GIFs em alta:', err)
    }
  }

  const addFavorite = (gif) => {
    if (!favorites.value.find((f) => f.id === gif.id)) {
      favorites.value.push(gif)
    }
  }

  const removeFavorite = (gifId) => {
    favorites.value = favorites.value.filter((f) => f.id !== gifId)
  }

  const isFavorite = (gifId) => {
    return favorites.value.some((f) => f.id === gifId)
  }

  const getFavorites = computed(() => favorites.value)

  // Observa mudanças em favorites e salva no localStorage
  watch(
    favorites,
    (newVal) => {
      LocalStorage.set('favorites', JSON.stringify(newVal))
    },
    { deep: true },
  )

  return {
    gifs,
    categories,
    favorites,
    getFavorites,
    fetchTrendingGifs,
    fetchCategories,
    searchGifs,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
})
