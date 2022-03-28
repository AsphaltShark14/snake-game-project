"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const canvas_1 = require("./canvas");
const snake_1 = require("./snake");
const autobind_1 = require("./autobind");
class Game {
    constructor() {
        this.canvas = new canvas_1.Canvas();
        this.snake = new snake_1.Snake();
        this.pointX = this.random(0, this.canvas.snakeboard.width - 10);
        this.pointY = this.random(0, this.canvas.snakeboard.height - 10);
        this.score = 0;
        this.scoreBoard = document.querySelector('span');
        this.generatePoints();
        this.main();
        this.resetButtonHanlder();
    }
    random(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }
    generatePoints() {
        this.pointX = this.random(0, this.canvas.snakeboard.width - 10);
        this.pointY = this.random(0, this.canvas.snakeboard.height - 10);
        this.snake.snakeParts.forEach(snakePart => {
            const hasEaten = snakePart.x == this.pointX && snakePart.y == this.pointY;
            if (hasEaten)
                this.generatePoints();
        });
    }
    drawPoints() {
        this.canvas.ctx.fillStyle = 'lightpink';
        this.canvas.ctx.strokeStyle = 'darkred';
        this.canvas.ctx.fillRect(this.pointX, this.pointY, 10, 10);
        this.canvas.ctx.strokeRect(this.pointX, this.pointY, 10, 10);
    }
    moveSnake() {
        const head = {
            x: this.snake.snakeParts[0].x + this.snake.dx,
            y: this.snake.snakeParts[0].y + this.snake.dy
        };
        this.snake.snakeParts.unshift(head);
        const isPointGained = this.snake.snakeParts[0].x === this.pointX &&
            this.snake.snakeParts[0].y === this.pointY;
        if (isPointGained) {
            this.generatePoints();
            this.score += 5;
            this.scoreBoard.textContent = this.score.toString();
        }
        else {
            this.snake.snakeParts.pop();
        }
    }
    main() {
        setTimeout(() => {
            if (this.snake.hasCollided())
                return;
            this.snake.isDirectionChanging = false;
            this.canvas.clearCanvas();
            this.drawPoints();
            this.moveSnake();
            this.snake.drawSnake();
            this.main();
        }, 100);
    }
    reset() {
        this.snake.snakeParts = [
            { x: 200, y: 200 },
            { x: 190, y: 200 },
            { x: 180, y: 200 },
            { x: 170, y: 200 },
            { x: 160, y: 200 },
        ];
        this.snake.dx = 10;
        this.snake.dy = 0;
        this.snake.isDirectionChanging = false;
        this.score = 0;
        this.main();
    }
    resetButtonHanlder() {
        const resetButton = document.querySelector('#start');
        resetButton.addEventListener('click', this.reset);
    }
}
__decorate([
    autobind_1.AutoBind
], Game.prototype, "reset", null);
exports.Game = Game;
