/**
 * 下载文件,传入Ids
 * @param url
 * @param Ids
 * @param idName
 */
export const downloadFileAnother = function (url, Ids, idName) {
    let name = '';
    switch (idName) {
      case 'dutyIncidentIds':
        name = 'dutyIncidentIds';
        break;
      case 'backlogIds':
        name = 'backlogIds';
        break;
      case 'telephoneIds':
        name = 'telephoneIds';
        break;
      case 'ids':
        name = 'ids';
        break;
      case 'explainIds':
        name = 'explainIds';
        break;
      case 'logIds':
        name = 'logIds';
    }
    const id = typeof Ids === 'undefined' ? 1 : Ids;
    console.log('name', name)
    const form = $('<form></form>')
    .attr('action', url)
    if (name === 'dutyIncidentIds') {
      form.attr('method', 'GET');
    } else {
      form.attr('method', 'POST');
    }
   
    form.append(
      $('<input/>')
        .attr('type', 'hidden')
        .attr('name', name)
        .attr('value', id)
    );
  
    form
      .appendTo('body')
      .submit()
      .remove();
  };