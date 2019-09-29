import _ from '../../../js/app-mp'

// pages/bidding/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {},
        collect: false,

        labelWidth: '80px',

        guid: '',
        type: '',

        timeFormatter: function(){}
    },
    queryData() {
        var that = this,
            guid = this.data.guid,
            type = this.data.type;

        _.$get('/Api/Biding/GetDetail', {
            id: guid,
            type: type
        }, (data) => {

            if(type==='GongShi') {
                data.publicity_content = this.richTableToLongTable(data.publicity_content);
                data.bulletin_issue_time = this.timeBeforeCalc(this.timeFormatter(data.bulletin_issue_time));
            } else {
                data.Content = this.contentTableToMobileGg(data.Content);
                data.PubInWebDate = this.timeBeforeCalc(this.timeFormatter(data.PubInWebDate));
            };

            this.setData({
                detail: data || {},
                collect: data.Collection
            });
        })
    },
    collectUpdate(e) {
        this.setData({
            collect: e.detail
        })
    },
    timeFormatter(time){
        if(/-/.test(time)) {
            return time.split(' ')[0];
        };

        try{
            var yyyy = time.substring(0,4);
            var MM = time.substring(4,6);
            var dd = time.substring(6,8);
            return yyyy + '-' + MM + '-' + dd;
        }catch(e){}
    },
    /**
     * 计算目标时间距当前时间间隔
     * @param  {string} time 目标时间
     * @return {String}      计算结果
     */
    timeBeforeCalc(time) {
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
    },
    contentTableToMobileGg (str) {
        if(this.detailType !== 'GongGao') return str;

        function DtableBuilder(obj) {
            this.init(obj);
        };
        DtableBuilder.prototype = {
            init (obj) {
                this.$str = '<div class="table-rebuild"><div class="table-title">' + obj.title + '</div>';
            },
            add (item) {
                this.$str += ('<div class="table-row">' +
                    '<div class="table-label">' + item.label + '</div>' +
                    '<div class="table-value">' + item.value + '</div>' +
                '</div>');
            },
            print () {
                this.$str += '</div>';
                return this.$str;
            }
        };

        var patt_table = new RegExp("<table.*?>((?:.|\n)+?)<\/table>","g"),
            patt_td = new RegExp("<td.*?>((?:.|\n)+?)<\/td>","g");

        var res_teble, res_td;

        while ((res_teble = patt_table.exec(str)) != null)  {

            var res_arr = [], counter = 1;
            var tablebody = res_teble[1];

            while ((res_td = patt_td.exec(tablebody)) != null)  {
                // console.log(res_td)

                if(counter % 2) {
                    res_arr.push({});
                    res_arr[res_arr.length - 1].label = res_td[1];
                } else {
                    res_arr[res_arr.length - 1].value = res_td[1];
                }

                counter ++;
            };

            var rebuild_str = '';
            var rebuild_str_zbr = new DtableBuilder({title: '招标人'}),
                rebuild_str_dl = new DtableBuilder({title: '招标代理机构'});
            res_arr.forEach(function(item, index) {
                if(!(index % 2)) {
                    rebuild_str_zbr.add(item);
                } else {
                    rebuild_str_dl.add(item);
                }
            });

            rebuild_str = rebuild_str_zbr.print() + rebuild_str_dl.print();

            str = str.replace(res_teble[0], rebuild_str);
        };

        return str
    },
    richTableToLongTable(str) {
        var patt_table = new RegExp("<table.*?>((?:.|\n)+?)<\/table>","g");

        var res_teble, res_td;

        while ((res_teble = patt_table.exec(str)) != null)  {

            var tablebody = res_teble[0],
                rebuild_str = '';

            rebuild_str = '<div class="long-table-scroll-con">' + tablebody + '</div>';

            str = str.replace(tablebody, rebuild_str);
        };

        return str
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            guid: options.guid,
            type: options.type
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.queryData();
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
