/**
 * Created by qunar on 16/6/1.
 */
'use strict';

import React, {Component} from 'react';
import cx from 'classnames';
import { getUrlRelativePath } from 'utils/http';
import './layout.less';

const menus = [
  { name: '注册', url: '/register'},
  { name: '文档', url: '/docs'},
  { name: '下载', url: '/download'}
];

class Header extends Component {
  constructor(props) {
    super(props);
  }

  getMenus() {

  }

  render() {
    let path = getUrlRelativePath();


    return (
      <div className="header">
        <div className="content">
          <div className="logo"></div>
          <ul className="menu">
            {
              menus.map((menu, index) => {
                return (
                  <li key={`header.menu.${index}`} className={cx( path == menu.url ? 'active' : '' )}>
                    <a href={menu.url}>{menu.name}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Header;
