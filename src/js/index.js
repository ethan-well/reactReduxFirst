import React from 'react';
import ReactDOM from 'react-dom';

// 创建 action
// action 是 javaScript 对象，是用户行为的抽象，必须包含一个 stype 字段
// 根据 demo 需要实现的记数功能，抽象出两种 action,一种表示加，一种表示减
const incream_action = { type: 'INCREAM' };
const decream_action = { type: 'DECREME' };

// 创建 reducer
// reducer 接受一个 previousState 和 action 返回一个新的 state
const reducer = (state=0, action) => {
  switch (action.type) {
    case incream_action.type:
      return state + 1;
    case decream_action.type:
      return state - 1;
    default:
      console.log('default');
      return state;
  }
}

// 创建 store
// store 使用 createStore(reducers) 创建
// createStore 由 redux 提供
// store 是一个对象，本身包含四个方法
// getState(): 获取当前 store 中的状态
// dispatch(action): 分发一个 action，并返回这个 action,这是唯一能改变 store 中数据的方式
// subscribe(listener): 注册一个监听这，在 store 发生变化是被调用
// replaceReducer(nextReducer): 更新当前 store 里面的 reducer
import { createStore } from 'redux';
let store = createStore(reducer);

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { count, doIncrement, doDecrement } = this.props
    return(
      <div>
        <span>{count}</span>
        <button onClick={doIncrement}>+</button>
        <button onClick={doDecrement}>-</button>
      </div>
    )
  }
}

const render = () => ReactDOM.render(
  <Counter
    count={store.getState()}
    doIncrement={() => store.dispatch(incream_action)}
    doDecrement={() => store.dispatch(decream_action)}
  />,
  document.getElementById('root')
);

render();

// store 变化后，刷新页面
// 为了能在 store 发生变化后能刷新页面，需要给 store 注册一个监听事件
store.subscribe(render);
