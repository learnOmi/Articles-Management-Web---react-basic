import React, { Component } from 'react'
import { Form, Card, Breadcrumb, Radio, Button, Select, DatePicker, Table } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { articleStatus } from 'apis/constants'
import { getChannels } from 'apis/channels'
import { columnsDef } from 'apis/constants'
import { getArticles } from 'apis/articles'

export default class Article extends Component {
  state = {
    channels: [],
    articles: {}
  }

  render() {
    return (
      <div className={styles.root}>
        <Card title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/layout/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/layout/article">文章</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/layout/article-publish">文章发布</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          }>
          <Form>
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
              <Select style={{ width: 200 }} placeholder="请选择频道">
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
        <Card title={`查询结果：${this.state.articles.total_count}条`}>
            <Table columns={columnsDef} dataSource={this.state.articles.results} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 1300 }}>
            </Table>
        </Card>
      </div>
    )
  }

  componentDidMount() {
    this.getChannels();
    this.getArticles();
  }

  async getChannels(){
    const channels = await getChannels();
    if (channels) {
      this.setState({ channels: channels.data.channels });
    }
  }

  async getArticles() {
    const articles = await getArticles();
    if (articles) {
      this.setState({ articles: articles.data });
    }
  }
}
