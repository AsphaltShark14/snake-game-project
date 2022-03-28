export class Canvas {

    snakeboard: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.snakeboard = document.querySelector('#game-canvas')!;
        this.ctx = this.snakeboard.getContext('2d')!;
    }

    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.fillRect(0, 0, this.snakeboard.width, this.snakeboard.height);
        this.ctx.strokeRect(0, 0, this.snakeboard.width, this.snakeboard.height);
    }
}
