const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {
            // 如果url类似‘GET xxx’
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST')) {
            // 如果url类似‘POST xxx’
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    var files = fs.readdirSync(__dirname + dir);

    var js_files = files.filter((fs) => {
        return fs.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        // 倒入js文件：
        let mapping = require(__dirname + dir + '/' + f);
        addMapping(router, mapping);
    }
}

// addControllers(router);

module.exports = function (dir){
    let controllers_dir = dir || 'controllers';
    let router = require('koa-router')();
    addControllers(router, dir);
    return router.routes();
};