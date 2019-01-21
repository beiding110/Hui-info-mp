// component/table-con/table-con.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object,
            value: {}
        },
        label: {
            type: Array,
            value: []
        },
        props: {
            type: Array,
            value: []
        },
        labelWidth: {
            type: String,
            value: 'auto'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        $children: [],
        labelWidth: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _getAllLi() {
            // 使用getRelationNodes可以获得nodes数组，包含所有已关联的custom-li，且是有序的
            const nodes = this.getRelationNodes('path/to/custom-li');
            return nodes;
        }
    },
    ready() {
        this._getAllLi();
        this.setData({
            labelWidth: 'width:' + this.properties.labelWidth
        })
    }
})
