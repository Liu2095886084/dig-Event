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
    })
})