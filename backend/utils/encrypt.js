import { bigPrime128, bigPrime512andK } from './randomPrime'
import BigInt from 'big-integer';
import jsSHA from 'jssha';
var shaObj = new jsSHA("SHA-224", "TEXT");

// 定义四个安全参数
const d1=224,d2=512,d3=128,d4=128;

class Encrypt {
  constructor() {
    this.save1 = 224;
    this.save2 = 512;
    this.save3 = 128;
    this.save4 = 128;
  }
  
  // 产生长度位第一安全数位的大素数
  randomPrime512() {
    return bigPrime512[Math.floor(Math.random()*bigPrime512.length)];
  };

  // 加密得到长度为第一安全参数位数的哈希函数
  enCryptHash(articlename, author) {
    const concatStr = articlename + author;
    return shaObj.update(concatStr)
  }

  // 随机产生密钥k及其逆元
  randomKey() {
    return randomObjectK[Math.floor(Math.random()*randomObjectK.length)];
  }

  // 随机数组A，数组中每个值的长度为第三安全参数
  randomArrayAi() {

  }
  
  // 随机数组C,数组中每个值得长度为第四安全参数
  randomArrayCi() {

  }

  // 生成文件索引向量
  FileIndexVector() {

  }

  // 生成密文索引向量
  CiphertextIndexVector() {

  }

  // 查询向量
  QueryIndexVector() {

  }

  // 预设相似度
  getStartSmi() {

  }

   // 计算第一中间数
   getMiddleNumberE() {

  }

  // 计算第三中间数
  getMiddleNumberF() {

  }

  // 计算第二中间数
  getMiddleNumberG() {

  }
}

const n = 10;
// 定义第二大安全参数位的素数
const p = BigInt("11306186501206891292800413307395364441544093231949402220511806281352411257222130330309239467413088214654520091799585246454705114733633064427753069046650465");

// θ
const h = BigInt("139043704695995720647858936098640485971432797445310342640680");

// 随机定义密钥k
const k = BigInt("267299228327897539640510750892345031734");


const aiList = [
  "174699752423338016740687454382609772009",
  "242774460246682912882418153215917567343",
  "327787885052822001637292071637531749373",
  "274166444956143160684963225857262707859",
  "239924330609007513180712358871559795673",
  "267307469511166685948153707290964300739",
  "245398170641926157354381005563469533613",
  "312889829371500951895971686922336383809",
  "214235623602271219304912818532481609667",
  "270277312162867295109813441362386488037",
  "171292443929056752494918342794999872997",
  "227813702277294229251560221019534859161"
];
const ciList =[
  "296699384660989406609304483938265222793",
  "215237469041166329082448550872939245613",
  "246505037626300669618030550385746933117",
  "246167995036298134654647172855262502073",
  "335053649590064015629995872181960830927",
  "178320169095577505934785387922306649657",
  "232937171112855497330485971460285126561",
  "339393620541005625242204355433762996873",
  "307619048572586376937275451524439703071",
  "209485911408974627396669698682807834591",
  "229606169085483662491243866062085317593",
  "198846155325809010449090344246774155821"
]

const a = [];
for (let i = 0; i<aiList.length; i++) {
 a.push(BigInt(aiList[i]));
}

const I = [];
for (let i = 0; i < n; i++) {
  I.push(BigInt(Math.random() > 0.5 ? 0 : 1));
}
I.push(BigInt(0));
I.push(BigInt(0));
console.log('自定义文件向量', I.toString());

const I1 = [];
for (let i = 0; i < n+2; i++) {
  I1[i] = k.multiply(I[i].multiply(h).add(a[i])).mod(p);
}
console.log('密文索引向量', I1.toString());

const Q = [];
for (let i = 0; i < n; i++) {
  Q.push(BigInt(Math.random() > 0.5 ? 0 : 1));
}
Q.push(BigInt(0));
Q.push(BigInt(0));
console.log('自定义查询向量', Q.toString());

//定义相似度
let startSmi = BigInt(0);
for (let i = 0; i < n+2; i++) {
   startSmi= startSmi.add(I[i].multiply(Q[i]))
}

console.log('预设相似度为', startSmi.toString());

const m = BigInt("1478504419133195330114945723665109407002473444013162371559971");
const k1 = BigInt("1106597154943813258653028990248162012745064477537315037730012882264483167174417081893108465761917876935411126787114521366313139074163756397228982262921504")

const c = [];
for (let i = 0; i < ciList.length; i++) {
 c.push(BigInt(ciList[i]));
}

const Q1 = [];
for(let i=0;i<n+2;i++){
  Q1[i] = k1.multiply(Q[i].multiply(m).add(c[i])).mod(p);
}
console.log('搜索陷门', Q1.toString());

let E = BigInt(0);
E = m.multiply(h);
console.log('第一中间数', E.toString())

let F =  BigInt(0);
for(let i=0; i<n+2; i++){
  F = F.add(I1[i].multiply(Q1[i])).mod(p);
}
console.log('第三中间数', F.toString());

let G = BigInt(0);
G = F.subtract(F.mod(E));
console.log('第二中间数', G.toString());

let finalSimi = G.divide(E);
console.log('加密后相似度', finalSimi.toString());
