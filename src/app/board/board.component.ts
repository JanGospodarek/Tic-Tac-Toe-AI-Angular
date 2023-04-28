import { Component, OnInit, Input } from '@angular/core';
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
  @Input() width: number = 0;

  constructor(private cellService: CellService) {
    this.cellService.clickEmitter.subscribe((id) => {
      this.handleCellClick(id);
    });
    console.log(this.cellService.startGame);

    // this.cellService.startGame.subscribe((data) => {
    //   console.log(data);

    //   this.width = data.width;
    //   this.height = data.height;
    //   this.renderBoardGrid();
    // });
  }
  ngOnInit() {
    this.cells = this.cellService.cells;
    this.renderBoardGrid();
  }
  renderBoardGrid() {
    let index = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.width; y++) {
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
