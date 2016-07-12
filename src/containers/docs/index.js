'use strict';

import React, { Component } from 'react';
import './index.less';

class Docs extends Component {


  render() {
    return (
      <div id="container">
        <div id="content">
          <h2>QPatch接入说明</h2>
          <h3>1.获取AppKey</h3>
          <p>在<a className="path" href="/register">http://qpatch.corp.qunar.com/register</a>使用AppName注册添加App，每一个AppName都有唯一的Appkey作为唯一标志符。AppName需由英文字符串、下划线、点组成</p>

          <h3>2.下载导入</h3>
          <p>
            <span>在需要使用Patch库的项目中添加QPatchLib库</span>
            <span>a.若使用到pods，可直接在Podfile中配置如下信息：</span>
            <span><code>pod 'QPatchLib', '~> 0.beta'</code></span>
            <span>b.手动拖动Patch静态库到项目中，目录结构如下：</span>
            <image className="libimportImg" width="500" height="250" />
          </p>

          <h3>3.添加代码</h3>
          <p>
            <span>在AppDelegate或者入口扩展文件中导入头文件，并调用以下方法来调用补丁流程</span>
            <span>a.注册app</span>
            <span>b.执行Patch流程</span>
            <codeframe>
              <span>#import &lt;JSPatch/JSPatch.h&gt;</span>
              <span>@implementation AppDelegate</span>
              <span>- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {'{'}</span>
                <span className="tab">  [QPatch registWithKey:kAPPKey andVid:kAPPVid andPubKey:TestPublickey];</span>
                <span className="tab">  [QPatch excutePatch:1 completion:nil];</span>
                <span className="tab">...</span>
                <span className="tab">  [self.window makeKeyAndVisible];</span>
                <span className="tab">  [QPatch showDebugView];</span>
              <span>{'}'}</span>
              <span>- (void)applicationWillEnterForeground:(UIApplication *)application {'{'}</span>
                <span className="tab">  [QPatch excutePatch:2 completion:nil];</span>
                <span>{'}'}</span>
              <span>- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {'{'}</span>
                <span className="tab">[QPatch excutePatch:3 completion:completionHandler];</span>
              <span>{'}'}</span>
              <span>@end</span>

            </codeframe>

          </p>
        </div>
      </div>
    )
  }
}

export default Docs;
