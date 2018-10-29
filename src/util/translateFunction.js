import I18next from 'i18next'
import En from '../locale/en-US.json'
import Cn from '../locale/zh-CN.json'
import Zh from '../locale/zh-TW.json'

const translation = {
  //
}

const i18n = I18next.createInstance({
  fallbackLng: 'en',
  lng: 'en',
  ns: 'translation',
  resources: {
    en: {
      translation: En
    },
    cn: {
      translation: Cn
    },
    zh: {
      translation: Zh
    }
  }
})

function translateFunction (label) {
  const proccessedLabel = label
    .replace('Action: ', '')
    .replace('Cost Per Action Type: ', '')
    .replace('Video Actions: ', '')

  return i18n.t(proccessedLabel)
}

export default translateFunction
