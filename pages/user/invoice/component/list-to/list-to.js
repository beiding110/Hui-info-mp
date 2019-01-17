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
        tableData: [],

        cbShow: false,
        checkedArr: [],
        checkedObjArr: []
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
        gotoForm(e) {
            var ds = e.target.dataset;
            if(ds.fapiaoguid) {
                app.ShowMsgBox('该项已申请开票，请勿重复开票');
                return;
            };

            app.globalData.invoiceInfo = ds.item;

            wx.navigateTo({
                url: '../form/form'
            })
        },
        reload() {
            this.selectComponent('#loader').reload();
        },
        cbShow() {
            this.setData({
                cbShow: true
            })
        },
        longpressHandler() {
            this.cbShow()
        },
        checkboxChange(e) {
            var objArr = [];

            e.detail.value.forEach((guid) => {
                this.data.tableData.forEach((item) => {
                    if(guid === item.OrderGuid) {
                        objArr.push(item)
                    }
                })
            })

            this.setData({
                checkedArr: e.detail.value,
                checkedObjArr: objArr
            });
            console.log(e.detail.value, objArr)
        },
        cancelBtnHandler() {
            this.setData({
                cbShow: false,
                checkedArr: []
            });
        },
        toMultiInvoiceHandler() {
            var sumJE = 0;
            this.data.checkedObjArr.forEach((item) => {
                sumJE = Number(sumJE) + Number(item.FkJe)
            }),
            app.globalData.invoiceInfo = {
                FkJe: sumJE,
                OrderGuid: (this.data.checkedObjArr.map((item) => {
                    return item.OrderGuid
                })).join(',')
            };

            wx.navigateTo({
                url: '../form/form'
            })
        }
    }
})
