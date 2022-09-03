let seconds;
let mins;
let interval = null;
let cur_mode;
let dark_mode = false;

const setting_btn = document.querySelector('.setting_btn')
const settings = document.querySelector('.setting')
const close_btn = document.querySelector('.setting p')
const about_btn = document.querySelector('.about_btn')
const about = document.querySelector('.about')
const about_close_btn = document.querySelector('.about span')

const dark_mode_btn = document.querySelector('#dark_mode_btn')
const body = document.querySelector('body')




/** FUNCTION START */

function init() {

    if(localStorage.getItem('timer_info') === null) {
        let pomodoro_timer = {
            cur_mode: 0,
            mins: 25,
            pomodoro_time:25,
            short_break: 5,
            long_break: 15
        }
        mins = 25
        seconds = 60
        cur_mode = 0
        
    
        localStorage.setItem("timer_info",JSON.stringify(pomodoro_timer))
    } else {
        
        cur_mode = JSON.parse(localStorage.getItem("timer_info")).cur_mode
        seconds=60
        
        
    }

    
    if(cur_mode == 0) {
        mins = JSON.parse(localStorage.getItem("timer_info")).pomodoro_time
        
    } else if(cur_mode == 1) {
        mins = JSON.parse(localStorage.getItem("timer_info")).short_break
    } else {
        mins = JSON.parse(localStorage.getItem("timer_info")).long_break
    }
    addBtnStyle(cur_mode)
    setTimer(mins,0)
    
}

function toggleDarkMode(e) {
    if(e.target.checked) {
        body.classList.add('darkmode')
    } else {
        body.classList.remove('darkmode')
    }
    
}
function toggleSettings() {
    
    settings.style.top = '50%'
   
} 
function closeSettings() {
    settings.style.top = '-100%'
}

function toggleAbout() {
    
    about.style.top = '25%'
   
} 
function closeAbout() {
    about.style.top = '-100%'
}

function setTimer(m,s) {
    stopwatch.innerText = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`
}

function setTimerInfo() {


    const pomodoro_time = document.querySelector('#pomodoro_txt').value
    const short_br_time = document.querySelector('#short_br_txt').value
    const long_br_time = document.querySelector('#long_br_txt').value
    if(pomodoro_time.trim() === '' || short_br_time.trim() === '' || long_br_time.trim() === '') {
        alert('Time should not be empty')
    } else {
        
        
        if((/[a-zA-Z]/).test(pomodoro_time) || pomodoro_time < 1 || pomodoro_time > 60) {
            alert('Please provide valid time between 1-60')
            return
        }
        if((/[a-zA-Z]/).test(short_br_time) || short_br_time < 1 || short_br_time > 60) {
            alert('Please provide valid time between 1-60')
            return
        }
        if((/[a-zA-Z]/).test(long_br_time) || long_br_time < 1 || long_br_time > 60) {
            alert('Please provide valid time between 1-60')
            return
        }
        let new_info = {
            ...JSON.parse(localStorage.getItem('timer_info')),
            pomodoro_time:pomodoro_time,
            short_break: short_br_time,
            long_break: long_br_time
        }
        localStorage.setItem('timer_info',JSON.stringify(new_info))
        closeSettings()
        init()
    }
    

}
function setCurMode(mode) {
    let new_info = {
        ...JSON.parse(localStorage.getItem('timer_info')),
        cur_mode:mode
    }
    localStorage.setItem('timer_info',JSON.stringify(new_info))
}

const timer = () => {
    let sec = seconds == 60 ? 0 : seconds
    stopwatch.innerText = `${mins.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`
    title.innerText = stopwatch.innerText+' Pomodoro'
    if(seconds == 60) {
        --mins;
       
    }
    if(seconds == 0 ) {
        console.log(seconds)
        if(mins == 0) {
            clearInterval(interval)
            interval=null
            timer_sound.play()
            setTimeout(() => {
                timer_sound.pause()
                timer_sound.currentTime=0
                clearInterval(interval)
                interval = null
                reset_timer()
            }, 10000);
        }
        --mins;
       
        seconds = 60;
    }
    --seconds;
}
const start_timer = () => {
    if(interval) {

        return;
    }
    
    interval = setInterval(timer,1000)

}
const stop_timer = () => {
    clearInterval(interval)
    interval = null
}
const reset_timer = () => {
    stop()

    init()
}

const setPomodoro = () => {
    mins = JSON.parse(localStorage.getItem("timer_info")).pomodoro_time
    seconds = 60
    removeBtnStyle(cur_mode)
    cur_mode = 0
    addBtnStyle(cur_mode)
    setCurMode(cur_mode)
    setTimer(mins,0)
}
const setShortBreak = () => {
    mins = JSON.parse(localStorage.getItem("timer_info")).short_break
    seconds = 60
    removeBtnStyle(cur_mode)
    cur_mode = 1
    addBtnStyle(cur_mode)
    setCurMode(cur_mode)
    setTimer(mins,0)
}
const setLongBreak = () => {
    mins = JSON.parse(localStorage.getItem("timer_info")).long_break
    seconds = 60
    removeBtnStyle(cur_mode)
    cur_mode = 2
    addBtnStyle(cur_mode)
    setCurMode(cur_mode)
    setTimer(mins,0)
}

const removeBtnStyle = (mode) => {
    if(mode == 0) {
        btn_pomodoro.classList.remove('active')
    } else if(mode == 1) {
        btn_short_break.classList.remove('active')
    } else {
        btn_long_break.classList.remove('active')
    }
}
const addBtnStyle = (mode) => {
    if(mode == 0) {
        btn_pomodoro.classList.add('active')
    } else if(mode == 1) {
        btn_short_break.classList.add('active')
    } else {
        btn_long_break.classList.add('active')
    }
}
/** FUNCTION END */





/** SELECTORS */
const stopwatch = document.querySelector('.timer')
const title = document.querySelector('title')
const btn_start = document.querySelector('#start')
const btn_stop = document.querySelector('#stop')
const btn_reset = document.querySelector('#reset')

const btn_pomodoro = document.querySelector('#mode_0')
const btn_short_break = document.querySelector('#mode_1')
const btn_long_break = document.querySelector('#mode_2')

const btn_save = document.querySelector('.save')
const timer_sound = document.querySelector('#sound')





/** EVENT LISTENERS */
btn_start.addEventListener('click',start_timer)
btn_stop.addEventListener('click',stop_timer)
btn_reset.addEventListener('click',reset_timer)

btn_pomodoro.addEventListener('click',setPomodoro)
btn_short_break.addEventListener('click',setShortBreak)
btn_long_break.addEventListener('click',setLongBreak)

btn_save.addEventListener('click',setTimerInfo)

setting_btn.addEventListener('click',toggleSettings)
close_btn.addEventListener('click',closeSettings)

about_btn.addEventListener('click',toggleAbout)
about_close_btn.addEventListener('click',closeAbout)
dark_mode_btn.addEventListener('change',toggleDarkMode)

init()