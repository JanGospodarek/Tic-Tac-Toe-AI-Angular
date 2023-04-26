import { EventEmitter, Injectable } from '@angular/core';
import { Cell } from '../interfaces';
@Injectable({
  providedIn: 'root',
})
export class CellService {
  cells: Cell[] = [];
  currentChar = 'X';

  scores = {
    X: 10,
    O: -10,
    tie: 0,
  };
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
    const arr: number[] | null = this.checkWinner();
    // this.bestMove();

    if (arr !== null) {
      console.log(arr);

      this.crossChars(arr);
    }
    this.changeChar();
  }
  crossChars(arr: number[]) {
    arr.forEach((el) => {
      this.cells[el].flag = 'crossed';
    });
  }
  changeChar() {
    this.currentChar == 'X'
      ? (this.currentChar = 'O')
      : (this.currentChar = 'X');
  }
  bestMove() {
    // 'O' to make its turn
    // let bestScore = -Infinity;
    // let move: number = 150;
    // this.cells.forEach((cell) => {
    //   if (cell.char == '') {
    //     cell.char = 'O';
    //     let score = this.minimax(this.cells, 0, false);
    //     cell.char = '';
    //     if (score > bestScore) {
    //       bestScore = score;
    //       move = cell.id;
    //     }
    //   }
    // });
    // // Is the spot av'O'lable?
    // if (move !== 150) {
    //   this.cells[move].char = 'O';
    //   this.currentChar = 'X';
    // }
  }

  minimax(board: Cell[], depth: number, isMaximizing: boolean) {
    // let result: any = this.checkWinner();
    // if (result !== null) {
    //   console.log(result);
    //   if (result == 'X') return this.scores.X;
    //   if (result == 'O') return this.scores.O;
    //   if (result == 'tie') return this.scores.tie;
    // }
    // if (isMaximizing) {
    //   let bestScore = -Infinity;
    //   this.cells.forEach((el) => {
    //     if (el.char == '') {
    //       el.char = 'O';
    //       let score = this.minimax(board, depth + 1, false);
    //       el.char = '';
    //       bestScore = Math.max(score, bestScore);
    //     }
    //   });
    //   // Is the spot av'O'lable?
    //   return bestScore;
    // } else {
    //   let bestScore = Infinity;
    //   this.cells.forEach((el) => {
    //     // Is the spot av'O'lable?
    //     if (el.char == '') {
    //       el.char = 'X';
    //       let score = this.minimax(board, depth + 1, true);
    //       el.char = '';
    //       bestScore = Math.min(score, bestScore);
    //     }
    //   });
    //   return bestScore;
    // }
  }

  checkWinner() {
    let winner = null;
    for (let i = 0; i < 15; i++) {
      let counter = 0;
      for (let j = 0; j < 15; j++) {
        const idx = 15 * i + j;
        if (this.cells[idx].char !== '') {
          if (
            counter == 0 ||
            this.cells[idx].char == this.cells[idx - 1].char
          ) {
            if (++counter == 5) {
              return Array(5)
                .fill(0)
                .map((e, i) => idx - 4 + i);
            }
          } else {
            counter = 1;
          }
        } else {
          counter = 0;
        }
      }
    }
    // const dim1 = this.checkDimension(1, this.cells, 0, 1);
    for (let i = 0; i < 15; i++) {
      let counter = 0;
      for (let j = 0; j < 15; j++) {
        const idx = i + 15 * j;
        if (this.cells[idx].char !== '') {
          if (
            counter == 0 ||
            this.cells[idx].char == this.cells[idx - 15].char
          ) {
            if (++counter == 5) {
              return Array(5)
                .fill(0)
                .map((e, i) => idx - 4 * 15 + 15 * i);
            }
          } else {
            counter = 1;
          }
        } else {
          counter = 0;
        }
      }
    }
    // const dim2 = this.checkDimension(2, this.cells, 0, 15);

    for (let i = -15; i < 15; i++) {
      let counter = 0;
      for (let j = 0; j < 15; j++) {
        const y = i + j;
        if (y < 0 || y >= 15) continue;
        const idx = y * 15 + j;
        if (this.cells[idx].char !== '') {
          if (
            counter == 0 ||
            this.cells[idx].char == this.cells[idx - 16].char
          ) {
            if (++counter == 5) {
              return Array(5)
                .fill(0)
                .map((e, i) => idx - 4 * 16 + 16 * i);
            }
          } else {
            counter = 1;
          }
        } else {
          counter = 0;
        }
      }
    }
    // const dim3 = this.checkDimension(3, this.cells, -15, 16);

    for (let i = -15; i < 15; i++) {
      let counter = 0;
      for (let j = 0; j < 15; j++) {
        const y = i + j;
        if (y < 0 || y >= 15) continue;
        const idx = y * 15 + 14 - j;
        if (this.cells[idx].char !== '') {
          if (
            counter == 0 ||
            this.cells[idx].char == this.cells[idx - 14].char
          ) {
            if (++counter == 5) {
              return Array(5)
                .fill(0)
                .map((e, i) => idx - 4 * 14 + 14 * i);
            }
          } else {
            counter = 1;
          }
        } else {
          counter = 0;
        }
      }
    }
    // const dim4 = this.checkDimension(4, this.cells, -15, 14);
    // let openSpots = 0;
    // this.cells.forEach((el) => {
    //   if (el.char == '') openSpots++;
    // });
    // if (winner == null && openSpots == 0) {
    //   return 'tie';
    // } else {
    //   return winner;
    // }
    return null;
  }
  // checkDimension(
  //   dimension: number,
  //   board: Cell[],
  //   startIndex: number,
  //   n: number
  // ) {
  //   for (let i = startIndex; i < 15; i++) {
  //     let counter = 0;
  //     for (let j = 0; j < 15; j++) {
  //       const y = i + j;
  //       if (y < 0 || y >= 15) continue;
  //       let idx: number = 0;
  //       if (dimension == 4) idx = y * 15 + 14 - j;
  //       if (dimension == 3) idx = y * 15 + j;
  //       if (dimension == 2) idx = i + 15 * j;
  //       if (dimension == 1) idx = 15 * i + j;
  //       if (board[idx].char !== '') {
  //         if (counter == 0 || board[idx].char == board[idx - n].char) {
  //           if (++counter == 5) {
  //             return Array(5)
  //               .fill(0)
  //               .map((e, i) => idx - 4 * n + n * i);
  //           }
  //         } else {
  //           counter = 1;
  //         }
  //       } else {
  //         counter = 0;
  //       }
  //       if(i==14&&j==14) return null
  //     }
  //   }
  // }
}
