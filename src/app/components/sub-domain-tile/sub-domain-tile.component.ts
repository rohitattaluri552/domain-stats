import { Component, Input, OnInit } from '@angular/core';
import { SubDomain } from './../../services/domains-managemenet.service';

@Component({
  selector: 'app-sub-domain-tile',
  templateUrl: './sub-domain-tile.component.html',
  styleUrls: ['./sub-domain-tile.component.scss']
})
export class SubDomainTileComponent implements OnInit {

  @Input('subdomain') subdomain: SubDomain;
  @Input('status') status: String;
  primary: string = '#5b7cfd';
  primaryBackground: string = '#dee5ff';

  staging: string = '#ff57f7';
  stagingBackground: string = '#f1daf2';

  addOn: string = '#ffae33';
  addOnBackground: string = '#f6eee3';

  
  constructor() { }

  ngOnInit() {
    switch(this.subdomain.domainTag) {
      case 'Primary' : this.subdomain.color = this.primary;
            this.subdomain.backgroundColor = this.primaryBackground;
            break;
      case 'Staging' :
        this.subdomain.color = this.staging;
        this.subdomain.backgroundColor = this.stagingBackground;
        break;
      case 'Add On':
        this.subdomain.color = this.addOn;
        this.subdomain.backgroundColor = this.addOnBackground;
    }

  }

}
