import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import FormElement from '@/components/FormElement';
import styles from './style.less';

class Step1 extends React.Component {

  handleNextStep = () => {
    this.props.handleNextStep(1);
  }

  render() {
    const { form, auditMessage } = this.props;
    const { articlename, author, articleType, articleForm, artcileDecription, auditname } = auditMessage;
    const currentUser = 'daqing';
    const formElementProps = {
      form,
      width: 400
    };
    const selectOptions = [
      {
        label: '科学',
        value: 0,
      }, {
        label: '历史',
        value: 1,
      }, {
        label: '文学',
        value: 2,
      }, {
        label: '体育',
        value: 3
      }
    ];
    const formOptions = [
      {
        label: '在线发布',
        value: 0,
      }, {
        label: '文件上传',
        value: 1,
      }
    ];
    return (
      <>
        <Row type="flex" justify="space-around" align="middle">
          <Col>
            <Form>
              <FormElement
                {...formElementProps}
                label="文章名称"
                field="articlename"
                initialValue={articlename}
              />
              <FormElement
                {...formElementProps}
                label="文章作者"
                field="author"
                initialValue={author}
              />
              <FormElement
                {...formElementProps}
                label="文章类型"
                type="select"
                field="articleType"
                options={selectOptions}
                initialValue={articleType || undefined}
              />
              <FormElement
                {...formElementProps}
                label="文章简述"
                type="textarea"
                field="articleDescription"
                rows={2}
                initialValue={artcileDecription}
              />
              <FormElement
                {...formElementProps}
                label="文章形式"
                field="articleForm"
                options={selectOptions}
                initialValue={articleForm}
              />
              <div className={styles.fontStyle}>
                <FormElement>
                  <span>{articleForm === 0 ? "文章内容" : "附件名称"}</span>
                </FormElement>
              </div>
              <FormElement style={{ textAlign: 'center' }}>
                <Button type="primary" onClick={this.handleNextStep}>下一步</Button>
              </FormElement>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

export default Form.create({ name: 'Step1' })(Step1);