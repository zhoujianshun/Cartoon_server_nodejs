const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoscape = opts.autoscape === undefined ? true : opts.autoscape;
    var noCache = opts.noCache || false;
    var watch = opts.watch || false;
    var throwOnUndefined = opts.throwOnUndefined || false;
    var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path, {
        noCache: noCache,
        watch: watch,
    }), {
            autoescape: autoscape,
            throwOnUndefined: throwOnUndefined,
        });

    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建Nunkucks的env对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给ctx绑定render函数
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type
            ctx.response.type = 'text/html';
        };

        await next();
    };
}

module.exports = templating;