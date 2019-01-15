export default {
    showMsg(title, icon, callback) {
        wx.showToast({
            title,
            icon,//success、loading、none
            success: callback
        })
    },
    showMsgBox(content, callback) {
        wx.showModal({
            title: '提示',
            content,
            showCancel: false,
            confirmColor: '#BC86D6',
            success(confirm, cancle) {
                if(confirm) {
                    callback && callback()
                }
            }
        })
    },
    showConform(content, callback) {
        wx.showModal({
            title: '提示',
            content,
            confirmColor: '#BC86D6',
            success(confirm, cancle) {
                if(confirm) {
                    callback && callback()
                }
            }
        })
    }
}
