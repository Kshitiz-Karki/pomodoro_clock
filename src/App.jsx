import React from 'react'
import './App.css'
import Length from './Components/Length'
import Sound from './beep_tone.mp3'

function App() {
  
  const [displayTime, setDisplayTime] = React.useState(25 * 60)
  const [breakTime, setBreakTime] = React.useState(5 * 60)
  const [sessionTime, setSessionTime] = React.useState(25 * 60)
  const [timerOn, setTimerOn] = React.useState(false)
  const [onBreak, setOnBreak] = React.useState(false)
  const [breakAudio, setBreakAudio] = React.useState(
    new Audio(Sound)
  )
  
  const playBreakSound = () => {
    breakAudio.currentTime = 0
    breakAudio.play()
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return (
      (minutes < 10 ? '0' + minutes : minutes)
      + ':' + (seconds < 10 ? '0' + seconds : seconds)
    )
  }

  const changeTime = (amount, type) => {
    if (type == 'break'){
      if (breakTime <= 60){
        return
      }
      setBreakTime(prev => prev + amount)
    }
    else {
      if (sessionTime <= 60){
        return
      }
      setSessionTime(prev => prev + amount)
      if (!timerOn){
        setDisplayTime(sessionTime + amount)
      }
    }
  }

  const breakLength = {
    title : 'Break length',
    changeTime : changeTime,
    type : 'break',
    time : breakTime,
    formatTime : formatTime
  }

  const sessionLength = {
    title : 'Session length',
    changeTime : changeTime,
    type : 'session',
    time : sessionTime,
    formatTime : formatTime 
  }
  
  const controlTime = () => {
    let second = 1000 //in milliseconds
    //let date = new Date().getTime()  
    let nextDate = new Date().getTime() + second
    let onBreakVariable = onBreak
    if (!timerOn){
      let interval = setInterval(() => {
        let date = new Date().getTime() //this will get current date in seconds
        if (date > nextDate){
          setDisplayTime(prev => {
            if (prev <= 0 && !onBreakVariable){
              playBreakSound()
              onBreakVariable = true
              setOnBreak(true)
              return breakTime
            }
            else if (prev <= 0 && onBreakVariable){
              playBreakSound()
              onBreakVariable = false
              setOnBreak(false)
              return sessionTime
            }
            return prev - 1
          })
          nextDate += second
        }
      }, 30)
      localStorage.clear()
      localStorage.setItem('interval-id', interval)
    }
    if (timerOn){
      clearInterval(localStorage.getItem('interval-id'))
    }
    setTimerOn(!timerOn)
  }

  const resetTime = () => {
    setDisplayTime(25 * 60)
    setBreakTime(5 * 60)
    setSessionTime(25 * 60)
  }

  return (
    <div className='center-align'>
      <h1>Pomodoro Clock</h1>
      <div className='dual-container'>
        <Length
          {...breakLength}
        />
        <Length
          {...sessionLength}
        />
      </div>
      <h2>{onBreak ? 'Break' : 'Session'}</h2>
      <h1>{formatTime(displayTime)}</h1>
      <button 
        className='btn-large deep-purple lighten-2'
        onClick={controlTime}
      >
          {timerOn ? (
            <i className="material-icons">pause_circle_filled</i>
          ) : (
            <i className="material-icons">play_circle_filled</i>
          )}

      </button>
      <button 
        className='btn-large deep-purple lighten-2'
        onClick={resetTime}
      >
        <i className="material-icons">autorenew</i>
      </button>
      

   </div>
  )
}

export default App
