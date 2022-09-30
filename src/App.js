import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [turn, setTurn] = useState('X')
  const [grid, setGrid] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState('')

  const win = useEffect(()=>{
    checkWinners()
  }, [grid])

  const checkWinners = ()=>{
    const conditions = [     
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],      
      [1,4,7],      
      [2,5,8],  
      [0,4,8],      
      [2,4,6]
    ];

    const hasWinner = ()=>{
      
      return conditions.some(condition =>{        
        return condition.every(cell =>{         
          return grid[cell]===turn;
        })
      });

    }

    if(hasWinner()){
      setWinner(turn)
    }
   
  }

  const play = (index)=>{
    const newGrid = [...grid]
    newGrid[index] = turn
    setGrid(newGrid)

    setTimeout(()=>{//hago esto porque me cambia el turno antes de actualizar la grilla pero despues de checkear ganador
      if(turn === 'X'){ 
        setTurn('O')
      }
      else{
        setTurn('X')
      }
    }, 50)
  }

  const reset = ()=>{
    setGrid(Array(9).fill(null))
    setTurn('X')
    setWinner('')
  }

  return (
    <div className="App">
      {
        winner && <div className='winner' onClick={()=>{reset()}}>Ganaron las {winner}!</div>
      }      
      <div className={`grid ${winner}`}>
        {
          grid.map((cell, index)=>{
            return <button key={index} className={`cell ${cell}`} onClick={()=>{play(index)}}></button>
          })        
        }
      </div>
      <button className='reset' onClick={()=>{reset()}}>Reset</button>
    </div>
  );
}

export default App;
