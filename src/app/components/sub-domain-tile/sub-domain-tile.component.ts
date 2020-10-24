import { Component, Input, OnInit } from '@angular/core';
import { SubDomain } from './../../services/domains-managemenet.service';

@Component({
  selector: 'app-sub-domain-tile',
  templateUrl: './sub-domain-tile.component.html',
  styleUrls: ['./sub-domain-tile.component.scss']
})
export class SubDomainTileComponent implements OnInit {

  @Input('subdomain') subdomain: SubDomain;
  constructor() { }

  ngOnInit() {
  }

}
