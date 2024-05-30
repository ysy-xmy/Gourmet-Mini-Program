var appdata=getApp()
wx.cloud.init()
const db = wx.cloud.database()
var util=require("../../utils/util")
var timestamp = require('../../utils/timestamp.js') //引入进行格式化时间
Page({
  data: {
    hasuserinfo:false,
    userinfo:{},
    user_signature:"",
    agreenum:0,
    post_id:"",
    imgs:[],
    tags:[],
    post_date:'',
    poster_user_openid:'',
    post_text:'',
    post_tags:[],
    post_shopid:'',
    post_comments:[],
    comment:false,
    comments:[],
    reply:false,
    index:0,
    showreply:false,
    agreepost:false,
    huifu:'',
    comment_text:''
  },
  agreecomment(e){
    const that =this
    const _ = db.command
    let index=e.currentTarget.dataset.index
    if(appdata.globalData.hasuserinfo==true){
      
      let comments=that.data.comments
      console.log(comments[index])
     if(comments[index].hadagreecomment==false){
      comments[index].commenter_agreenum++
      comments[index].hadagreecomment=true
      that.setData({
        comments:comments})
      console.log("点赞成功")
      db.collection('postcomment').doc(comments[index]._id).update({
        data:{
          commenter_agreenum:_.inc(1)
        }
      })



     }else{
      comments[index].commenter_agreenum--
      comments[index].hadagreecomment=false
      that.setData({
        comments:comments})
        console.log("消赞成功")
        db.collection('postcomment').doc(comments[index]._id).update({
          data:{
            commenter_agreenum:_.inc(-1)
          }
        })
     }

   
     }else{
      that.nologintip()
     }
  },
  agreereply(e){
    const that =this
    let idx=e.currentTarget.dataset.idx
    let idxs=e.currentTarget.dataset.idxs
    if(appdata.globalData.hasuserinfo==true){
      let comments=that.data.comments
      console.log(comments[idx].reply[idxs].agreereply)
     if(comments[idx].reply[idxs].agreereply==false){
      comments[idx].reply[idxs].agreereply=true
      let replys=comments[idx].reply
      replys[idxs].reply_agreenum++
      that.setData({
        comments:comments})
      console.log("点赞成功")
      db.collection('postcomment').doc(comments[idx]._id).update({
        data:{
          reply:replys
        }
      })

     }else{
      comments[idx].reply[idxs].agreereply=false
      let replys=comments[idx].reply
      replys[idxs].reply_agreenum--
      that.setData({
        comments:comments})
        console.log("消赞成功")
        db.collection('postcomment').doc(comments[idx]._id).update({
          data:{
            reply:replys
          }
        })
     }

   
     }else{
      that.nologintip()
     }
  },
  comment(){
    const that =this
    if(appdata.globalData.hasuserinfo==true){
      that.setData({
        comment:true,
        reply:false
      })
     }else{
      this.nologintip()
     }
  },
  exitcomment(){
    console.log(this.data.reply)
    if(this.data.comment==true||this.data.reply==true){
      console.log(44)
      this.setData({
        comment:false,
        reply:false
      })
    }
  
  },
reply(e){
  const that=this
  let index=e.currentTarget.dataset.index
  if(this.data.reply==false){
    let comments=that.data.comments
    this.setData({
      reply:true,
      comment:false,
      index:e.currentTarget.dataset.index,
      huifu:comments[index].commenter_name
    })

  }
},
showreply(e){

  let index=e.currentTarget.dataset.index
  if(this.data.comments[index].showreply==false){
    let comments=this.data.comments
    comments[index].showreply=true
    this.setData({
      comments:comments
    })
  }else if(this.data.comments[index].showreply==true){
    let comments=this.data.comments
    comments[index].showreply=false
    this.setData({
      comments:comments
    })
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
  bind_put(e){
    this.setData({
      comment_text:e.detail.value
    })
  },
  send(e){
    const idx=e.currentTarget.dataset.idx
    const idxs=e.currentTarget.dataset.idxs
    const that =this
    console.log(that.data.comment_text)
    if(that.data.comment_text==''){
      wx.showToast({
        title: '内容不能为空', //提示的内容
        duration: 1000, //持续的时间
        icon: 'error', //图标有success、error、loading、none四种
        mask: true //显示透明蒙层 防止触摸穿透
     })
    }else{
      if(that.data.comment==true){
        this.setData({
          comment:false,
        })
        var time= util.formatTime(new Date());
        const postcomment = db.collection('postcomment')
        
        postcomment.add({
          data:{
            post_id:that.data.post_id,
            commenter_openid:appdata.globalData.openid,
            comment_date:time,
            comment_text:that.data.comment_text,
            commenter_agreenum:0,
            commenter_name:appdata.globalData.userinfo.nickName,
            commenter_avatar:appdata.globalData.userinfo.avatarUrl,
            reply:[],
            hadagreecomment:false
          },
          success: function(rees) {
            const _ = db.command
              db.collection('post').doc(that.data.post_id).update({
                data: {
                  post_comments: _.push(rees._id),
                },
                success: function(res) {
                console.log("成功写入")
                db.collection('postcomment').doc(rees._id).get({
                  success: function(reees) {
                    let comments=that.data.comments
                    var stamp = timestamp.getDateTimeStamp(reees.data.comment_date)
                    var time = timestamp.getDateDiff(stamp);
                    reees.data.comment_date=time
                    comments.push(reees.data)
                    that.setData({
                      comments:comments
                    })
                    wx.showToast({
                      title: '评论成功', //提示的内容
                      duration: 1000, //持续的时间
                      icon: 'none', //图标有success、error、loading、none四种
                      mask: true //显示透明蒙层 防止触摸穿透
                   })
  
  
  
                  }
                })
                }
              })
          }
        })
        that.setData({
          comment_text:''
        })
  
  
      }else if(that.data.reply==true){
        that.setData({
          reply:false,
        })
        var time= util.formatTime(new Date());
        
        const _ = db.command
        let reply={}
        reply.reply_date=time
        reply.reply_text=that.data.comment_text
        reply.reply_agreenum=0
        reply.replyer_openid=appdata.globalData.openid
        reply.replyer_avatar=appdata.globalData.userinfo.avatarUrl
        reply.replyer_name=appdata.globalData.userinfo.nickName
        reply.agreereply=false
        db.collection('postcomment').doc(that.data.comments[that.data.index]._id).update({
          data: {
            reply: _.push(reply),
          },
          success:function(res){
            let comments = that.data.comments
            var stamp = timestamp.getDateTimeStamp(reply.reply_date)
            var time = timestamp.getDateDiff(stamp);
            reply.reply_date=time
            comments[that.data.index].reply.push(reply)
             that.setData({
               comments:comments
             })
             console.log(that.data.comments)
             that.setData({
              comment_text:''
            })
            wx.showToast({
              title: '回复成功', //提示的内容
              duration: 1000, //持续的时间
              icon: 'none', //图标有success、error、loading、none四种
              mask: true //显示透明蒙层 防止触摸穿透
           })
  
          }
        })
  
  
  
      }
    }
   
  },
  like(){
    if(appdata.globalData.hasuserinfo==true){
      if(this.data.agreepost==false){
        let agreenum=this.data.agreenum
        agreenum++
        this.setData({
          agreenum:agreenum,
          agreepost:true
        })
  
      }else{
        let agreenum=this.data.agreenum
        agreenum--
        this.setData({
          agreenum:agreenum,
          agreepost:false
        })
      }
     
    }else{ this.nologintip()}
   



    // db.collection('post').doc(this.data.post_id).get({
    //   success:function(res){
    //     // let replydata=
    //     console.log(res.data.agreeuser_id)
    //     var hadreply= res.data.agreeuser_id.indexOf(appdata.globalData.openid)
    //     console.log(hadreply)
    //     if(hadreply==-1||res.data.agreeuser_id.length==0){
    //       db.collection('post').doc(that.data.post_id).update({
    //         data:{
    //           agreeuser_id:_.push(appdata.globalData.openid)
    //         },
    //         success:function(res){
    //           console.log(res)
    //           let agreenum=that.data.agreenum
    //           agreenum++
    //           that.setData({
    //             agreenum:agreenum
    //           })
    //         }
    //       })
    //       console.log("没有评论过")
    //     }else{
    //       db.collection('post').doc(that.data.post_id).update({
    //         data:{
    //           agreeuser_id:_.push(appdata.globalData.openid)
    //         },
    //         success:function(res){
    //           console.log(res)
    //           let agreenum=that.data.agreenum
    //           agreenum--
    //           that.setData({
    //             agreenum:agreenum
    //           })
    //         }
    //       })
    //       console.log("评论过")
    //     }
         
        

    //   }
    // })


  },


  previewImage(e) {
    const index=e.currentTarget.dataset.index
    wx.previewImage({
      current:this.data.imgs[index],
      urls: this.data.imgs
    })
 
  },
  onLoad(options) {
    const that=this
    console.log(options.cardid)
    db.collection('post').doc(options.cardid).get({
      success: function(rees) {
        db.collection('user').where({
          _openid: rees.data.poster_user_openid
        }).get({
          success: function (res) {
            let userinfo={}
            userinfo.nickName=res.data[0].user_name
            userinfo.avatarUrl=res.data[0].user_avatar
            var stamp = timestamp.getDateTimeStamp(rees.data.post_date)
            var time = timestamp.getDateDiff(stamp);
           
        that.setData({
          post_id:options.cardid,
          imgs:rees.data.post_images,
          post_date:time,
          post_text:rees.data.post_text,
          post_tags:rees.data.post_tags,
          post_comments:rees.data.post_comments,
          post_shopid:rees.data.post_shopid,
          poster_user_openid:rees.data.poster_user_openid,
          userinfo:userinfo,
          agreenum:rees.data.agreenum
        })
        console.log("一共"+that.data.post_comments.length+"条评论")
        let comments=that.data.comments
        for (var i=0;i<that.data.post_comments.length;i++){
          db.collection('postcomment').doc(that.data.post_comments[i]).get({
            success:function(res){
              let yuandata=res.data
              console.log(res.data.commenter_openid)
              db.collection('user').where({
                _openid: res.data.commenter_openid
              }).get({
                success:function(rees){
                  var stamp = timestamp.getDateTimeStamp(res.data.comment_date)
            var time = timestamp.getDateDiff(stamp);
                  yuandata.commenter_avatar=rees.data[0].user_avatar
                  yuandata.commenter_name=rees.data[0].user_name
                  yuandata.showreply=false
                  yuandata.comment_date=time
                  for(var a=0;a<yuandata.reply.length;a++){
                    var stamp = timestamp.getDateTimeStamp(yuandata.reply[a].reply_date)
                    var time = timestamp.getDateDiff(stamp);
                    yuandata.reply[a].reply_date=time
                  
                  }



                  comments.push(yuandata)
                  if(comments.length==that.data.post_comments.length){
                    that.setData({
                      comments:comments
                    })
                    console.log(that.data.comments)
                  }
                }
              })
            }
          })
        }
          }})
      }
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
    if(appdata.globalData.hasuserinfo==true){
      console.log(appdata.globalData.hasuserinfo)
      this.setData({
        hasuserinfo:appdata.globalData.hasuserinfo,
        userinfo:appdata.globalData.userinfo,
       })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  onUnload() {
    const _ = db.command
    console.log(this.data.comments)
    if(this.data.agreepost==true){
      db.collection('post').doc(this.data.post_id).update({
        data:{
          agreeuser_id:_.push(appdata.globalData.openid),
          agreenum:_.inc(1)
        },
        success:function(res){
        }
      })
    }else{
      // db.collection('post').doc(this.data.post_id).update({
      //   data:{
      //     agreeuser_id:_.split(appdata.globalData.openid)
      //   },
      //   success:function(res){
      //   }
      // })
    }
    
             
      //         
      //           console.log(res)
      //           let agreenum=that.data.agreenum
      //           agreenum++
      //           that.setData({
      //             agreenum:agreenum
      //           })
      //         }
      //       })
      //       console.log("没有评论过")
      //     }else{
      //       db.collection('post').doc(that.data.post_id).update({
      //         data:{
      //           agreeuser_id:_.push(appdata.globalData.openid)
      //         },
      //         success:function(res){
      //           console.log(res)
      //           let agreenum=that.data.agreenum
      //           agreenum--
      //           that.setData({
      //             agreenum:agreenum
      //           })
      //         }
      //       })
      //       console.log("评论过")
      //     }
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