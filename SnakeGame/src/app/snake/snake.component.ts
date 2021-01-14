import {Component, HostListener, Renderer2, ElementRef, OnInit} from '@angular/core';
import {Snake} from './Snake';
import {Apple} from '../apple/Apple';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {
  snake;
  apple;
  intervalId: number;
  intervalIdSecond: number;
  lastPressed: string;
  currentDirection: string;
  @HostListener('window:keydown', ['$event'])
  getKeyInput(event: KeyboardEvent): void {
    // setInterval(() => {
    const correctKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
      'w', 'W', 'a', 'A', 's', 'S', 'd', 'D'];
    console.log('You pressed: ' + event.key);
    if (correctKeys.includes(event.key) && event.key !== this.lastPressed) {
      this.moveSnake(event.key);
    } else {
      console.log('this is not right');
    }
    // }, 500);
  }
  moveSnake(key: string): void {
  console.log(this.el.nativeElement.querySelectorAll('.snake'));
  if (this.el.nativeElement.querySelectorAll('.snake').length > 1) {
    for (let i = this.el.nativeElement.querySelectorAll('.snake').length - 1; i >= 1; i--){
      document.getElementById(`snake${i}`).style.top = document.getElementById(`snake${i - 1}`).style.top;
      document.getElementById(`snake${i}`).style.left = document.getElementById(`snake${i - 1}`).style.left;
    }
  }
  // remove last element
    // append newer
  if (['ArrowUp', 'w', 'W'].includes(key) && this.currentDirection !== 'Down') {
    console.log('going up');
    this.currentDirection = 'Up';
    this.snake.goUp();
    this.lastPressed = key;
  } else if (['ArrowLeft', 'a', 'A'].includes(key) && this.currentDirection !== 'Right') {
    console.log('going left');
    this.currentDirection = 'Left';
    this.snake.goLeft();
    this.lastPressed = key;
  } else if (['ArrowDown', 's', 'S'].includes(key) && this.currentDirection !== 'Up') {
    console.log('going down');
    this.currentDirection = 'Down';
    this.snake.goDown();
    this.lastPressed = key;
  } else if (['ArrowRight', 'd', 'D'].includes(key) && this.currentDirection !== 'Left') {
    console.log('going right');
    this.currentDirection = 'Right';
    this.snake.goRight();
    this.lastPressed = key;
  }
  }
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.snake = new Snake();
    this.apple = new Apple();
    // @ts-ignore
    this.intervalId = setInterval(() => {
      this.moveSnake(this.lastPressed);
      console.log(this.snake.wholeSnakeCoords);
    }, 100);
    this.intervalIdSecond = setInterval(() => {
      this.checkForApples();
    // check if you are on top of the apple
    }, 10);
  }
  public checkForApples(): void {
    if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {
      console.log('you got the apple!');
      this.snake.length++;
      this.snake.addLength = true;
      // creating snake block div
      const div = this.renderer.createElement('div');
      this.renderer.addClass(div, 'snake');
      this.renderer.setStyle(div, 'top', `${this.snake.y}px`);
      this.renderer.setStyle(div, 'left', `${this.snake.x}px`);
      this.renderer.setProperty(div, 'id', `snake${this.snake.wholeSnakeCoords.length}`);
      this.renderer.appendChild(document.getElementsByTagName('app-snake')[0], div);
      this.apple.spawnNewApple();
    }
  }
}

