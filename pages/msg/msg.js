var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        text: '',
        type: '',

        iconType: '',
        isVip: app.globalData.IsVip
    },
    goBack() {
        wx.navigateBack();
    },
    goVipPay() {
        wx.redirectTo({
            url: '/pages/user/vip-pay/vip-pay'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var typeObj={
            success: 'success',
            warning: 'warn',
            error: 'cancel',
            info: 'info',
            waiting: 'waiting'
        };

        this.setData({
            title: unescape(options.title || ''),
            text: unescape(options.text || ''),

            iconType: typeObj[options.type || 'info']
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
