import { Canvas } from './canvas';
import { Snake } from './snake';
import { AutoBind, Coordinates } from './autobind';

export class Game {

    canvas: Canvas;
    snake: Snake;
    pointX: number;
    pointY: number;
    score: number;
    scoreBoard: HTMLElement;

    constructor() {
        this.canvas = new Canvas();
        this.snake = new Snake();
        this.pointX = this.random(0, this.canvas.snakeboard.width - 10);
        this.pointY = this.random(0, this.canvas.snakeboard.height - 10);
        this.score = 0;
        this.scoreBoard = document.querySelector('span')!;

        this.generatePoints();
        this.main();
        this.resetButtonHanlder();
    }

    private random(min: number,max: number) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }

    generatePoints() {
        this.pointX = this.random(0, this.canvas.snakeboard.width - 10);
        this.pointY = this.random(0, this.canvas.snakeboard.height - 10);

        this.snake.snakeParts.forEach(snakePart => {
            const hasEaten = snakePart.x == this.pointX && snakePart.y == this.pointY;
            if (hasEaten) this.generatePoints();
        })
    }

    drawPoints() {
        this.canvas.ctx.fillStyle = 'lightpink';
        this.canvas.ctx.strokeStyle = 'darkred';
        this.canvas.ctx.fillRect(this.pointX, this.pointY, 10, 10);
        this.canvas.ctx.strokeRect(this.pointX, this.pointY, 10, 10);
    }

    moveSnake() {
        const head: Coordinates = {
            x: this.snake.snakeParts[0].x + this.snake.dx,
            y: this.snake.snakeParts[0].y + this.snake.dy
        };
        this.snake.snakeParts.unshift(head);
        const isPointGained =
            this.snake.snakeParts[0].x === this.pointX &&
            this.snake.snakeParts[0].y === this.pointY;
        
        if (isPointGained) {
            this.generatePoints();
            this.score += 5;
            this.scoreBoard.textContent = this.score.toString();

        } else {
            this.snake.snakeParts.pop();
        }
        
    }

    main() {
        setTimeout(() => {
            if(this.snake.hasCollided()) return;

            this.snake.isDirectionChanging = false;
            this.canvas.clearCanvas();
            this.drawPoints();
            this.moveSnake();
            this.snake.drawSnake();

            this.main();
        },100)
    }

    @AutoBind
    reset() {
        this.snake.snakeParts = [  
            {x: 200, y: 200},  
            {x: 190, y: 200},  
            {x: 180, y: 200},  
            {x: 170, y: 200},  
            {x: 160, y: 200},
        ];
        this.snake.dx = 10;
        this.snake.dy = 0;
        this.snake.isDirectionChanging = false;
        this.score = 0;
        this.main();
    }

    resetButtonHanlder() {
        const resetButton: HTMLButtonElement = document.querySelector('#start')!;

        resetButton.addEventListener('click', this.reset);
    }
}