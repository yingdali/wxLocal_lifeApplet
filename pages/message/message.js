// pages/message/message.js 
//导入全局共享数据包和js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //storeBindings 自定义属性 将store，filed，actions挂载到this上
    this.storeBindings=createStoreBindings(this,{
      //指定要绑定的store
      store,
      //指定要绑定的属性fields这些属性都是固定的，不是自定义属性，写错的话不报错但是不出现值
      fields:['numA','numB','sum'],
      //方法
      actions:['updateNum1']
    })
    // console.log(this.storeBindings);
  },


  btnHandler1(e){
    // console.log(e);
    this.updateNum1(e.target.dataset.step)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //页面卸载时销毁共享数据
    this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})