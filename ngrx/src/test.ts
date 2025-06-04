import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// 👇 THIS IS THE IMPORTANT PART
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { 
    teardown: { destroyAfterEach: true },
    // ngZone: 'noop' // 👈 Zoneless test environment!
  }
);
