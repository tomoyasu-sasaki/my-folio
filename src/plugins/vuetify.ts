// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// カラーパレットの定義
const blueColors = {
    100: '#E3F2FD',
    300: '#90CAF9',
    400: '#64B5F6',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
    'A100': '#82B1FF',
    'A200': '#448AFF'
}

// ダークテーマ用の特別なカラー
const darkThemeColors = {
    background: '#121212', // Material Design推奨のダークテーマ背景色
    surface: '#1E1E1E',   // より明るい表面色
    primary: '#90CAF9',   // 明るめのブルー（視認性向上）
    secondary: '#64B5F6'  // アクセントとして使用
}

const statusColors = {
    error: {
        light: '#E53935', // Red 600
        dark: '#EF5350'   // Red 400
    },
    warning: {
        light: '#FB8C00', // Orange 600
        dark: '#FFA726'   // Orange 400
    },
    success: {
        light: '#43A047', // Green 600
        dark: '#66BB6A'   // Green 400
    }
}

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
                    background: blueColors[100],
                    primary: blueColors[500],
                    'primary-darken-1': blueColors[700],
                    secondary: blueColors[300],
                    'secondary-darken-1': blueColors[400],
                    error: statusColors.error.light,
                    info: blueColors[600],
                    warning: statusColors.warning.light,
                    success: statusColors.success.light,
                    accent: blueColors['A200']
                }
            },
            dark: {
                dark: true,
                colors: {
                    background: darkThemeColors.background,
                    surface: darkThemeColors.surface,
                    primary: darkThemeColors.primary,
                    'primary-darken-1': blueColors[400],
                    secondary: darkThemeColors.secondary,
                    'secondary-darken-1': blueColors[300],
                    error: statusColors.error.dark,
                    info: blueColors['A100'],
                    warning: statusColors.warning.dark,
                    success: statusColors.success.dark,
                    accent: blueColors['A100']
                }
            }
        }
    }
})
