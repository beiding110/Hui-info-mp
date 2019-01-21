var app = getApp()
import codeGetter from '../../../utils/codeGetter.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tableData: []
    },
    tableDataUpdate(e) {
        this.setData({
            tableData: e.detail
        })
    },
    queryData() {
        this.selectComponent('#scrollLoder').reload();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        codeGetter.call(this, () => {
            this.queryData();
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
        console.log('show')
        this.queryData()
        if(app.globalData.traceSign){
            this.queryData();
            app.globalData.traceSign = false;
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
