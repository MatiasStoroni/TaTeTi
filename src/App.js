import { useState } from "react"

export default function App() {

  return (
    <Board />
  )
}


function Header({ results }) {
  return (
    <>
      <h2>TA-TE-TI</h2>
      <h6>Victorias de ✗: {results[0]}</h6>
      <h6>Victorias de ◯: {results[1]}</h6>
      <h6>Empates: {results[2]}</h6>
    </>
  )
}


function Board() {

  const [isXNext, setIsXNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [playCount, setPlayCount] = useState(0)

  const [results, setResults] = useState(Array(3).fill(0))

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) { //no puedo sobreescribir la misma celda
      return;
    }

    //creo una copia del arreglo, la modifico y luego igualo el arreglo original a la copia
    const squaresCopy = squares.slice()
    if (isXNext) {
      squaresCopy[i] = "✗"
    } else {
      squaresCopy[i] = "◯"
    }
    setSquares(squaresCopy)
    setIsXNext(!isXNext)
    setPlayCount(playCount + 1)
  }

  let message;
  let style;

  let winner = calculateWinner(squares)

  if (winner) {
    message = ("El ganador es: " + winner + "!");
    style = "win"
  } else {
    message = "Es el turno de: " + (isXNext ? "✗" : "◯")
    style = "normal"
    if (playCount === 9) {
      message = "Hay empate!"
      style = "tie"
    }
  }

  function restartGame() {
    const squaresCopy = squares.slice()
    squaresCopy.fill(null)
    setSquares(squaresCopy)

    updateCounter()
    setPlayCount(0)

  }

  function updateCounter(){
    const tempResults = results.slice()
    if(winner){
      winner === "✗" ? tempResults[0]++ : tempResults[1]++;
    }else{
      if (playCount === 9) tempResults[2]++;
    }
    setResults(tempResults)
  }

  return (
    <>
      <Header results={results} />
      <div className="container">
        <div className="row">
          <Square symbol={squares[0]} squareFunc={() => handleClick(0)} />
          <Square symbol={squares[1]} squareFunc={() => handleClick(1)} />
          <Square symbol={squares[2]} squareFunc={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square symbol={squares[3]} squareFunc={() => handleClick(3)} />
          <Square symbol={squares[4]} squareFunc={() => handleClick(4)} />
          <Square symbol={squares[5]} squareFunc={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square symbol={squares[6]} squareFunc={() => handleClick(6)} />
          <Square symbol={squares[7]} squareFunc={() => handleClick(7)} />
          <Square symbol={squares[8]} squareFunc={() => handleClick(8)} />
        </div>
      </div>
      <Footer message={message} style={style} func={restartGame} />
    </>
  )
}

function Square({ symbol, squareFunc }) {

  return (
    <button className="square" onClick={squareFunc}>{symbol}</button>
  )
}

function Footer({ message, style, func }) {

  return (
    <>
      <h4 className={style}>{message}</h4>
      <button id="restart" onClick={func}>Reiniciar</button>
    </>
  )
}

function calculateWinner(squares) {

  let winningResults = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],    //horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8],    //verticales
    [0, 4, 8], [2, 4, 6]                //diagonales
  ]

  for (let i = 0; i < winningResults.length; i++) {
    const [a, b, c] = winningResults[i]

    //tengo q revisar squares[a] pq sino al comenzar el juego se cumple la condicion y se termina
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; //para saber quien ganó
    }

  }
}