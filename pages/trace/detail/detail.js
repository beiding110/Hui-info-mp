import _ from '../../../js/app-mp'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchObj: {
            KeyName: '',
            CityCode: '',
            RowGuid: '',
            DateRange: ''
        },

        addToday: {},
        form: {}
    },
    queryAddToday() {
        _.$get('/Api/DingYue/GetTodayNum', {
            id: this.data.searchObj.RowGuid
        }, (data) => {
            this.setData({
                addToday: data
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            'searchObj.RowGuid': options.RowGuid || '',
            'searchObj.CityCode': options.CityCode || '',
            'searchObj.DateRange': options.DateRange || '',
            'searchObj.KeyName': options.KeyName || '',
        });

        _.$get('/Api/DingYue/GetDetail', {
            id: this.data.searchObj.RowGuid
        }, (data) => {
            this.setData({
                form: data
            });
        })

        this.selectComponent('#bidding-list').reload();
        this.selectComponent('#project-list').reload();

        this.queryAddToday();
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
