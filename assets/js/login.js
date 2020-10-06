$(function(){
    // 点击去注册
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登录
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
})