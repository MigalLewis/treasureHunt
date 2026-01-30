import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';

export interface BusinessStop {
  name: string;
  type: string;
  location: string;
  task: string;
  perk: string;
}

export interface HuntStep {
  title: string;
  description: string;
}

export interface TicketTier {
  name: string;
  price: string;
  details: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HomeContent {
  huntSteps: HuntStep[];
  businessStops: BusinessStop[];
  ticketTiers: TicketTier[];
  faqItems: FaqItem[];
}

export const fallbackHomeContent: HomeContent = {
  huntSteps: [
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
  ],
  businessStops: [
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
  ],
  ticketTiers: [
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
  ],
  faqItems: [
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
      question: 'How does the QR bonus draw work?',
      answer:
        'Scan the QR code at a clue stop to open the entry form. Each scan includes a unique code for that day.'
    }
  ]
};

@Injectable({ providedIn: 'root' })
export class TreasureDataService {
  private db = getFirestore(this.firebaseService.app);

  constructor(private firebaseService: FirebaseService) {}

  async getHomeContent(): Promise<HomeContent> {
    const [huntSteps, businessStops, ticketTiers, faqItems] = await Promise.all([
      this.loadCollection<HuntStep>('huntSteps'),
      this.loadCollection<BusinessStop>('businessStops'),
      this.loadCollection<TicketTier>('ticketTiers'),
      this.loadCollection<FaqItem>('faqItems')
    ]);

    return {
      huntSteps: huntSteps.length ? huntSteps : fallbackHomeContent.huntSteps,
      businessStops: businessStops.length ? businessStops : fallbackHomeContent.businessStops,
      ticketTiers: ticketTiers.length ? ticketTiers : fallbackHomeContent.ticketTiers,
      faqItems: faqItems.length ? faqItems : fallbackHomeContent.faqItems
    };
  }

  private async loadCollection<T>(path: string): Promise<T[]> {
    try {
      const snapshot = await getDocs(collection(this.db, path));
      return snapshot.docs.map((doc) => doc.data() as T);
    } catch (error) {
      console.error(`Failed to load ${path} from Firestore`, error);
      return [];
    }
  }
}
