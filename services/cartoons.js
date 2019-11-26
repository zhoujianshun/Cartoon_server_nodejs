const fs = require('fs');
const path = require('path');

var { promisify } = require('util');
var sizeOf = promisify(require('image-size'));

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
    dirs.sort(function(a,b){
        let aa = parseInt(a);
        let bb =  parseInt(b);
        return  aa - bb;
    });
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

async function getAllFilesFullPath(origin, targetPath, realtivePath, needFileSize = false) {
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
            let imageRelativePath = `${realtivePath}/${fileDirent.name}`
            let fileRealtivePath = `${origin}/${imageRelativePath}`
            let obj;
            if(needFileSize){
                console.log(`imageRelativePath:${imageRelativePath}`);
                let dimensions;
                try {
                    dimensions = await sizeOf(imageRelativePath);
                } catch (error) {
                    console.log(`imageRelativePath:${imageRelativePath} error:${error}`);
                }
                if(dimensions){
                    console.log(dimensions.width, dimensions.height);
                    obj = {url: fileRealtivePath, width:dimensions.width, height:dimensions.height};
                }
                
            }else{
                obj = {url: fileRealtivePath};
            }
     
            if(obj){
                files.push(obj);
            }  
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

function getCartoonCoverPath(origin, cartoonName){
    let coverName = 'cover.jpg';
    let filePath = path.join(cartoonRootPath, cartoonName, coverName);

    let url;
    if( fs.existsSync(filePath)){
        url =  `${origin}/${cartoonRelativePath}/${cartoonName}/${coverName}`;
   }else{

   }

   
    return url;
}


module.exports = {
    getAllCartoons: async (origin) => {
        let dirs = await getAllDirName(cartoonRootPath);
        let cartoons = [];
        for (const cartoonName of dirs) { 
           let coverUrl =  getCartoonCoverPath(origin, cartoonName);
           if(coverUrl){
                cartoons.push({'cartoonName':cartoonName,'coverUrl':coverUrl})
           }else{
                cartoons.push({'cartoonName':cartoonName})
           }
        }
        return cartoons;
    },
    getCartoonChapters: async (cartoonName, origin) => {
        let dirs = await getAllDirName(path.join(cartoonRootPath, cartoonName));
        let coverUrl =  getCartoonCoverPath(origin, cartoonName);
           if(coverUrl){
            return {
                cartton: cartoonName,
                coverUrl: coverUrl,
                chapters: dirs
            };
           }else{
            return {
                cartton: cartoonName,
                chapters: dirs
            };
           }
        
    },
    getCartoonChapter: async (origin, cartoonName, chapterName, needFileSize = false) => {
        var chapterPath = path.join(cartoonRootPath, cartoonName, chapterName);
        let allFiles = await getAllFilesFullPath(origin, chapterPath, `${cartoonRelativePath}/${cartoonName}/${chapterName}`, needFileSize);
        return {
            cartton: cartoonName,
            chapter: chapterName,
            files: allFiles,
        };
    }
};