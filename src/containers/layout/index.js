'use strict';

import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import './layout.less'

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minHeight: 'auto'
    }
  }

  componentDidMount() {
    this.resize();

    window.onresize = this.resize.bind(this);
  }

  resize() {
    this.setState({
      minHeight: window.innerHeight - 170
    });
  }

  render() {
    let props = this.props;

    return (
      <div className="layout">
        <Header />
        <div className="frame-container" style={{minHeight:this.state.minHeight}}>
          { props.children }
        </div>
        <Footer />
      </div>
    )
  }
}

export default Layout;
