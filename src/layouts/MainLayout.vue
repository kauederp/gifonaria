<template>
  <div class="">
    <q-layout view="hHh Lpr lFf">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
          <q-toolbar-title class=""
            ><div class="py-5 w-[70px]">
              <img class="w-full" src="/imgs/logo.png" alt="" /></div
          ></q-toolbar-title>
          <div>
            <span>Kauê Delgado Pereira</span>
            <q-icon name="person" size="24px" />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="240"
        :breakpoint="700"
        elevated
        class="bg-indigo-500 text-white rounded-end"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="link in links" :key="link">
              <router-link :to="link.route" class="text-decoration-none text-white"
                ><i :class="link.icon"></i>{{ link.name }}</router-link
              >
            </div>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const links = [
  { name: 'Home', icon: '', route: '/' },
  { name: 'Favoritos', icon: '', route: '/favoritos' },
  { name: 'Categorias', icon: '', route: '/categorias' },
  { name: 'Sobre', icon: '', route: '/sobre' },
]

let drawerLeft = ref(false)
</script>
