import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { QrEntryComponent } from './qr-entry/qr-entry.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'qr-entry',
    component: QrEntryComponent
  },
  {
    path: 'qr-entry/:code',
    component: QrEntryComponent
  },
  {
    path: 'company-registration',
    component: CompanyRegistrationComponent
  }
];
