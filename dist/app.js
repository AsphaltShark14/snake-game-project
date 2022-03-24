"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function AutoBind(_, __, descriptor) {
    const originalMethod = descriptor.value;
    const customDescriptor = {
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return customDescriptor;
}
class Canvas {
    constructor() {
        this.snakeboard = document.querySelector('#game-canvas');
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
    constructor() {
        this.snakeParts = [
            { x: 200, y: 200 },
            { x: 190, y: 200 },
            { x: 180, y: 200 },
            { x: 170, y: 200 },
            { x: 160, y: 200 },
        ];
        this.canvas = new Canvas;
        this.dx = 10;
        this.dy = 1;
        this.isDirectionChanging = false;
        this.setup();
    }
    drawSnake() {
        this.snakeParts.forEach(snakePart => {
            this.canvas.ctx.fillStyle = 'lightblue';
            this.canvas.ctx.strokeStyle = 'darkblue';
            this.canvas.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
            this.canvas.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        });
    }
    moveSnake() {
        const head = { x: this.snakeParts[0].x + this.dx, y: this.snakeParts[0].y + this.dy };
        this.snakeParts.unshift(head);
        this.snakeParts.pop();
    }
    changeDirection(e) {
        if (this.isDirectionChanging)
            return;
        this.isDirectionChanging = true;
        if (e.keyCode === 39) {
            // right key
            this.dx = 10;
            this.dy = 0;
        }
        else if (e.keyCode === 38) {
            // up key
            this.dx = 0;
            this.dy = -10;
        }
        else if (e.keyCode === 37) {
            // left key
            this.dx = -10;
            this.dy = 0;
        }
        else if (e.keyCode === 40) {
            // down key
            this.dx = 0;
            this.dy = 10;
        }
    }
    hasCollided() {
        this.snakeParts.map((_, i, arr) => {
            if (i == 0)
                return;
            const headCollide = arr[i].x == arr[0].x && arr[i].y == arr[0].y;
            if (headCollide)
                return true;
        });
        const head = this.snakeParts[0];
        const leftWall = head.x < 0;
        const rightWall = head.x > this.canvas.snakeboard.width - 10;
        const topWall = head.y > 0;
        const bottomWall = head.y < this.canvas.snakeboard.height - 10;
        return leftWall || rightWall || topWall || bottomWall;
    }
    setup() {
        document.addEventListener('keydown', this.changeDirection);
    }
}
__decorate([
    AutoBind
], Snake.prototype, "changeDirection", null);
class Game {
    constructor() {
        this.canvas = new Canvas();
        this.snake = new Snake();
        this.main();
    }
    main() {
        setTimeout(() => {
            // if(this.snake.hasCollided()) return;
            this.snake.isDirectionChanging = false;
            this.canvas.clearCanvas();
            this.snake.moveSnake();
            this.snake.drawSnake();
            this.main();
        }, 100);
    }
}
const newGame = new Game();
