 // 128位大素数
 const bigPrime128 = [
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
  "227813702277294229251560221019534859161",
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
];

// 512位的大素数和K以及K的逆元
 const bigPrime512andK = [
  {
    prime512: "12678310413417447850281270088459265286239179992348882596230365641730828096774696390794659978235606864749645481895392677619766212878233775230410013628901933",
    k: "17590856409006342945487471783528552192",
    k1: "4940635271730489753061426050196071704983855696463297164178084047513048946549227363684341466212396812626043344396145434994545113915384853434022101134084628"
  }, {
    prime512: "9306432765355838599788089363975788093239523626521537273225378237298567234072329895396653931306265567773954509335698333251987763801134713958685049438331861",
    k: "203676540518421042318881808064659402809",
    k1: "2858482674373200868056752291641435844203734661373214855665303507615482200751974025806576821660582156153882621572754253890464415842692471463611912799249710"
  }, {
    prime512: "12978682430222561568034866250693885788654275539020604194476164247884695620293970389882054324052935685139441016272502626712038480544064483355282279585119653",
    k: "86612358491908511013050328653420959105",
    k1: "3240609483273039941180911220367410437902811099537681295979371054795801829111143924137950446372332815845466881991456594237356307772002608177563575450383716"
  }, {
    prime512: "6997154072727153309288129480511932131281843496850694651327283744263793997688022393582208811736625310226057020497439763027589554639676028235459485920421349",
    k: "158039959299771701466361881670072432218",
    k1: "5091486735375351784131615499934286583405313426643913574703080713938297517462128171349712245311001320781697575290178799213116962364215282331952181978224063"
  }, {
    prime512: "9533947238168449166713973868428767029917520169006952545217894162307603951200404178101213941259876831491846304581993492377684633108065504944032609380197899",
    k: "218360524531512069085255635454980310955",
    k1: "5560885256649517592483478747533342576244193535772475209425980095137349101462541267425523415112178430646968275080174713267992931284852714214561033053960837"
  }
];

// 224位的大素数
 const bigPrime224 = [
  "24137087888249487823078429339186812734244155941478342500446824356601",
  "19457914738365037220200442455558510580646628632057792159848137786723",
  "16688289711703529009861906418421003910617640554285044782678416244939",
  "16786080049048657771193478627168940031785835074075476238129069589777",
  "18544927918174780623699930142126783458874055798590284844606927925279",
  "14056451131332699896160036300599741285494428211552305033814697986157",
  "17835404000007503470536394567086133771749402283614501250224008341793",
]

export default {
  bigPrime128,
  bigPrime512andK,
  bigPrime224
}