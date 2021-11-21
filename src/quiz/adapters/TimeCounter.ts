import { Timer } from "../core/ports/Timer";
import { TimeUtils } from "../../utils/TimeUtils"

export class TimeCounter implements Timer{
    
    public timeInSeconds: number = 0;
    public isRunning: boolean = false;
    private clock: number = 0;
    private timerNode: HTMLElement | undefined;

    start(): void {
        this.isRunning = true;
        this.clock = setInterval(() => {
            this.timeInSeconds++;
            this._updateTimerNode();
        }, 1000)
    }

    stop(): void {
        clearInterval(this.clock);
        this.isRunning = false;
    }

    reset(): void {
        this.timeInSeconds = 0;
    }

    setHtmlElement(node: HTMLElement): void {
        this.timerNode = node;
    }

    getTimeInSeconds(): number {
        return this.timeInSeconds;
    }

    _updateTimerNode = () => {
        if(this.timerNode != undefined)
            this.timerNode.textContent = TimeUtils.getTimeAsString(this.timeInSeconds);
    }
  }
