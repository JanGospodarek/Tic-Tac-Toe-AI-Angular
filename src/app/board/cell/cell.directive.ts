import { Directive, Input, HostBinding, OnInit } from '@angular/core';
import { CellService } from '../../cell.service';

@Directive({
  selector: '[appCell]',
})
export class CellDirective implements OnInit {
  @Input() id: number;
  @HostBinding('style.backgroundColor') backgroundColor: string = 'white';
  constructor(private cellService: CellService) {}
  ngOnInit(): void {
    const cell = this.cellService.getCell(this.id);
    console.log(this.backgroundColor);

    if (cell.flag == 'crossed') this.backgroundColor = 'black';
  }
}
