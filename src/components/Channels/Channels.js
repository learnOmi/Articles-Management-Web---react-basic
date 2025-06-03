import React, { Component } from 'react'
import { Select } from 'antd'
import { getChannels } from 'apis/channels'

export default class Channels extends Component {
    state = {
        channels:[]
    }
 
    render() {
        return (
            <Select 
                {...this.props}
                //style={{ width: 200 }} 
                placeholder="请选择频道" 
                allowClear={true}
                // antd的formitem会传递这两个属性；这里绑定以完成对表单的控制
                value={this.props.value}
                onChange={this.props.onChange}
                >
                {this.state.channels.map(channel => (
                    <Select.Option key={channel.id} value={channel.id}>
                    {channel.name}
                    </Select.Option>
                ))}
            </Select>
        )
    }

    componentDidMount(){
        this._getChannels();
    }

    async _getChannels(){
        const channels = await getChannels();
        if (channels) {
            this.setState({ channels: channels.data.channels });
        }
    }


}
