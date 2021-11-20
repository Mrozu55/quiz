import { getTime } from "./Utils";


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
        clearInterval(this.clock);
        this.isRunning = false;
    }

    reset = () => {        
        this.timeInSeconds = 0;
    }

    getTimeAsString = () => {
        return getTime(this.timeInSeconds);
    }
  }
  