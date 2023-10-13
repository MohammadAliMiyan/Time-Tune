/*=================== CLOCK ==================*/
const hour = document.getElementById('clock-hour'),
    minutes = document.getElementById('clock-minutes'),
    seconds = document.getElementById('clock-seconds')

const clock = () =>{
    let date = new Date()

    let hh = date.getHours() *30,
        mm = date.getMinutes() * 6,
        ss = date.getSeconds() * 6

        // We add a rotation to the elements
        hour.style.transform = `rotateZ(${hh + mm /12}deg)`
        minutes.style.transform = `rotateZ(${mm}deg)`
        seconds.style.transform = `rotateZ(${ss}deg)`
}
setInterval(clock, 1000) // 1000 = 1s

/*=================== CLOCK  & DATE TEXT ==================*/
const textHour = document.getElementById('text-hour'),
    textMinutes = document.getElementById('text-minutes'),
    textAmPm = document.getElementById('text-ampm'),
    dateDay = document.getElementById('date-day'),
    dateMonth = document.getElementById('date-month'),
    dateYear = document.getElementById('date-year')

const clockText = () =>{
    let date = new Date()

    let hh = date.getHours(),
        ampm,
        mm = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear()

        //We change the hours from 24 to 12 hours and establish whether it is Am or Pm
        if(hh >= 12){
            hh = hh - 12
            ampm = 'PM'
        }else{
            ampm = 'AM'
        }

        //We detect when it's 0 Am and transform to 12 AM
        if(hh == 0){
            hh = 12
        }

        //Show a zero before hours
        if(hh < 10){hh = `0${hh}`}
        
         //Show Time
        textHour.innerHTML =   `${hh}:`


        // Show a zero before minutes
       if(mm < 10){
        mm = `0${mm}`
       }

        // Show minutes 
        textMinutes.innerHTML = mm

        // Show am or pm 
        textAmPm.innerHTML = ampm

        //we get the months of the year and show it
        let months = ['Jan', 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec']

        //we show the day, the month and the year
        dateDay.innerHTML = day
        dateMonth.innerHTML = `${months[month]},`
        dateYear.innerHTML = year

       

}
setInterval(clockText,1000) // 1000= 1s

//check if playing

/*================= More features ==================== */
//basic files needed
const audio =new Audio("assets/tone1.wav"); 
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;


//Set the Alarm


function setAlarmTime(value){
    alarmTime = value;
}
function setAlarm(){
    if(alarmTime){
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);
    
        if(timeToAlarm  >= current){
            
            const timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(function(){
                audio.play();
            }, timeout);

            alert("Alarm set!");
            // let  btnSet = document.querySelector('#set');
            // btnSet.addEventListener('click', () =>btnSet.style.backgroundColor='#66A000');

        }
    }
}

// clear Alarm
function clearAlarm(){
    audio.pause();
    if(alarmTimeout){
        clearTimeout(alarmTimeout);
        alert("Alarm Cleared!");
        // let btnClear = document.querySelector('#clear');
        // btnClear.addEventListener('click', () =>btnClear.style.backgroundColor='#DC0043')
    }
}

/*==================== Timer ====================*/
const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById('stop');
const reset_btn = document.getElementById('reset');

let t_seconds = 0;
let t_interval = null;

//Event Listeners
start_btn.addEventListener('click', start);
stop_btn.addEventListener('click', stop);
reset_btn.addEventListener('click',reset);


//Update the timer
function timer (){
    t_seconds++;

    //Format our time
    let hrs = Math.floor(t_seconds / 3600);
    let mins = Math.floor((t_seconds - (hrs * 3600))/ 60);
    let secs = t_seconds % 60;

    if(secs <10) secs = '0' + secs;
    if(secs <10) mins = '0' + mins;
    if(secs <10) hrs = '0' + hrs;
    

    time_el.innerText = `${hrs}:${mins}:${secs}`;

}
function start(){
    if(t_interval){
        return

    }
    t_interval =setInterval(timer, 1000);
}
function stop(){
    clearInterval(t_interval);
    t_interval = null;
}

function reset(){
    stop();
    t_seconds = 0;
    time_el.innerText = '00:00:00'
}

/*==================== CountDown ====================*/





/*==================== ACCORDION features ====================*/
const featuresContent = document.getElementsByClassName('features__content'),
    featuresHeader = document.querySelectorAll('.features__header')

function togglefeatures(){
    let itemClass = this.parentNode.className

    for(i=0;i<featuresContent.length;i++){
        featuresContent[i].className = 'features__content features__close'
    }
    if(itemClass == 'features__content features__close'){
        this.parentNode.className = 'features__content features__open'
    }
}

featuresHeader.forEach((el) =>{
    el.addEventListener('click', togglefeatures)
})





/*=============== Dark/Light Theme ================ */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
