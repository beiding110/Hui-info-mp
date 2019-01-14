// component/table-con/table-con.js
Component({
    relations: {
        '../table-row/table-row': {
            type: 'child',
            linked(tar) {},
            linkChanged(tar) {},
            unlinked(tar) {},
        }
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
        this._getAllLi()
    }
})
