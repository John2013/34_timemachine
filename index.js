const TIMEOUT_IN_SECS = 3 * 60;
const TEMPLATE = "<span class='js-timer-minutes'>00</span>:<span class='js-timer-seconds'>00</span>";

function padZero(number){
  return ("00" + String(number)).slice(-2);
}

class Timer{
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  constructor(timeout_in_secs){
    this.initial_timeout_in_secs = timeout_in_secs;
    this.reset()
  }
  static getTimestampInSecs(){
    let timestampInMilliseconds = new Date().getTime();
    return Math.round(timestampInMilliseconds/1000)
  }
  start(){
    if (this.isRunning)
      return;
    this.timestampOnStart = Timer.getTimestampInSecs();
    this.isRunning = true
  }
  stop(){
    if (!this.isRunning)
      return;
    this.timeout_in_secs = this.calculateSecsLeft();
    this.timestampOnStart = null;
    this.isRunning = false
  }
  reset(timeout_in_secs){
    this.isRunning = false;
    this.timestampOnStart = null;
    this.timeout_in_secs = this.initial_timeout_in_secs
  }
  calculateSecsLeft(){
    if (!this.isRunning)
      return this.timeout_in_secs;
    let currentTimestamp = Timer.getTimestampInSecs();
    let secsGone = currentTimestamp - this.timestampOnStart;
    return Math.max(this.timeout_in_secs - secsGone, 0)
  }
}

class TimerWidget{
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  construct(){
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
  mount(rootTag){
    if (this.timerContainer)
      this.unmount();

    // adds HTML tag to current page
    this.timerContainer = document.createElement("a");

    this.timerContainer.setAttribute("class", "current");
    this.timerContainer.innerHTML = TEMPLATE;

    rootTag.insertBefore(this.timerContainer, rootTag.firstChild);

    this.minutes_element = this.timerContainer.getElementsByClassName("js-timer-minutes")[0];
    this.seconds_element = this.timerContainer.getElementsByClassName("js-timer-seconds")[0]
  }
  update(secsLeft){
    let minutes = Math.floor(secsLeft / 60);
    let seconds = secsLeft - minutes * 60;

    this.minutes_element.innerHTML = padZero(minutes);
    this.seconds_element.innerHTML = padZero(seconds)
  }
  unmount(){
    if (!this.timerContainer)
      return;
    this.timerContainer.remove();
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
}


function main(){

  let timer = new Timer(TIMEOUT_IN_SECS);
  let timerWiget = new TimerWidget();
  let intervalId = null;

  timerWiget.mount(document.getElementById("TMpanel").querySelector(".bmenu"));

  function handleIntervalTick(){
    let secsLeft = timer.calculateSecsLeft();
    timerWiget.update(secsLeft)
  }

  function handleVisibilityChange(){
    if (document.hidden) {
      timer.stop();
      clearInterval(intervalId);
      intervalId = null
    } else {
      timer.start();
      intervalId = intervalId || setInterval(handleIntervalTick, 300)
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  handleVisibilityChange()
}

// initialize timer when page ready for presentation
window.addEventListener("load", main);
