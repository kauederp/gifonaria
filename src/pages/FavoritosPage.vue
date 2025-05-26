<template>
  <q-page>
    <h2 class="text-lg font-bold mb-2 p-5">GIFs Favoritos</h2>
    <div v-if="giphy.gifs.length">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <template v-for="gif in giphy.gifs" :key="gif.id">
          <div
            v-if="giphy.isFavorite(gif.id)"
            :data-gif-id="gif.id"
            class="relative rounded-lg overflow-hidden shadow-md"
          >
            <!-- Ícone de estrela no canto superior direito -->
            <q-btn
              round
              flat
              color="yellow-8"
              :icon="giphy.isFavorite(gif.id) ? 'star' : 'star_outline'"
              class="absolute top-2 right-2 z-10"
              @click="toggleFavorite(gif)"
            >
              <template #icon>
                <q-icon :name="giphy.isFavorite(gif.id) ? 'star' : 'star-outline'" size="24px" />
              </template>
            </q-btn>

            <!-- GIF -->
            <img :src="gif.images.fixed_height.url" :alt="gif.title" class="w-full h-auto" />
          </div>
        </template>
      </div>
    </div>

    <div v-else>
      <q-spinner-dots size="40px" color="primary" />
    </div>
    <div class="flex row justify-center items-stretch">
      <div
        class="flex column justify-center self-stretch bg-gray-200 h-100 w-[90%] rounded-[20px]"
        v-if="giphy.favorites.length == 0"
      >
        <h1 class="text-gray-400 text-center">Não há Gifs favoritos!</h1>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGiphyStore } from 'src/stores/giphy'

const giphy = useGiphyStore()

window.giphy = giphy
// alterna o estado do giphy.favorites
const toggleFavorite = (gif) => {
  if (giphy.isFavorite(gif.id)) {
    giphy.removeFavorite(gif.id)
  } else {
    giphy.addFavorite(gif)
  }
}
// carrega as os gifs depois da montagem
onMounted(() => {
  giphy.fetchTrendingGifs()
})
</script>
