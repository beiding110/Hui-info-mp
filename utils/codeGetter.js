export default function(cb) {
    let app = getApp();

    if(app.globalData.$code) {
        cb && cb();
    } else {
        app.wxLoginCallback = function(code) {
            cb && cb();
        }
    }
}
