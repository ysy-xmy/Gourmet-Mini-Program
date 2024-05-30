var appdata=getApp()
wx.cloud.init()
const db = wx.cloud.database()
var util=require("../../utils/util")
Page({
  data: {
    imgs: [],
    count: 9,
    poster_user_openid:"",
    agreenum:0,
    post_comments:[],
    post_date:"",
    post_shopid:"",
    post_tags:[],
    post_text:"",
    imglistid:[]
  },
  chooseImage() {
    const that =this
    wx.chooseImage({
      
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const imgs=that.data.imgs
        for(var a=0;a<res.tempFilePaths.length;a++){
          imgs.push(res.tempFilePaths[a])
        }
        
        this.setData({
          imgs: imgs
        })
      }
    })
  },
  uploadImage() {
    const that =this
    const imgs = that.data.imgs
    const imglistid=that.data.imglistid
    if(imgs.length==0){
      wx.showToast({
        title: '请至少选择一张图片', //提示的内容
        duration: 1000, //持续的时间
        icon: 'error', //图标有success、error、loading、none四种
        mask: true //显示透明蒙层 防止触摸穿透
     })
    }
    if(that.data.post_text==''){
      wx.showToast({
        title: '内容不能为空', //提示的内容
        duration: 1000, //持续的时间
        icon: 'error', //图标有success、error、loading、none四种
        mask: true //显示透明蒙层 防止触摸穿透
     })
    }else{
      for (let i = 0; i < imgs.length; i++) {
        var random =Math.random()*9999;
        wx.cloud.uploadFile({
          cloudPath:  "user_post_img/"+appdata.globalData.openid+random+'example.png',
          filePath: imgs[i],
          success(res) {
            console.log(res.fileID)
            imglistid.push(res.fileID)
            that.setData({
              imglistid:imglistid
            })
            var time= util.formatTime(new Date());
            const post = db.collection('post')
            if(imglistid.length ==imgs.length){
              post.add({
                data:{
                  poster_user_openid:appdata.globalData.openid,
                  agreenum:0,
                  post_comments:[],
                  post_date:time,
                  post_shopid:"",
                  post_tags:["哈"],
                  post_text:that.data.post_text,
                  post_images:imglistid
                }
              })
            }
            wx.showToast({
              title: '发布成功', //提示的内容
              duration: 1000, //持续的时间
              icon: 'success', //图标有success、error、loading、none四种
              mask: true //显示透明蒙层 防止触摸穿透
           })
            wx.navigateBack()
          },
          fail(err) {
            console.log(err)
          }
        })
      }
    }
    
   
   
  },
  previewImage(e) {
    const index=e.currentTarget.dataset.index
    console.log(this.data.imgs)
    console.log(this.data.imgs[0])
    wx.previewImage({
      current:this.data.imgs[index],
      urls: this.data.imgs
    })
 
  },
  deleteImg: function (e) {
    var that = this
    wx.showModal({
      title: "提示",
      content: "是否删除",
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < that.data.imgs.length; i++) {
            if (i == e.currentTarget.dataset.index) that.data.imgs.splice(i, 1)
          }
          that.setData({
            imgs: that.data.imgs
          })
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.init()
    wx.cloud.callFunction({
    name:'helloworld',
    data:{
      message:'helloCloud',
    }
  }).then(res=>{
    appdata.globalData.openid=res.result.userInfo.openId
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
