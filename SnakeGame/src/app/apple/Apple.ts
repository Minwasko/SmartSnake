export class Apple {
  public x: number;
  public y: number;
  constructor() {
    this.spawnNewApple();
  }
  public spawnNewApple(): void {
    // 31 is the magic number of possible spots on x and y axis'
    this.x = (Math.floor(Math.random() * 31)) * 20 + 15; // 15 and 65 are borders
    this.y = (Math.floor(Math.random() * 31)) * 20 + 65;
    document.getElementById('apple').style.top = `${this.y}px`;
    document.getElementById('apple').style.left = `${this.x}px`;
  }
}
