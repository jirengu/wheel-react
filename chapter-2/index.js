import Jreact from './lib/jreact.js'
import JreactDOM from './lib/jreact-dom'


/** step 1 */
/**
 * 直接渲染JSX
 */
/*
JreactDom.render((
  <h1>hello jirengu</h1>
), document.querySelector('#app'))
*/

/** step 2 */ 
/**
 * 引入组件的概念
 */
// class Component {
//   constructor(props = {}) {
//     this.state = {}
//     this.props = props
//   }

//   setState(state) {
//     Object.assign(this.state, state)
//     JreactDOM.renderComponent(this)
//   }
// }

class App extends Jreact.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '饥人谷',
      job: '教大家写一个React',
      hobbies: ['电影', '游戏']
    }
  }

  render() {
    return (
      <div>
        <h1>我是 { this.state.name }</h1>
        <Job job = { this.state.job }></Job>
        <Hobby hobbies = { this.state.hobbies } ></Hobby>
        <button onClick = { this.saySomething.bind(this) }>点我</button>
      </div>
    )
  }

  saySomething () {
    console.log('我的名字是' + this.state.name)
  }
}

class Job extends Jreact.Component {
    render() {
      return (
        <p>我的职业是 { this.props.job }</p>
      )
    }
}

function Hobby(props) {
  return (
    <div>我的兴趣是
      <ul>
      { props.hobbies.map(v => <li>{ v }</li>) }
      </ul>
    </div>
  )
}

JreactDOM.render(<App/>, document.querySelector('#app'))
