$(function () {
    var form = layui.form;
    // 表单验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '不能与旧密码一致'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    });

    // 表单提交功能
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('更新密码成功，两秒后跳转到登录页');
                
                $('.layui-form')[0].reset();
                setTimeout(function(){
                    window.parent.location.href = '/login.html';
                    localStorage.removeItem('token')
                },2000)
            }
        });
    })
})