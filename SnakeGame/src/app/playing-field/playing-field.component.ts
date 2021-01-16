import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';

@Component({
  selector: 'app-playing-field',
  templateUrl: './playing-field.component.html',
  styleUrls: ['./playing-field.component.css']
})
export class PlayingFieldComponent implements OnInit {
  constructor(private renderer2: Renderer2, private el: ElementRef) { }
  ngOnInit(): void {
  }
}
