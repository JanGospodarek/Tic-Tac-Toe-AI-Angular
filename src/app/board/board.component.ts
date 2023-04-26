import { Component, OnInit } from '@angular/core';
import { Cell } from '../../interfaces';
import { CellService } from '../cell.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  cells: Cell[];
  BOARD_WIDTH = 15;
  constructor(private cellService: CellService) {
    this.renderBoardGrid();
    this.cellService.clickEmitter.subscribe((id) => {
      this.handleCellClick(id);
    });
  }
  ngOnInit() {
    this.cells = this.cellService.cells;
  }
  renderBoardGrid() {
    let index = 0;
    for (let x = 0; x < this.BOARD_WIDTH; x++) {
      for (let y = 0; y < this.BOARD_WIDTH; y++) {
        //prettier-ignore
        this.cellService.addCell({id: index,row: y,col: x,x: 20 * x,y: 20 * y,char:'',flag:'normal'})
        index++;
      }
    }
  }

  handleCellClick(id: number) {
    this.cellService.updateChar(id);
  }
}
