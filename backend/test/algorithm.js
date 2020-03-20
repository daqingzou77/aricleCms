// 支持隐私保护的关键词算法测试
const { expect } = require("chai");
const Encrypt  = require('../utils/encrypt');

// 定义初始文章初始关键词
const keywords = ['你', '好', '大', '中', '国'];
// 定义文章名
const articlename = '祖国母亲';
// 文章作者
const author = 'daqingzou';
// 定义文件索引向量
const fileVectorArray = ['你', '好', '大', '中', '国'];
// 用户查询向量
const queryVectorArray = ['你', '好', 3, 5, 6];


const EncryptTools = new Encrypt(keywords);
// 上传密文索引向量
const result = EncryptTools.uploadCiphertextIndex(fileVectorArray, articlename, author);
const { I1, θ } = result;
// 产生密文索引陷门
const Q1 = EncryptTools.getCiphertextDoor(queryVectorArray);

describe("验证查询向量和文件向量匹配是否正确",function(){
  it("计算相似度为2",function(){
    expect(Number(EncryptTools.getEndSmi(I1, Q1, θ))).to.equal(2);
  })
})