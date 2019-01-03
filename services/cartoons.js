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

async function getAllFilesFullPath(origin, targetPath, realtivePath) {
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
            let fileRealtivePath = `${origin}${realtivePath}/${fileDirent.name}`
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
    getAllCartoons: async () => {
        let dirs = await getAllDirName(cartoonRootPath);
        // let cartoons = []
        // for (const cartoonName of dirs) {
        //     let cartoonName = 
        // }
        return dirs;
    },
    getAllCartoons: async (origin) => {
        let dirs = await getAllDirName(cartoonRootPath);
        let cartoons = [];
        for (const cartoonName of dirs) {
            let coverName = 'cover.jpg';
            let filePath = path.join(cartoonRootPath, cartoonName, coverName)
            let url =  `${origin}${cartoonRelativePath}/${cartoonName}/${coverName}`
            console.log(filePath);
            console.log(url);
           if( fs.existsSync(filePath)){
                cartoons.push({'cartoonName':cartoonName,'coverUrl':url})
           }else{
                cartoons.push({'cartoonName':cartoonName})
           }
        }
        return cartoons;
    },
    getCartoonChapters: async (cartoonName) => {
        let dirs = await getAllDirName(path.join(cartoonRootPath, cartoonName));
        return {
            cartton: cartoonName,
            chapters: dirs
        };
    },
    getCartoonChapter: async (origin, cartoonName, chapterName) => {
        var chapterPath = path.join(cartoonRootPath, cartoonName, chapterName);
        let allFiles = await getAllFilesFullPath(origin, chapterPath, `${cartoonRelativePath}/${cartoonName}/${chapterName}`);
        return {
            cartton: cartoonName,
            chapter: chapterName,
            files: allFiles,
        };
    }
};