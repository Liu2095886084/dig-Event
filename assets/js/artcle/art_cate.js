$(function(){
    initArtCateList();

    /**
     * 获取文章分类的列表
     */
    function initArtCateList(){
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                var htmlStr = template('tpl-table',res);
                $('tbody').html(htmlStr)
            }
        });
    };
    var layer = layui.layer;
    var form = layui.form;
    var indexAdd = null;
    // 点击添加类别弹框
    $('#btnAddCate').on('click',function(){
        indexAdd = layer.open({
            type:1,
            area:['500px','300px'],
            title: '添加类别',
            content: $('#dialog-add').html()
          });
    });


    $('body').on('submit','#form-add',function(e){
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status!==0)return layer.msg(res.message);
                layer.msg(res.message);
                initArtCateList();
                layer.close(indexAdd);
            }
        });
    });

    // 点击编辑弹框
    var indexEdit = null
    $('tbody').on('click','.btn-edit',function(){
        
        indexEdit = layer.open({
            type:1,
            area:['500px','300px'],
            title: '修改类别'
            ,content: $('#dialog-edit').html()
          }); 
          var id  = $(this).attr('data-id')
        //   发起ajax请求
        $.ajax({
            type: "GET",
            url: "/my/article/cates/"+id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        });
    });

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if(res.status!==0)return layer.msg(res.message);
                layer.msg(res.message);
                layer.close(indexEdit);
                initArtCateList()
            }
        });
    });

    // 删除按钮绑定点击事件
    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/"+id,
                success: function (res) {
                    if(res.status!==0)return layer.msg(res.message);
                    layer.msg(res.message);
                    layer.close(index);
                    initArtCateList()
                }
            });
            
            
          });
    })
})