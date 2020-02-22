class Tools {
  constructor(req, res) {
    Object.assign(this, {
      req,
      res
    })
  }

  /**
   * API接口调用返回JSON格式内容
   * @param {*Number} code 
   * @param {*String} message 
   * @param {*Object} data 
   */
  setJson(code, message, data) {
    return this.res.json({
      meta: {
        code: code || 0,
        message: message
      },
      data: data || null,
    })
  }
}
export default Tools;