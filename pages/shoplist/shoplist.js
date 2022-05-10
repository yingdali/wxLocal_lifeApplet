// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   * page:1默认展示1页数据， pageSize:10显示10条，total当前页面下总数据条数，shopList所有商品信息
   */
  data: {
    query:{},
    shopList:[],
    page:1,
    pageSize:10,
    total:0,
    //1.设置节流开关
    isLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
    query:options
   })

   //调用请求列表数据方法
   this.getShopList()
  },

  getShopList(gb){
    //2开启节流开关
    this.setData({
    isLoading:true
    })
    //展示loading效果
    wx.showLoading({
      title: '数据加载中',
    })
     wx.request({
       url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
       method:'GET',
       data:{
       _page:this.data.page,
       _limit:this.data.pageSize
       },
       success:(res)=>{
        console.log(res);
        this.setData({
          //将老数据和新数据进行拼接
          shopList:[...this.data.shopList,...res.data],
          //total当前页面显示条数，-0是将字符串转为数字
          total:res.header['X-Total-Count']-0
        })
       },
       complete:()=>{
         //隐藏loading效果
         wx.hideLoading()
             //关闭节流开关
          this.setData({
            isLoading:false
            })
            //如果外部传递gb参数了执行gb方法
            // console.log(gb);
            gb&&gb()
       }
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title:this.data.query.title
    })
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //需要重置关键的数据 重新发起数据请求
    this.setData({
      page:1,
      shopList:[],
      total:0
    })
    //重新发起数据请求
    //关闭真机上，上拉刷新加载效果
    //相当于在这里传递了gb
    this.getShopList(()=>{
      wx.stopPullDownRefresh();
    })


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.Page+this.data.pageSize>=this.data.total){
      //证明没有下一页数据了
      return wx.showToast({
        title: '数据加载完毕！',
        icon:'none'
      })

    }

    //3判断是否正在加载其他数据 如果节流阀关闭 跳出方法 
    //每次只有请求数据的时候节流阀是开启的，其他时候上拉触底都return
    // console.log(this.data.isLoading) false;
    if(this.data.isLoading) return

    //页面刷新事件触发距离底部200px时，页码+1
    this.setData({
      page:this.page+1
    })
    //调用加载页面请求，加载下一页
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})