import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GrammarComponent } from './component/grammar/grammar.component';
import { GrammarService } from './service/grammar.service';

@NgModule({
  declarations: [
    AppComponent,
    GrammarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GrammarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
