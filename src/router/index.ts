import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForbiddenView from '../views/ForbiddenView.vue'
import BabylonFolioView from '../views/BabylonFolioView.vue'

import { useAuthStore } from '../stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                isCameFromQRcode: true
            },
            component: HomeView
        },
        {
            path: '/forbidden',
            name: 'forbidden',
            component: ForbiddenView
        },
        {
            path: '/babylonfolio',
            name: 'babylonfolio',
            component: BabylonFolioView,
            meta: {
                isCameFromQRcode: true
            }
        }
    ]
})

// router.beforeEach(async (to, from, next) => {
//     const store = useAuthStore()

//     // `/forbidden` へのアクセスを制御（無限リダイレクトを防ぐ）
//     if (to.name === 'forbidden') {
//         next() // forbidden画面へのアクセスはそのまま許可
//         return
//     }

//     // `isCameFromQRcode`をmetaに持つルートのみに対してチェック
//     if (to.matched.some((record) => record.meta.isCameFromQRcode)) {
//         const params = new URLSearchParams(window.location.search)
//         const token = params.get('token')
//         // tokenの検証
//         if (token === import.meta.env.VITE_TOKEN_PATH || token == 'ssk-tmys') {
//             // QRコードからの正しいアクセスの場合
//             store.setCameFromQRcode(true)
//             next()
//         } else if (localStorage.getItem('isCameFromQRcode') === 'true') {
//             next()
//         } else {
//             // 不正なtokenの場合
//             next('/forbidden')
//         }
//     } else {
//         // `isCameFromQRcode`を持たないルートには`forbidden`にリダイレクト
//         next('/forbidden')
//     }
// })

export default router
