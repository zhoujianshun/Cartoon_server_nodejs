// require('babel-core/register')({
//     presets: ['stage-3']
// });

// 自动创建数据库，创建表结构
// 在测试环境中可以使用sync()任意调整表结构，而不用自己维护SQL脚本
// 在开发环境中，首次启动的时候也可以调用，自动创建表结构，避免手动运行sql的问题
const model = require('./model.js');
model.sync();

console.log('init db ok.');
// process.exit(0);