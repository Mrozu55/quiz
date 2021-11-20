export interface Timer{
    start(): void;
    stop(): void;
    reset(): void;
    setHtmlElement(node: HTMLElement): void;
    getTimeInSeconds(): number;
}