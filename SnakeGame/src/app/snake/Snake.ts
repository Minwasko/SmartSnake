export class Snake {
  public x: number;
  public y: number;
  public length: number;


  constructor() {
    this.x = 15;
    this.y = 65;
    this.length = 0;
  }

  public goUp(): void {
    this.y -= 20;
    document.getElementById('snake0').style.top = `${this.y}px`;
  }

  public goDown(): void {
    this.y += 20;
    document.getElementById('snake0').style.top = `${this.y}px`;
  }

  public goLeft(): void {
    this.x -= 20;
    document.getElementById('snake0').style.left = `${this.x}px`;
  }

  public goRight(): void {
    this.x += 20;
    document.getElementById('snake0').style.left = `${this.x}px`;
  }


}
