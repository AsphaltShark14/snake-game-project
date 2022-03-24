type Coordinates = {x: number, y: number};

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
        this.dy = 1;
        this.isDirectionChanging = false;

        this.setup();
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
        this.snakeParts.forEach(this.drawPartOfSnake);
    }

    moveSnake() {
        const head: Coordinates = {x: this.snakeParts[0].x + this.dx, y: this.snakeParts[0].y + this.dy}
        this.snakeParts.unshift(head);
        this.snakeParts.pop();
    }

    @AutoBind
    changeDirection(e: Event) {
        if(this.isDirectionChanging) return;
        this.isDirectionChanging = true;
        if(e.keyCode === 39) {
            // right key
            dx = 10;
            dy = 0;
          } else if (e.keyCode === 38) {
            // up key
            dx = 0;
            dy = -10;
          } else if (e.keyCode === 37) {
            // left key
            dx = -10;
            dy = 0;
          } else if (e.keyCode === 40) {
            // down key
            dx = 0;
            dy = 10;
          }
    }

    hasCollided() {
        this.snakeParts.map((chunk,i) => {
            if(i == 0) continue;
            const headCollide: Boolean = chunk[i].x == chunk[0].x && chunk[i].y == chunk[0].y;
            if(headCollide) return true;

            const head: Coordinates = chunk[0];
            const leftWall: Boolean = head.x < 0;
            const rightWall: Boolean = head.x > this.canvas.snakeboard.width -10;
            const topWall: Boolean = head.y > 0;
            const bottomWall: Boolean = head.y < this.canvas.snakeboard.height -10;

            return leftWall || rightWall || topWall || bottomWall;
        })
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
