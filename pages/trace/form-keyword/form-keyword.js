import _ from '../../../js/app-mp'
var app = getApp()

// pages/trace/form-keyword/form-keyword.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            RowGuid: '',
            Title: '',
            TypeCode: '',
            TypeName: '',
            CityCode: '',
            CityName: '',
            DateRange: 3,
            KeyName: ''
        },
        doSave: null,

        dateRangeMap: {
            3: '近三天',
            7: '近一周',
            30: '近一月'
        }
    },
    formKeyNameUpdate(e) {
        this.setData({
            'form.KeyName': e.detail
        });
    },
    doSave(callback) {
        var that = this;

        if(this.data.form.KeyName) {
            _.$post('/Api/DingYue/DingYueManager', this.data.form, (data) => {
                app.globalData.traceSign = true;
                this.setData({
                    'form.RowGuid': data
                });

                if(typeof(callback) === 'function') {
                    callback(data)
                } else {
                    app.globalData.traceSign = true;

                    wx.navigateBack();
                }
            })
        } else {
            if(this.data.form.RowGuid) {
                _.showConform('关键字为空，将删除该条追踪', () => {
                    _.$get('/Api/DingYue/DeleteDingYue', {
                        id: this.data.form.RowGuid
                    }, function(data){
                        app.globalData.traceSign = true;

                        wx.navigateBack();
                    })
                })
            } else {
                _.showConform('关键字为空，将删除该条追踪', () => {
                    wx.navigateBack()
                })
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            'form.RowGuid': options.type==='new' ? '' : options.type,
            'doSave': this.doSave
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(this.data.form.RowGuid != 'new'){
            _.$get('/Api/DingYue/GetDetail', {
                id: this.data.form.RowGuid
            }, (data) => {
                this.setData({
                    form: data
                });
            })
        };
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
