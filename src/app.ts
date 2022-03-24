/* 
To Do: 
- Growing Snake
- Adding Points
-Update Scoreboard
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
            this.canvas.ctx.fillStyle = 'lightgreen';  
            this.canvas.ctx.strokeStyle = 'darkgreen';
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

class Points {
    canvas: Canvas;
    snake: Snake;
    pointX: number;
    pointY: number;

    constructor() {
        this.canvas = new Canvas;
        this.snake = new Snake;
        this.pointX = this.random(0, this.canvas.snakeboard.width - 10);
        this.pointY = this.random(0, this.canvas.snakeboard.height - 10);

        this.generatePoints();
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
}

class Game {

    canvas: Canvas;
    snake: Snake;
    points: Points;

    constructor() {
        this.canvas = new Canvas();
        this.snake = new Snake();
        this.points = new Points();

        this.points.generatePoints();
        this.main();
    }

    main() {
        setTimeout(() => {
            if(this.snake.hasCollided()) return;

            this.snake.isDirectionChanging = false;
            this.canvas.clearCanvas();
            this.points.drawPoints();
            this.snake.moveSnake();
            this.snake.drawSnake();

            this.main();
        },100)
    }
}

const newGame = new Game();


