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
  ViewChild,
  ElementRef,
  DoCheck,
} from '@angular/core';
import { CellService } from '../../cell.service';
import { Cell } from '../../../interfaces';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  data: Cell;
  photoUrl: string;
  @Input() id: number;
  @ViewChild('image') image: ElementRef<HTMLImageElement>;

  constructor(private cellService: CellService) {}

  handleClick() {
    this.cellService.clickEmitter.emit(this.id);
  }
  ngOnInit(): void {
    this.data = this.cellService.getCell(this.id);
    // this.photoUrl = `../../../img/"${this.data.char}`;
  }
}
