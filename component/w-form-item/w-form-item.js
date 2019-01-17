import _ from '../../js/app-mp'

// component/w-form-item/w-form-item.js
Component({
    relations: {
        '../w-form/w-form': {
            type: 'parent',
            linked(tar) {},
            linkChanged(tar) {},
            unlinked(tar) {},
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {
        label: {
            type: String,
            value: ''
        },
        value: {
            type: String,
            value: '',
            observer(n, o) {
                this.setData({
                    model: n
                })
            }
        },
        placeholder: {
            type: String,
            value: ''
        },
        type: {
            type: String,
            value: 'text'
        },
        arrow: {
            type: Boolean,
            value: false
        },
        prop: {
            type: String,
            value: ''
        },
        slots: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        error: null,
        dataRequired: false,
        model: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        modelUpdate(e) {
            _.modelEmit.call(this, {
                model: e.detail.value
            })
        }
    },
    attached() {
        this.setData({
            dataRequired: this.dataset.required || false
        })
    }
})
