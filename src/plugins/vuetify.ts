// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
    components,
    directives,
    ssr: true,
    theme: {
        defaultTheme: 'light',
        themes: {
            // https://vuetifyjs.com/ja/styles/colors/
            light: {
                dark: false,
                colors: {
                    background: '#E3F2FD', // 明るい青 (Blue 100)
                    primary: '#2196F3', // ブルー (Blue 500)
                    'primary-darken-1': '#1976D2', // ブルー濃いめ (Blue 700)
                    secondary: '#90CAF9', // 明るいブルー (Blue 300)
                    'secondary-darken-1': '#64B5F6', // ブルー濃いめ (Blue 400)
                    error: '#E53935', // 赤 (Red 600)
                    info: '#1E88E5', // 情報色 (Blue 600)
                    warning: '#FB8C00', // 警告色 (Orange 600)
                    success: '#43A047', // 成功色 (Green 600)
                    accent: '#448AFF' // アクセント (Blue A200)
                }
            },
            dark: {
                dark: true,
                colors: {
                    background: '#0D47A1', // 非常に暗いブルー (Blue 900)
                    primary: '#1565C0', // 暗いブルー (Blue 800)
                    'primary-darken-1': '#0D47A1', // 非常に暗いブルー (Blue 900)
                    secondary: '#1E88E5', // ブルー (Blue 600)
                    'secondary-darken-1': '#1565C0', // 暗いブルー (Blue 800)
                    error: '#EF5350', // 赤 (Red 400)
                    info: '#42A5F5', // 情報色 (Blue 400)
                    warning: '#FFA726', // 警告色 (Orange 400)
                    success: '#66BB6A', // 成功色 (Green 400)
                    accent: '#82B1FF' // アクセント (Blue A100)
                }
            }
        }
    }
})
