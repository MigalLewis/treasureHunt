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
export class AppComponent {
  title = 'Neighborhood Treasure Hunt';

  huntSteps: HuntStep[] = [
    {
      title: 'Check in at the town square',
      description:
        'Teams receive a unique map and starter clue packet to kick off the adventure.'
    },
    {
      title: 'Complete local challenges',
      description:
        'Visit community businesses, finish fun tasks, and collect stamps to unlock the final clue.'
    },
    {
      title: 'Return for the prize draw',
      description:
        'Finish by the cutoff time to enter the charity prize draw and celebrate together.'
    }
  ];

  businessStops: BusinessStop[] = [
    {
      name: 'Riverbend Roasters',
      type: 'Coffee & Snacks',
      location: 'Market Street',
      task: 'Match the secret blend to its aroma.',
      perk: 'Free cold brew mini cup.'
    },
    {
      name: 'Greenway Bikes',
      type: 'Outdoor Shop',
      location: 'Harbor Ave',
      task: 'Time a 30-second gear swap challenge.',
      perk: 'Helmet rental voucher.'
    },
    {
      name: 'Sunrise Deli',
      type: 'Neighborhood Deli',
      location: 'Oak Lane',
      task: 'Build a dream picnic on the clue board.',
      perk: 'Pickle pin + snack box discount.'
    },
    {
      name: 'Studio Bloom',
      type: 'Art & Crafts',
      location: 'Pine Row',
      task: 'Sketch the landmark in under 60 seconds.',
      perk: 'Class pass raffle ticket.'
    }
  ];

  ticketTiers: TicketTier[] = [
    {
      name: 'Explorer Pass',
      price: '$18',
      details: ['Map + clue kit', 'Team entry (up to 4)', 'Prize draw entry']
    },
    {
      name: 'Community Pass',
      price: '$30',
      details: [
        'All Explorer perks',
        'Bonus charity badge',
        'Priority check-in lane'
      ]
    },
    {
      name: 'Sponsor Pass',
      price: '$60',
      details: [
        'Team entry (up to 6)',
        'Logo on the live map',
        'Shout-out at closing ceremony'
      ]
    }
  ];

  faqItems: FaqItem[] = [
    {
      question: 'How many people can be on a team?',
      answer: 'Teams can include 2-6 people. Families and friend groups are welcome.'
    },
    {
      question: 'What happens if we finish after the cutoff time?',
      answer:
        'You can still join the celebration, but only on-time teams are entered into the prize draw.'
    },
    {
      question: 'Are the tasks kid-friendly?',
      answer:
        'Yes! Each stop is designed for all ages with plenty of help from volunteers and business hosts.'
    },
    {
      question: 'How does the website treasure hunt work?',
      answer:
        'Clues will appear on the site each week. Collect all four keyword badges to unlock a surprise.'
    }
  ];
}
