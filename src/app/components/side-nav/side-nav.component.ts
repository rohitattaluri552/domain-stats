import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor() { }
  userInfo: any = {};
  menuItems: Object [] = [];

  ngOnInit() {
    this.userInfo = {
      profilePicture: 'assets/images/author-avatar.jpg',
      email: 'rohit@gmail.com',
      name: 'Rohit Attaluri',
    };
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
