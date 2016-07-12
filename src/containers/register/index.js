'use strict';

import React, { Component } from 'react';
import cx from 'classnames';
import { isObject } from 'utils/validator';
import { api } from 'utils/http';

import './index.less';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: '',
      pubKey: '',
      appKey: '',
      isResult: false,
      errorMsg: '',
      matchError: false
    }
  }

  componentDidMount() {

  }

  isMatch(appName) {
    if (appName.length != 0) {
      var reg = /^[a-zA-Z0-9_]+$/;
      if (!reg.test(appName)) {
        this.setState({
          errorMsg: '对不起, 你输入的字符串类型格式不正确',
          matchError: true,
          isResult: false,
        });
        return false;
      } else {
        return true;
      }
    }
  }

  clickRegister() {
    if (this.isMatch(this.state.appName)) {
      this.setState({
        isResult: false,
        errorMsg: '',
        matchError: false
      });

      api('/jspatch/newApp', {
        appName: this.state.appName
      }).then((res) => {

        this.setState({
          isResult: true,
          appKey: res.data.appKey,
          pubKey: res.data.pk
        });
      }, (error) => {
        this.setState({
          errorMsg: isObject(error) && error.message ? error.message : '网络请求失败，请联系管理员'
        });
      });
    }
  }

  clickQuery() {
    this.setState({
      isResult: false,
      errorMsg: '',
      matchError: false
    });

    api('/jspatch/getApp', {
      appName: this.state.appName
    }).then((res) => {

      this.setState({
        isResult: true,
        appKey: res.data.appKey,
        pubKey: res.data.pk
      });
    }).catch((error) => {
      this.setState({
        errorMsg: isObject(error) && error.message ? error.message : '网络请求失败，请联系管理员'
      });
    });
  }

  changeValue(evt) {
    this.setState({
      appName: evt.target.value
    })
  }

  render() {
    return (
      <div id="register">
        <div className="register-board">
          <h1>注册APP</h1>
          <div className="register-content" >
            <input className={ cx('appName', this.state.matchError ? 'redBorder' : '') } placeholder="App名称(需要全局唯一)" value={this.state.appName} onChange={::this.changeValue} />
            <br />
            <button className="btn-register" type="text" onClick={::this.clickRegister} >注 册</button>
            <button className="btn-query" type="text" onClick={::this.clickQuery} >查 询</button>
          </div>

          <p className={ cx('error', this.state.errorMsg ? '' : 'hidden') } >
            错误信息：{ this.state.errorMsg }
          </p>

          <div className={ cx('result-board', this.state.isResult ? '' : 'visible') }>
            <h2>App Key:</h2>
            <p>{ this.state.appKey }</p>
            <h2>Public Key:</h2>
            <p dangerouslySetInnerHTML={{ __html: this.state.pubKey }}></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
