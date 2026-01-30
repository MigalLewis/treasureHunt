import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface BusinessStop {
  name: string;
  type: string;
  location: string;
  task: string;
  perk: string;
}

interface HuntStep {
  title: string;
  description: string;
}

interface TicketTier {
  name: string;
  price: string;
  details: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
