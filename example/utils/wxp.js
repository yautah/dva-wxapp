import { promisifyAll, promisify } from 'miniprogram-api-promise'

/* globals wx, getApp, getCurrentPages */
const wxp = {
  // getApp() 优雅的封装
  get app() {
    return getApp()
  },

  // getCurrentPages() 优雅的封装
  getCurrentPages() {
    return getCurrentPages()
  },
}

promisifyAll(wx, wxp)

export default wxp
