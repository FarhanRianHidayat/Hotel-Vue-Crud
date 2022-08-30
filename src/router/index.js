//import vue router
import {
    createRouter,
    createWebHistory
} from 'vue-router'

//define a routes
const routes = [{
        path: '/hotel',
        name: 'hotel.index',
        component: () => import( /* webpackChunkName: "hotel.index" */ '@/views/hotel/IndexHotel.vue')
    },
    {
        path: '/hotel/create',
        name: 'hotel.create',
        component: () => import( /* webpackChunkName: "hotel.create" */ '@/views/hotel/CreateHotel.vue')
    },
    {
        path: '/hotel/edit/:id',
        name: 'hotel.edit',
        component: () => import( /* webpackChunkName: "hotel.edit" */ '@/views/hotel/EditHotel.vue')
    },

    {
        path: '/kategori',
        name: 'kategori.index',
        component: () => import( /* webpackChunkName: "kategori.index" */ '@/views/kategori/IndexKategori.vue')
    },
    {
        path: '/kategori/create',
        name: 'kategori.create',
        component: () => import( /* webpackChunkName: "kategori.create" */ '@/views/kategori/CreateKategori.vue')
    },
    {
        path: '/kategori/edit/:id',
        name: 'kategori.edit',
        component: () => import( /* webpackChunkName: "kategori.edit" */ '@/views/kategori/EditKategori.vue')
    },
    {
        path: '/kamar',
        name: 'kamar.index',
        component: () => import( /* webpackChunkName: "kamar.index" */ '@/views/kamar/IndexKamar.vue')
    }, {
        path: '/kamar/create',
        name: 'kamar.create',
        component: () => import( /* webpackChunkName: "kamar.create" */ '@/views/kamar/CreateKamar.vue')
    }, {
        path: '/kamar/edit/:id',
        name: 'kamar.edit',
        component: () => import( /* webpackChunkName: "kamar.edit" */ '@/views/kamar/EditKamar.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // config routes
})

export default router