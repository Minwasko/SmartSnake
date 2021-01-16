import {ElementRef, Renderer2} from '@angular/core';

export class Apple {
  public x: number;
  public y: number;
  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.spawnNewApple();
  }
  public spawnNewApple(): void {
    // 31 is the magic number of possible spots on x and y axis'
    this.x = (Math.floor(Math.random() * 31)) * 20 + 15; // 15 and 65 are borders
    this.y = (Math.floor(Math.random() * 31)) * 20 + 65;
    let snakeCoordsX = [];
    let snakeCoordsY = []; // this is a cringy way of doing, but will do it for now
    for (let i = 1; i < this.el.nativeElement.querySelectorAll('.snake').length; i++) {
      snakeCoordsX.push(document.getElementById(`snake${i}`).style.left);
      snakeCoordsY.push(document.getElementById(`snake${i}`).style.top);
    }
    if (snakeCoordsX.length > 1) {
      let collision = true;
      while (collision) {
        for (let i = 0; i < snakeCoordsX.length; i++) {
          collision = `${this.x}px` === snakeCoordsX[i] && `${this.y}px` === snakeCoordsY[i];
        }
        if (collision) {
          this.x = (Math.floor(Math.random() * 31)) * 20 + 15; // 15 and 65 are borders
          this.y = (Math.floor(Math.random() * 31)) * 20 + 65;
        }
      }
    }
    document.getElementById('apple').style.top = `${this.y}px`;
    document.getElementById('apple').style.left = `${this.x}px`;
  }
}
