import { uz } from './locales/uz'
import { tr } from './locales/ru'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'uz',
  legacy: false,
  fallbackLocale: 'uz',
  messages: {
    uz,
    tr
  }
})
