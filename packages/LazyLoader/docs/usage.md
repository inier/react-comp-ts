---
title: Simple Usage
sidebar_label: 用法
order: 1
---

```jsx preview
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { lazy, lazyX, loadable, loadableDelay, loadableTimeout } from '@ozo/lazy-loader';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import NormalLoad from './Demo.jsx';

const LazyLoad = lazy(() => import('./Demo'), { pastDelay: 0 });
const LazyXLoad = lazyX(() => import('./Demo'));
/**
 * 动态加载组件的组件,支持自定义加载动画
 */
const AsyncLoad = loadable(() => import('./Demo'));
const PreLoad = loadable(() => import('./Demo'));
const DelayLoad = loadableDelay(import('./Demo'), {
    delay: 3000,
    spinner: <Loader type="Triangle" color="#666" height={50} width={50} />,
});
const TimeoutLoad = loadableTimeout(import('./Demo'), { timeout: 5 });

async function randomString(len) {
    len = len || 16;
    // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';

    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

const Section = styled.div`
    overflow: hidden;
`;

class App extends Component {
    state = {
        list: [],
    }
    componentDidMount(){
        const list = await randomString(480000).split('');

        setTimeout(()=>{
            this.setState({list: list});
        }, 0);
    }
    render() {
        const { list } = this.state;
        PreLoad.preload();
        return (
            <>
                <Section>
                    <h3>使用loadable预加载</h3>
                    <AsyncLoad list={list} />
                </Section>
            </>
        );
    }
}

ReactDOM.render(<App />, mountNode);
```
