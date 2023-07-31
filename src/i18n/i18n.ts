import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import HEADER_EN from 'src/locales/en/header.json'
import HEADER_VI from 'src/locales/vi/header.json'
import ACCOUNT_EN from 'src/locales/en/account.json'
import ACCOUNT_VI from 'src/locales/vi/account.json'
import CART_EN from 'src/locales/en/cart.json'
import CART_VI from 'src/locales/vi/cart.json'
import LOGIN_REGISTER_EN from 'src/locales/en/login_register.json'
import LOGIN_REGISTER_VI from 'src/locales/vi/login_register.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
    header: HEADER_EN,
    account: ACCOUNT_EN,
    cart: CART_EN,
    form: LOGIN_REGISTER_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI,
    header: HEADER_VI,
    account: ACCOUNT_VI,
    cart: CART_VI,
    form: LOGIN_REGISTER_VI
  }
} as const

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources: resources,
  lng: 'vi',
  ns: ['home', 'product', 'header', 'account', 'cart'],
  fallbackLng: 'vi',
  defaultNS: defaultNS,
  interpolation: {
    escapeValue: false
  }
})
