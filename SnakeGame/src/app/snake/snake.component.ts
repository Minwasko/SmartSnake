import {Component, HostListener, Renderer2, ElementRef, OnInit, Injectable} from '@angular/core';
import {Snake} from './Snake';
import {Apple} from '../apple/Apple';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css'],
  providers: [Snake]
})
@Injectable()
export class SnakeComponent implements OnInit {
  snake;
  apple;
  intervalId: number;
  intervalIdSecond: number;
  lastPressed: string;
  currentDirection: string;
  isDead: boolean;
  deadZonesX = [10, 630];
  deadZonesY = [60, 680];
  @HostListener('window:keydown', ['$event'])
  getKeyInput(event: KeyboardEvent): void {
    // setInterval(() => {
    const correctKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
      'w', 'W', 'a', 'A', 's', 'S', 'd', 'D'];
    if (correctKeys.includes(event.key) && event.key !== this.lastPressed && !this.isDead) {
      this.moveSnake(event.key);
    } else if (event.key === 'r' || event.key === 'R'){
      this.restartGame();
    }
  }
  moveSnake(key: string): void {
  if (this.el.nativeElement.querySelectorAll('.snake').length > 1) {
    for (let i = this.el.nativeElement.querySelectorAll('.snake').length - 1; i >= 1; i--){
      document.getElementById(`snake${i}`).style.top = document.getElementById(`snake${i - 1}`).style.top;
      document.getElementById(`snake${i}`).style.left = document.getElementById(`snake${i - 1}`).style.left;
    }
  }
  // remove last element
  if (!this.isDead) {
    if (['ArrowUp', 'w', 'W'].includes(key) && this.currentDirection !== 'Down') {
      this.currentDirection = 'Up';
      this.snake.goUp();
      this.lastPressed = key;
    } else if (['ArrowLeft', 'a', 'A'].includes(key) && this.currentDirection !== 'Right') {
      this.currentDirection = 'Left';
      this.snake.goLeft();
      this.lastPressed = key;
    } else if (['ArrowDown', 's', 'S'].includes(key) && this.currentDirection !== 'Up') {
      this.currentDirection = 'Down';
      this.snake.goDown();
      this.lastPressed = key;
    } else if (['ArrowRight', 'd', 'D'].includes(key) && this.currentDirection !== 'Left') {
      this.currentDirection = 'Right';
      this.snake.goRight();
      this.lastPressed = key;
    }
  }
  }
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.snake = new Snake();
    this.apple = new Apple(this.renderer, this.el);
    // @ts-ignore
    this.intervalId = setInterval(() => {
      this.moveSnake(this.lastPressed);
      this.checkForDeath();
    }, 100);
    this.intervalIdSecond = setInterval(() => {
      this.checkForApples();
    // check if you are on top of the apple
    }, 1);
  }
  public checkForApples(): void {
    if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {
      console.log('you got the apple!');
      this.snake.length++;
      // creating snake block div
      const div = this.renderer.createElement('div');
      this.renderer.addClass(div, 'snake');
      this.renderer.setStyle(div, 'top', `${this.snake.y}px`);
      this.renderer.setStyle(div, 'left', `${this.snake.x}px`);
      this.renderer.setProperty(div, 'id', `snake${this.snake.length}`);
      this.renderer.appendChild(document.getElementsByTagName('app-snake')[0], div);
      this.apple.spawnNewApple();
    }
  }
  public checkForDeath(): void {
    if (this.snake.x <= this.deadZonesX[0] || this.snake.x >= this.deadZonesX[1] ||
      this.snake.y <= this.deadZonesY[0] || this.snake.y >= this.deadZonesY[1] || this.snakeCollision()) {
        this.isDead = true;
        document.getElementById('end_game_overlay').style.zIndex = '100';
    }
  }
  public snakeCollision(): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 1; i < this.el.nativeElement.querySelectorAll('.snake').length; i++) {
      if (document.getElementById(`snake0`).style.top === document.getElementById(`snake${i}`).style.top
      && document.getElementById(`snake0`).style.left === document.getElementById(`snake${i}`).style.left) {
        console.log('you hit yourself');
        return true;
      }
    }
    return false;
  }

  restartGame(): void {
    let snakes = document.querySelectorAll(`.snake`);
    let snakesParent = document.querySelector(`app-snake`);
    for (let i = 1; i < snakes.length; i++) {
      this.renderer.removeChild(snakesParent, snakes.item(i));
    }
    this.isDead = false;
    this.snake.length = 0;
    this.snake.y = 65;
    this.snake.x = 15;
    this.lastPressed = '';
    this.currentDirection = '';
    document.getElementById('snake0').style.top = '65px';
    document.getElementById('snake0').style.left = '15px';
    document.getElementById('end_game_overlay').style.zIndex = '-100';
  }
}

