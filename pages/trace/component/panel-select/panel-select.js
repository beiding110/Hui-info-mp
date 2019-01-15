import _ from '../../../../js/app-mp'

// pages/trace/component/panel-select/panel-select.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder: {
            type: String,
            value: ''
        },
        value: {
            type: String,
            value: '',
            observer(n, o, p) {
                this.setData({
                    model: n
                });

                this.bindDefValueLabel(n);
            }
        },
        props: {
            type: Object,
            value: {
                label: 'label',
                value: 'value'
            }
        },
        data: {
            type: Array,
            value: [],
            observer(n, o) {
                this.setArray(n);

                this.bindDefValueLabel(this.properties.value)
            }
        },
        text: {
            type: String,
            value: '请选择'
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        label: '',//input中展示的选中内容
        model: '',//实际选中内容对应的value值

        array: [],//picker中展示的选项内容
        arrayOrg: [],//未处理的原始数据内容
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindPickerChange(e) {
            this.setData({
                label: this.data.arrayOrg[e.detail.value][this.properties.props.label]
            });

            _.modelEmit.call(this, {
                model: this.data.arrayOrg[e.detail.value][this.properties.props.value]
            });

            this.triggerEvent('select', this.data.arrayOrg[e.detail.value]);
        },
        setArray(arr) {
            this.setData({
                array: arr.map((item) => {
                    return item[this.properties.props.label]
                }),
                arrayOrg: arr
            })
        },
        bindDefValueLabel(n) {
            var _index;
            this.properties.data.forEach((item, index) => {
                if(item[this.properties.props.value] === n) {
                    _index = index;
                }
            })

            if(_index !== undefined) {
                this.setData({
                    label: ((this.properties.data[_index] || {})[this.properties.props.label] || '')
                })
            }
        }
    }
})
