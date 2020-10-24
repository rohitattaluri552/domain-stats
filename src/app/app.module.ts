import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DomainInfoTileComponent } from './components/domain-info-tile/domain-info-tile.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SubDomainTileComponent } from './components/sub-domain-tile/sub-domain-tile.component';
import { DomainsManagemenetService } from './services/domains-managemenet.service';
import { AddDomainDialogComponent } from './components/add-domain-dialog/add-domain-dialog.component';
import { MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    DomainInfoTileComponent,
    HomeComponent, 
    SideNavComponent, 
    SubDomainTileComponent, 
    AddDomainDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ DomainsManagemenetService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
