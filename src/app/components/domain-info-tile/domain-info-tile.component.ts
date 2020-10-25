import { Component, Input, OnInit } from '@angular/core';
import { DomainInfo } from 'src/app/services/domains-managemenet.service';

@Component({
  selector: 'app-domain-info-tile',
  templateUrl: './domain-info-tile.component.html',
  styleUrls: ['./domain-info-tile.component.scss']
})
export class DomainInfoTileComponent implements OnInit {

  @Input('domain-info') domain: DomainInfo;
  constructor() { }

  ngOnInit() { }

  get storageUsed() {    
    var usedData = (parseInt(this.domain.usedStorage) / parseInt(this.domain.storage))*100;
    return usedData;
  }

  get monthlyUsersPercentage() {
    var totalUsersPercentage = (this.domain.monthlyVisitor / this.domain.monthlyVisitorCapacity)*100;
    return totalUsersPercentage.toFixed(2);
  }

  get totalUsedDomains() {
    var usedDomainsCount = (this.domain.usedDomains/this.domain.availableDomains)*100;
    return usedDomainsCount;
  }

}
