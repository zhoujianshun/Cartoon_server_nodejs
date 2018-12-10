// const assest = require('assert');
// const products = require('../products');

// describe('#products.js', () => {
//     it('get all products', async () => {
//         let p = await products.getProducts();
//         assest.notStrictEqual(p.length, 0);

//     });
//     it('get product', async () => {
//         let p = await products.getProduct("b442df33-3b3a-440d-a21f-7b246e42f97f");
//         console.log(p);
//         if (p) {
//             assest.strictEqual(1, 1);
//         } else {
//             assest.strictEqual(1, 0);
//         }
//     });

//     it('delete product', async () => {
//         let ps = await products.getProducts();
//         if(ps.length > 0){
//             let p = await products.deleteProduct(ps[0].id);
//             console.log(p);
//             if (p) {
//                 assest.strictEqual(1, 1);
//             } else {
//                 assest.strictEqual(1, 0);
//             }
//         }else{
//             assest.strictEqual(1, 0);
//         }

        
//     });

//     it('get all products #async with done', (done) => {
//         (async () => {
//             try {
//                 let p = await products.getProducts();
//                 assest.notStrictEqual(p.length, 0);
//                 done();
//             } catch (error) {
//                 done(error);
//             }
//         })();
//     });


//     it('create products', async () => {
//         let p = await products.createProduct('Kindle', 'amzeo', 999);
//         if (p) {
//             assest.strictEqual(1, 1);
//         } else {
//             assest.strictEqual(1, 0);
//         }
//     });

//     // it('get all products', async () => {
//     //     let p = await products.getProducts();
//     //     assest.strictEqual(p.length, 3);
//     // });
// });