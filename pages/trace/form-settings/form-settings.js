import getDictionary from '../../../utils/getDictionary'
import _ from '../../../js/app-mp'
var app = getApp()

// pages/trace/form-settings/form-settings.js
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
            CityName: '全部',
            DateRange: 3,
            KeyName: ''
        },

        DateRangeData: [],
        CityData: []
    },
    modelUpdate(e) {
        let ds = e.target.dataset;
        this.setData({
            [ds.prop]: e.detail
        });
    },
    citySelect(e) {
        this.setData({
            'form.CityName': e.detail.label
        })
    },
    doSave() {
        var that = this;

        _.$post('/Api/DingYue/DingYueManager', this.data.form, (data) => {
            app.globalData.traceSign = true;

            wx.navigateBack();
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getDictionary.call(this);
        this.setData({
            'form.RowGuid': options.type==='new' ? '' : options.type
        });

        if(options.type != 'new'){
            _.$get('/Api/DingYue/GetDetail', {
                id: options.type
            }, (data) => {
                this.setData({
                    form: data
                });
            })
        };
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
