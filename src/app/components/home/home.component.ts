import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainInfo, DomainsManagemenetService } from 'src/app/services/domains-managemenet.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private domains: DomainInfo[];

  searchDomain = new FormControl('');
  
  headerItems: string[] = [];

  filteredDomainsList$: Observable<DomainInfo[]>;

  isDialogOpened: boolean = false;

  addDomainForm: FormGroup;

  subDomains: any [];

  constructor(
    private domainsService: DomainsManagemenetService,
  ) { }

  ngOnInit() {
    this.getDomainInfo();
    // Delete function call
    // this.domainsService.deleteADomain(6).subscribe(deletedDomain => {
    //   alert('Domain deleted successfully');
    // })
    //Buildding the form
    this.addDomainForm = new FormGroup({
      domain: new FormControl('', Validators.required),
      monthlyVisitor: new FormControl('', Validators.required),
      storage: new FormControl('', Validators.required),
      subdomain: new FormArray([]),
    });
    
    //Preparing the requried header fileds to show on UI
    this.headerItems = ['Domain & Plan Name', 'Storage', 'Monthly Visitor', 'Domains', 'Status'];
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
  private getDomainInfo(){
    this.domainsService.getDomainsList().subscribe((domains: DomainInfo[]) => {
      this.domains = domains;
      this.onSearchDomain();
    });
  }

  /// TODO:Search functionality
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
  addASubDomain(input: HTMLInputElement) {
    const subDomain = new FormControl({
        name: input.value,
        id: this.create_UUID(),
        usedStorage: 0,
        domainTag: 'Add On',
        monthlyVisitor: Math.floor((Math.random() * 1200) + 1),
      });
    this.subdomain.push(subDomain);
    input.value = '';
  }

  // generate UUID for subdomain Id
  create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  // Remove the subdomian if not required 
  removeSubdomain(index){
    this.subdomain.removeAt(index);
  }

  /**
   * After submiting the form, re-setting the expected properties that are in use(on UI)
   * and calling api to add the new domain details. 
   * */
  public submitForm(){
    const reqObject = this.addDomainForm.value;
    reqObject.usedStorage = 0;
    reqObject.usedDomains = reqObject.subdomain !== '' ? 2 : 1;
    reqObject.monthlyVisitorCapacity = 22500;
    reqObject.status = 'Active';

    reqObject.monthlyVisitor = parseInt(reqObject.monthlyVisitor);
    reqObject.availableDomains = Math.floor((Math.random() * 20) + 1);

    this.domainsService.addNewDomainToTheList(reqObject).subscribe(newDomain => {
      
      if(newDomain){
        this.getDomainInfo();
        window.alert('Domain information added succesfully');
      } 

      this.isDialogOpened = !this.isDialogOpened;
    });

  }

  // ON click of close button (reseting the form and closing it)
  public resetForm(){
    this.addDomainForm.value.storage = '';
    this.addDomainForm.value.domain = '';
    this.addDomainForm.value.subdomain = '';
    this.addDomainForm.value.monthlyVisitor = '';

    this.isDialogOpened = !this.isDialogOpened;
  }
}
