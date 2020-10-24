import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor() { }
  userInfo: Object = {
    profilePicture: 'https://lh3.googleusercontent.com/ogw/ADGmqu81J5ZHbuKG4bcgnMqBSuuWiQgA_AAefNQrvKwumA4=s83-c-mo',
    email: 'rohit@gmail.com',
    name: 'Rohit Attaluri',
  }
  menuItems: Object [] = [];

  ngOnInit() {
    this.menuItems = [
      {
        name: 'Dashboard',
        icon: 'pie_chart',
        isActive: false,
      },
      {
        name: 'Site Details',
        icon: 'credit_card',
        isActive: true,
      },
      {
        name: 'Migrations',
        icon: 'dns',
        isActive: false,
      },
      {
        name: 'Backups',
        icon: 'backup',
        isActive: false,
      },
      {
        name: 'Collaborations',
        icon: 'supervisor_account',
        isActive: false,
      },
      {
        name: 'Support Tickets',
        icon: 'support_agent',
        isActive: false,
      },
      {
        name: 'Open New Tickets',
        icon: 'add_circle_outline',
        isActive: false,
      },
    ];
  }

}
