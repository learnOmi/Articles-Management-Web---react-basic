import React, { Component } from 'react'
import { Breadcrumb, Button, Card, Form, Input, Space, Radio, Upload, message } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import Channels from 'components/Channels/Channels'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { coverUploadType } from 'apis/constants'
import UploadButton from 'components/UploadButton/UploadButton'
import { baseURL } from 'utils/request'

export default class ArticlePublish extends Component {


  state = {
    covertype: '0',
    loading:false,
    //imgUrl:'',
    fileList:[]
  }

  render() {
    return (
      <div className={styles.root}>
        <Card title={
          <Breadcrumb items={[
            { title: <Link to="/layout/home">首页</Link> },
            { title: <Link to="/layout/article">文章</Link> },
            { title: '文章发布' }
          ]}>
          </Breadcrumb>
        }>
          <Form onFinish={this.onSubmit} 
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
            <Form.Item name='channel' label='频道' rules={[
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
            <Form.Item wrapperCol={{offset:4}}>
              {this.state.covertype !== '0' && (
                <Upload name='image'
                  listType='picture-card' 
                  // 渲染列表; 不传其内部逻辑的fileList会有非受控逻辑（onError判断!getFileItem(file, mergedFileList)为真直接return）
                  fileList={this.state.fileList}
                  // 上传地址；
                  action= {`${baseURL}upload`}
                  // 上传中、成功、失败都会走这个事件；删除也会
                  onChange={this.upLoadPics}
                  >
                    <UploadButton loading={this.state.loading}></UploadButton>
                </Upload>)}
            </Form.Item>
            <Form.Item name='content' label='内容' rules={[
              //{ required:true, message:'Content cannot be empty!' },
              { validator: (_, value) => {
                  // 输入文字删除后，reactquill会自动保留\n，转换成<p><br></p>导致校验默认失败
                  if(value === undefined || value === '<p><br></p>'){
                    return Promise.reject(new Error(' Content cannot be empty! '))
                  }
              } }
            ]}>
              <ReactQuill theme='snow' placeholder='请输入内容' ></ReactQuill>
            </Form.Item>
            <Form.Item wrapperCol={{align:'center'}}>
              <Space>
                <Button htmlType='submit' type='primary'>提交</Button>
                <Button>存入草稿</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  onSubmit = (data)=>{
    console.log(data);
  }

  setCoverUploadType = (e)=>{
    e.target.value && this.setState({covertype: e.target.value});
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
}
