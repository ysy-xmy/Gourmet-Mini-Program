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
    agreenum:99
  },
  agree(){
    const that =this
    if(appdata.globalData.hasuserinfo==true){
      console.log("点赞成功")
      let agreenum=that.data.agreenum
      agreenum++
      that.setData({
        agreenum:agreenum})
     }else{
      this.nologintip()
     }
  },
  comment(){
    const that =this
    if(appdata.globalData.hasuserinfo==true){
      
   
     }else{
      this.nologintip()
     }
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
        }
        })
      }
    })
  },



  onLoad(options) {

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