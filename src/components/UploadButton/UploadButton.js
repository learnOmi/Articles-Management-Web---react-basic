import React, { Component } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default class UploadButton extends Component {
  render() {
    return (
        <button style={{ border: 0, background: 'none' }} type="button">
        {this.props.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )
  }
}
