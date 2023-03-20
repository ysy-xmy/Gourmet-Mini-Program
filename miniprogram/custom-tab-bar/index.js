Component({
  data: {
    selected: 0,
    selectedColor: "#3cc51f",
    backgroundColor:"#f6f6f6",
    borderStyle:"while",
    color: "#353536",
    selectedColor: "#76b510",
    list: [{
      pagePath: "../index/index",
      iconPath: "../images/index.png",
      selectedIconPath: "../images/index_select.png",
      text: ""
    }, {
      pagePath: "../share/share",
      iconPath: "../images/index.png",
      selectedIconPath: "../images/index_select.png",
      text: ""
    },{
      pagePath: "../my/my",
      iconPath: "../images/index.png",
      selectedIconPath: "../images/index_select.png",
      text: ""
    }
  ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})