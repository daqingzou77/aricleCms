import React, { Fragment } from 'react';
import { Button, Form, Card, Row, Col, Icon, List, Typography } from 'antd';
import QueryBar from '@/components/QueryBar';
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';

const { Text } = Typography;


class Science extends React.Component {
  id = 0;
  
  state = {
    collapsed: false,
  }

  handleOnRemove = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 0) {
      return;
    };
    form.setFieldsValue({
      keys: keys.slice(1),
    });
  };

  handleOnAdd = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleOnCollapseChange = collapsed => {
    const { form } = this.props;
    this.id = 0;
    this.setState({
      collapsed 
    });
    form.setFieldsValue({
      keys: [],
    });
  }

  render() {
    const { collapsed } = this.state;
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formElementProps = {
      form,
      width: 300,
      style: { paddingLeft: 16 },
    };
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} />{text}
      </span>
    );

    // 热门文章
    const hotArticles = [{
      articlename: '《匆匆》-朱自清',
      description: '燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？',
      articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
      href: 'https://zhidao.baidu.com/question/21816886.html?qbl=relate_question_0&word=%B4%D2%B4%D2',
      favorites: '2K',
      likes: '134K',
      dislikes: '561',
      messages: '12k'
    }, {
      articlename: '《骆驼祥子》-老舍',
      description: '今天买上了新车，就算是生日吧，人的也是车的，好记，而且车既是自己的心血，简直没什么不可以把人与车算在一块的地方。',
      articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
      href: 'https://www.ppzuowen.com/book/luotuoxiangzi/',
      favorites: '1.5K',
      likes: '83K',
      dislikes: '420',
      messages: '6.3K'
    }, {
      articlename: '《荷塘月色》-朱自清',
      description: '层层的叶子中间，零星地点缀着些白花，有袅娜地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。',
      articleImgSrc: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3956095388,4232370697&fm=26&gp=0.jpg',
      href: 'http://www.ccview.net/htm/xiandai/zzq/zzqsw002.htm',
      favorites: '923',
      likes: '53K',
      dislikes: '634',
      messages: '6.4K'
    }];

    console.log('keys', keys);
    const formItems = keys.map((value, index) => (
      <div>
        <FormElement
          {...formElementProps}
          label={`关键词${7 + index}`}
          field={`keyword${7 + index}`}
        />
      </div>
    ))

    return (
      <div>
        <Row gutter={24}>
          <Col>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>多关键词检索</span>}
              extra={<span style={{ fontWeight: 'bold', cursor: 'pointer' }}><Icon type="delete" /> 重置</span>}
            >
              <QueryBar
                collapsed={collapsed}
                onCollapsedChange={collapsed => this.handleOnCollapseChange(collapsed)}
              >
                <Form onSubmit={this.handleSearch} autoComplete="off">
                  <FormRow>
                    <FormElement
                      {...formElementProps}
                      label="关键词1"
                      field="keyword1"
                      ref={node => this.nameDom = node}
                    />
                    <FormElement
                      {...formElementProps}
                      label="关键词2"
                      field="keyword2"
                    />
                    <FormElement
                      {...formElementProps}
                      label="关键词3"
                      field="keyword3"
                    />
                    {collapsed ? null : (
                      <Fragment>
                        <FormElement
                          {...formElementProps}
                          label="关键词4"
                          field="keyword4"
                        />
                        <FormElement
                          {...formElementProps}
                          label="关键词5"
                          field="keyword5"
                        />
                        <FormElement
                          {...formElementProps}
                          label="关键词6"
                          field="keyword6"
                        />
                      </Fragment>
                    )}
                    {formItems}
                    {collapsed ? null : (
                      <div>
                        <FormElement layout>
                          <Button
                            type="dashed"
                            icon="plus-circle"
                            style={{ marginLeft: 15 }}
                            onClick={this.handleOnAdd}
                          >
                            添加
                          </Button>
                          <Button
                            type="danger"
                            icon="minus-circle"
                            style={{ marginLeft: 5, display: keys.length > 0 ? 'inline' : 'none' }}
                            onClick={() => this.handleOnRemove()}
                          >
                            删除
                          </Button>
                        </FormElement>
                      </div>)}
                    <FormElement layout>
                      <Button type="primary" icon="search" htmlType="submit" style={{ marginLeft: 10 }}>查询</Button>
                    </FormElement>
                  </FormRow>
                </Form>
              </QueryBar>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 10 }}>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card
              title={<span style={{ fontWeight: 'bold' }}>热门文章</span>}
              bodyStyle={{ height: 608 }}
              extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;换一换</div>}
            >
              <List
                itemLayout="vertical"
                dataSource={hotArticles}
                renderItem={item => (
                  <List.Item
                    key={item.articlename}
                    actions={[
                      <IconText type="star-o" text={item.favorites} key="list-vertical-star-o" />,
                      <IconText type="like-o" text={item.likes} key="list-vertical-like-o" />,
                      <IconText type="dislike" text={item.dislikes} key="list-vertical-dislike" />,
                      <IconText type="message" text={item.messages} key="list-vertical-message" />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<img src={item.articleImgSrc} alt="文章图片" width={120} height={120} />}
                      title={<Text strong><a href={item.href}>{item.articlename}</a></Text>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card>

            </Card>
          </Col>
          <Col span={8} style={{ paddingRight: 0 }}>
            <Card>

            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default Form.create({ name: 'science' })(Science);