import { Canvas } from "./canvas";
import { AutoBind, Coordinates } from "./autobind";

export class Snake {
    snakeParts: Coordinates[];
    canvas: Canvas;
    dx: number;
    dy: number;
    isDirectionChanging: Boolean;

    constructor() {
        this.snakeParts = [  
            {x: 200, y: 200},  
            {x: 190, y: 200},  
            {x: 180, y: 200},  
            {x: 170, y: 200},  
            {x: 160, y: 200},
        ];
        this.canvas = new Canvas;
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


    @AutoBind
    changeDirection(e: KeyboardEvent) {
        if(this.isDirectionChanging) return;
        this.isDirectionChanging = true;

        const goingUp: boolean = this.dy === -10;
        const goingDown: boolean = this.dy === 10;
        const goingLeft: boolean = this.dx === -10;
        const goingRight: boolean = this.dx === 10;

        if(e.key == 'ArrowRight' && !goingLeft) {
            this.dx = 10;
            this.dy = 0;
          } else if (e.key == 'ArrowUp' && !goingDown) {
            this.dx = 0;
            this.dy = -10;
          } else if (e.key === "ArrowLeft" && !goingRight) {
            this.dx = -10;
            this.dy = 0;
          } else if (e.key == 'ArrowDown' && !goingUp) {
           this. dx = 0;
            this.dy = 10;
          }
    }

    hasCollided(): Boolean {
        for (let i = 4; i < this.snakeParts.length; i++) {    
            const collision: boolean =
                this.snakeParts[i].x === this.snakeParts[0].x &&
                this.snakeParts[i].y === this.snakeParts[0].y;
            if (collision) return true
  }
        
        const head = this.snakeParts[0];
        const leftWall = head.x < 0;
        const rightWall = head.x > this.canvas.snakeboard.width -10;
        const topWall = head.y < 0;
        const bottomWall = head.y > this.canvas.snakeboard.height -10;

        return leftWall || rightWall || topWall || bottomWall;
        
    }

    setup() {
        document.addEventListener('keydown', this.changeDirection);
    }

}