const sha3_224 = require('js-sha3').sha3_224;
require('js-sha3').sha
const bigInt = require('big-integer');
const Utils = require('./utils');
const save1 = 200, save2 = 512, save3 = 128, save4 = 128;
const n = 5;
const d = 122244;

// const k = bigInt(271020528176943739400478928451965913507);
// const p = bigInt(13027571569868845705195741947511469844193978618338668947910601919448585835863502384805446819605209892577017485415503881396316550919519275240235423929438543);
// const k1 = bigInt(5579203868500154302487964648292164256340974622478928631003544740359801441193191082110311622279989224904748198242913481711673470783435385455883683211282663);


const k = bigInt(324809134253326771032314615671432193527);
const p = bigInt(11007640153672360975275600073774331406693992959991809084736918462264146936106184286720751451572099892364978494134982825180049711623934882827740419238399627);
const k1 = bigInt(1961946802939657866006222706630113051015389035583534129425052902605999660887424687536760615416514061739915385317108938140898949629232535767454160215903140);


function doConduct () {

    console.log('λ2位的第一大素数p为', p.toString());
    const m = bigInt(Utils.randomDecimal(1, save1).pop());
    console.log('λ1位的第二大随机数m为', m.toString());
    console.log('密钥k为', k.toString());
    console.log('密钥k的逆元', k1.toString());
    const fileIndexVector = Utils.randomArray(n+2);
    console.log('文件索引向量为', fileIndexVector);
    
    // const fileName = Utils.randomStr();
    // let θ = ''
    // for (let i = 0; i < 15; i++) {
    //     if(Utils.getBinaryLength(fileName+d) === save1) {
    //         θ = bigInt(parseInt(sha3_224(fileName+d), 16));
    //     } else {
    //         console.log('随机文件名生成失败!请重新尝试');
    //         return;
    //     }
    // }
    // console.log('生成文件哈希θ为', θ.toString());
    // let θ = 957680848138947491842007228586539539905189970928555872153531;
    const θ = bigInt(1371700245813625043458885008683361906700018579226338566643447);
    
    const arrai = Utils.randomDecimal(n+2, save3);
    const ciphertextIndexVector =  Utils.calculateI(fileIndexVector, arrai, k, p, θ)
    console.log('密文索引向量', ciphertextIndexVector);
    
    const queryVector = Utils.randomArray(n+2);
    console.log('文件查询向量为', queryVector);
    
    const arrci = Utils.randomDecimal(n+2, save4);
    const ciphertextSearchTrap = Utils.calculateQ(queryVector, arrci, k1, m, p);
    console.log('密文检索陷门为', ciphertextSearchTrap);

    const t = 2;
    console.log('预设陷门为', 2);
    
    const P =  Utils.getP(ciphertextIndexVector, ciphertextSearchTrap, p)
    console.log('第三中间数P:', P);
    const E = Utils.getE(θ, m);
    console.log('第一中间数E:', E);
    const G = Utils.getG(P, E); 
    console.log('第二中间数G:', G);
    const result = bigInt(G).divide(E);
    console.log('G与E相除的结果值为', result.toString());
    
    console.log('文件索引向量于查询向量的内积为', Utils.getResult(fileIndexVector, queryVector));
    // if (Utils.getResult(fileIndexVector, queryVector) == result) {
    //     return true;
    // } else {
    //     return false;
    // }
}


doConduct();
// let count = 0;
// for(let i = 0; i < 100; i++) {
//     if(doConduct()) {
//         count+=1
//     }
//     if (i === 99) {
//         console.log('实验次数', i+1);
//         console.log('其中结果相等的次数为：', count);
//         console.log('成功率', (count/100)*100 +'%');
//         console.log('失败率', (1 - count/100)*100+'%')
//     }
// }



