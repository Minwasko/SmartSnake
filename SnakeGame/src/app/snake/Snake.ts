export class Snake {
  public x: number;
  public y: number;
  public length: number;
  public isDead: boolean;
  public addLength: boolean;
  public wholeSnakeCoords: any;
  deadZonesX = [10, 630];
  deadZonesY = [60, 680];

  constructor() {
    this.x = 15;
    this.y = 65;
    this.length = 1;
    this.isDead = false;
    this.wholeSnakeCoords = [[this.x, this.y]];
  }

  public goUp(): void {
    this.y -= 20;
    this.drawWholeSnake();
    this.checkForDeath();
    document.getElementById('snake0').style.top = `${this.y}px`;
  }

  public goDown(): void {
    this.y += 20;
    this.drawWholeSnake();
    this.checkForDeath();
    document.getElementById('snake0').style.top = `${this.y}px`;
  }

  public goLeft(): void {
    this.x -= 20;
    this.drawWholeSnake();
    this.checkForDeath();
    document.getElementById('snake0').style.left = `${this.x}px`;
  }

  public goRight(): void {
    this.x += 20;
    this.drawWholeSnake();
    this.checkForDeath();
    document.getElementById('snake0').style.left = `${this.x}px`;
  }

  public checkForDeath(): void {
    if (this.x <= this.deadZonesX[0] || this.x >= this.deadZonesX[1] ||
      this.y <= this.deadZonesY[0] || this.y >= this.deadZonesY[1]) {
      this.isDead = true;
      console.log(`you died at coords x: ${this.x} and y: ${this.y}`);
    }
  }
  public drawWholeSnake(): void {
    // draw current remove last, keep others in place
    // on apple dont remove for 1 cycle
    if (this.addLength === true) {
      // add 1 more block
      this.wholeSnakeCoords.push([this.x, this.y]);
      this.addLength = false;
    } else {
      this.wholeSnakeCoords.shift();
      this.wholeSnakeCoords.push([this.x, this.y]);
    }
  }
}
