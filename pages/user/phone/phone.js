import _ from '../../../js/app-mp'
var app = getApp()

// pages/user/phone/phone.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            Mobile: ''
        }
    },
    bindMobile() {
        this.selectComponent('#form').validate((res) => {
            if(res){
                _.$post('/Api/user/BangDingMobile', {
                    Mobile: this.data.form.Mobile
                }, (data) => {
                    _.showMsgBox('绑定成功', function(){
                        wx.navigateBack();
                        app.globalData.reMobile = true;
                    })
                })
            }else{
                return false;
            }
        })
    },
    formMobileUpdate(e) {
        this.setData({
            'form.Mobile': e.detail
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
