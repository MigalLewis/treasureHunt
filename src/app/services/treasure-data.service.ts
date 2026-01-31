import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Observable, forkJoin, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
      title: 'Check in at the Every Nation Church',
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
      price: 'R 18',
      details: ['Map + clue kit', 'Team entry (up to 4)', 'Prize draw entry']
    },
    {
      name: 'Community Pass',
      price: 'R 30',
      details: [
        'All Explorer perks',
        'Bonus charity badge',
        'Priority check-in lane'
      ]
    },
    {
      name: 'Sponsor Pass',
      price: 'Ask For details',
      details: [
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
  private db;

  constructor(private firebaseService: FirebaseService) {
    this.db = getFirestore(this.firebaseService.app);
  }

  getHomeContent$(): Observable<HomeContent> {
    return forkJoin({
      huntSteps: this.loadCollection$<HuntStep>('huntSteps'),
      businessStops: this.loadCollection$<BusinessStop>('businessStops'),
      ticketTiers: this.loadCollection$<TicketTier>('ticketTiers'),
      faqItems: this.loadCollection$<FaqItem>('faqItems')
    }).pipe(
      map((content) => ({
        huntSteps: content.huntSteps.length
          ? content.huntSteps
          : fallbackHomeContent.huntSteps,
        businessStops: content.businessStops.length
          ? content.businessStops
          : fallbackHomeContent.businessStops,
        ticketTiers: content.ticketTiers.length
          ? content.ticketTiers
          : fallbackHomeContent.ticketTiers,
        faqItems: content.faqItems.length ? content.faqItems : fallbackHomeContent.faqItems
      }))
    );
  }

  private loadCollection$<T>(path: string): Observable<T[]> {
    return from(getDocs(collection(this.db, path))).pipe(
      map((snapshot) => snapshot.docs.map((doc) => doc.data() as T)),
      catchError((error) => {
        console.error(`Failed to load ${path} from Firestore`, error);
        return of([]);
      })
    );
  }
}
