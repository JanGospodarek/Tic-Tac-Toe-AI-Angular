import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { Cell } from 'src/interfaces';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() data: Cell;
  @Output() onHandleClick = new EventEmitter<Cell>();
  constructor() {}
  handleClick() {
    this.onHandleClick.emit(this.data);
  }
}
