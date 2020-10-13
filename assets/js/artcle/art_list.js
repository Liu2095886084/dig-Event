$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    // 定义美化时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()  // 年
        var m = padZero(dt.getMonth() + 1)  // 月
        var d = padZero(dt.getDate())  // 日

        var hh = padZero(dt.getHours())  // 时
        var mm = padZero(dt.getMinutes())  // 分
        var ss = padZero(dt.getSeconds())  // 秒

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    };
    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    };


    var p = {
        pagenum: 1,  // 页码值
        pagesize: 2,  // 每页显示多少条数据
        cate_id: '',  // 文章分类的 Id
        state: ''     // 文章的状态，可选值有：已发布、草稿
    };
    initTable()
    initCate()
    /**
     * 获取文章列表数据的方法
     */
    function initTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: p,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total);
            }
        });
    };

    /**
     * 初始化文章分类的方法
     */
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render()
            }
        });
    };

    // 实现筛选的功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        p.cate_id = cate_id
        p.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    });

    /**
     * 渲染分页的方法渲染分页的方法
     */
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',  // 分页容器的 Id
            count: total,  // 总数据条数
            limit: p.pagesize,  // 每页显示几条数据
            curr: p.pagenum,  // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 8, 10, 20],
            // 分页发生切换的时候，触发 jump 回调
            jump: function (obj, first) {
                p.pagenum = obj.curr;
                p.pagesize = obj.limit;
                if (!first) {
                    initTable()
                }
            }
        })
    };

    // 实现删除文章的功能
    $('tbody').on('click', ".btn-delete", function () {
        var len = $('.btn-delete').length;
        var id = $(this).attr('data-id');
        // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "GET",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    console.log(res);
                    layer.msg(res.message);
                    console.log(len);
                    if(len ===1){
                        p.pagenum = p.pagenum === 1?1:p.pagenum-1;
                    }
                    initTable();
                    layer.close(index)
                }
            });
        })
    })
})