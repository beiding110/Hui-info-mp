import _ from '../../../js/app-mp'

// pages/bidding/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {},
        collect: false,

        guid: '',
        type: ''
    },
    queryData() {
        var that = this,
            guid = this.data.guid,
            type = this.data.type;

        _.$get('/Api/Project/GetDetail', {
            id: guid,
            type: type
        }, (data) => {
            this.setData({
                detail: data || {},
                collect: data.Collection
            });
        })
    },
    collectUpdate(e) {
        this.setData({
            collect: e.detail
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            guid: options.guid,
            type: options.type
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.queryData()
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
