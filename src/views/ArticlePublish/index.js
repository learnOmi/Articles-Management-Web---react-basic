import React, { Component } from 'react'
import { Breadcrumb, Button, Card, Form, Input, Space, Radio, Upload, message, Image } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import Channels from 'components/Channels/Channels'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { coverUploadType, RESOLUTION } from 'apis/constants'
import UploadButton from 'components/UploadButton/UploadButton'
import { baseURL } from 'utils/request'
import { addArticle, addDraft, getArticleDetail, updArticle, updArticleDraft } from 'apis/articles'
import { hookWrapper } from 'utils/singlehookwrapper'

class ArticlePublish extends Component {
  formRef = React.createRef();

  state = {
    covertype: 0,
    loading:false,
    //imgUrl:'',
    fileList:[],
    preViewURL:'',
    previewOpen:false,
    passageid:null
  }

  render() {
    return (
      <div className={styles.root}>
        <Card title={
          <Breadcrumb items={[
            { title: <Link to="/layout/home">首页</Link> },
            { title: <Link to="/layout/article">文章</Link> },
            { title: this.state.passageid ? '文章修改' : '文章发布' }
          ]}>
          </Breadcrumb>
        }>
          <Form ref={this.formRef} 
            onFinish={this.onSubmit} 
            labelCol={{span:4}} 
            size='large' 
            validateTrigger={['onChange', 'onBlur']}
            initialValues={{cover:'0'}} >
            {/* name要赋值给Item才行 */}
            <Form.Item name='title' label='标题' rules={[
              { required:true, message:'Title cannot be empty!' }
            ]}>
              <Input placeholder='请输入标题' className='title-input'></Input>
            </Form.Item>
            <Form.Item name='channel_id' label='频道' rules={[
              { required:true, message:'Channel cannot be empty！' }
            ]}>
              <Channels className='ch-input'></Channels>
            </Form.Item>
            <Form.Item name='cover' label='封面'>
              <Radio.Group onChange={this.setCoverUploadType}>
                {
                  coverUploadType.map(item =><Radio key={item.value} value={item.value}>{item.label}</Radio>)
                }
              </Radio.Group>
            </Form.Item>
            {/*
              // 默认情况下，Form.Item 会绑定 value 属性; valuePropNmae 指定与内部组件绑定的值
            */}
            <Form.Item wrapperCol={{offset:4}}>
              <Form.Item>
                {(this.state.covertype !== '0' && (
                  <Upload
                    //upload的name属性主要用于文件上传到服务器时的字段名
                    name='image'
                    listType='picture-card' 
                    // 渲染列表; 不传其内部逻辑的fileList会有非受控逻辑（onError判断!getFileItem(file, mergedFileList)为真直接return）
                    fileList={this.state.fileList}
                    // 上传地址；
                    action= {`${baseURL}upload`}
                    // 上传中、成功、失败都会走这个事件；删除也会
                    onChange={this.upLoadPics}
                    onPreview={this.handlePreview}
                    beforeUpload={this.beforeUpload}
                    >
                      { this.state.fileList.length < this.state.covertype && <UploadButton loading={this.state.loading}></UploadButton>}
                  </Upload>))
                }
              </Form.Item>
              { // 图片预览
                (this.state.previewOpen && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: this.state.previewOpen,
                    onVisibleChange: (visible) => this.setState({previewOpen:visible}),
                    afterOpenChange: (visible) => !visible && this.setState({preViewURL:''}),
                  }}
                  src={this.state.preViewURL}
                />
                ))
              }
            </Form.Item>
            <Form.Item name='content' label='内容' rules={[
              //{ required:true, message:'Content cannot be empty!' },
              { validator: (_, value) => {
                  // 输入文字删除后，reactquill会自动保留\n，转换成<p><br></p>导致校验默认失败
                  if(value === undefined || value === '<p><br></p>'){
                    return Promise.reject(new Error(' Content cannot be empty! '));
                  }
                  return Promise.resolve();
              } }
            ]}>
              <ReactQuill theme='snow' placeholder='请输入内容' ></ReactQuill>
            </Form.Item>
            <Form.Item wrapperCol={{align:'center'}}>
              <Space>
                <Button htmlType='submit' type='primary'>{this.state.passageid? '修改' : '提交'}</Button>
                <Button htmlType='button' onClick={this.onDraft}>存入草稿</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  async componentDidMount(){
    const {id} = this.props.useParams;
    if(id){
      this.setState({passageid:id});
      const res = await getArticleDetail(id);
      const { data } = res;
      if(data){
        const dataForForm = JSON.parse(JSON.stringify(data));
        dataForForm['cover'] = data.cover.type;
        this.setState({
          covertype: dataForForm['cover'],
          fileList: data.cover.images.map(item => {return {'url':item}})
        });
        this.formRef.current.setFieldsValue(dataForForm);
      }else{
        message.error('No such article!');
        this.props.useNavigate('/layout/article');
      }
    } 
  }

  onSubmit = async (data)=>{
    const { fileList, covertype } = this.state;
    if(fileList.length !== Number(covertype)){
      message.error('Picture number is not right!');
      return;
    }

    const images = fileList.map(item => {
      return item.url || item.response.data.url
    })

    const params = {
      ...data,
      cover:{
        type:covertype,
        images:images? images : []
      }
    };

    let res;
    if(!this.state.passageid){
      res = await addArticle(params);
    }else{
      params['id'] = this.state.passageid;
      res = await updArticle(params);
    }

    if(res?.message){
      message.success(res.message);
      this.props.useNavigate('/layout/article')
    }
  }

  onDraft = async ()=>{
    // 通过引用获取Form数据
    const data = this.formRef.current.getFieldsValue();
    const { fileList, covertype } = this.state;
    const images = fileList.map(item => {
      return item.url || item.response.data.url
    })

     const params = {
      ...data,
      cover:{
        type:covertype,
        images:images? images : []
      }
    };

    let res;
    if(!this.state.passageid){
      res = await addDraft(params);
    }else{
      params['id'] = this.state.passageid
      res = await updArticleDraft(params);
    }

    if(res?.message){
      message.success(res.message);
    }
  }

  setCoverUploadType = (e)=>{
    e.target.value && this.setState({covertype: e.target.value, fileList:[]});
  }

  upLoadPics = (e)=>{
    // 提供 fileList 属性时：组件进入完全受控模式; 选择文件后触发onChange(状态变为uploading)
    // 当上传进度更新或完成时，组件尝试再次触发 onChange，但如果检查发现 fileList 属性没有变化（因为没有更新它），组件判定"状态已被外部控制"，不再触发后续的 onChange 回调
    this.setState({fileList:e.fileList})

    const res = e?.file?.response;
    const err = e?.file?.error;
    if(err && res){
      message.error(err.message);
      message.error(res.message);
    }

    const status = e?.file?.status;
    if (status === 'uploading') {
      this.setState({loading:true});
    }else{
      this.setState({loading:false});
    }
  }

  handlePreview = (file) => {
    this.setState({preViewURL: file.url || file.response.data.url, previewOpen: true});
  };

  beforeUpload = (file) => {
    if(file.size > RESOLUTION){
      message.error('File size is too big!');
      return Upload.LIST_IGNORE;
    }

    if(!['image/png', 'image/jpeg'].includes(file.type)){
      message.error('Only support png/jpg!');
      return Upload.LIST_IGNORE;
    }
    return true;
  }
}


export default hookWrapper(ArticlePublish, useNavigate, useParams)