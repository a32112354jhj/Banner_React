import React, { Component } from 'react';
import banner from './img/1200x380.png';
import './css/sty.css';

export default class App extends Component {

  class = ['open', 'opening', 'closing', 'close'];
  bannerText = ['關閉', '關閉', '打開', '打開'];
  bannerSatusClass = ['open_s', 'open_s', 'close_s', 'close_s'];
  state = {
    openAtStart: true,
    autoToggle: true,
    transition: true,
    status: 0,
    transitionClass: '',
    whenTransition: this.props.whenTransition
  }

  constructor(props) {
    super(props);

    this.state.openAtStart = typeof (props.openAtStart) !== 'undefined' ? props.openAtStart : this.state.openAtStart;
    this.state.autoToggle = typeof (props.autoToggle) !== 'undefined' ? props.autoToggle : this.state.autoToggle;
    this.state.transition = typeof (props.transition) !== 'undefined' ? props.transition : this.state.transition;
    
    // 狀態class
    this.class[0] = typeof (props.class.opened) !== 'undefined' ? props.class.opened : this.class[0];
    this.class[1] = typeof (props.class.opening) !== 'undefined' ? props.class.opening : this.class[1];
    this.class[2] = typeof (props.class.closing) !== 'undefined' ? props.class.closing : this.class[2];
    this.class[3] = typeof (props.class.closed) !== 'undefined' ? props.class.closed : this.class[3];

    // 按鈕文字
    this.bannerText[0] = typeof (props.button.closeText) !== 'undefined' ? props.button.closeText : this.bannerText[0];
    this.bannerText[1] = typeof (props.button.closeText) !== 'undefined' ? props.button.closeText : this.bannerText[1];
    this.bannerText[2] = typeof (props.button.openText) !== 'undefined' ? props.button.openText : this.bannerText[2];
    this.bannerText[3] = typeof (props.button.openText) !== 'undefined' ? props.button.openText : this.bannerText[3];
  }

  onClick = () => {
    this.toggle();
    
  }

  // 開闔
  toggle() {
    if (this.state.status === 0) {
      this.close();
    }
    else if (this.state.status === 3) {
      this.open();
    }
  }

  // 打開
  open() {
    // 執行動畫(無)
    if (!this.state.transition) {
      this.setState({
        status: 0
      });
    }
    else {
      this.setState({
        status: 1
      });

      setTimeout(function () {
        this.setState({ status: 0 })
      }.bind(this), 1500);
      this.state.whenTransition();
      let whenTransition = setInterval(this.state.whenTransition, 50);
      setTimeout(function () { clearInterval(whenTransition); }, 1500);
    }
  }

  // 關閉
  close() {
    // 執行動畫(無)
    if (!this.state.transition) {
      this.setState({
        status: 3
      });
    }
    else {
      this.setState({
        status: 2
      });
      setTimeout(function () {
        this.setState({ status: 3 })
      }.bind(this), 1500);

      let whenTransition = setInterval(this.state.whenTransition, 50);
      setTimeout(function () { clearInterval(whenTransition); }, 1500);
    }
  }

  // ===========================================

  componentDidMount() {
    // 起始狀態
    if (this.state.openAtStart) {
      this.setState({ status: 0 })
    }
    else {
      this.setState({ status: 3 })
    }

    // 收合動畫
    if (this.state.transition === true) {
      this.setState({
        transitionClass: 'transition'
      });
    }

    // 自動收合
    if (this.state.autoToggle === true) {
      setTimeout(function () {
        this.state.openAtStart ? this.close() : this.open();
      }.bind(this), 1)
    }
    else if (this.state.autoToggle === false) {
      return;
    }
    else if (typeof (this.state.autoToggle) !== 'bool') {
      setTimeout(function () {
        this.state.openAtStart ? this.close() : this.open();
      }.bind(this), this.state.autoToggle)
    }

  }

  render() {
    const bannerText = this.bannerText;
    return (
      <div className={"banner " + this.class[this.state.status] + " " + this.state.transitionClass + " " + this.bannerSatusClass[this.state.status]}>
        <a className="wrap" href="">
          <img src={banner} title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字"></img>
        </a>
        <div type="button" className={"btn_sty "+this.props.button.class} onClick={this.onClick}>
          {bannerText[this.state.status]}
        </div>
      </div>
    );
  }
}

