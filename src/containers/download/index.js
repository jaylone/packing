'use strict';

import React, { Component } from 'react';
import './index.less';

class Register extends Component {

  render() {
    return (
      <div id="content">
        {/* 手动更新 */}
        <a className="btn-down" href="http://gitlab.corp.qunar.com/pod_libs/qpatch_lib_prod/repository/archive.zip?ref=0.0.1">
          SDK下载(V0.1)
        </a>
        <p className="support">(支持架构：armv7s armv7 arm64 i386 x86_64 )</p>

        <h2>更新日志</h2>

        <h3>版本: 0.1</h3>
        <h3>日期: 2016年6月30日</h3>
        <ol className="change-log">
          <li>JSPatch项目初始化为静态库</li>
          <li>新增接口<code>+ (void)registWithKey:(NSString *)appKey andVid:(NSString *)vid andPubKey:(NSString *)pubKey</code>,负责注册appKey,vid,pubKey,初始化QPatch项目</li>
          <li>支持C方法的替换</li>
          <li>JSPatch核心代码更新到最新版本</li>
        </ol>

      </div>

    )
  }
}

export default Register;
