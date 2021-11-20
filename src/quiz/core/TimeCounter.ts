import { getTime } from "../../utils/TimeUtils";


export class TimeCounter{
    public timeInSeconds: number = 0;
    public isRunning: boolean = false;
    private clock: number = 0;
    private timerNode: HTMLElement | undefined;

    start = () => {
        this.isRunning = true;
        this.clock = setInterval(() => {
            this.timeInSeconds++;
            this.updateTimerNode();
        }, 1000)
    }

    setDOMElement = (timerNode:HTMLElement) => {
        this.timerNode = timerNode;
    }

    updateTimerNode = () => {
        if(this.timerNode != undefined)
            this.timerNode.textContent = this.getTimeAsString();
    }

    stop = () => {
        console.log(this.timeInSeconds);
        clearInterval(this.clock);
        console.log(this.timeInSeconds);
        
        this.isRunning = false;
    }

    reset = () => {      
        console.log("reset");
        console.log("before: " + this.timeInSeconds);
        this.timeInSeconds = 0;
        console.log("after: " + this.timeInSeconds);
    }

    getTimeAsString = () => {
        return getTime(this.timeInSeconds);
    }
  }
  