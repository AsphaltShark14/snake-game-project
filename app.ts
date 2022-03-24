type Coordinates = {x: number, y: number};

class Canvas {

    private snakeboard: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.snakeboard = document.querySelector('#game-canvas')!;
        this.ctx = this.snakeboard.getContext('2d');
        

    }

    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.fillRect(0, 0, this.snakeboard.width, this.snakeboard.height);
        this.ctx.strokeRect(0, 0, this.snakeboard.width, this.snakeboard.height);
    }
}

class Snake {
    private snake: Coordinates[];
    canvas: Canvas;
    dx: number;
    dy: number;

    constructor() {
        this.snake = [  
            {x: 200, y: 200},  
            {x: 190, y: 200},  
            {x: 180, y: 200},  
            {x: 170, y: 200},  
            {x: 160, y: 200},
        ];
        this.canvas = new Canvas;
        this.dx = 10;
        this.dy = 1;
    }

    private drawPartOfSnake(snakePart: Coordinates) {
        {  
            this.canvas.ctx.fillStyle = 'lightblue';  
            this.canvas.ctx.strokestyle = 'darkblue';
            this.canvas.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
            this.canvas.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
          }
    }

    drawSnake() {
        this.snake.forEach(this.drawPartOfSnake);
    }

    moveSnake() {
        const head: Coordinates = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy}
        this.snake.unshift(head);
        this.snake.pop();
    }

}

class Game {

    canvas: Canvas;
    snake: Coordinates[];

    constructor() {
        this.canvas = new Canvas();
        this.snake = new Snake();

        this.main();
    }

    main() {
        setTimeout(() => {
            this.canvas.clearCanvas();
            this.snake.moveSnake();
            this.snake.drawSnake();

            this.main();
        },100)
    }
}

