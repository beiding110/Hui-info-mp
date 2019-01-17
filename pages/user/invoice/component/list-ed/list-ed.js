var app = getApp()

Component({
    options: {
        addGlobalClass: true,
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        tableData: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tableDataUpdate(e) {
            this.setData({
                tableData: e.detail
            });
        },
        toDetail(e) {
            let ds = e.target.dataset;

            app.globalData.invoicedInfo = ds.item

            wx.navigateTo({
                url: '../detail/detail'
            });
        },
        reload() {
            this.selectComponent('#loader').reload();
        }
    }
})
