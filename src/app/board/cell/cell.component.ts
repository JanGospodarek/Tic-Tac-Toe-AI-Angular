import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  EventEmitter,
  Output,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CellService } from 'src/app/cell.service';
import { Cell } from 'src/interfaces';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  data: Cell;
  @Input() id: number;
  constructor(private cellService: CellService) {}

  handleClick() {
    this.cellService.clickEmitter.emit(this.id);
  }
  ngOnInit(): void {
    this.data = this.cellService.getCell(this.id);
  }
}
