wx.cloud.init()
const db = wx.cloud.database()
const appdata = getApp()
var timestamp = require('../../utils/timestamp.js') //引入进行格式化时间
Page({
  data: {
    hasuserinfo: false,
    userinfo: {},
    user_signature: "请写下你的个性签名吧,这样别人才能更好地认识你",
    change_name:false,
    inputname:'',
    changesignature:false,
    inputsignature:'',
    avatarimg:'',
    mycomments:[],
    myshop:[],
    chosen:0
  },
  changename(){
   this.setData({
    change_name:true
   })
  },
  changenameconfirm(){
    const that =this
    db.collection('user').where({
      _openid: appdata.globalData.openid
    }).get({
      success: (res) => {
        db.collection('user').doc(res.data[0]._id).update({
          data:{
            user_name:that.data.inputname
          },
          success: function(res) {
            let userinfo=that.data.userinfo
            userinfo.nickName=that.data.inputname
            that.setData({
              userinfo:userinfo
            })
            wx.showToast({
              title: '更改完成', //提示的内容
              duration: 2000, //持续的时间
              icon: 'success', //图标有success、error、loading、none四种
              mask: true //显示透明蒙层 防止触摸穿透
           })
          }
        })
      }})
  this.setData({
    change_name:false
  })
  },
  changenamecancel(){
    this.setData({
      change_name:false
    })
  },
  changesignature(){
    this.setData({
      changesignature:true
    })
  },
  changesignatureconfirm(){
    const that =this
    db.collection('user').where({
      _openid: appdata.globalData.openid
    }).get({
      success: (res) => {
        db.collection('user').doc(res.data[0]._id).update({
          data:{
            user_signature:that.data.inputsignature
          },
          success: function(res) {
            let userinfo=that.data.userinfo
            userinfo.user_signature=that.data.inputsignature
            that.setData({
              userinfo:userinfo
            })
            wx.showToast({
              title: '更改完成', //提示的内容
              duration: 2000, //持续的时间
              icon: 'success', //图标有success、error、loading、none四种
              mask: true //显示透明蒙层 防止触摸穿透
           })
          }
        })
      }})
      this.setData({
        changesignature:false
      })
  },
  changesignaturecancel(){
    this.setData({
      changesignature:false
    })
  },
  chooseImagetobg() {
    const that =this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (rees) => {
        let userinfo=that.data.userinfo
        userinfo.bgurl=rees.tempFilePaths[0]
        that.setData({
          userinfo:userinfo
        })
        wx.showToast({
          title: '更改完成', //提示的内容
          duration: 1000, //持续的时间
          icon: 'success', //图标有success、error、loading、none四种
          mask: true //显示透明蒙层 防止触摸穿透
       })
       var random =Math.random()*9999;
      wx.cloud.uploadFile({
        cloudPath:  "user_bg/"+appdata.globalData.openid+random+'avatar.png',
        filePath: rees.tempFilePaths[0],
        success(reees) {
          console.log(reees.fileID)
          db.collection('user').where({
            _openid: appdata.globalData.openid
          }).get({
            success: (res) => {

              db.collection('user').doc(res.data[0]._id).update({
                data:{
                  bgurl:reees.fileID
                },
              })
            }


          })


      }
    })
  }})},
  chooseImage() {
    const that =this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (rees) => {
        let userinfo=that.data.userinfo
        userinfo.avatarUrl=rees.tempFilePaths[0]
        that.setData({
          userinfo:userinfo
        })
        wx.showToast({
          title: '更改完成', //提示的内容
          duration: 1000, //持续的时间
          icon: 'success', //图标有success、error、loading、none四种
          mask: true //显示透明蒙层 防止触摸穿透
       })
       var random =Math.random()*9999;
      wx.cloud.uploadFile({
        cloudPath:  "user_avatar/"+appdata.globalData.openid+random+'avatar.png',
        filePath: rees.tempFilePaths[0],
        success(reees) {
          console.log(reees.fileID)
          db.collection('user').where({
            _openid: appdata.globalData.openid
          }).get({
            success: (res) => {

              db.collection('user').doc(res.data[0]._id).update({
                data:{
                  user_avatar:reees.fileID,
                  avatarUrl:reees.fileID
                },
              })
            }
          })


      }
    })
  }})},

  enterpostdetail(e){
    let index=e.currentTarget.dataset.index
   wx.navigateTo({
     url: '../postdetail/postdetail?cardid='+this.data.mycomments[index]._id,
   })
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
  entershopdetail(e){
    wx.navigateTo({
   url: '../shopdetail/shopdetail?shopid='+this.data.myshop[e.currentTarget.dataset.index]._id,
 })},
 choosetiezi(){
   this.setData({
     chosen:0
   })
 },
 choosecollect(){
 this.setData({
   chosen:1
 })
 },
  onLoad(options) {
    const that =this
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
                user_signature: res.data[0].user_signature,
                bgurl:res.data[0].bgurl
              }
             

              that.setData({
                hasuserinfo: true,
                userinfo: appdata.globalData.userinfo
              })
              console.log(that.data.userinfo)
              db.collection('post').where({
                poster_user_openid:appdata.globalData.openid
              }).get({
                success:function (res) {
                  console.log(res)
                  let data=res.data
                  for(var i=0;i<res.data.length;i++){
                    var stamp = timestamp.getDateTimeStamp(data[i].post_date)
                     var time = timestamp.getDateDiff(stamp);
                    data[i].post_date=time
                  }
                  that.setData({
                    mycomments:data
                  })
                }
              })
              const _ = db.command
              db.collection('shop').where({
                shop_collection:_.in([appdata.globalData.openid])
              }).get({
                success:function (res){
                 console.log(res.data)
                 that.setData({
                   myshop:res.data
                 })
                }
              })
            }
          }
        })
      }
    })
  },

  onShow() {
    if (appdata.globalData.hasuserinfo) {
      console.log(appdata.globalData.hasuserinfo)
      this.setData({
        hasuserinfo: true,
        userinfo: appdata.globalData.userinfo
      })
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  }
})