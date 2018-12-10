
var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome',
    });
}

var fn_cartoon = async (ctx, next) => {
    ctx.render('cartoon.html'); 
}

var fn_cartoon_chapter = async (ctx, next) => {
    ctx.render('chapter.html'); 
}

var fn_signin = async (ctx, next) => {
    var email = ctx.request.body.email || '';
    var password = ctx.request.body.password;
    if(email === 'admin@example.com' && password === '123456'){
        // 成功
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Node',
        });
    }else{
        // 失败
        ctx.render('signin-false.html', {
            title: 'Sign In Failed',
        });
    }
}

module.exports = {
    'GET /': fn_index,
    'GET /cartoons': fn_cartoon,
    'GET /cartoons/chapter':fn_cartoon_chapter,
    'POST /signin': fn_signin,
}