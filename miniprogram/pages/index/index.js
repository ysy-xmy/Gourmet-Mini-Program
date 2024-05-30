wx.cloud.init()
const db = wx.cloud.database()
const appdata = getApp()
var util=require("../../utils/util")
Page({
  data: {
    list:["美食","玩乐"],
    current:0,
    shops:[],
    page:20,
    play:[],
    message:false,
    inputmessage:''
  },
  entershoplist(e){
    console.log(e.currentTarget.dataset.type)
    let type=e.currentTarget.dataset.type
   wx.navigateTo({
     url: '../showlist/showlist?type='+type,
   })
  },
  entermessage(e){
    this.setData({
        message:true
    })
  },
  sendcancel(){
    this.setData({
        message:false
    })
  },
  sendconfirm(){
   
  
    
    var time= util.formatTime(new Date());
    const message = db.collection('message')
    message.add({
        data:{
            message:this.data.inputmessage,
            time:time,
        }
    })
    wx.showToast({
        title: '已发送', //提示的内容
        duration: 2000, //持续的时间
        icon: 'success', //图标有success、error、loading、none四种
        mask: true //显示透明蒙层 防止触摸穿透
     })
     this.setData({
        message:false
    })
  },


  handleClick(e){
    console.log(e.currentTarget.dataset.index)
  },
  handleEvent(e){
    this.setData({
      current:e.detail
    })
    console.log(e.detail)
  },
  enterpassage(e){
    console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: '../passage/passage?url='+e.currentTarget.dataset.url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  entershoplistall(){
    wx.navigateTo({
      url: '../showlist/showlist',
    })

  },
  entershopdetail(e){
    console.log(e.currentTarget.dataset.index)
    if(e.currentTarget.dataset.type=='food'){
      wx.navigateTo({
        url: '../shopdetail/shopdetail?shopid='+this.data.shops[e.currentTarget.dataset.index]._id,
      })
    }else{
      wx.navigateTo({
        url: '../shopdetail/shopdetail?shopid='+this.data.play[e.currentTarget.dataset.index]._id,
      })
    }

  },
  onLoad: function (options) {
    const that=this
    wx.cloud.callFunction({
      name: 'helloworld',
      data: {
        message: 'helloCloud',
      },
      success: (res) => {
        appdata.globalData.openid = res.result.userInfo.openId
        console.log(res.result.userInfo.openId)

        // Load user data from database
        db.collection('user').where({
          _openid: res.result.userInfo.openId
        }).get({
          success: (res) => {
            console.log(res.data)
            if (res.data.length > 0) {
              appdata.globalData.hasuserinfo = true
              appdata.globalData.userinfo = {
                nickName: res.data[0].user_name,
                avatarUrl: res.data[0].user_avatar,
                user_signature: res.data[0].user_signature
              }
              console.log(appdata.globalData.userinfo)
              this.setData({
                hasuserinfo: true,
                userinfo: appdata.globalData.userinfo
              })
            }
            db.collection('shop').get({
              success:function (res) {
                for (let i = 0; i < res.data.length; i++) { 
                  var type = res.data[i].shop_type
                  var otherlist = []
                  var foodlist = []
                  if(type=="food"){
                    foodlist[0]={shop:res.data[i]}
                  
                    that.setData({
                      shops:that.data.shops.concat(foodlist[0].shop)
                    })
                  }
                  else{
                    otherlist[0]={shop:res.data[i]}
                    that.setData({
                      play:that.data.play.concat(otherlist[0].shop)
                  })
                  console.log(otherlist)
               }
                }
              }
            })

          }
        })
      }
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
    const that =this
    var page=that.data.page
    db.collection('shop').skip(page).where({
      shop_type:'food'
    }).get({
      success:function (res) {
        var olddata=that.data.shops
        console.log(res.data.length)
        var newdata=olddata.concat(res.data)
        page=page+res.data.length
        that.setData({
            shops:newdata,
            page:page
        })
        console.log(that.data.page)
      }
    })
  },

  onShareAppMessage: function () {
    
  }
})