import React from 'react';
import { Form, Card, Button, Icon } from 'antd';
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';
import styles from './style.less';
import {
  getArticleByMutiKeys
} from '@/services/classifyService';

class PhysicalSearch extends React.Component {

  defaultArray = [1];

  handleAdd = () => {
    this.defaultArray.push(1);
    this.reflesh();
  };
    
  deleteLast = () => {
    this.defaultArray.pop();
    this.reflesh();
  };

  reflesh = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue();
  };

  handleOnQuery = () => {
    this.props.handleOnQuery();
  }

  handleReset = () => {
    this.props.handleReset();
  }

  render() {
    const { form } =this.props;
    const formElementProps = {
        form,
        width: 300,
        style: { paddingLeft: 16 },
      };
    const dataLayout = this.defaultArray.map((item, index) => {
        return (
          <div className={styles.border}>
            <div className={styles.title}>{`关键词组${index + 1}`}</div>
            <FormRow>
              <FormElement
                label="关键词1"
                {...formElementProps}
                field={`keyword${index*4+1}`}
                required={true}
              />
              <FormElement
                label="关键词2"
                {...formElementProps}
                field={`keyword${index*4+2}`}
              />
              <FormElement
                label="关键词3"
                {...formElementProps}
                field={`keyword${index*4+3}`}
              />
              <FormElement
                label="关键词4"
                {...formElementProps}
                field={`keyword${index*4+4}`}
              />
            </FormRow>
          </div>
        );
      });
    return(
      <Card
        title={<span style={{ fontWeight: 'bold' }}>多关键词检索</span>}
        extra={
          <span 
            style={{ fontWeight: 'bold', cursor: 'pointer' }} 
            onClick={this.handleReset}
          ><Icon type="delete" /> 重置
          </span>}
      >
        {dataLayout}
        <div style={{ textAlign: 'center' }}>
          <Button
            disabled={this.defaultArray.length >= 16}
            onClick={this.handleAdd}
            style={{ marginRight: 10 }}
            type="dashed"
            icon="plus-circle"
          >
            添加
          </Button>
          <Button
            style={{ marginRight: 10 }}
            disabled={this.defaultArray.length <= 1}
            onClick={this.deleteLast}
            type="danger"
            icon="minus-circle"
          >
            删除最后一项
          </Button>
          <Button 
            type='primary'
            icon="search"
            onClick={this.handleOnQuery}
          >
            查询
          </Button>
        </div>
      </Card>
    )
  }
}

export default Form.create({name: 'physicalSearch'})(PhysicalSearch);
