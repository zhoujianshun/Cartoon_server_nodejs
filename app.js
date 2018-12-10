const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const controller = require('./controller');

let templating = require('./templating');
let rest = require('./rest');
const models = require('./db/model');
const Product = models.product;

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`); // 打印URL
    // await Product.create({
    //     name: 'kindle',
    //     manufacturer: 'aa',
    //     price: 999,
    // });
    // let ps = await Product.findAll();
    // console.log('products:' + ps);
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms`);
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

const isProduction = process.env.NODE_ENV === 'production';

// 处理静态文件
// 因为在生产环境下，静态文件由部署在最前面的反向代理服务器（如Nginx）处理。
// 开发环境下右koa顺带处理，省去配置反向代理服务器的麻烦，减少开发复杂度
// if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));

// }

// 一定要加不然body无法解析
// 解析POST请求
app.use(bodyParser());

// 负责给ctx加上render()来视同Nunjucks
app.use(templating('views', { noCache: !isProduction, watch: !isProduction }));

app.use(rest.restify('/api/'));

// 最后处理URL路由
app.use(controller('/controllers'));


app.listen(3000);
console.log('app started at port 3000...');