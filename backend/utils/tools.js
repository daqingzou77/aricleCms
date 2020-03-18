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
      code: code,
      message: message || '',
      data: data || null,
    })
  }

  /**
   * mock数据
   * @param {*Number} number
   * @param {*Array} dataSource 
   */

  mockData(number, dataSource) {
    const responData = []
    const len = dataSource.length;
    for (let i = 0; i < number; i++) {
      responData.push(dataSource[Math.floor(Math.random() * len)]);
    }

    function hasRepeat(arr) {
      let result = false;
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i]['key'] === arr[j]['key']) {
            return { index: i };
          }
        }
      }
      return result;
    }
    while (hasRepeat(responData)) {
      const { index } = hasRepeat(responData);
      responData.splice(index, 1, dataSource[Math.floor(Math.random() * len)]);
    }
    responData.sort((a, b) => {
      return b.favorites - a.favorites;
    })
    return responData;
  }

  /**
   * 获取消息统计
   * @param {*Array} arr
   */
  staticMessage(arr) {
    const result = [];
    const obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i].sender]) {
        result.push(arr[i].sender);
        obj[arr[i].sender] = true;
      }
    }
    const respJson = {};
    const respArray = []
    result.map(item => {
      respJson[item] = 0;
    })
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < result.length; j++) {
        if (arr[i].sender === result[j]) {
          respJson[result[j]] += 1;
        }
      }
    }
    for (let i in respJson) {
      respArray.push({
        friend: i,
        count: respJson[i]
      })
    }
    return respArray;
  }

}

export default Tools;