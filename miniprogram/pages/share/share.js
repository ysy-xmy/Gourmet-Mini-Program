// Page({
  // data: {
  //   list: [{
  //     name: '苏苏',
  //     num: '1',
  //     title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
  //     url: 'https://img0.baidu.com/it/u=1737323254,4261163827&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
  //     avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/4.png'
  //   },
  //   {
  //     name: '苏苏2',
  //     num: '1',
  //     title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
  //     url: 'https://img.syfabiao.com/zb_users/upload/2021/11/20211126212713163793323346099.jpg',
  //     avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/7.png'
  //   },
  //   {
  //     name: '苏苏3',
  //     num: '1',
  //     title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
  //     url: 'https://pic.616pic.com/photoone/00/02/71/618cf5f6aaf0c1249.jpg',
  //     avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/6.png'
  //   },
  //   {
  //     name: '苏苏4',
  //     num: '1',
  //     title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
  //     url: 'https://pic.616pic.com/photoone/00/00/15/618ce62dde8234327.jpg',
  //     avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/3.png'
  //   },
  //   {
  //     name: '苏苏5',
  //     num: '1',
  //     title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
  //     url: 'https://pic.616pic.com/ys_bnew_img/00/18/23/uckGozn4s8.jpg',
  //     avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png'
  //   },
  //   {
  //     name: '苏苏6',
  //     num: '1',
  //     title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
  //     url: 'https://img2.baidu.com/it/u=1960000388,340159438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
  //     avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png'
  //   },
  //   {
  //     name: '苏苏7',
  //     num: '1',
  //     title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
  //     url: 'https://img2.baidu.com/it/u=1960000388,340159438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
  //     avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png'
  //   },
  //   ]
//   }
// })

Page({

  /**
   * 页面的初始数据
   */
  data: {
     
      list: [{
        name: '苏苏',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://img0.baidu.com/it/u=1737323254,4261163827&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
        avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/4.png'
      },
      {
        name: '苏苏2',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://img.syfabiao.com/zb_users/upload/2021/11/20211126212713163793323346099.jpg',
        avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/7.png'
      },
      {
        name: '苏苏3',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://pic.616pic.com/photoone/00/02/71/618cf5f6aaf0c1249.jpg',
        avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/6.png'
      },
      {
        name: '苏苏4',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://pic.616pic.com/photoone/00/00/15/618ce62dde8234327.jpg',
        avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/3.png'
      },
      {
        name: '苏苏5',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://pic.616pic.com/ys_bnew_img/00/18/23/uckGozn4s8.jpg',
        avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/1.png'
      },
      {
        name: '苏苏6',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://img2.baidu.com/it/u=1960000388,340159438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
        avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png'
      },
      {
        name: '苏苏7',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://img2.baidu.com/it/u=1960000388,340159438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
        avatar: 'https://gitee.com/susuhhhhhh/su-sus-picture/raw/master/%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87/2.png'
      },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 1
    })
  }
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