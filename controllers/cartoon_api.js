const rest = require('../rest');
const APIError = rest.APIError;

const carttons = require('../services/cartoons');

module.exports = {
    'GET /api/cartoons': async (ctx, next) => {
        let allCartoons = await carttons.getAllCartoons();
        let result = { 'cartoons': allCartoons };
        ctx.rest(result);
    },
    'GET /api/cartoon/:name': async (ctx, next) => {
        var cartoonName = ctx.params.name;
        if (cartoonName) {
            let cartton = await carttons.getCartoonChapters(cartoonName);
            let result = { 'chapters': cartton.chapters };
            ctx.rest(result);
        } else {
            throw new APIError('missing_param', 'missing param : name');
        }
    },
    'GET /api/cartoon/:name/:chapter': async (ctx, next) => {
        var cartoonName = ctx.params.name;
        var chapterName = ctx.params.chapter;
        if (!cartoonName) {
            throw new APIError('missing_param', 'missing param : name');
        }

        if (!chapterName) {
            throw new APIError('missing_param', 'missing param : chapter');
        }
        let origin = ctx.origin;
        let chapter = await carttons.getCartoonChapter(origin, cartoonName, chapterName);
        ctx.rest({ 'images': chapter.files });
    }
};