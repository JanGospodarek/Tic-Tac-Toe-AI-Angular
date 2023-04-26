import { EventEmitter, Injectable } from '@angular/core';
import { Cell } from 'src/interfaces';
@Injectable({
  providedIn: 'root',
})
export class CellService {
  cells: Cell[] = [];
  currentChar = 'X';

  constructor() {}

  clickEmitter = new EventEmitter<number>();
  addCell(data: Cell) {
    this.cells.push(data);
  }
  getCell(id: number) {
    return this.cells[id];
  }
  updateChar(index: number) {
    if (this.cells[index].char !== '') return;
    this.cells[index].char = this.currentChar;
    this.checkForWin(index);
    this.changeChar();
  }
  changeChar() {
    this.currentChar == 'X'
      ? (this.currentChar = 'O')
      : (this.currentChar = 'X');
  }
  checkForWin(index: number) {
    // const cell = this.cells[index];
    // const nearby: Cell[] = [];
    // const vectors: { x: number; y: number }[] = [];
    // this.cells.forEach((el, i) => {
    //   if (
    //     ((el.y == cell.y - 20 || el.y == cell.y + 20) &&
    //       (el.x == cell.x - 20 || el.x == cell.x || el.x == cell.x + 20)) ||
    //     (el.y == cell.y && (el.x == cell.x - 20 || el.x == cell.x + 20))
    //   )
    //     nearby.push(el);
    // });
    // console.log(nearby);
    // nearby.forEach((el) => {
    //   if (el.char !== cell.char) return;
    //   vectors.push({ x: cell.x - el.x, y: cell.y - el.y });
    // });
  }
}
