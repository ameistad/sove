import format from 'date-fns/format'
import localeEn from 'date-fns/locale/en'
import localeNb from 'date-fns/locale/nb'

const LOCALES = {
  en: localeEn,
  nb: localeNb
}
const LOCALE = 'nb'

export default {
  methods: {
    dateFormat (date, formatStr) {
      return format(date, formatStr, {
        locale: LOCALES[LOCALE]
      })
    }
  }
}
