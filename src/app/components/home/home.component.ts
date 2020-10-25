import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainInfo, DomainsManagemenetService } from 'src/app/services/domains-managemenet.service';
import { startWith, map } from 'rxjs/operators';
import { UtilService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public domains: DomainInfo[] = [];

  public searchDomain = new FormControl('');
  
  public headerItems: string[] = [];

  public filteredDomainsList$: Observable<DomainInfo[]>;

  public isDialogOpened: boolean = false;

  public addDomainForm: FormGroup;

  public subDomains: any [];

  constructor(
    private domainsService: DomainsManagemenetService,
    private utilService: UtilService,
  ) { }

  ngOnInit() {
    this.getDomainInfo();
    
    /**
     *  Delete function call (Use this when ever you want to delete any domain) 
     */
    // this.domainsService.deleteADomain(6).subscribe(deletedDomain => {
    //   alert('Domain deleted successfully');
    // });

    //Buildding the form
    this.addDomainForm = new FormGroup({
      domain: new FormControl('', Validators.required),
      monthlyVisitor: new FormControl('', Validators.required),
      storage: new FormControl('', Validators.required),
      subdomain: new FormArray([]),
    });
    
    //Preparing the requried header fileds to show on UI
    this.headerItems = [ 'Domain & Plan Name',
                          'Storage',
                          'Monthly Visitor', 
                          'Domains', 
                          'Status',
                        ];
  }
  
  get domain() {
    return this.addDomainForm.get('domain');
  }
  get monthlyVisitor() {
    return this.addDomainForm.get('monthlyVisitor');
  }
  get storage() {
    return this.addDomainForm.get('storage');
  }

  get subdomain():FormArray {
    return this.addDomainForm.get('subdomain') as FormArray;
  }

  /**
   * Getting the domains list form the get api
   */
  private getDomainInfo() {
    this.domainsService.getDomainsList().subscribe((domains: DomainInfo[]) => {
      this.domains = domains;
      this.onSearchDomain();
    });
  }

  /**
   * Search Functionality
   * 
   * Based on the entered keyword by the user, domains are filtering
   * based on domain name
   */
  public onSearchDomain(){
    this.filteredDomainsList$ = this.searchDomain.valueChanges.pipe(
      startWith(''),
      map((searchText: string) =>
        !searchText ? this.domains : this.domains.filter(
          c => c.domain.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  }

  // Add a sub domain
  public addASubDomain(input: HTMLInputElement) {
    if(input.value) {
      const subDomain = new FormControl({
          name: input.value,
          id: this.utilService.create_UUID(),
          usedStorage: 0,
          domainTag: this.utilService.pickRandomString(['Primary', 'Staging', 'Add On']),
          monthlyVisitor: Math.floor((Math.random() * 1200) + 1),
        });
      this.subdomain.push(subDomain);
      input.value = '';
    }
  }

  // Remove the subdomian if not required 
  public removeSubdomain(index: number){
    this.subdomain.removeAt(index);
  }

  /**
   * After submiting the form, re-setting the expected properties that are in use(on UI)
   * and calling api to add the new domain details. 
   * */
  public submitForm() {
    const reqObject = this.addDomainForm.value;
    reqObject.usedStorage = reqObject.storage / 10;
    reqObject.usedDomains = reqObject.subdomain.length 
                              ? reqObject.subdomain.length 
                              : 1;

    reqObject.monthlyVisitorCapacity = reqObject.monthlyVisitor * 10;
    reqObject.status = this.utilService.pickRandomString(['Inactive', 'Active']);

    reqObject.monthlyVisitor = parseInt(reqObject.monthlyVisitor);
    reqObject.availableDomains = reqObject.subdomain.length  
                                  ? (reqObject.subdomain.length + 1)
                                  : 1;

    this.domainsService.addNewDomainToTheList(reqObject).subscribe(newDomain => {
      if(newDomain){
        this.getDomainInfo();
        this.isDialogOpened = !this.isDialogOpened;
        window.alert('Domain information added succesfully');
      }
    }, error=>{
      console.log(`Error:::::${error}`);
      window.alert('Something went wrong, Please try after some time');
    });
  }

  
  // ON click of close button (reseting the form and closing it)
  public resetForm() {
    this.addDomainForm.value.storage = '';
    this.addDomainForm.value.domain = '';
    this.addDomainForm.value.subdomain = '';
    this.addDomainForm.value.monthlyVisitor = '';

    this.isDialogOpened = !this.isDialogOpened;
  }
}
