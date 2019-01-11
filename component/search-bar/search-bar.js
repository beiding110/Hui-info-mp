import _ from '../../js/app-mp'

// component/search-bar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: String,
            value: '',
            observer(n, o, p) {
                this.setData({
                    inputVal: n
                });
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        barClass: 'search--bar',
        model: '',
        focus: false,

        inputShowed: false,
        inputVal: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showInput: function () {
            this.setData({
                inputShowed: true
            });
        },
        hideInput: function () {
            this.setData({
                inputShowed: false
            });

            this.clearInput();
        },
        clearInput: function () {
            _.modelEmit.call(this, {
                inputVal: ''
            }, () => {
                this.setData({
                    focus: false
                });
            })
        },
        inputTyping: function (e) {
            this.triggerEvent('input', e.detail.value)
        }
    }
})
