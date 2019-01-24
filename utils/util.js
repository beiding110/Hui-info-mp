import _ from '../js/app-mp'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const vipTest = cb => {
    let app = getApp();

    if(!app.globalData.IsVip){
        let search = _.toSearch({
            type: 'error',
            title: '抱歉',
            text: '您未获取套餐，无权限查看此内容'
        });
        wx.navigateTo({
            url: '/pages/msg/msg' + search
        });
    } else {
        cb()
    }
}

module.exports = {
  formatTime: formatTime,
  vipTest
}
