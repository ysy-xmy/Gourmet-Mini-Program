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
    user_signature:""
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
        console.log(res.userInfo)
        that.setData({
          hasuserinfo:appdata.globalData.hasuserinfo,
          userinfo:appdata.globalData.userinfo,
          user_signature:"请写下你的个性签名吧,这样别人才能更好地认识你"
        })
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
        }
        })
       
        

        
      }
    })
  },



  onLoad(options) {
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
      that.setData({
        hasuserinfo: appdata.globalData.hasuserinfo,
        userinfo:userinfo,
        user_signature:userinfo.user_signature
      })
    }}
  
  })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

    this.setData({
      hasuserinfo:appdata.globalData.hasuserinfo,
      userinfo:appdata.globalData.userinfo,
      user_signature:appdata.globalData.userinfo.user_signature
     })



    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */



  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})