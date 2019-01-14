import _ from '../../../js/app-mp'
const app = getApp()

// pages/component/collect-star/collect-star.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: Boolean,
            value: false,
            observer(n, o) {
                this.setData({
                    model: n
                })
            }
        },
        guid: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        model: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tapHandler() {
            _.$get('/Api/Collection/SetCollectState', {
                id: this.properties.guid
            }, (data) => {
                _.modelEmit.call(this, {
                    model: !this.data.model
                });

                app.globalData.collectSign = true;
            })
        }
    }
})
