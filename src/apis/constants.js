import logo from 'assets/logo.png';

export const sideMenu = [
  {name:"数据概览",url:"/layout/home"}, 
  {name:"文章管理",url:"/layout/article"},
  {name:"内容管理",url:"/layout/article-publish"}
];


export const articleStatus = [
    {label: '未审核', Value: '1'},
    {label: '草稿', Value: '0'},
    {label: '审核失败', Value: '2'},
    {label: '审核通过', Value: '3'},
    {label: '全部', Value: '-1'}
];

export const columnsDef = [
  {
    title: '封面',
    dataIndex: 'cover',
    render:(param)=>{
      if(param.type === '0') {
        return (<img src={logo} alt=''/>);
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
    render: (text, record) => (
      <span>
        <a>编辑</a>
        <a style={{ marginLeft: 8 }}>删除</a>
      </span>
    ),
  },
]; 