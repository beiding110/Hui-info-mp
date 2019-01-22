import _ from './js/app-mp'
import loginHandler from './utils/loginHandler.js'

//app.js
App({
    onLaunch: function () {

        (new _.Chain()).link(function(that, next) {

            // 登录
            wx.login({
                success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    that.globalData.$code = res.code;

                    next()
                }
            });

        }).link(function(that, next) {

            // 获取用户信息
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {

                        next();

                    } else {
                        wx.redirectTo({
                            url: '/pages/authorization/authorization'
                        })
                    }
                }
            });

        }).link(function(that, next) {

            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
                success: res => {
                    console.log(res)
                    // 可以将 res 发送给后台解码出 unionId
                    that.globalData.userInfo = res.userInfo;

                    //登录操作
                    loginHandler.call(that, res.userInfo)

                    next();
                }
            })

        }).link(function(that, next) {

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
            }

        }).run(this)

        const accountInfo = wx.getAccountInfoSync();
        this.globalData.$accountInfo = accountInfo;
    },
    globalData: {
        userInfo: null
    }
})
