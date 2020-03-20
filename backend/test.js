
const Encrypt  = require('./utils/encrypt');

const keywords = ['你', '好', '大', '中', '国'];
const articlename = '祖国母亲';
const author = 'daqingzou';
const fileVectorArray = ['你', '好', '大', '中', '国'];

const queryVectorArray = ['你', '好', 3, 5, 6];

const EncryptTools = new Encrypt(keywords);

const result = EncryptTools.uploadCiphertextIndex(fileVectorArray, articlename, author);
console.log('result', result.toString())
const { I1, θ } = result;
const Q1 = EncryptTools.getCiphertextDoor(queryVectorArray);
console.log('θ', θ);
console.log('相似度', EncryptTools.getEndSmi(I1, Q1, θ))