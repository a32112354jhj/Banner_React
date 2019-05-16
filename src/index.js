import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App
    // 設定一開始是否為開或合
    openAtStart={true} // [boolean] true | false
    // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
    autoToggle={3000} // [boolean|number] true | false | 3000
    // 設定收合展開按鈕
    button={{
        closeText: '收合', // [string]
        openText: '展開', // [string]
        class: 'btn' // [string]
    }}
    // 設定模組在各狀態時的class
    class={{
        closed: 'closed', // [string]
        closing: 'closing', // [string]
        opened: 'opened', // [string]
        opening: 'opening' // [string]
    }}
    // 是否要有transition效果
    transition={true}
    whenTransition={function () {
        console.log('whenTransition');
    }
    }
/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


