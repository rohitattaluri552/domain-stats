import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class DomainsManagemenetService {

  baseUrl = 'http://localhost:3000/domain-info';
  
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Get the list of domains
   */
  public getDomainsList() {
    return this.http.get(this.baseUrl);
  }

  /**
   * @param reqObject Contains the requestObject of the domain that user entered in the form
   */
  public addNewDomainToTheList(reqObject){
    return this.http.post(this.baseUrl, reqObject).pipe(
      map(response=> {
        return response;
      })
    );
  }

  /**
   * To delete any particular domain
   */
  public deleteADomain(domainId){
    return this.http.delete(`${this.baseUrl}/${domainId}`).pipe(map(response => {
      return response;
    }))
  }
}

export interface DomainInfo {
  id: number,
  domain: string,
  storage: string,
  usedStorage: string,
  domainTag: string,
  status: string,
  availableDomains: number,
  usedDomains: number,
  monthlyVisitorCapacity: number,
  monthlyVisitor: number,
  subdomain: SubDomain[],
};

export interface SubDomain {
  id: number,
  name: number,
  usedStorage: string,
  domainTag: string,
  montlyVisitor: number,
  color?: string,
  backgroundColor?: string;
}
