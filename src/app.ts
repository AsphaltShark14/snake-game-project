/* 
To Do: 
- Function to add generate points, growing snake and add score
*/

type Coordinates = { x: number, y: number };

function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const customDescriptor: PropertyDescriptor = {
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    }
    return customDescriptor;
}

class Canvas {

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

class Snake {
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
            this.canvas.ctx.fillStyle = 'lightblue';  
            this.canvas.ctx.strokeStyle = 'darkblue';
            this.canvas.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
            this.canvas.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        });
    }

    moveSnake() {
        const head: Coordinates = { x: this.snakeParts[0].x + this.dx, y: this.snakeParts[0].y + this.dy };
        this.snakeParts.unshift(head);
        this.snakeParts.pop();
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
            const collision: boolean = this.snakeParts[i].x === this.snakeParts[0].x && this.snakeParts[i].y === this.snakeParts[0].y;
            if (collision) return true
  }
        
        const head: Coordinates = this.snakeParts[0];
        const leftWall: Boolean = head.x < 0;
        const rightWall: Boolean = head.x > this.canvas.snakeboard.width -10;
        const topWall: Boolean = head.y < 0;
        const bottomWall: Boolean = head.y > this.canvas.snakeboard.height -10;

        return leftWall || rightWall || topWall || bottomWall;
        
    }

    setup() {
        document.addEventListener('keydown', this.changeDirection);
    }

}

class Game {

    canvas: Canvas;
    snake: Snake;

    constructor() {
        this.canvas = new Canvas();
        this.snake = new Snake();

        this.main();
    }

    main() {
        setTimeout(() => {
            if(this.snake.hasCollided()) return;

            this.snake.isDirectionChanging = false;
            this.canvas.clearCanvas();
            this.snake.moveSnake();
            this.snake.drawSnake();

            this.main();
        },100)
    }
}

const newGame = new Game();


