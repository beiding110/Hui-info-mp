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

    if(!app.globalData.IsVip && !app.globalData.IsTry){
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

const timeBeforeCalc = function(time) {
  // time = '2019/08/01 09:40:00';
  if(!time) return;
  time = time.replace(/\-/g, '/');
  var oldtime = new Date(time),
      now = new Date(),
      delta = 0,
      oldtime_s,
      now_s,
      returnVal;

  oldtime_s = oldtime.getTime();
  now_s = now.getTime();
  delta = now_s - oldtime_s;

  if(delta / (1000 * 60 * 60) < 1) {
      //小于1h；
      return Math.ceil(delta / (1000 * 60)) + '分钟前';
  } else if(delta / (1000 * 60 * 60 * 24) < 1) {
      //小于1天
      return Math.ceil(delta / (1000 * 60 * 60)) + '小时前';
  } else if(delta / (1000 * 60 * 60 * 24 * 7) < 1) {
      //小于7天
      return Math.ceil(delta / (1000 * 60 * 60 * 24)) + '天前';
  } else if(oldtime.getFullYear() === now.getFullYear()) {
      //同年
      return oldtime.Format('MM-dd');
  } else {
      return oldtime.Format('yyyy-MM-dd');
  }
};

module.exports = {
  formatTime: formatTime,
  vipTest,
  timeBeforeCalc
}
