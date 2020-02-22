import { get, post, deletes, put } from '../common/http';
import { downloadDutyFile } from '../common/util/utils';
import { downloadFileAnother } from './download.js';

// 修改请求的baseUrl
const scheduleBaseUrl = process.env.apiBaseUrl;

/**
 * 获取值班事件列表
 * @param data
 * @param successCb
 * @param failCb
 */
export const getDutyIncidentList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/duty/queryDutyIncident`, data, successCb, failCb);
};

/**
 * 获取用户未提交的值班事件
 * @param data
 * @param successCb
 * @param failCb
 */
export const getNotSaveIncident = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/duty/getUserNotSaveDutyIncident`, data, successCb, failCb);
};

/**
 * 登记值班事件
 * @param data
 * @param successCb
 * @param failCb
 */
export const setDutyIncident = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/duty/saveDutyIncident`, data, successCb, failCb);
};

/**
 * 提交值班事件
 * @param data
 * @param successCb
 * @param failCb
 */
export const setSubmitDutyIncident = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/duty/submitDutyIncident`, data, successCb, failCb);
};

/**
 * 根据id查看值班事件
 * @param data
 * @param successCb
 * @param failCb
 */
export const getDutyIncident = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/duty/queryDutyIncidentById`, data, successCb, failCb);
};

/**
 * 删除值班排表事件
 * @param data
 * @param successCb
 * @param failCb
 */
export const deleteDutyIncident = (param, data, successCb, failCb) => {
  deletes(
    `${scheduleBaseUrl}/v1/schedule/duty/deleteDutyIncident?ids=${param}`,
    data,
    successCb,
    failCb
  );
};

/**
 * 导出值班事件
 * @param param
 */
export const exportDutyIncident = param => {
  downloadFileAnother(
    `${scheduleBaseUrl}/v1/schedule/duty/exportDutyIncident`,
    param,
    'dutyIncidentIds'
  );
};

/**
 * 获取待办事项列表
 * @param data
 * @param successCb
 * @param failCb
 */
export const getTodoList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/todo/queryBacklog`, data, successCb, failCb);
};

/**
 * 登记待办事项
 * @param data
 * @param successCb
 * @param failCb
 */
export const setTodoList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/todo/saveBacklog`, data, successCb, failCb);
};

/**
 * 提交待办事项
 * @param data
 * @param successCb
 * @param failCb
 */
export const setSubmitTodoList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/todo/insertBacklog`, data, successCb, failCb);
};

/**
 * 删除待办事项记录（可删除多条）
 * @param data
 * @param successCb
 * @param failCb
 */
export const deleteTodoList = (param, data, successCb, failCb) => {
  deletes(
    `${scheduleBaseUrl}/v1/schedule/todo/deleteBacklog?ids=${param}`,
    data,
    successCb,
    failCb
  );
};

/**
 * 获取用户未提交的待办事项
 * @param data
 * @param successCb
 * @param failCb
 */
export const getNotSaveBacklog = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/todo/getNotSaveBacklog`, data, successCb, failCb);
};

export const getTodoListDetail = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/todo/queryBacklogById`, data, successCb, failCb);
};

/**
 * 导出待办事项
 * @param param
 */
export const exportBacklog = param => {
  downloadFileAnother(`${scheduleBaseUrl}/v1/schedule/todo/exportBacklog`, param, 'backlogIds');
};

/**
 * 处理待办事项详情
 * @param data
 * @param successCb
 * @param failCb
 */
export const dealWithBacklog = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/todo/dealWithBacklog`, data, successCb, failCb);
};

/**
 * 交代事项登记
 * @param data
 * @param successCb
 * @param failCb
 */
export const setExplain = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/explain/saveExplain`, data, successCb, failCb);
};

/**
 * 获取用户未提交的交代事项
 * @param data
 * @param successCb
 * @param failCb
 */
export const getUserNotSaveExplain = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/explain/getUserNotSaveExplain`, data, successCb, failCb);
};

/**
 * 根据查询参数获取所有交代事项列表
 * @param data
 * @param successCb
 * @param failCb
 */
export const getExplainList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/explain/queryExplain`, data, successCb, failCb);
};

/**
 * 提交交代事项
 * @param data
 * @param successCb
 * @param failCb
 */
export const setSubmitExplain = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/explain/submitExplain`, data, successCb, failCb);
};

/**
 * 删除交代事项(可批量删除)
 * @param data
 * @param successCb
 * @param failCb
 */
export const deleteExplainList = (param, data, successCb, failCb) => {
  deletes(
    `${scheduleBaseUrl}/v1/schedule/explain/deleteExplain?ids=${param}`,
    data,
    successCb,
    failCb
  );
};

/**
 * 根据id获取交代事项详情
 * @param param
 * @param data
 * @param successCb
 * @param failCb
 */
export const getExplainDetail = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/explain/queryById`, data, successCb, failCb);
};

/**
 * 导出交代事项
 * @param param
 */
export const exportExplain = param => {
  downloadFileAnother(`${scheduleBaseUrl}/v1/schedule/explain/exportExplain`, param, 'explainIds');
};

/**
 * 电话登记
 * @param data
 * @param successCb
 * @param failCb
 */
export const setPhone = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/phone/saveTelephone`, data, successCb, failCb);
};

/**
 * 提交电话登记
 * @param data
 * @param successCb
 * @param failCb
 */
export const setSubmitPhone = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/phone/submitTelephone`, data, successCb, failCb);
};

/**
 * 获取用户未提交的电话登记
 * @param data
 * @param successCb
 * @param failCb
 */
export const getUserNotSaveTelephone = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/phone/getUserNotSaveTelephone`, data, successCb, failCb);
};

/**
 * 搜索电话登记
 * @param data
 * @param successCb
 * @param failCb
 */
export const getPhoneList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/phone/queryTelephone`, data, successCb, failCb);
};

/**
 * 删除电话登记
 * @param data
 * @param successCb
 * @param failCb
 */
export const deletePhoneList = (param, data, successCb, failCb) => {
  deletes(
    `${scheduleBaseUrl}/v1/schedule/phone/deleteTelephone?ids=${param}`,
    data,
    successCb,
    failCb
  );
};

/**
 * 根据id查询电话详情
 * @param data
 * @param successCb
 * @param failCb
 */
export const getPhoneDetail = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/phone/queryTelephoneById`, data, successCb, failCb);
};

/**
 * 导出电话登记
 * @param param
 */
export const exportTelephone = param => {
  downloadFileAnother(
    `${scheduleBaseUrl}/v1/schedule/phone/exportTelephone`,
    param,
    'telephoneIds'
  );
};

/**
 * 文电登记
 * @param data
 * @param successCb
 * @param failCb
 */
export const setMessage = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/message/saveMessageRegistration`, data, successCb, failCb);
};

/**
 * 根据查询条件获取文电登记记录
 * @param data
 * @param successCb
 * @param failCb
 */
export const getMessageList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/message/queryMessageRegistration`, data, successCb, failCb);
};

/**
 * 获取用户未提交的文电登记记录
 * @param data
 * @param successCb
 * @param failCb
 */
export const getNoSaveMessage = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/message/queryNotSaveMessage`, data, successCb, failCb);
};

/**
 * 提交文电登记记录
 * @param data
 * @param successCb
 * @param failCb
 */
export const setSubmitMessageRegistration = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/message/submitMessageRegistration`, data, successCb, failCb);
};

/**
 * 删除文电登记
 * @param data
 * @param successCb
 * @param failCb
 */
export const deleteMessageList = (param, data, successCb, failCb) => {
  deletes(
    `${scheduleBaseUrl}/v1/schedule/message/deleteMessageRegistration?ids=${param}`,
    data,
    successCb,
    failCb
  );
};

/**
 * 根据id获取文电登记详情
 * @param param
 * @param data
 * @param successCb
 * @param failCb
 */
export const getMessageDetail = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/message/queryMessageById`, data, successCb, failCb);
};

/**
 * 导出文电登记
 * @param param
 */
export const exportMessage = param => {
  downloadFileAnother(`${scheduleBaseUrl}/v1/schedule/message/exportMessage`, param, 'ids');
};

/**
 * 新建值班日志
 * @param data
 * @param successCb
 * @param failCb
 */
export const setLog = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/log/updateLog`, data, successCb, failCb);
};

/**
 * 根据查询条件获取日志
 * @param data
 * @param successCb
 * @param failCb
 */
export const getLogList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/log/queryLog`, data, successCb, failCb);
};

/**
 * 获取未提交的用户值班日志
 * @param data
 * @param successCb
 * @param failCb
 */
export const getNoSaveLog = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/log/getUserNotSaveLog`, data, successCb, failCb);
};

/**
 * 提交日志
 * @param data
 * @param successCb
 * @param failCb
 */
export const setSubmitLog = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/log/submitLog`, data, successCb, failCb);
};

/**
 * 删除值班日志
 * @param data
 * @param successCb
 * @param failCb
 */
export const deleteLogList = (param, data, successCb, failCb) => {
  deletes(`${scheduleBaseUrl}/v1/schedule/log/deleteLog?ids=${param}`, data, successCb, failCb);
};

/**
 * 根据id获取日志详情
 * @param param
 * @param data
 * @param successCb
 * @param failCb
 */
export const getLogDetail = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/log/queryLogById`, data, successCb, failCb);
};

/**
 * 导出日志
 * @param param
 */
export const exportLog = param => {
  downloadFileAnother(`${scheduleBaseUrl}/v1/schedule/log/exportLog`, param, 'logIds');
};

/**
 * 值班统计情况
 * @param data
 * @param successCb
 * @param failCb
 */
export const getDutyParticulars = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/statistics/getDutyParticulars`, data, successCb, failCb);
};

/**
 * 考勤统计
 * @param data
 * @param successCb
 * @param failCb
 */
export const getDutyStatistics = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/statistics/getDutyStatistics`, data, successCb, failCb);
};

/**
 * 删除排班
 * @param data
 * @param successCb
 * @param failCb
 */
export const deleteArrangementList = (data, successCb, failCb) => {
  deletes(`${scheduleBaseUrl}/v1/schedule/arrangement/deleteDuty`, data, successCb, failCb);
};




/**
 * 条件查询用户值班信息
 * @param data
 * @param successCb
 * @param failCb
 */
export const getUserDutyList = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/arrangement/queryUserDuty`, data, successCb, failCb);
};

/**
 * 提交班次
 * @param data
 * @param successCb
 * @param  failCb
 */
export const submitDutyCondition = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/shift/submitDutyCondition`, data, successCb, failCb);
};

export function exportDuty(time) {
  // console.log('下载文件', `${scheduleBaseUrl}/v1/schedule/arrangement/exportDuty?dateTime=${time}`);
  downloadDutyFile(`${scheduleBaseUrl}/v1/schedule/arrangement/exportDuty?`, time);
}

/**
 * 添加一个排班
 * @param data
 * @param successCb
 * @param failCb
 */
export const setUserDuty = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/arrangement/insertDuty`, data, successCb, failCb);
};

/**
 * 更新一个排班
 * @param data
 * @param successCb
 * @param failCb
 */
export const updateDuty = (data, successCb, failCb) => {
  put(`${scheduleBaseUrl}/v1/schedule/arrangement/updateDuty`, data, successCb, failCb);
};

/**
 * 获取所有用户信息，可用于下拉列表
 * @param data
 * @param successCb
 * @param failCb
 */
export const getUserList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/user/getUsers`, data, successCb, failCb);
};

/**
 * 根据席位信息获取席位下的所有用户
 * @param data
 * @param successCb
 * @param failCb
 */
export const getUserBySeat = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/user/getUserBySeat`, data, successCb, failCb);
};

/**
 * 获取所有席位信息
 * @param data
 * @param successCb
 * @param failCb
 */
export const getAllSeatData = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/user/getAllSeatData`, data, successCb, failCb);
};

/**
 * 获取当前值班信息
 * @param data
 * @param successCb
 * @param failCb
 */
export const queryDutyUser = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/arrangement/queryDutyUser`, data, successCb, failCb);
};

export const getUopUser = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/user/getUopUser`, data, successCb, failCb);
};

/**
 * 根据席位id以及时间查询该席位在某一天的值班安排
 * @param data
 * @param successCb
 * @param failCb
 */
export const querySeatDuty = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/arrangement/queryUserDutyBySeat`, data, successCb, failCb);
};

/**
 * 获取所有值班事件
 * @param data
 * @param successCb
 * @param failCb
 */
export const queryDutyEvent = (successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/duty/getDutyIncidentList`, {}, successCb, failCb);
};


/**
 *  获取代办事项提醒状态
  * @param data
 *  @param successCb
 *  @param failCb
 */
export const getBacklogRemind = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/remind/getBacklogRemind`, data, successCb, failCb);
}

 /**
 *  设置代办事项提醒状态
  * @param data
 *  @param successCb
 *  @param failCb
 */
export const setBacklogRemind = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/remind/setBacklogRemind`, data, successCb, failCb);
}

 /**
 *  获取当前登录uop用户的详细信息
  * @param data
 *  @param successCb
 *  @param failCb
 */
export const getUopLoginUserInfo = (content, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/user/getUopLoginUserInfo`, {}, successCb, failCb);
}

/**
 *  根据值班事件标题模糊查询值班事件
  * @param data
 *  @param successCb
 *  @param failCb
 */
export const queryDutyIncidentByTitle = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/v1/schedule/duty/queryDutyIncidentByTitle`, data, successCb, failCb)
}


/**
 * 上班打卡
 * @param  data 
 * @param  successCb 
 * @param  failCb 
 */
export const clockIn = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/punchCard/clockIn`, data, successCb, failCb);
}


/**
 * 上班打卡检查
 * @param  data 
 * @param  successCb 
 * @param  failCb 
 */
export const clockCheck = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/punchCard/clockInCheck`, data, successCb, failCb);
}

/**
 * 下班打卡
*  @param  data 
 * @param  successCb 
 * @param  failCb 
 */
export const clockOut = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/v1/schedule/punchCard/clockOut`, data, successCb, failCb);
}

/**
 * 下班打卡检查
 * @param  data 
 * @param  successCb 
 * @param  failCb 
 */
 export const clockOutCheck = (data, successCb, failCb) => {
   get(`${scheduleBaseUrl}/v1/schedule/punchCard/clockOutCheck`, data, successCb, failCb);
 }

 /**
  * 获取当前在当天的所有值班
  * @param  data 
  * @param  successCb 
  * @param  failCb 
  */
 export const getUserDutyToday = (data, successCb, failCb) => {
   get(`${scheduleBaseUrl}/v1/schedule/punchCard/getUserDutyToday`, data, successCb, failCb);
 }

 /**
  * 下班打卡提示
  * @param  data 
  * @param  successCb 
  * @param  failCb 
  */
  export const handoverPrompts = (data, successCb, failCb) => {
    get(`${scheduleBaseUrl}/v1/schedule/punchCard/handoverPrompts`, data, successCb, failCb);
  }

  /**
   * 判断当天用户是否打卡
   *@param  data 
   * @param  successCb 
   * @param  failCb 
   */
  export const isClockIn = (data, successCb, failCb) => {
    get(`${scheduleBaseUrl}/v1/schedule/punchCard/isClockIn`, data, successCb, failCb)
  }