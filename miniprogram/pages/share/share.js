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
var appdata=getApp()
wx.cloud.init()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasuserinfo:false,
    userinfo:{},
    user_signature:"",
      list: [{
        name: '苏苏',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://img0.baidu.com/it/u=1737323254,4261163827&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
        avatar: 'https://img0.baidu.com/it/u=794322571,4010439746&fm=253&fmt=auto&app=138&f=JPEG?w=513&h=500'
      },
      {
        name: '苏苏2',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://img.syfabiao.com/zb_users/upload/2021/11/20211126212713163793323346099.jpg',
        avatar: 'https://img0.baidu.com/it/u=794322571,4010439746&fm=253&fmt=auto&app=138&f=JPEG?w=513&h=500'
      },
      {
        name: '苏苏3',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://pic.616pic.com/photoone/00/02/71/618cf5f6aaf0c1249.jpg',
        avatar: 'https://img0.baidu.com/it/u=794322571,4010439746&fm=253&fmt=auto&app=138&f=JPEG?w=513&h=500'
      },
      {
        name: '苏苏4',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://pic.616pic.com/photoone/00/00/15/618ce62dde8234327.jpg',
        avatar: 'https://img0.baidu.com/it/u=794322571,4010439746&fm=253&fmt=auto&app=138&f=JPEG?w=513&h=500'
      },
      {
        name: '苏苏5',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://pic.616pic.com/ys_bnew_img/00/18/23/uckGozn4s8.jpg',
        avatar: 'https://img0.baidu.com/it/u=794322571,4010439746&fm=253&fmt=auto&app=138&f=JPEG?w=513&h=500'
      },
      {
        name: '苏苏6',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://img2.baidu.com/it/u=1960000388,340159438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
        avatar: 'https://img0.baidu.com/it/u=794322571,4010439746&fm=253&fmt=auto&app=138&f=JPEG?w=513&h=500'
      },
      {
        name: '苏苏7',
        num: '1',
        title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
        url: 'https://img2.baidu.com/it/u=1960000388,340159438&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
        avatar: 'https://img0.baidu.com/it/u=794322571,4010439746&fm=253&fmt=auto&app=138&f=JPEG?w=513&h=500'
      },
      ]
  },

 enterpostdetail(){
  wx.navigateTo({
    url: '../postdetail/postdetail',
    
  })
 },
 getUserProfile(e) {
  const that=this
  wx.getUserProfile({
    desc: '用于展示用户信息,提供服务', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      var appdata=getApp()
      appdata.globalData.userinfo=res.userInfo
      appdata.globalData.hasuserinfo=true
      const user = db.collection('user')
      user.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          user_name:res.userInfo.nickName,
          user_avatar:res.userInfo.avatarUrl,
          user_signature:"请写下你的个性签名吧,这样别人才能更好地认识你"
        },
      success: function(res) {
        //  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        // db.collection('user_message').doc(res._id).get({
        //   success: function(res) {
        //     // res.data 包含该记录的数据
        //     appdata.globalData.openId=res.data._openId
        //     // appdata.globalData._id=res.data._id
        //   }
        // })
        wx.navigateTo({
          url: '../post/post',
        })
      }
      })
     
      

      
    }
  })
},
 nologintip:function () {
   const that =this
  wx.showModal({
    title: '你还没有登录',
    content: '该功能需要登录后再使用',
    success (res) {
      if (res.confirm) {
        that.getUserProfile()
        
      } else if (res.cancel) {
        
      }
    }
  })
},
 add(){
   if(appdata.globalData.hasuserinfo==true){
    wx.navigateTo({
      url: '../post/post',
    })
   }else{
    this.nologintip()

   }



 },
  onLoad: function (options) {
    const that =this
    wx.cloud.init()
    wx.cloud.callFunction({
    name:'helloworld',
    data:{
      message:'helloCloud',
    }
  }).then(res=>{
    appdata.globalData.openid=res.result.userInfo.openId
  })
   
  db.collection('user').where({
    _openid: appdata.globalData.openid
  }).get({
    success: function (res) {
      if(res.data.length>0){
      appdata.globalData.hasuserinfo=true//标明已获取到用户信息
      let userinfo=that.data.userinfo
      userinfo.nickName=res.data[0].user_name
      userinfo.avatarUrl=res.data[0].user_avatar
      userinfo.user_signature=res.data[0].user_signature
      appdata.globalData.userinfo=userinfo//全局拿到用户信息
    }}
  
  })




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
    if(appdata.globalData.hasuserinfo==true){
      console.log(appdata.globalData.hasuserinfo)
      this.setData({
        hasuserinfo:appdata.globalData.hasuserinfo,
        userinfo:appdata.globalData.userinfo,
       })


    }



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