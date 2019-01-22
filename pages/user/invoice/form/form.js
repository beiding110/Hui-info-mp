import _ from '../../../../js/app-mp'
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            FpType: '普票',
            DwMc: '',
            XinYongCode: '',
            Address: '',
            DianHua: '',
            KaiHuHang: '',
            YinHangZhangHao: '',
            Je: '',
            LxrAddress: '',
            Detail: '',
        },
        fpData: [
            // {label:'专票',value:'专票'},
            {label:'普票（电子发票）',value:'普票'}
        ]
    },
    modelUpdate(e){
        let ds = e.target.dataset;
        this.setData({
            ['form.' + ds.prop]: e.detail
        })
    },
    showActionsheet() {
        var that = this;
        wx.showActionSheet({
            itemList: that.data.fpData.map((item) => {return item.label}),
            success: function(res) {
                if (!res.cancel) {
                    that.modelUpdate({
                        target: {
                            dataset: {
                                prop: 'FpType'
                            }
                        },
                        detail: that.data.fpData[res.tapIndex].value
                    })
                }
            }
        });
    },
    beforeSubmit() {
        this.selectComponent('#form').submit()
    },
    submit() {
        _.$post('/Api/FaPiao/AddFaPiao', this.data.form, (data) => {
            _.showMsgBox('发票申请成功', function(){
                app.globalData.invoiceSign = true;

                wx.navigateBack();
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            'form.Je': app.globalData.invoiceInfo.FkJe,
            'form.OrderGuid': app.globalData.invoiceInfo.OrderGuid
        })
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
