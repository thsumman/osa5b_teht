import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const goods = store.getState().good
  const oks = store.getState().ok
  const bads = store.getState().bad
  const palautteita = goods + oks + bads
  let ka = ''
  let poss = 0
  if (palautteita === 0) {
    ka = "ei määritelty"
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }
  else {
    ka = (goods*1.0 + oks*0.0 + bads*-1.0)/palautteita
    poss = goods + oks
  }
  console.log("state2",store.getState())

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{ka}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{poss}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (e) => {
    console.log("e",e)
    e.preventDefault()
    console.log("target.value",e.target.value)
    const type = e.target.value
    store.dispatch({ type: type})
    console.log("stateklik",store.getState())
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button value="GOOD" onClick={this.klik}>hyvä</button>
        <button value="OK" onClick={this.klik}>neutraali</button>
        <button value="BAD" onClick={this.klik}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)
