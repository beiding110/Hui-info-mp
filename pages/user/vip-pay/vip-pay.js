import _ from '../../../js/app-mp'
var app = getApp()
import loginHandler from '../../../utils/loginHandler.js'

// pages/user/vip-pay/vip-pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    dopay: function() {
        // var that = this;
        // _.$get('/Api/User/GetZhiFuUrl', {
        //     OpenID: app.globalData.srcOpenid || ''
        // }, function(data){
        //     var search = _.toSearch({
        //         src: data
        //     });
        //     wx.navigateTo({
        //         url: '/pages/webview' + search
        //     });
        // })

        _.$post('/Api/Payment/AddOrder', (data) => {
            data.success = (res) => {
                _.showMsg('惠信息套餐获取成功');
                app.globalData.reMobile = true;

                loginHandler.call(app, app.globalData.userInfo);
            };
            data.fail = (res) => {
                _.showMsg('支付失败');
            };
            data.complete = (res) => {
                console.log(res)
            }

            wx.requestPayment(data);
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
