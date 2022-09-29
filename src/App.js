import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [turn, setTurn] = useState('X')
  const [grid, setGrid] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState('')

  const win = useEffect(()=>{
    winConditions()
  }, [grid])

  const winConditions = ()=>{
    winByRow() 
    winByCol() 
    winByDiagonal() 
  }

  const winByRow = ()=>{
    //first row
    if(grid.slice(0,3).join('')==='XXX'){ setWinner('X'); return true }
    if(grid.slice(0,3).join('')==='OOO'){ setWinner('O'); return true }
    // second row
    if(grid.slice(3,6).join('')==='XXX'){ setWinner('X'); return true } 
    if(grid.slice(3,6).join('')==='OOO'){ setWinner('O'); return true }    
    //third row
    if(grid.slice(6,9).join('')==='XXX'){ setWinner('X'); return true }
    if(grid.slice(6,9).join('')==='OOO'){ setWinner('O'); return true }    
  }

  const winByCol = ()=>{
    //first col
    const firstCol = `${grid[0]}${grid[3]}${grid[6]}`
    if(firstCol==='XXX'){ setWinner('X'); return true}
    if(firstCol==='OOO'){ setWinner('O'); return true}    
    //second col
    const secondCol = `${grid[1]}${grid[4]}${grid[7]}`
    if(secondCol==='XXX'){ setWinner('X'); return true }
    if(secondCol==='OOO'){ setWinner('O'); return true }    
    //third col
    const thirdCol = `${grid[2]}${grid[5]}${grid[8]}`
    if(thirdCol==='XXX'){setWinner('X'); return true}
    if(thirdCol==='OOO'){setWinner('O'); return true}
  }

  const winByDiagonal = ()=>{
    //Diag 1
    const diag1 = `${grid[0]}${grid[4]}${grid[8]}`
    if(diag1==='XXX'){ setWinner('X'); return true}
    if(diag1==='OOO'){ setWinner('O'); return true}    
    //Diag 2
    const diag2 = `${grid[2]}${grid[4]}${grid[6]}`
    if(diag2==='XXX'){ setWinner('X'); return true }
    if(diag2==='OOO'){ setWinner('O'); return true }
  }

  const play = (index)=>{
    const newGrid = [...grid]
    newGrid[index] = turn
    setGrid(newGrid)

    if(turn === 'X'){
      setTurn('O')
    }
    else{
      setTurn('X')      
    }
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
