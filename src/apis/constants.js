import { Button, Space, Tag } from 'antd';
import logo from 'assets/logo.png';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import eventBus from 'utils/eventbus';

export const sideMenu = [
  {name:"数据概览",url:"/layout/home"}, 
  {name:"文章管理",url:"/layout/article"},
  {name:"内容管理",url:"/layout/article-publish"}
];


export const articleStatus = [
    {label: '未审核', Value: '1', color: 'blue'},
    {label: '草稿', Value: '0', color: 'green'},
    {label: '审核失败', Value: '2', color: 'red'},
    {label: '审核通过', Value: '3', color: 'purple'},
    {label: '全部', Value: '-1', color: 'default'}
];

export const columnsDef = [
  {
    title:'id',
    dataIndex:'id',
    hide: true
  },
  {
    title: '封面',
    dataIndex: 'cover',
    render:(param)=>{
      if(Number(param.type) === Number('0')) {
        return (<img style={{ width: 200, height: 120, objectFit: 'cover' }} src={logo} alt=''/>);
      }
      return (
        <img src={param.images[0]} alt="" style={{ width: 200, height: 120, objectFit: 'cover' }} />
      )
    }
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render:(param) => {
      const obj =  articleStatus.find(item => Number(item.Value)===Number(param));
      return (
        <Tag color={obj.color}>
          {obj.label}
        </Tag>
      )
    }
  },
  {
    title: '发布时间',
    dataIndex: 'pubdate',
  },
  {
    title: '阅读数',
    dataIndex: 'read_count',
  },
  {
    title: '点赞数',
    dataIndex: 'like_count',
  },
  {
    title: '评论数',
    dataIndex: 'comment_count',
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: (_,param) => (
      <Space>
        <Button type='primary' shape='round' icon={<EditOutlined />} />
        <Button type='primary' shape='round' icon={<DeleteOutlined />} onClick={()=>eventBus.emit(ARTICLE_EVENTS.BUTTON_CLICKED,{type:'del', id:param?.id})}/>
      </Space>
    ), 
  },
].filter(col => !col.hide); 


// 定义组件特定事件
const ARTICLE_EVENTS = {
    BUTTON_CLICKED: 'button:clicked',
  }
export const EVENTS = {
  ARTICLE_EVENTS
};