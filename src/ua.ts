interface Browser {
  /** 浏览器类型 */
  browser: string;
  browserZH?: string;

  /** 浏览器版本号 */
  browserVersion: string;
}

interface OS {
  /** 系统名称 */
  os: string;

  /** 系统版本号 */
  osVersion: string;
}

/** 设备类型 */
type DeviceType = 'PC' | 'Mobile' | 'Tablet' | 'Unknown';

/** 浏览器内核 */
type EngineType = 'Trident' | 'Gecko' | 'Presto' | 'WebKit';

interface ResultInfo extends Browser, OS {
  engine: EngineType;
  device: DeviceType;
}

/** 浏览器名称对应 */
interface BrowserNameMap {
  [key: string]: {
    en: string,
    zh?: string;
  }
}

/**
 * 通过navigator.userAgent获取浏览器版本与系统版本
 */
class UA {
  /**
   * 浏览器 navigator.userAgent
   * @private
   */
  private agent = ''

  /**
   * 解析后的结果
   * @private
   */
  info: ResultInfo = {
    browser: '',
    browserZH: '',
    browserVersion: '',
    os: '',
    osVersion: '',
    device: 'Unknown',
    engine: 'WebKit'
  }

  /**
   * 需要匹配的浏览器名称
   * @private
   */
  private browserNameMap: BrowserNameMap = {
    MicroMessenger: {
      en: 'MicroMessenger',
      zh: '微信'
    },
    MetaSr: {
      en: 'MetaSr',
      zh: '搜狗浏览器'
    },
    'QQ(Browser)?': {
      en: 'QQBrowser',
      zh: 'QQ浏览器'
    },
    UCBrowser: {
      en: 'UCBrowser',
      zh: 'UC浏览器'
    },
    '2345Explorer': {
      en: '2345Explorer',
      zh: '2345极速浏览器'
    },
    'Mb2345Browser': {
      en: 'Mb2345Browser',
      zh: '2345手机浏览器'
    },
    Trident: {
      en: 'Internet Explorer'
    },
    'Edge?': {
      en: 'Edge'
    },
    'OPR': {
      en: 'Opera'
    },
    Vivaldi: {
      en: 'Vivaldi'
    },
    Firefox: {
      en: 'Firefox'
    },
    Chrome: {
      en: 'Chrome'
    },
    Safari: {
      en: 'Safari'
    }
  }

  /**
   * @param {string} userAgent 默认使用 navigator.userAgent
   */
  constructor(userAgent: string) {
    this.agent = userAgent
    this.init()
    const { browser, browserVersion, osVersion } = this.info
    this.info = {
      ...this.info,
      engine: this.getEngine(),
      // Safari 版本号跟系统走的
      browserVersion: browser === 'Safari' ? osVersion : browserVersion
    }
  }

  private init() {
    try {
      this.getSystemName()
      this.getBrowserName()
    } catch (error) {
      console.warn(`[UA formatter error] ${error}`)
    }
  }

  /**
   * 获取浏览器内核引擎
   */
  getEngine(): EngineType {
    const userAgent = this.agent
    if (userAgent.indexOf('Trident') !== -1) return 'Trident'
    if (userAgent.indexOf('Firefox') !== -1) return 'Gecko'
    if (userAgent.indexOf('Presto') !== -1) return 'Presto'
    return 'WebKit'
  }


  /**
   * 获取系统版本号
   */
  getSystemName() {
    const [, $1] = this.agent.match(/^[a-z]+\/\d+\.\d+\s?\(([a-z\d\s:;./_-]+)\)/i) || []
    try {
      let osVersion = ''
      console.log($1)
      if (/Windows/i.test($1)) {
        const [, _osVersion] = $1.match(/NT\s(\d+\.\d+)/) || []
        this.info.os = 'Windows'
        switch (_osVersion) {
          case '6.3':
            osVersion = '8.1'
            break
          case '6.2':
            osVersion = '8'
            break
          case '6.1':
            osVersion = '7'
            break
          case '5.2':
          case '5.1':
            osVersion = 'XP'
            break
          default:
            osVersion = _osVersion
        }

        this.info.device = 'PC'
        this.info.osVersion = osVersion
        return
      }

      if (/^Macintosh/i.test($1)) {
        [, osVersion] = $1.match(/X\s((\d+(_|\.))+\d+)/) || []
        this.info.os = 'Macintosh'
        this.info.device = 'PC'
        this.info.osVersion = osVersion?.replace(/_/g, '.') ?? 'Unknown'
        return
      }

      if (/^iPad/i.test($1)) {
        [, osVersion] = $1.match(/((\d+_)+\d+)/) || []
        this.info.os = 'iPad'
        this.info.device = 'Tablet'
        this.info.osVersion = osVersion.replace(/_/g, '.')
        return
      }

      if (/^iPhone/i.test($1)) {
        [, osVersion] = $1.match(/((\d+_)+\d+)/) || []
        this.info.os = 'iPhone'
        this.info.device = 'Mobile'
        this.info.osVersion = osVersion.replace(/_/g, '.')
        return
      }

      if ($1.indexOf('Android') !== -1) {
        let [, _version] = $1.match(/Android\s((\d+\.?)+\d?)/) || []
        this.info.device = 'Mobile'
        this.info.os = 'Android'
        this.info.osVersion = _version
        return
      }

      if (/Linux\s[a-z\d_]+/.test($1)) {
        this.info.os = 'Linux'
        this.info.osVersion = 'Unknown'
        return
      }

      this.info.os = 'Unknown'
      this.info.osVersion = 'Unknown'
    } catch (error) {
      this.info.os = 'Unknown'
      this.info.osVersion = 'Unknown'
    }
  }

  getBrowserName() {
    const regexps = Object.keys(this.browserNameMap).map(name => new RegExp(`${name}(\\/|\\s)(\\d+\\.)+\\d+`))

    // 过滤浏览器信息
    const browsers = this.agent.match(/[a-z\d]+(\/|\s)(\d+\.)+\d+/ig) || []
    let browser = browsers.filter(_ => regexps.findIndex(v => v.test(_)) !== -1)

    // 如果最后一项不是Safari并且结果长度大于1取最后一项为当前浏览器信息
    browser = browser.length > 1 && !/^Safari/.test(browser[browser.length - 1]) ? browser.reverse() : browser

    this.info = {
      ...this.info,
      ...this._formatBrowserVersion(browser[0])
    }
  }

  _formatBrowserVersion(str: string): Browser {
    try {
      // ie 浏览器版本对照
      const ieVersionMap: any = {
        '4.0': 8,
        '5.0': 9,
        '6.0': 10,
        '7.0': 11
      }
      const { name, version } = str.match(/(?<name>[a-z\d]+)(\/|\s)(?<version>(\d+\.)+\d+)/i)?.groups ?? {}

      // 遍历查出浏览器名称，名称支持正则所以需要遍历查找
      let browserName: any = {}
      for (const [key, value] of Object.entries(this.browserNameMap)) {
        if (new RegExp(key).test(name)) {
          browserName = value
          break
        }
      }

      const result: Browser = {
        browserVersion: version ?? 'Unknown',
        browser: browserName.en ?? 'Unknown',
        browserZH: (browserName?.zh || browserName.en) ?? 'Unknown'
      }

      // IE 浏览器特殊处理
      if (name === 'Trident') {
        result.browserVersion = ieVersionMap[version]
      }

      return result
    } catch (error) {
      console.warn(`[UA formatter error] ${error}`)
      return {
        browser: 'Unknown',
        browserVersion: 'Unknown'
      }
    }
  }
}

export default function(agent = navigator.userAgent) {
  const ua: UA = new UA(agent)
  return ua.info
}
