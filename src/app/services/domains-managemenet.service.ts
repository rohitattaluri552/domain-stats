import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainsManagemenetService {

  private domainsSubject = new BehaviorSubject([]);
  domainsList$: Observable<DomainInfo[]>;
  
  constructor() {
    this.domainsList$ = this.domainsSubject.asObservable();
    this.domainsSubject.next(domainList);
  }

}
const domainList = [
  {
    id: 1,
    domain: 'xyz.com',
    storage: '100',
    usedStorage: '50',
    domainTag: 'Primary',
    availableDomains: 10,
    usedDomains: 4,
    monthlyVisitorCapacity: 10000,
    montlyVisitor: 100,
    subdomain: [
      {
        id: 11,
        name: 'abc.xyz.com',
        usedStorage: '10',
        domainTag: 'Staging',
        montlyVisitor: 700,
      },
      {
        id: 12,
        name: 'adef.xyz.com',
        usedStorage: '40',
        domainTag: 'Add On',
        montlyVisitor: 1100,
      },
    ],
  },

  {
    id: 2,
    domain: 'xyz.com',
    storage: '100',
    usedStorage: '23',
    domainTag: 'Primary',
    subdomain: [],
    status: 'Inactive',
    availableDomains: 10,
    usedDomains: 1,
    monthlyVisitorCapacity: 10000,
    montlyVisitor: 2000,
  },
  {
    id: 3,
    domain: 'xyz.com',
    storage: '100',
    usedStorage: '42',
    domainTag: 'Primary',
    subdomain: [],
    status: 'Inactive',
    availableDomains: 10,
    usedDomains: 1,
    monthlyVisitorCapacity: 10000,
    montlyVisitor: 2000,
  },
  {
    id: 4,
    domain: 'xyz.com',
    storage: '125',
    usedStorage: '75',
    domainTag: 'Primary',
    subdomain: [],
    status: 'Inactive',
    availableDomains: 10,
    usedDomains: 1,
    monthlyVisitorCapacity: 10000,
    montlyVisitor: 2000,
  },
];

export interface DomainInfo {
  id: number,
  domain: string,
  storage: string,
  usedStorage: string,
  domainTag: string,
  availableDomains: number,
  usedDomains: number,
  monthlyVisitorCapacity: number,
  montlyVisitor: number,
  subdomain: SubDomain[],
};

export interface SubDomain {
  id: number,
  name: number,
  usedStorage: string,
  domainTag: string,
  montlyVisitor: number,
}
