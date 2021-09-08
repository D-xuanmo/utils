type BrowserType = {
  /** 浏览器类型 */
  browser: string;
  browserZH?: string;

  /** 浏览器版本号 */
  browserVersion: string;
}

type OSType = {
  /** 系统名称 */
  os: string;

  /** 系统版本号 */
  osVersion: string;

  /**
   * 设备类型
   * Tablet：平板
   */
  device: 'PC' | 'Mobile' | 'Tablet' | 'unkonw';
}

type InfoType = BrowserType & OSType;

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
  private info: InfoType = {
    browser: '',
    browserZH: '',
    browserVersion: '',
    os: '',
    osVersion: '',
    device: 'unkonw'
  }

  /**
   * 需要匹配的浏览器名称
   * @private
   */
  private browserNameList: Array<string> = [
    'MicroMessenger',
    'QQ(Browser)?',
    'UCBrowser',
    'Edge?',
    'OPR',
    'Vivaldi',
    'Firefox',
    'Chrome',
    'Safari'
  ]

  /**
   * 浏览器名称对应，key 可支持正则表达式
   * @private
   */
  private browserNamesMap: {
    [key: string]: string
  } = {
    'QQ(Browser)?': 'QQ浏览器',
    UCBrowser: 'UC浏览器',
    MicroMessenger: '微信',
    'Edge?': 'Edge',
    OPR: 'Opera',
    Vivaldi: 'Vivaldi',
    Firefox: 'Firefox',
    Chrome: 'Chrome',
    Safari: 'Safari'
  }

  /**
   * @param {string} userAgent 默认使用 navigator.userAgent
   */
  constructor(userAgent: string) {
    this.agent = userAgent
    this.init()
    this.info.browserVersion = this.info.browser === 'Safari'
      ? this.info.osVersion
      : this.info.browserVersion
  }

  init() {
    try {
      this.getSystemName()
      this.getBrowserName()
    } catch (error) {
      console.warn(`[UA Error] ${error}`)
    }
  }

  /**
   * 获取系统版本号
   */
  getSystemName() {
    const [, $1] = this.agent.match(/^[a-z]+\/\d+\.\d+\s?\(([a-z\d\s:;./_-]+)\)/i) || []
    try {
      let osVersion = ''
      if (/^Windows\s(?!p)/i.test($1)) {
        [, osVersion] = $1.match(/NT\s(\d+\.\d+)/) || []
        this.info.os = 'Windows'
        switch (osVersion) {
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
        }
        this.info.osVersion = osVersion
        return
      }

      if (/^Macintosh/i.test($1)) {
        [, osVersion] = $1.match(/X\s((\d+(_|\.))+\d+)/) || []
        this.info.os = 'Mac'
        this.info.osVersion = osVersion.replace(/_/g, '.')
        return
      }

      if (/^iPhone/i.test($1)) {
        [, osVersion] = $1.match(/((\d+_)+\d+)/) || []
        this.info.os = 'iPhone'
        this.info.osVersion = osVersion.replace(/_/g, '.')
        return
      }

      if ($1.indexOf('Android') !== -1) {
        let [, _version] = $1.match(/Android\s((\d+\.?)+\d?)/) || []
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
    const regexp = this.browserNameList.map(name => new RegExp(`${name}\\/(\\d+\\.)+\\d+`))

    // 过滤浏览器信息
    let browser = (this.agent.match(/[a-z]+\/(\d+\.)+\d+/ig) || []).filter(_ => regexp.findIndex(v => v.test(_)) !== -1)

    // 如果最后一项不是Safari并且结果长度大于1取最后一项为当前浏览器信息
    browser = browser.length > 1 && !/^Safari/.test(browser[browser.length - 1]) ? browser.reverse() : browser

    this.info = {
      ...this.info,
      ...this._formatBrowserVersion(browser[0])
    }
  }

  _formatBrowserVersion(str: string): BrowserType {
    try {
      const [, name, version] = str.match(/([a-z]+)\/(\d+\.\d+)/i) || []
      const result: BrowserType = {
        browserVersion: version,
        browser: name === 'Edg' ? 'Edge' : name
      }
      for (const [key, value] of Object.entries(this.browserNamesMap)) {
        if (new RegExp(name).test(key)) {
          result.browserZH = value
          break
        }
      }
      return result
    } catch (error) {
      console.warn(`[UA Error] ${error}`)
      return {
        browser: 'Unknown',
        browserVersion: 'Unknown'
      }
    }
  }
}

export default (agent = navigator.userAgent) => new UA(agent)
