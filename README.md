# JavaScript Utils
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
|工具名|描述|Nodejs 可用|
|:---:|:---:|:---:|
|isObject|是否为对象|Y|
|isRegexp|是否为正则表达式|Y|
|isFunction|是否为函数|Y|
|isImageUrl|判断 url 是否为图片路径|Y|
|isEmpty|是否为空|Y|
|toLowerCamelCase|下划线转小驼峰|Y|
|toUnderline|小驼峰转下划线分割|Y|
|formatThousandth|数字千分位|Y|
|countDown|倒计时|N|
|debounce|防抖|Y|
|deepCopy|深拷贝|Y|
|searchParams|获取 URL 单个查询参数|Y|
|formatQueryParams|获取 URL 全部查询参数|Y|
|createRandomID|生成随机 ID|Y|
|ua|对 `navigator.userAgent` 进行解析|N|