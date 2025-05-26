<template>
  <q-page>
    <h2 class="text-lg font-bold mb-2 p-5">Categorias</h2>

    <div v-if="selectedTag === ''">
      <div>
        <div class="grid flex px-2 row justify-start">
          <div
            v-for="(category, index) in giphy.categories"
            :key="index"
            class="col-xs-12 p-2 col-sm-6 col-md-4"
          >
            <div
              class="bg-gray-200 h-full rounded-[10px] w-full q-pa-sm flex flex-col justify-between min-h-[28rem]"
            >
              <div class="columns items-center">
                <!-- Vídeo do GIF -->
                <video class="q-mb-sm w-full h-auto max-h-[200px]" autoplay loop muted playsinline>
                  <source :src="category.gif.images.preview.mp4" type="video/mp4" />
                </video>

                <!-- Nome da Categoria -->
                <div class="text-center text-bold text-lg">{{ category.name }}</div>
              </div>

              <!-- Subcategorias com scroll interno -->
              <div class="overflow-y-auto mt-2 flex-1 w-full max-h-[10rem] border-t pt-2">
                <div class="flex flex-wrap gap-2 justify-center">
                  <div
                    v-for="subcategory in category.subcategories"
                    :key="subcategory.name_encoded"
                  >
                    <button
                      @click="selectSubcategory(subcategory.name_encoded)"
                      class="text-center cursor-pointer text-sm font-semibold p-2 bg-blue-200 rounded-lg"
                    >
                      {{ subcategory.name }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div v-for="gif in giphy.gifs" :key="gif.id">
          <div
            v-if="giphy.isFavorite(gif.id)"
            :data-gif-id="gif.id"
            class="relative rounded-lg overflow-hidden shadow-md"
          >
            Ícone de estrela no canto superior direito -->
          <!--  <q-btn
              round
              flat
              color="yellow-8"
              :icon="giphy.isFavorite(gif.id) ? 'star' : 'star_outline'"
              class="absolute top-2 right-2 z-10"
              @click="toggleFavorite(gif)"
            > -->
          <!--  <template #icon>
                <q-icon :name="giphy.isFavorite(gif.id) ? 'star' : 'star-outline'" size="24px" />
              </template>
            </q-btn> -->

          <!-- GIF -->
          <!-- <img :src="gif.images.fixed_height.url" :alt="gif.title" class="w-full h-auto" />
          </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <div v-if="giphy.gifs.length">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="gif in giphy.gifs"
              :key="gif.id"
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
              <!-- <img :src="gif.images.preview_webp.url" :alt="gif.title" class="w-full h-auto" /> -->
              <video class="w-full h-auto" autoplay loop muted playsinline>
                <source :src="gif.images.preview.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div v-else>
          <q-spinner-dots size="40px" color="primary" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGiphyStore } from 'src/stores/giphy'

const selectedTag = ref('')
const giphy = useGiphyStore()

const selectSubcategory = (sub) => {
  giphy.searchGifs(sub)
  selectedTag.value = sub

  console.log(selectedTag.value)
}
//window.giphy = giphy
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
  giphy.fetchCategories()
})
</script>
