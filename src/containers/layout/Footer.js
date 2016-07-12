'use strict';

import React, {Component} from 'react';
import './layout.less';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p className="footer">
        <span>Qunar iOS  |  联系我们</span>
        <br />
        <span>Qunar QPatch Platform &copy; 2016</span>
      </p>
    )
  }
}

export default Header;
