import { Component } from '@angular/core';
import { CellService } from './cell.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OX';
  xScore = 0;
  oScore = 0;
  width = 0;
  running = false;
  constructor(private cellService: CellService) {
    this.cellService.scoreUpdate.subscribe((data) => {
      this.xScore = data.x;
      this.oScore = data.o;
    });
    this.cellService.renderTie.subscribe(() => {
      alert('Tie!');
    });
  }
  start(width: string, amount: string) {
    this.width = +width;
    this.cellService.startGame.emit({
      width: +width,
      amount: +amount,
    });
    this.running = true;
  }
  handleChange(event: string) {
    this.width = +event;
  }
}
