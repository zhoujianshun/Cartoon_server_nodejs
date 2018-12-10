const rest = require('../rest');
const APIError = rest.APIError;
const fs = require('fs');
const path = require('path');

const rootPath = require('../source_path');
const cartoonRootPath = rootPath.cartoonRootPath;
const cartoonRelativePath = rootPath.cartoonRelativePath;

async function getAllDirPath(targetPath) {
    // fs.Dirent 类#
    // 当调用 fs.readdir() 或 fs.readdirSync() 且 withFileTypes 设为 true 时， 
    // 返回的数组会填充 fs.Dirent 而不是字符串或 Buffer。
    let fileDirents = await fs.readdirSync(targetPath, { withFileTypes: true });
    let dirs = [];
    for (const fileDirent of fileDirents) {
        // console.log(filedir);
        //获取当前文件的绝对路径
        if (fileDirent.isDirectory()) {
            var filedir = path.join(targetPath, fileDirent.name);
            dirs.push(filedir);
        }

    }

    return dirs;
}

async function getAllDirName(targetPath) {
    // fs.Dirent 类#
    // 当调用 fs.readdir() 或 fs.readdirSync() 且 withFileTypes 设为 true 时， 
    // 返回的数组会填充 fs.Dirent 而不是字符串或 Buffer。
    let fileDirents = await fs.readdirSync(targetPath, { withFileTypes: true });
    let dirs = [];
    for (const fileDirent of fileDirents) {
        // console.log(filedir);
        //获取当前文件的绝对路径
        if (fileDirent.
            isDirectory()) {
            // var filedir = path.join(targetPath, fileDirent.name);
            dirs.push(fileDirent.name);
        }
    }

    return dirs;
}

async function getAllFilesName(targetPath, realtivePath) {
    // fs.Dirent 类#
    // 当调用 fs.readdir() 或 fs.readdirSync() 且 withFileTypes 设为 true 时， 
    // 返回的数组会填充 fs.Dirent 而不是字符串或 Buffer。
    let fileDirents = await fs.readdirSync(targetPath, { withFileTypes: true });
    let files = [];
    for (const fileDirent of fileDirents) {
        // console.log(filedir);
        //获取当前文件的绝对路径
        if (fileDirent.
            isFile()) {
            let fileRealtivePath = `${realtivePath}/${fileDirent.name}`
            files.push(fileRealtivePath);
        }
    }

    return files;
}

async function getAllFilesPath(targetPath) {
    // fs.Dirent 类#
    // 当调用 fs.readdir() 或 fs.readdirSync() 且 withFileTypes 设为 true 时， 
    // 返回的数组会填充 fs.Dirent 而不是字符串或 Buffer。
    let fileDirents = await fs.readdirSync(targetPath, { withFileTypes: true });
    let files = [];
    for (const fileDirent of fileDirents) {
        // console.log(filedir);
        //获取当前文件的绝对路径
        if (fileDirent.
            isFile()) {
            var filedir = path.join(targetPath, fileDirent.name);
            files.push(filedir);
        }
    }

    return files;
}

module.exports = {
    'GET /api/cartoons': async (ctx, next) => {
        let dirs = await getAllDirName(cartoonRootPath);
        let result = { 'cartoons': dirs };
        ctx.rest(result);
    },
    'GET /api/cartoon/:name': async (ctx, next) => {
        var cartoonName = ctx.params.name;
        if (cartoonName) {
            let dirs = await getAllDirName(path.join(cartoonRootPath, cartoonName));
            let result = { 'chapters': dirs };
            ctx.rest(result);
        } else {
            throw new APIError('missing_param', 'missing param : name');
        }
    },
    'GET /api/cartoon/:name/:chapter': async (ctx, next) => {
        var cartoonName = ctx.params.name;
        var chapter = ctx.params.chapter;
        if (!cartoonName) {
            throw new APIError('missing_param', 'missing param : name');
        }

        if (!chapter) {
            throw new APIError('missing_param', 'missing param : chapter');
        }
        var chapterPath = path.join(cartoonRootPath, cartoonName, chapter);

       
        let files = await getAllFilesName(chapterPath,`${cartoonRelativePath}/${cartoonName}/${chapter}`);
        ctx.rest({'images':files});
    }
};