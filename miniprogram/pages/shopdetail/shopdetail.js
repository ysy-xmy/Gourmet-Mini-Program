var appdata=getApp()
wx.cloud.init()
const db = wx.cloud.database()
Page({
  data: {
  show:false,
  shop:'',
  comments:[],
  shopid:'',
  collect:false,
  url:''
  },
  showcard(){
    if (this.data.show == true) {
      // 再点一下 取消选中
      this.setData({
        show:false
      })
    } else {
      this.setData({
        show:true
      })
    }
  },
  hidecard(){
    if (this.data.show == true) {
      // 再点一下 取消选中
      this.setData({
        show: false
      })
    } 
  },
  handlePan(evt) {
    "worklet";
    console.log(evt.translateX);
  },
  record(){
    if(appdata.globalData.hasuserinfo==true){
      wx.navigateTo({
        url: '../shopcommentpost/shopcommentpost?shopid='+this.data.shopid,
      })
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
order(){

  wx.navigateToMiniProgram({
    appId: 'wxc06d71ea1454b21b',
    shortLink:'#小程序://汉唐里/EC0qlSGUxy2Hhpg',
    envVersion: 'release',
    success(res) {
      // 打开成功
      console.log("打开成功")
    }
  })
},
// go(){
//   console.log(33)
//   wx.navigateToMiniProgram({
//     appId:'wxcd20c93f5dc475d1',
//     shortLink:'#小程序://地图标记工具/kTtvzviAPaZZQws',
//     envVersion: 'release',
//     success(res) {
//       // 打开成功
//       console.log("打开成功")
//     }
//   })

// },
like(){
  const that =this
  const _ = db.command
  if(appdata.globalData.hasuserinfo==true){
    if(that.data.collect){
      let collection=that.data.shop.shop_collection
      let index=collection.indexOf(appdata.globalData.openid)
       collection.splice(index,1) 
      db.collection('shop').doc(that.data.shopid).update({
        data:{
          shop_collection:collection
        }
      })
      that.setData({
        collect:false
      })
      wx.showToast({
        title: '取消收藏', //提示的内容
        duration: 1000, //持续的时间
        icon: 'none', //图标有success、error、loading、none四种
        mask: true //显示透明蒙层 防止触摸穿透
     })
      
    }else{
      db.collection('shop').doc(that.data.shopid).update({
        data:{
          shop_collection:_.push(appdata.globalData.openid)
        }
      })
      that.setData({
        collect:true
      })
      wx.showToast({
        title: '收藏成功', //提示的内容
        duration: 1000, //持续的时间
        icon: 'success', //图标有success、error、loading、none四种
        mask: true //显示透明蒙层 防止触摸穿透
     })
    }
     
   }else{
    this.nologintip()
   }
},
getUserProfile(e) {
  wx.getUserProfile({
    desc: '用于展示用户信息,提供服务',
    success: (res) => {
      appdata.globalData.userinfo = res.userInfo
      appdata.globalData.hasuserinfo = true
      console.log(res.userInfo)
      // Save user data to database
      const user = db.collection('user')
      user.add({
        data: {
          user_name: res.userInfo.nickName,
          user_avatar: res.userInfo.avatarUrl,
          user_signature: "请写下你的个性签名吧,这样别人才能更好地认识你"
        },
        success: function (res) {
          // Do nothing on success
        }
      })

      this.setData({
        hasuserinfo: true,
        userinfo: res.userInfo,
        user_signature: "请写下你的个性签名吧,这样别人才能更好地认识你"
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that=this
    console.log(options)
    that.setData({
      shopid:options.shopid
    })
    
  
    wx.cloud.callFunction({
      name: 'helloworld',
      data: {
        message: 'helloCloud',
      },
      success: (res) => {
        appdata.globalData.openid = res.result.userInfo.openId
        db.collection('user').where({
          _openid: res.result.userInfo.openId
        }).get({
          success: (res) => {
            db.collection('shop').doc(options.shopid).get({
              success: function (res) {
                console.log(res.data)
                const exists = res.data.shop_collection.includes(appdata.globalData.openid);
                if(exists){
                  that.setData({
                    collect:true
                  })
                }
                that.setData({
                  shop:res.data
                })
                console.log(that.data.shop._id)
                db.collection('shopcomment').where({
                  shop_id:that.data.shop._id
                }).get({
                  success:function(rees){
                    
                    that.setData({
                      comments:rees.data
                   })
                   console.log(that.data.comments)
                  }
                })
              }
            })
            if (res.data.length > 0) {
              appdata.globalData.hasuserinfo = true
              appdata.globalData.userinfo = {
                nickName: res.data[0].user_name,
                avatarUrl: res.data[0].user_avatar,
                user_signature: res.data[0].user_signature
              }
              that.setData({
                hasuserinfo: true,
                userinfo: appdata.globalData.userinfo
              })
            }
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  previewImage(e) {
    const idx=e.currentTarget.dataset.idx
    const idxs=e.currentTarget.dataset.idxs
    wx.previewImage({
      current:this.data.comments[idx].shopcomment_images[idxs],
      urls: this.data.comments[idx].shopcomment_images
    })
 
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
    console.log(44)
    const that=this
     const promise = new Promise(resolve => {
       setTimeout(() => {
         resolve({
           title: "这家店真不错，你也来看看吧",
           path: '../../pages/showlist/showlist'
         })
       }, 500)
     })
     return {
       title: "这家店真不错，你也来看看吧",
       path:"../../pages/showlist/showlist",
       promise 
     }
  }
})