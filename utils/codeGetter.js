export default function(cb) {
    //用于验证是否已获取到wx.login中的code
    let app = getApp();

    if(app.globalData.$code) {
        cb && cb();
    } else {
        app.wxLoginCallback = function(code) {
            cb && cb();
        }
    }
}
