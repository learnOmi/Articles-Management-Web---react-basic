import React, { Component } from 'react'
import { Form, Card, Breadcrumb, Radio, Button, DatePicker, Table, Modal, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { articleStatus } from 'apis/constants'
import { columnsDef } from 'apis/constants'
import { getArticles, delArticle } from 'apis/articles'
import dayjs from 'dayjs'
import eventBus from 'utils/eventbus'
import { EVENTS } from 'apis/constants'
import { ExclamationCircleFilled } from '@ant-design/icons';
import Channels  from 'components/Channels/Channels'
import { hookWrapper } from 'utils/singlehookwrapper'

class Article extends Component {
  formRef = React.createRef();

  searchParams = {
    page:1,
    pageSize:10,
  }

  state = {
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
              { title: '文章' },
              { title: <Link to="/layout/article-publish">文章发布</Link> }
            ]
          }/>
          }
        >
          <Form ref={this.formRef} onFinish={this.onSift} initialValues={{status:'0'}}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {articleStatus.map(item => (
                  <Radio key={item.Value} value={item.Value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="频道" name="channel">
              <Channels style={{width:'200px'}}></Channels>
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
        <Card title={`查询结果：${total_count?total_count:0}条`}>
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
    this._getArticles(this.searchParams);
    this.columnDelListener();
  }

  componentWillUnmount(){
    // 清除所有监听器
    eventBus.all.clear();
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
    const params = this.dealSearchParam(this.searchParams,{...this.formRef.current.getFieldsValue(), page, pageSize})
    this._getArticles(params);
  }

  dealSearchParam = (targetSearchParams, params, isResetPage = false)=>{
    const searchParams = Object.assign({}, targetSearchParams);

    const {status, channel, date, page, pageSize} = params;
    if(status && Number(status) !== Number('-1')){
      searchParams['status'] = status;
    }
    if(channel){
      searchParams['channel_id'] = channel;
    }
    if(date){
      if(date[0]){
        searchParams['begin_pubdate'] = dayjs(date[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      }
      if(date.length >= 2 && date[1]){
        searchParams['end_pubdate'] = dayjs(date[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
      }
    }
    if(page){
      searchParams.page = page;
    }
    if(pageSize){
      searchParams.pageSize = pageSize;
    }

    if(isResetPage){
      searchParams.page = 1;
    }

    return searchParams;
  }

  onSift = (data)=>{
    const params = this.dealSearchParam(this.searchParams, data, true);
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
    this.props.useNavigate('/layout/article-publish/' + data.id);
  }

}

export default hookWrapper(Article, useNavigate)
