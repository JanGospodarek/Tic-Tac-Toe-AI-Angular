import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './board/cell/cell.component';
import { CellService } from './cell.service';

@NgModule({
  declarations: [AppComponent, BoardComponent, CellComponent],
  imports: [BrowserModule],
  providers: [CellService],
  bootstrap: [AppComponent],
})
export class AppModule {}
