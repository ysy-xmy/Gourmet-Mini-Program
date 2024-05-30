var appdata=getApp()
wx.cloud.init()
const db = wx.cloud.database()
var util=require("../../utils/util")
Page({
  data: {
    imgs: [],
    count: 9,
    agreenum:0,
    imglistid:[],
    ratingValue: 0,
    shopid:'',

    
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
          cloudPath:  appdata.globalData.openid+random+'shopcomment.png',
          filePath: imgs[i],
          success(res) {
            console.log(res.fileID)
            imglistid.push(res.fileID)
  
            that.setData({
              imglistid:imglistid
            })
            var time= util.formatTime(new Date());
            const shopcomment = db.collection('shopcomment')
            
            let star=''
            for(var i=0;i<that.data.ratingValue;i++){
              star+='⭐'
            }
            let shop_star=star+that.data.ratingValue+'.0'
            if(imglistid.length ==imgs.length){
              shopcomment.add({
                data:{
                  poster_openid:appdata.globalData.openid,
                  shopcomment_agreenum:0,
                  shopcomment_date:time,
                  shop_id:that.data.shopid,
                  shopcomment_text:that.data.post_text,
                  shopcomment_images:imglistid,
                  commenter_avatar:appdata.globalData.userinfo.avatarUrl,
                  commenter_name:appdata.globalData.userinfo.nickName,
                  shop_consumption:20,
                  shop_star:shop_star
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
  onRatingChange: function (e) {
    const ratingValue = e.detail.value;
    this.setData({
      ratingValue: ratingValue,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.shopid)
    this.setData({
      shopid:options.shopid
    })
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
