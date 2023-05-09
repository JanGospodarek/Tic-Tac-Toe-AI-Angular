import { EventEmitter, Injectable } from '@angular/core';
import { Cell } from '../interfaces';
@Injectable({
  providedIn: 'root',
})
export class CellService {
  cells: Cell[] = [];
  currentChar = 'X';
  maxScore = 0;
  width = 0;
  xScore = 0;
  stop = false;
  oScore = 0;
  blockedIndexes: number[][] = [];
  scores = {
    X: 10,
    O: -10,
    tie: 0,
  };
  vectorOptions = [-20, 0, 20];
  constructor() {
    this.startGame.subscribe((data) => {
      this.width = data.width;
      this.maxScore = data.amount;
    });
  }

  clickEmitter = new EventEmitter<number>();
  renderTie = new EventEmitter();
  scoreUpdate = new EventEmitter<{ o: number; x: number }>();
  startGame = new EventEmitter<{
    width: number;
    amount: number;
  }>();

  addCell(data: Cell) {
    this.cells.push(data);
  }
  getCell(id: number) {
    return this.cells[id];
  }

  updateChar(index: number) {
    if (
      this.cells[index].char !== '' ||
      this.cells[index].flag == 'crossed' ||
      this.stop
    )
      return;
    this.cells[index].char = this.currentChar;
    this.checkIfWinnerExists();
    this.AI();
  }
  crossChars(arr: number[]) {
    arr.forEach((el) => {
      this.cells[el].flag = 'crossed';
    });
  }
  checkIfWinnerExists() {
    const arrAi: number[] | null = this.checkWinner(5, 'O');
    const arrHuman: number[] | null = this.checkWinner(5, 'X');
    // this.bestMove();
    // if()

    if (arrAi !== null) {
      this.crossChars(arrAi);
      this.oScore++;

      this.scoreUpdate.emit({ o: this.oScore, x: this.xScore });
      if (this.oScore >= this.maxScore) {
        alert('Wygrywa O');
        this.stop = true;
      }
      return 'O';
    }
    if (arrHuman !== null) {
      this.crossChars(arrHuman);
      this.xScore++;

      this.scoreUpdate.emit({ o: this.oScore, x: this.xScore });
      if (this.xScore >= this.maxScore) {
        alert('Wygrywa X');
        this.stop = true;
      }
      return 'X';
    }
    return null;
  }
  AI() {
    /////////////////////////////
    // jesli czlowiek ma conajmniej 3 w rzedzie to ai sie broni
    let moved = false;
    [4, 3].forEach((el) => {
      if (moved) return;
      const humanArr = this.checkWinner(el, 'X');
      if (humanArr !== null) {
        const placed = this.placeAiMove(humanArr);
        if (placed) {
          moved = true;
          return;
        }
      }
    });
    // znajduje najwiekszy swoj ciag i dodaje do niego elementy
    this.checkIfWinnerExists();

    if (moved) return;
    let found = false;

    [4, 3, 2].forEach((el) => {
      const arr = this.checkWinner(el, 'O');
      if (found) return;
      if (arr !== null) {
        const placed = this.placeAiMove(arr);
        if (placed) {
          found = true;
          // moved = true;
          return;
        }
      }
    });
    this.checkIfWinnerExists();

    if (found || moved) return;
    let znalazlem = false;
    let randomIndex1 = Math.floor(Math.random() * this.width * this.width);
    if (this.cells.findIndex((el) => el.char == 'O') !== -1) {
      while (this.cells[randomIndex1].char !== 'O') {
        randomIndex1 = Math.floor(Math.random() * this.width * this.width);
        const cell = this.cells[randomIndex1];
        const vectorX = this.vectorOptions[Math.floor(Math.random() * 3)];
        const vectorY = this.vectorOptions[Math.floor(Math.random() * 3)];
        const index = this.cells.findIndex(
          (el) =>
            el.x == cell.x + vectorX &&
            el.y == cell.y + vectorY &&
            el.char == '' &&
            cell.char == 'O'
        );
        if (index !== -1) {
          this.cells[index].char = 'O';
          znalazlem = true;
        }
      }
    }
    this.checkIfWinnerExists();

    if (znalazlem) return;

    // this.cells[index].char = 'O';
    let randomIndex = Math.floor(Math.random() * this.width * this.width);
    while (this.cells[randomIndex].char !== '') {
      randomIndex = Math.floor(Math.random() * this.width * this.width);
    }
    this.cells[randomIndex].char = 'O';
    // jesli zaden z powyzszych to stawia w losowym miejscu
    this.checkIfWinnerExists();
  }

  placeAiMove(arr: number[]) {
    //obliczamy vektory

    const vectorX = this.cells[arr[1]].x - this.cells[arr[0]].x;
    const vectorY = this.cells[arr[1]].y - this.cells[arr[0]].y;
    console.log(arr);
    const first = this.cells[arr[arr.length - 1]];
    const last = this.cells[arr[0]];
    console.log('vec', vectorX, vectorY, first, last);
    let afterLastIndex = -1,
      beforeFirstIndex = -1;
    this.cells.forEach((el, i) => {
      if (el.char !== '') return;
      if (el.x == first.x + vectorX && el.y == first.y + vectorY)
        afterLastIndex = i;
      if (el.x == last.x - vectorX && el.y == last.y - vectorY)
        beforeFirstIndex = i;
    });
    console.log(this.cells[afterLastIndex], this.cells[beforeFirstIndex]);
    if (afterLastIndex !== -1) {
      this.cells[afterLastIndex].char = 'O';
      return true;
    }
    if (beforeFirstIndex !== -1) {
      this.cells[beforeFirstIndex].char = 'O';
      this.blockedIndexes.push(arr);
      return true;
    }

    return false;
  }

  checkIsCrossed(arr: number[]) {
    let wynik = true;
    arr.sort((a, b) => a - b);
    this.blockedIndexes.forEach((el) => {
      el.sort((a, b) => a - b);

      if (arr.join(' ') == el.join(' ')) {
        wynik = false;
        console.log(arr.join(' '), el.join(' '));
      }
    });
    return wynik;
  }

  checkWinner(counterNumber: number, char: string) {
    let winner = null;
    let span = counterNumber - 1; //5 -> 4, 4 -> 3 , 3 -> 2, 2 ->1

    if (counterNumber)
      for (let i = 0; i < this.width; i++) {
        let counter = 0;
        for (let j = 0; j < this.width; j++) {
          const idx = this.width * i + j; //co tu

          if (
            this.cells[idx].char !== '' &&
            this.cells[idx].flag !== 'crossed' &&
            this.checkIsCrossed(
              Array(counterNumber)
                .fill(0)
                .map((e, i) => idx - span + i)
            )
          ) {
            if (
              counter == 0 ||
              (this.cells[idx].char == this.cells[idx - 1].char &&
                this.cells[idx].char == char)
            ) {
              if (++counter == counterNumber) {
                return Array(counterNumber)
                  .fill(0)
                  .map((e, i) => idx - span + i);
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
    for (let i = 0; i < this.width; i++) {
      let counter = 0;
      for (let j = 0; j < this.width; j++) {
        const idx = i + this.width * j;
        if (
          this.cells[idx].char !== '' &&
          this.cells[idx].flag !== 'crossed' &&
          this.checkIsCrossed(
            Array(counterNumber)
              .fill(0)
              .map((e, i) => idx - span * this.width + this.width * i)
          )
        ) {
          if (
            counter == 0 ||
            (this.cells[idx].char == this.cells[idx - this.width].char &&
              this.cells[idx].char == char)
          ) {
            if (++counter == counterNumber) {
              return Array(counterNumber)
                .fill(0)
                .map((e, i) => idx - span * this.width + this.width * i);
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

    for (let i = -this.width; i < this.width; i++) {
      let counter = 0;
      for (let j = 0; j < this.width; j++) {
        const y = i + j;
        if (y < 0 || y >= this.width) continue;
        const idx = y * this.width + j;
        if (
          this.cells[idx].char !== '' &&
          this.cells[idx].flag !== 'crossed' &&
          this.checkIsCrossed(
            Array(counterNumber)
              .fill(0)
              .map(
                (e, i) => idx - span * (this.width + 1) + (this.width + 1) * i
              )
          )
        ) {
          if (
            counter == 0 ||
            (this.cells[idx].char == this.cells[idx - (this.width + 1)].char &&
              this.cells[idx].char == char)
          ) {
            if (++counter == counterNumber) {
              return Array(counterNumber)
                .fill(0)
                .map(
                  (e, i) => idx - span * (this.width + 1) + (this.width + 1) * i
                );
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

    for (let i = -this.width; i < this.width; i++) {
      let counter = 0;
      for (let j = 0; j < this.width; j++) {
        const y = i + j;
        if (y < 0 || y >= this.width) continue;
        const idx = y * this.width + this.width - 1 - j;
        if (
          this.cells[idx].char !== '' &&
          this.cells[idx].flag !== 'crossed' &&
          this.checkIsCrossed(
            Array(counterNumber)
              .fill(0)
              .map(
                (e, i) => idx - span * (this.width - 1) + (this.width - 1) * i
              )
          )
        ) {
          if (
            counter == 0 ||
            (this.cells[idx].char == this.cells[idx - this.width + 1].char &&
              this.cells[idx].char == char)
          ) {
            if (++counter == counterNumber) {
              return Array(counterNumber)
                .fill(0)
                .map(
                  (e, i) => idx - span * (this.width - 1) + (this.width - 1) * i
                );
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
    let openSpots = 0;
    this.cells.forEach((el) => {
      if (el.char == '') openSpots++;
    });
    if (openSpots == 0) {
      this.renderTie.emit();
    }
    return null;
  }
}
