import React, { Component } from 'react'
import { Form, Card, Breadcrumb, Radio, Button, Select, DatePicker, Table, Modal, message } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { articleStatus } from 'apis/constants'
import { getChannels } from 'apis/channels'
import { columnsDef } from 'apis/constants'
import { getArticles, delArticle } from 'apis/articles'
import dayjs from 'dayjs'
import eventBus from 'utils/eventbus'
import { EVENTS } from 'apis/constants'
import { ExclamationCircleFilled } from '@ant-design/icons';

export default class Article extends Component {
  searchParams = {
    page:1,
    pageSize:10
  }

  state = {
    channels: [],
    articles: {},
  }

  render() {
    const { page, per_page, total_count, results } = this.state.articles;
    return (
      <div className={styles.root}>
        <Card title={
          <Breadcrumb items={
            [
              { title: <Link to="/layout/home">首页</Link> },
              { title: <Link to="/layout/article">文章</Link> },
              { title: <Link to="/layout/article-publish">文章发布</Link> }
            ]
          }/>
          }
        >
          <Form onFinish={this.onSift}>
            <Form.Item label="状态" name="status" initialValue={articleStatus[0].Value}>
              <Radio.Group>
                {articleStatus.map(item => (
                  <Radio key={item.Value} value={item.Value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="频道" name="channel">
              <Select style={{ width: 200 }} placeholder="请选择频道" allowClear={true}>
                {this.state.channels.map(channel => (
                  <Select.Option key={channel.id} value={channel.id}>
                    {channel.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="日期" name="date">
              <DatePicker.RangePicker
                style={{ width: 300 }}
                placeholder={['开始日期', '结束日期']}
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title={`查询结果：${total_count}条`}>
            <Table columns={columnsDef} dataSource={results} rowKey="id" 
              pagination={{
                pageSize: per_page,
                total: total_count,
                current: page,
                positions: ['bottomCenter'],
                onChange:this.onPageChange,
                }
               } 
               scroll={{ x: 1300 }}>
            </Table>
        </Card>
      </div>
    )
  }

  componentDidMount() {
    this._getChannels();
    this._getArticles();
    this.columnDelListener();
  }

  componentWillUnmount(){
    // 清除所有监听器
    eventBus.all.clear();
  }

  async _getChannels(){
    const channels = await getChannels();
    if (channels) {
      this.setState({ channels: channels.data.channels });
    }
  }

  async _getArticles(params) {
    const articles = await getArticles(params);
    if (articles) {
      this.setState({
        articles:articles.data
      });
    }
  }

  onPageChange = (page,pageSize)=>{
    this.searchParams.page = page;
    this.searchParams.per_page = pageSize;
    this._getArticles(this.searchParams);
  }

  onSift = ({status,channel,date})=>{
    const params = {
      page:1
    };
    if(status && Number(status) !== Number('-1')){
      params['status'] = status;
    }
    if(channel){
      params['channel_id'] = channel;
    }
    if(date){
      if(date[0]){
        params['begin_pubdate'] = dayjs(date[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      }
      if(date.length >= 2 && date[1]){
        params['end_pubdate'] = dayjs(date[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
      }
    }
    this._getArticles(params);
  }

  columnDelListener = () => {
    eventBus.on(EVENTS.ARTICLE_EVENTS.BUTTON_CLICKED,(data) => data.type === 'del' ? this.onColDel(data) : this.onColMod(data));
  }

  onColDel = (data) => {
    Modal.confirm({
      title: 'Warning',
      content: 'Confirm deleteing？',
      icon:<ExclamationCircleFilled />,
      onOk: async () => { 
        const res = await delArticle(data);
        if(res.message) message.success(res.message);
        this._getArticles(this.searchParams);
      }
    });
  }

  onColMod = (data) => {
    console.log(data);
  }


}
