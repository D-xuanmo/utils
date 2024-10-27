const { ua } = require('../dist/index.cjs')

test('ua', () => {
  expect(ua('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36')).toEqual({
    browser: 'Chrome',
    browserZH: 'Chrome',
    browserVersion: '/',
    os: 'Macintosh',
    osVersion: '10.15.7',
    device: 'PC',
    engine: 'WebKit'
  })
})
