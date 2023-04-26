import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/interfaces';
import { GenUniqueIdService } from '../gen-unique-id.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  cells: Cell[] = [];
  BOARD_WIDTH = 15;

  constructor(private genUniqueIdService: GenUniqueIdService) {
    this.renderBoardGrid();
  }
  ngOnInit() {}
  renderBoardGrid() {
    for (let x = 0; x < this.BOARD_WIDTH; x++) {
      for (let y = 0; y < this.BOARD_WIDTH; y++) {
        //prettier-ignore
        this.cells.push({id: this.genUniqueIdService.getUniqueId(),row: y,col: x,x: 20 * x,y: 20 * y});
      }
    }
  }

  handleCellClick(data: Cell) {
    console.log(data);
  }
}
