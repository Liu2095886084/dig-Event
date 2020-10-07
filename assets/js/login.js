$(function(){
    // 点击去注册
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 点击登录
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    });
    // 自定义验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repass:function(value){
            let pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    });
    // 根路径
    var root ='http://ajax.frontend.itheima.net'
    // 用户名注册
    
    $('#form_reg').on('submit',function(e){
        // 阻止表单默认提交事件
        e.preventDefault();
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()};
        $.ajax({
            type: "POST",
            url: root+"/api/reguser",
            data: data,
            
            success: function (res) {
                // console.log(res);
                if(res.status!==0)return layer.msg(res.message);
                layer.msg(res.message);
                $('#link-login').click()
            }
        });
    });
    // 用户登录
    $('#form_login').on('submit',function(e){
        // 阻止默认提交
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: root+"/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if(res.status!==0)return layer.msg(res.message);
                layer.msg(res.message);
                // 保存token
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        });
    })
})