import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GenUniqueIdService } from './gen-unique-id.service';
import { CellComponent } from './board/cell/cell.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, CellComponent],
  imports: [BrowserModule],
  providers: [GenUniqueIdService],
  bootstrap: [AppComponent],
})
export class AppModule {}
