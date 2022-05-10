// app.js
//为解决异步对调地狱问题引入promise插件
import {promisify, promisifyAll} from 'miniprogram-api-promise'
//以后可以通过wx.p调用微信的方法
const wxp=wx.p={}
//将微信所有对象promise化后挂载到wxp上
promisifyAll(wx,wxp)


App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
