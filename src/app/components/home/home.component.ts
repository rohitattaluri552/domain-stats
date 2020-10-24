import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainInfo, DomainsManagemenetService } from 'src/app/services/domains-managemenet.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private domains: DomainInfo[];

  filteredDomains$: Observable<DomainInfo[]>;

  searchDomain = new FormControl('');
  
  headerItems: string[] = [];

  constructor(
    private domainsService: DomainsManagemenetService,
  ) { }

  ngOnInit() {
    this.domainsService.domainsList$.subscribe(domains => this.domains = domains);
    // console.log(this.domains);

    this.filteredDomains$ = this.searchDomain.valueChanges.pipe(
      startWith(''),
      map((searchText) => 
        !searchText ? this.domains : this.domains.filter(
          c => c.domain.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        )
      )
    );

    this.headerItems = ['Domain & Plan Name', 'Storage', 'Monthly Visitor', 'Domains', 'Status'];
  }

}
