const prime = require('./randomPrime');
const BigInt = require('big-integer');
const jsSHA = require('jssha');

const shaObj = new jsSHA('SHA3-224', 'TEXT');
const { bigPrime128, bigPrime224 } = prime;

class Encrypt {
  constructor(keywords) {
    this.save1 = 224;
    this.save2 = 512;
    this.save3 = 128;
    this.save4 = 128;
    this.n = keywords.length;
    this.K = BigInt("86612358491908511013050328653420959105");
    this.K1 = BigInt("3240609483273039941180911220367410437902811099537681295979371054795801829111143924137950446372332815845466881991456594237356307772002608177563575450383716");
    this.P = BigInt("12978682430222561568034866250693885788654275539020604194476164247884695620293970389882054324052935685139441016272502626712038480544064483355282279585119653");
    this.m = BigInt("14518694755501105963175998984713125977260836932474148266335604697803");
    this.keywordsDictionary = keywords;
  }

  // 上传密文索引向量
  uploadCiphertextIndex(fileVectorArray, articlename, author) {
    const fileArray = this.fileIndexVector(fileVectorArray);
    const θ = this.getHashθ(articlename, author);
    const Ai = this.randomArrayAi();
    const I1 = this.ciphertextIndexVector(fileArray, θ, Ai);
    return { I1, θ}
  }

  // 根据查询词组生成密文搜索陷门
  getCiphertextDoor(queryVectorArray) {
    const queryArray = this.queryIndexVector(queryVectorArray);
    const Ci = this.randomArrayCi();
    const Q1 = this.cipherTextDoor(queryArray, this.m, Ci);
    return Q1;
  }
  // 定义初始相似度
   defineInitSmi() {
   }

  // 计算加密相似度
   getEndSmi(I1, Q1, θ) {
    const E = this.getMiddleNumberE(this.m, θ);
    const F = this.getMiddleNumberF(I1, Q1);
    const G = this.getMiddleNumberG(F, E);
    const finalSmi = this.getFinalSmi(G, E);
    return finalSmi;
   }

  // 定义关键词词典
  defineKeywordDictionary(arr) {
    this.keywordsDictionary = arr;
  }

  // 加密得到长度为第一安全参数位数的哈希函数,得到值为θ
  getHashθ(articlename, author) {
    const concatStr = articlename + author;
    shaObj.update(concatStr);
    return BigInt(parseInt(shaObj.getHash('HEX'), 16));
  }

  // 随机数组A，数组中每个值的长度为第三安全参数
  randomArrayAi() {
    const arrayAi = [];
    for (let i = 0; i < this.n + 2; i++) {
      arrayAi.push(BigInt(bigPrime128[Math.floor(Math.random() * bigPrime128.length)]));
    }
    return arrayAi;
  }

  // 随机数组C,数组中每个值得长度为第四安全参数
  randomArrayCi() {
    const arrayAi = [];
    for (let i = 0; i < this.n + 2; i++) {
      arrayAi.push(BigInt(bigPrime128[Math.floor(Math.random() * bigPrime128.length)]));
    }
    return arrayAi;
  }

  // 随机产生长度位第一安全参数的值m
  getM() {
    return BigInt(bigPrime224[Math.floor(Math.random() * bigPrime224.length)]);
  }

  // 生成文件索引向量
  fileIndexVector(fileVectorArray) {
    const fileIndexVector = [];
    for (let i = 0; i < this.keywordsDictionary.length; i++) {
      for (let j = 0; j < fileVectorArray.length; j++) {
        if (this.keywordsDictionary[i] === fileVectorArray[j]) {
          fileIndexVector[i] = 1;
          break;
        } else {
          fileIndexVector[i] = 0;
        }
      }
    }
    fileIndexVector.push(0);
    fileIndexVector.push(0);
    return fileIndexVector;
  }

  // 生成密文索引向量
  ciphertextIndexVector(ciphertextArray, θ, arrayAi) {
    const ciphertextIndexVector = [];
    for (let i = 0; i < this.n + 2; i++) {
      const data = BigInt(this.K).multiply(BigInt(ciphertextArray[i]).multiply(θ).add(arrayAi[i])).mod(this.P);
      ciphertextIndexVector.push(data);
    }
    return ciphertextIndexVector;
  }

  // 生成查询向量
  queryIndexVector(queryArray) {
    const queryIndexVector = [];
    for (let i = 0; i < this.keywordsDictionary.length; i++) {
      for (let j = 0; j < queryArray.length; j++) {
        if (this.keywordsDictionary[i] === queryArray[j]) {
          queryIndexVector[i] = 1;
          break;
        } else {
          queryIndexVector[i] = 0;
        }
      }
    }
    queryIndexVector.push(0);
    queryIndexVector.push(0);
    return queryIndexVector;
  }

  // 密文搜索陷门
  cipherTextDoor(QueryIndexArray, m, arrayCi) {
    const cipherTextDoor = [];
    for (let i = 0; i < this.n + 2; i++) {
      const data = BigInt(this.K1).multiply(BigInt(QueryIndexArray[i]).multiply(m).add(arrayCi[i])).mod(this.P);
      cipherTextDoor.push(data);
    }
    return cipherTextDoor;
  }

  // 预设相似度
  getStartSmi(queryInexV, fileIndexV) {
    let startSmi = BigInt(0);
    for (let i = 0; i < this.n; i++) {
      startSmi = startSmi.add(BigInt(fileIndexV[i]).multiply(queryInexV[i]))
    }
    return startSmi;
  }

  // 计算第一中间数
  getMiddleNumberE(m, θ) {
    return BigInt(m).multiply(θ);
  }

  // 计算第三中间数
  getMiddleNumberF(ciphertextIndexVector, cipherTextDoor) {
    let F = BigInt(0);
    for (let i = 0; i < this.n + 2; i++) {
      F = F.add(ciphertextIndexVector[i].multiply(cipherTextDoor[i])).mod(this.P);
    }
    return F;
  }

  // 计算第二中间数
  getMiddleNumberG(F, E) {
    return F.subtract(F.mod(E));
  }

  // 最终相似度
  getFinalSmi(G, E) {
    return G.divide(E);
  }
}

module.exports = Encrypt;