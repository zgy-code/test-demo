// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
  },

  getMovieList: function() {
    wx.showLoading({
      title: '加载中',  // 下滑显示加载中
    })
    wx.cloud.callFunction({
      name: 'movielist',
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      // console.log(res);
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subject_collection_items)  // 将取出来的数据转为JSON，截取需要的数据
      });
      wx.hideLoading(); //  隐藏 loading 提示框
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
    });
  },
  gotoComment: function(event) {
    wx.navigateTo({
      url: `../comment/comment?movieid=${event.target.dataset.movieid}`,
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovieList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getMovieList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})