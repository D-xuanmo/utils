type CookieFormattedType = {
  [key: string]: string
}

class DCookie {
  cookies: CookieFormattedType = {}

  constructor() {
    this.init()
  }

  init() {
    if (typeof window !== 'undefined') {
      const cookies: CookieFormattedType = {}
      document.cookie.split(/;\s/).forEach((item: string) => {
        const [key, value] = item.split(/=/)
        cookies[key] = value
      })
      this.cookies = cookies
    }
  }

  getItem(key: string) {
    return this.cookies[key]
  }

  getAllItems() {
    return this.cookies
  }

  setItem(key: string, value: string, expires?: Date | string, path?: string, domain?: string, secure?: boolean) {
    document.cookie = `${key}=${value}${expires ? `; expires=${expires}` : ''}${path ? `; path=${path}` : ''}${domain ? `; domain=${domain}` : ''}${secure ? `; secure` : ''}`
  }
}

const instance = new DCookie()

export default instance
