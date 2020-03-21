import articles from '../model/articles';
import formidable from 'formidable';
import url from 'url';
import fs from 'fs';
import config from '../config/app.config';

class Annex {
  constructor(app) {
    Object.assign(this, {
      app,
      articles
    })
    this.init();
  }

  init() {
    this.app.post('/api/annex/annexUpload', this.annexUpload.bind(this)); // 附件上传
    this.app.post('/api/annex/downloadAnnex', this.downloadAnnex.bind(this)); // 附件下载
    this.app.delete('/api/annex/removeAnnex', this.removeAnnex.bind(this)); // 删除附件
    this.app.post('/api/annex/articleAnnexUpload', this.articleAnnexUpload.bind(this)); // 文章附件上创建
    this.app.get('/api/annex/getAnnexRecord', this.getAnnexRecord.bind(this)); // 获取附件上传列表
  }

  annexUpload(req, res, next) {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadDir;//上传文件的保存路径
    form.keepExtensions = true;//保存扩展名
    form.maxFieldsSize = 20 * 1024 * 1024;//上传文件的最大大小
    //处理表单
    form.parse(req, (err, fields, file) => {
      if (err) return;
      const { file: { name, path } } = file;
      const concatPath = path.substring(0, path.lastIndexOf('\\')) + '\\' + name.replace(/\s+/g, "");
      fs.rename(path, concatPath, (err) => {
        if (err) return;
        console.log('附件下载成功');
      })
      res.tools.setJson(0, '附件下载成功', name);
    })
  }

  downloadAnnex(req, res, next) {
    const filename = req.body.filename;
    const path = url.resolve(__dirname, config.uploadDir + filename.replace(/\s+/g, ""));
    fs.access(`${config.uploadDir}/${path}`, err => {
      if (err.code === 'ENOENT') {
       return res.tools.setJson(1, '当前文件已不存在系统中', { status: false })
      } else {
        var size = fs.statSync(path).size;
        console.log('size', size);
        var f = fs.createReadStream(path);
        console.log('f', f);
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': 'attachment; filename=' + encodeURIComponent(filename),
          'Content-Length': size
        });
        f.pipe(res);
      }
    })
  }

  removeAnnex(req, res, next) {
    const { annexname } = req.body;
    fs.unlink(`${config.uploadDir}/${annexname}`, (err) => {
      if (err) {
        next(err);
        return;
      }
      return res.tools.setJson(0, '附件删除成功', { deleteCount: 1 });
    });
  }

  articleAnnexUpload(req, res, next) {
    const addParam = req.body;
    const { articlename } = addParam;
    this.articles.findOne({ articlename })
      .then(doc => {
        if (doc) {
          return res.tools.setJson(0, '该文章已存在', [])
        } else {
          addParam.publishTime = new Date();
          this.articles.create(addParam)
            .then(data => {
              return res.tools.setJson(0, '文章添加成功', data)
            })
        }
      })
      .catch(err => next(err));
  }

  getAnnexRecord(req, res, next) {
    this.articles.find({
      status: 1,
      articleForm: 1
    })
      .then(doc => {
        return res.tools.setJson(0, '获取发布文章成功', doc); t
      })
      .catch(err => next(err));
  }
}

export default Annex;