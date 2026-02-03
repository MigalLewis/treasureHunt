import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type ParticipationOption = {
  id: string;
  label: string;
  price?: string;
  quicketUrl: string;
};

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss'
})
export class CompanyRegistrationComponent {
  selectedOptionId = '';

  readonly participationOptions: ParticipationOption[] = [
    {
      id: 'enr-table',
      label:
        'Local Business Participation Ticket - Business included in the race activities at ENR (event starting & ending point). Table top exhibition',
      quicketUrl: 'https://www.quicket.co.za/events/treasure-hunt-enr-table'
    },
    {
      id: 'donation',
      label: "Donation towards fundraising for participating NGO's",
      quicketUrl: 'https://www.quicket.co.za/events/treasure-hunt-donation'
    },
    {
      id: 'gift-bag',
      label:
        'Local Business Gift Bag insert only participation - advertise your business in goodie bag given to each participant but no race activity participation',
      price: 'R 550 + R38.49 booking fee',
      quicketUrl: 'https://www.quicket.co.za/events/treasure-hunt-gift-bag'
    },
    {
      id: 'on-site',
      label:
        'Local Business Participation Ticket - Business included in the race activities at their business premises',
      price: 'R 750 + R49.76 booking fee',
      quicketUrl: 'https://www.quicket.co.za/events/treasure-hunt-on-site'
    }
  ];

  get selectedOption() {
    return this.participationOptions.find((option) => option.id === this.selectedOptionId);
  }
}
