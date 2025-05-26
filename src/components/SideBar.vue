<template>
  <div>
    <!-- Botão para abrir o menu -->
    <button
      @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
    >
      ☰
    </button>

    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-if="isOpen"
        class="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 flex flex-col transition-transform duration-300"
      >
        <!-- Logo -->
        <div class="p-4 border-b border-gray-200 flex items-center justify-center">
          <img src="/logo.png" alt="Logo da Empresa" class="h-10" />
        </div>

        <!-- Itens do menu -->
        <nav class="flex-1 p-4 space-y-4">
          <a href="#" class="block text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" class="block text-gray-700 hover:text-blue-600">Relatórios</a>
          <a href="#" class="block text-gray-700 hover:text-blue-600">Usuários</a>
        </nav>

        <!-- Botão para fechar -->
        <button @click="toggleSidebar" class="p-4 text-gray-500 hover:text-red-600">
          Fechar ✖
        </button>
      </aside>
    </transition>

    <!-- Sobreposição escura -->
    <div
      v-if="isOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-30"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
</style>
