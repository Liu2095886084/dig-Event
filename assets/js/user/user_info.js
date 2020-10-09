$(function(){
    var form = layui.form;
    var layer = layui.layer;
    // 自定义验证规则
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });

    initUserInfo()


    /**
     * 初始化用户的基本信息
     */
    function initUserInfo(){
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if(res.status!==0)return layer.msg(res.message);
                form.val('formUserInfo',res.data)
            }
        });
    };

    // 实现表单重置
    $("#btnReset").on('click',function (e) {
        e.preventDefault();
        initUserInfo()
    });

    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status!==0)return layer.msg(res.message);
                layer.msg(res.message)
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        });
    })
})