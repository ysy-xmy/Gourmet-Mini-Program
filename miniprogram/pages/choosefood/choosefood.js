var appdata=getApp()
wx.cloud.init()
const db = wx.cloud.database()
Page({
  data: {
    stop:false,
    food:'',
    setTime: null, //定时器
    page:20,
    foods:[],
    shops:[],
    random:0,
    shop:'',
    first:true,
    mode:"normal",
    price:['6-10元','11-15元','16-30元'],
    priceselectorIndex:1,
    type:['主食','小吃','饮料'],
    typeselectorIndex:0,
    shoprandom:0,
    foodrandom:0,
    select_foods:[],
    select_shops:[],
  },
  switch_mode(e){
    if(e.currentTarget.dataset.mode=='love'){
      this.setData({
        mode:"love"
      })
      let minprice=0
      let maxprice=0
      let type=''
      let select_food=[]
      // if( this.data.priceselectorIndex==0){
      //   minprice=5
      //   maxprice=10
      // }else if( this.data.priceselectorIndex==1){
      //   minprice=10
      //   maxprice=15
      // }else if( this.data.priceselectorIndex==2){
      //   minprice=15
      //   maxprice=30
      // }
      // if(this.data.typeselectorIndex==0){
      //   type='staple'
      // }else if (this.data.typeselectorIndex==1){
      //   type='snack'
      // }else if(this.data.typeselectorIndex==2){
      //   type='drink'
      // }
      let select_shops=[]
          for(let i=0;i<this.data.select_shops.length;i++){
            //this.data.select_foods[i].food_price>minprice && this.data.select_foods[i].food_price<=maxprice && this.data.select_foods[i].food_type==type &&
            if( this.data.myshopid.includes(this.data.select_shops[i]._id)){
              select_shops.push(this.data.select_shops[i])
            }
          }
          this.setData({
            select_shops:select_shops
          })
    }else{
      this.setData({
        mode:"normal"
      })
      this.setData({
        select_shops:this.data.shops
      })

    }
  },
  bindpriceSelectorChange: function(e) {
    this.setData({
      priceselectorIndex: e.detail.value
    })
    let minprice=0
    let maxprice=0
    let type=''
    let select_food=[]
    if( this.data.priceselectorIndex==0){
      minprice=5
      maxprice=10
    }else if( this.data.priceselectorIndex==1){
      minprice=10
      maxprice=15
    }else if( this.data.priceselectorIndex==2){
      minprice=15
      maxprice=30
    }
    if(this.data.typeselectorIndex==0){
      type='staple'
    }else if (this.data.typeselectorIndex==1){
      type='snack'
    }else if(this.data.typeselectorIndex==2){
      type='drink'
    }
    for(let i=0;i<this.data.foods.length;i++){
      if(this.data.foods[i].food_price>minprice && this.data.foods[i].food_price<=maxprice && this.data.foods[i].food_type==type){
        select_food.push(this.data.foods[i])
      }
    }

    this.setData({
      select_foods:select_food
    })

  },

  bindtypeSelectorChange: function(e) {
    this.setData({
      typeselectorIndex: e.detail.value
    })
    let minprice=0
    let maxprice=0
    let type=''
    let select_food=[]
    if( this.data.priceselectorIndex==0){
      minprice=5
      maxprice=10
    }else if( this.data.priceselectorIndex==1){
      minprice=10
      maxprice=15
    }else if( this.data.priceselectorIndex==2){
      minprice=15
      maxprice=30
    }
    if(this.data.typeselectorIndex==0){
      type='staple'
    }else if (this.data.typeselectorIndex==1){
      type='snack'
    }else if(this.data.typeselectorIndex==2){
      type='drink'
    }
    for(let i=0;i<this.data.foods.length;i++){
      if(this.data.foods[i].food_price>minprice && this.data.foods[i].food_price<=maxprice && this.data.foods[i].food_type==type){
        select_food.push(this.data.foods[i])
      }
    }
    this.setData({
      select_foods:select_food
    })
  },
  onLoad:async function () {
    const that=this
    const c = db.collection("food"); //获取集合中记录的总数
    const total = await (await c.count()).total
    const batchTimes = Math.ceil(total / 20)
    let arraypro = [] // 定义空数组 用来存储每一次获取到的记录 
    let x = 0 //这是一个标识每次循环就+1 当x等于batchTimes 说明已经到了最后一次获取数据的时候
    //没错，循环查询，看着就觉得很影响性能，但是么的办法。
    for (let i = 0; i < batchTimes; i++) {
      db.collection("food").skip(i * 20).get({
        success: function (res) {
          x += 1
          // 20个20个的获取 最后一次不够20 那就是剩下的
          for (let j = 0; j < res.data.length; j++) {
            arraypro.push(res.data[j])
          }
          //判断是否是最后一次，如果是说明已经不用再继续获取了，这时候就可以赋值了
          if (x == batchTimes) {
            that.setData({
              foods: arraypro
            })
          }
        }
      })
    }
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
              const _ = db.command
              db.collection('shop').where({
                shop_collection:_.in([appdata.globalData.openid])
              }).get({
                success:function (res){
                 let myshopid=[]
                 for(let i=0;i<res.data.length;i++){
                   myshopid.push(res.data[i]._id)
                 }
                 that.setData({
                   myshop:res.data,
                   myshopid:myshopid
                 })
                }
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
    this.setData({
      first:true
    })
    const that =this
    db.collection('shop').get({
      success:function(res){
        that.setData({
          shops:res.data,
          select_shops:res.data
        })

      
      }
    })
   
  },
  random(){
    const that=this
    if(that.data.first==true){
      that.setData({
        first:false
      })
    }
    if(this.data.stop==false){
      this.startCount()
     this.setData({
       stop:true
     })
    }
    else{
      this.setData({
        stop:false
      })
      db.collection("shop").doc(that.data.foods[that.data.foodrandom].shop_id).get({
        success:function(res){
           that.setData({
             shop:res.data
           })
          
        }
      })
      clearInterval(this.data.setTime)
    }
  },
getrandom(min,max){
    return Math.floor(Math.random()*(max-min-1)+min);
},
startCount: function () {
  const that = this;
  let shoprandom=that.getrandom(0,that.data.select_shops.length+1);
  let select_foods=[]
  that.setData({
    shoprandom:shoprandom
  })

  
  for(let i=0;i<that.data.foods.length;i++){
    if(that.data.select_shops[shoprandom]._id==that.data.foods[i].shop_id){
      select_foods.push(that.data.foods[i])
    }
  }
 
  that.data.setTime = setInterval(function(){
    let foodrandom=that.getrandom(0,select_foods.length+1);
    that.setData({
      foodrandom:foodrandom,
      select_foods:select_foods
    })
 
  }, 50);
},
toshopdetail(){
 
   wx.navigateTo({
     url: '../shopdetail/shopdetail?shopid='+this.data.select_foods[this.data.foodrandom].shop_id,
   })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
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
    const _this =this;
    //结束定时器
    clearInterval(_this.data.setTime)
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