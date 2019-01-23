import _ from './js/app-mp'
import getUserInfoHandler from './utils/getUserInfoHandler.js'

//app.js
App({
    onLaunch: function () {

        (new _.Chain()).link(function(that, next) {

            // wx登录获取code，用于注入ajax中heade；
            //该项必须处于最先，code用于所有ajax的请求头；
            wx.login({
                success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    that.globalData.$code = res.code;

                    next()
                }
            });
            
        }).link(function(that, next) {

            // 获取用户授权信息
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {

                        next();

                    } else {
                        // 未授权则进入授权页面
                        wx.redirectTo({
                            url: '/pages/authorization/authorization'
                        })
                    }
                }
            });

        }).link(function(that, next) {

            // 获取个人信息，包括头像昵称城市等；
            getUserInfoHandler.call(that, next)

        }).link(function(that, next) {

            // 调用获取信息成功回调；
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
