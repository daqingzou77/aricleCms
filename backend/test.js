
const Encrypt  = require('./utils/encrypt');




const keywords = ['你', '好', '大', '中', '国'];
const articlename = '祖国母亲';
const author = 'daqingzou';
const fileVectorArray = ['你', '好', '大', '中', '国'];

const queryVectorArray = ['你', '好', 3, 5, 6];

const EncryptTools = new Encrypt(keywords);
// console.log('上传密文向量', EncryptTools.uploadCiphertextIndex(fileVectorArray, articlename, author).toString())

// console.log('密文索引向量', EncryptTools.getCiphertextDoor(queryVectorArray).toString());

const result = EncryptTools.uploadCiphertextIndex(fileVectorArray, articlename, author);
// console.log('result', result)
const { I1, θ } = result;
const Q1 = EncryptTools.getCiphertextDoor(queryVectorArray);
// console.log('Q1', Q1.toString());
// console.log('I1', I1.toString())
console.log('θ', θ);
console.log('相似度', EncryptTools.getEndSmi(I1, Q1, θ))




// const EncryptTools = new Encrypt(keywords);

// EncryptTools.defineKeywordDictionary(keywords);

// const Ai = EncryptTools.randomArrayAi();

// const Ci = EncryptTools.randomArrayCi();

// const θ = EncryptTools.getHashθ(articlename, author);

// const m  = EncryptTools.getM();

// const fileArray = EncryptTools.fileIndexVector(fileVectorArray);
// console.log('fileArray', fileArray);

// const  queryArray = EncryptTools.queryIndexVector(queryVectorArray);
// console.log('queryArray', queryArray);


// const I1 = EncryptTools.ciphertextIndexVector(fileArray, θ, Ai);
// // console.log('I1',I1);

// const Q1 = EncryptTools.cipherTextDoor(queryArray, m, Ci)
// // console.log('Q1',Q1);


// const E = EncryptTools.getMiddleNumberE(m, θ);

// const F = EncryptTools.getMiddleNumberF(I1, Q1);

// const G = EncryptTools.getMiddleNumberG(F, E);

// const startSmi = EncryptTools.getStartSmi(fileArray, queryArray);
// console.log('预设相似度', startSmi.toString());

// const finalSmi = EncryptTools.getFinalSmi(G, E);
// console.log('最终相似度', finalSmi.toString())