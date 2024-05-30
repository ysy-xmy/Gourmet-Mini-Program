var appdata=getApp()
wx.cloud.init()
const db = wx.cloud.database()
Page({
  data: {
       type:'',
       shop:[],//要展示的shop
       search_value:'',
       allshop:[]//存储所有的shop
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad:async function (options) {
    const that=this
  if(options.type){
    db.collection('shop').where({
      shop_type:options.type
    }).get({
      success:function (res) {
        console.log(res.data)
        that.setData({
          shop:res.data,
          allshop:res.data
        })
      }
    })
  }else{
    const c = db.collection("shop"); //获取集合中记录的总数
    const total = await (await c.count()).total
    const batchTimes = Math.ceil(total / 20)
    console.log(batchTimes) //计算需要获取几次  比如你有36条数据就要获取两次 第一次20条第二次16条
    let arraypro = [] // 定义空数组 用来存储每一次获取到的记录 
    let x = 0 //这是一个标识每次循环就+1 当x等于batchTimes 说明已经到了最后一次获取数据的时候
    //没错，循环查询，看着就觉得很影响性能，但是么的办法。
    for (let i = 0; i < batchTimes; i++) {
    //分组获取
      db.collection("shop").skip(i * 20).get({
        success: function (res) {
          x += 1
          // 20个20个的获取 最后一次不够20 那就是剩下的
          for (let j = 0; j < res.data.length; j++) {
            arraypro.push(res.data[j])
          }
          //判断是否是最后一次，如果是说明已经不用再继续获取了，这时候就可以赋值了
          if (x == batchTimes) {
            console.log(arraypro)
            that.setData({
              allshop: arraypro,
              shop:arraypro
            })
          }
        }
      })
    }











    
  }
   
   

 


    





    // db.collection('food').get({
    //   success:function (res) {
    //     console.log(res.data)
    //     that.setData({
    //         foods:res.data
    //     })

    //   }
    // })
    // for(var i=0;i<3;i++){
    //   var page=that.data.page
    //   db.collection('food').skip(page).get({
    //     success:function (res) {
    //       var olddata=that.data.foods
    //       var newdata=olddata.concat(res.data)
    //       page=page+res.data.length
    //       that.setData({
    //           shops:newdata,
    //           page:page
    //       })
    //     }
    //   })
    // }
  
   
  },







  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  entershopdetail(e){
      wx.navigateTo({
        url: '../shopdetail/shopdetail?shopid='+this.data.shop[e.currentTarget.dataset.index]._id,
      })
  },
    search(){
      
      if(this.data.search_value){
        console.log(this.data.search_value)
        let allshop=this.data.allshop
        let newshop=[]
        for(let i=0;i<allshop.length;i++){
          console.log()
          if(allshop[i].shop_name.includes(this.data.search_value)){
            newshop.push(allshop[i])
          }
        }
        this.setData({
          shop:newshop
        })


        
      }
      else{
        this.setData({
          shop:this.data.allshop
        })
      }
  




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
  onReachBottom() {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})