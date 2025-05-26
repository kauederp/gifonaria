const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'favoritos', component: () => import('pages/FavoritosPage.vue') },
      { path: 'categorias', component: () => import('pages/CategoriasPage.vue') },
      { path: 'sobre', component: () => import('pages/SobrePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
