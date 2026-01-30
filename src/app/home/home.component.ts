import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  title = 'Neighborhood Treasure Hunt';

  huntSteps = fallbackHomeContent.huntSteps;
  businessStops = fallbackHomeContent.businessStops;
  ticketTiers = fallbackHomeContent.ticketTiers;
  faqItems = fallbackHomeContent.faqItems;

  constructor(private dataService: TreasureDataService) {}

  async ngOnInit(): Promise<void> {
    const content = await this.dataService.getHomeContent();
    this.huntSteps = content.huntSteps;
    this.businessStops = content.businessStops;
    this.ticketTiers = content.ticketTiers;
    this.faqItems = content.faqItems;
  }
}
