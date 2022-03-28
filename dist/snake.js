"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
const canvas_1 = require("./canvas");
const autobind_1 = require("./autobind");
class Snake {
    constructor() {
        this.snakeParts = [
            { x: 200, y: 200 },
            { x: 190, y: 200 },
            { x: 180, y: 200 },
            { x: 170, y: 200 },
            { x: 160, y: 200 },
        ];
        this.canvas = new canvas_1.Canvas;
        this.dx = 10;
        this.dy = 0;
        this.isDirectionChanging = false;
        this.setup();
    }
    drawSnake() {
        this.snakeParts.forEach(snakePart => {
            this.canvas.ctx.fillStyle = 'lightgreen';
            this.canvas.ctx.strokeStyle = 'darkgreen';
            this.canvas.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
            this.canvas.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        });
    }
    changeDirection(e) {
        if (this.isDirectionChanging)
            return;
        this.isDirectionChanging = true;
        const goingUp = this.dy === -10;
        const goingDown = this.dy === 10;
        const goingLeft = this.dx === -10;
        const goingRight = this.dx === 10;
        if (e.key == 'ArrowRight' && !goingLeft) {
            this.dx = 10;
            this.dy = 0;
        }
        else if (e.key == 'ArrowUp' && !goingDown) {
            this.dx = 0;
            this.dy = -10;
        }
        else if (e.key === "ArrowLeft" && !goingRight) {
            this.dx = -10;
            this.dy = 0;
        }
        else if (e.key == 'ArrowDown' && !goingUp) {
            this.dx = 0;
            this.dy = 10;
        }
    }
    hasCollided() {
        for (let i = 4; i < this.snakeParts.length; i++) {
            const collision = this.snakeParts[i].x === this.snakeParts[0].x &&
                this.snakeParts[i].y === this.snakeParts[0].y;
            if (collision)
                return true;
        }
        const head = this.snakeParts[0];
        const leftWall = head.x < 0;
        const rightWall = head.x > this.canvas.snakeboard.width - 10;
        const topWall = head.y < 0;
        const bottomWall = head.y > this.canvas.snakeboard.height - 10;
        return leftWall || rightWall || topWall || bottomWall;
    }
    setup() {
        document.addEventListener('keydown', this.changeDirection);
    }
}
__decorate([
    autobind_1.AutoBind
], Snake.prototype, "changeDirection", null);
exports.Snake = Snake;
