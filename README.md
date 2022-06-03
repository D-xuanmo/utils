# JavaScript Utils [![Node.js CI](https://github.com/D-xuanmo/javascript-utils/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/D-xuanmo/javascript-utils/actions/workflows/node.js.yml)

> 常用工具函数

## 安装

```bash
$ yarn add @xuanmo/javascript-utils
```

## 使用

```js
import { debounce } from '@xuanmo/javascript-utils'

// 全量引用
// import * as utils from '@xuanmo/javascript-utils'
```

### 已有方法

|         工具名          |              描述              | Nodejs 可用 |
|:--------------------:|:----------------------------:|:---------:|
|       realType       |           获取数据真实类型           |     ✔     |
|       isObject       |            是否为对象             |     ✔     |
|       isRegexp       |           是否为正则表达式           |     ✔     |
|      isFunction      |            是否为函数             |     ✔     |
|      isImageUrl      |        判断 url 是否为图片路径        |     ✔     |
|       isNumber       |            是否为纯数字            |     ✔     |
|       isEmpty        |             是否为空             |     ✔     |
|      isBoolean       |            是否为布尔值            |     ✔     |
|      toBoolean       |        转换 string 布尔值         |     ✔     |
|   toLowerCamelCase   |           下划线转小驼峰            |     ✔     |
|     toUnderline      |          小驼峰转下划线分割           |     ✔     |
|     toPascalCase     |           中横线转大驼峰            |     ✔     |
|   formatThousandth   |            数字千分位             |     ✔     |
|      countDown       |             倒计时              |     ✖     |
|       debounce       |              防抖              |     ✔     |
|       deepCopy       |             深拷贝              |     ✔     |
|     searchParams     |        获取 URL 单个查询参数         |     ✔     |
|  formatQueryParams   |        获取 URL 全部查询参数         |     ✔     |
|    createRandomID    |           生成随机 ID            |     ✔     |
| objectKeyToCamelCase |      Object key 转换为小驼峰       |     ✔     |
|          ua          | 对 `navigator.userAgent` 进行解析 |     ✖     |
|       dCookie        |         `cookie` 操作          |     ✖     |
|     generateTree     |          一维数组转树形数据           |     ✔     |
|      throwError      |          统一报错信息处理           |     ✔     |
|      debugWarn       |          警告信息统一处理           |     ✔     |

### ua 示例

```js
import { ua } from '@xuanmo/javascript-utils'

console.log(ua())
// console.log(ua('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'))
// {
//   "browser": "Chrome",
//   "browserZH": "Chrome",
//   "browserVersion": "96.0.4664.93",
//   "os": "Macintosh",
//   "osVersion": "10.15.7",
//   "device": "PC",
//   "engine": "WebKit"
// }
```