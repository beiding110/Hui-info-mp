//index.js
//获取应用实例
import _ from '../../../js/app-mp.js'
const app = getApp()
import codeGetter from '../../../utils/codeGetter.js'

Page({
    data: {
        userInfo: {
            avatarUrl: 'data:image/png;base64,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',
            nickName: '游客'
        },
        hasUserInfo: false,
        IsVip: false
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else{
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        };

        codeGetter.call(this, () => {
            this.queryInfo();
        });
    },
    onShow() {
        this.setData({
            IsVip: app.globalData.IsVip
        });

        if(app.globalData.reMobile) {
            this.queryInfo();
            app.globalData.reMobile = false;
        }
    },
    toBindPhone() {
        wx.navigateTo({
            url: '../phone/phone'
        })
    },
    toVipPay() {
        wx.navigateTo({
            url: '../vip-pay/vip-pay'
        })
    },
    toCollent() {
        wx.navigateTo({
            url: '../collect/collect'
        })
    },
    toInvoice() {
        wx.navigateTo({
            url: '../invoice/list/list'
        })
    },
    queryInfo() {
        _.$get('/Api/user/GetUserInfo', (data) => {
            data.VipEndDate = (data.VipEndDate || '').split(' ')[0];
            this.setData({
                form: data
            });
        })
    }
})
