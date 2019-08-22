import Jreact from './lib/jreact.js'
import JreactDOM from './lib/jreact-dom'


class App extends Jreact.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '饥人谷',
      courses: ['从入门到工作', '前端精进', '全栈'],
      styleObj: {
        color: 'red',
        fontWeight: 'bold'
      }
    }
  }

  render() {
    return (
      <div className="container">
        <h1>欢迎来到<span className="name" style={ this.state.styleObj }>{ this.state.name }</span>学习前端</h1>
        <p>aaa</p>
        <p>bbb</p>
        <div className="action">
          <button onClick = { this.modifyName.bind(this) }>修改名字</button>
          <button onClick = { this.setStyle.bind(this) } >样式</button>
        </div>
      </div>
    )
  }

  modifyName() {
    let newName = window.prompt('输入标题', '写代码啦')
    this.setState({name: newName})
  }

  setStyle() {
    this.setState({
      styleObj: {
        color: 'blue'
      }
    })
  }

}

window.JreactDOM = JreactDOM

JreactDOM.render(<App/>, document.querySelector('#app'))

