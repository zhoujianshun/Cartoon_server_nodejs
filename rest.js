// 中间件，统一处理rest api

module.exports = {
    APIError: function (code, message) {
        this.code = code;
        this.message = message;
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 绑定rest方法
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }

                try {
                    await next();
                } catch (error) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: error.code || 'internal:unknow_error',
                        message: error.message || '',
                    };
                }
            } else {
                await next();
            }
        }
    }
};