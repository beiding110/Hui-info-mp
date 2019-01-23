//index.js
//获取应用实例
import _ from '../../js/app-mp'
const app = getApp()
import getUserInfoHandler from '../../utils/getUserInfoHandler.js'

Page({
    data: {
        motto: '您好，欢迎使用惠信息',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log(e);

        if(e.detail.errMsg && /fail/.test(e.detail.errMsg)) {
            _.showMsgBox('惠信息需要获取您的部分信息以提供更优质的服务');
        } else {
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            });

            getUserInfoHandler.call(app, function() {}, () => {
                wx.reLaunch({
                    url: '/pages/bidding/list/list'
                });
            });
        }
    }
})
