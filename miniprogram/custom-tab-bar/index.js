Component({
  data: {
    selected: 0,
    selectedColor: "#3cc51f",
    backgroundColor:"#f6f6f6",
    borderStyle:"while",
    color:'#999999',
    selectedColor: "#3b82f6",
    list: [
      {
        pagePath: "../choosefood/choosefood",
        iconPath: "../images/foodicon.png",
        selectedIconPath: "../images/foodsected.png",
        text: "随机"
      },{
      pagePath: "../index/index",
      iconPath: "../images/index.png",
      selectedIconPath: "../images/index_select.png",
      text: "店家",
    },{
      pagePath: "../share/share",
      iconPath: "../images/find.png",
      selectedIconPath: "../images/find_select.png",
      text: "圈子"
    },
    {
      pagePath: "../my/my",
      iconPath: "../images/my.png",
      selectedIconPath: "../images/my_select.png",
      text: "我的"
    }
  ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({url})
    }
  }
})