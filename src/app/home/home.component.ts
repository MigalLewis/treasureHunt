import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import {
  TreasureDataService,
  fallbackHomeContent
} from '../services/treasure-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Community Carnival';

  readonly homeContent: Signal<typeof fallbackHomeContent>;

  constructor(private dataService: TreasureDataService) {
    this.homeContent = toSignal(this.dataService.getHomeContent$(), {
      initialValue: fallbackHomeContent
    });
  }

  get huntSteps() {
    return this.homeContent().huntSteps;
  }

  get businessStops() {
    return this.homeContent().businessStops;
  }

  get ticketTiers() {
    return this.homeContent().ticketTiers;
  }

  get faqItems() {
    return this.homeContent().faqItems;
  }
}
