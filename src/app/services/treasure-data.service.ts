import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Observable, forkJoin, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

export interface BusinessStop {
  name: string;
  type: string;
  task: string;
  perk: string;
  imageUrl: string;
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
      title: 'Check in at the Every Nation Church : 10H00',
      description:
        'Arrive at Every Nation Church at 20A 7th  Avenue, Parktown North, our host venue. We have music, photo booths, food & drinks on sale a little market running showcasing local businesses and NGO\'s.  Teams sign in and get their maps then meet and mingle with our neighbors'
    },
    {
      title: 'Complete local challenges : 11:00',
      description:
        'Visit community businesses, finish fun tasks, and collect stamps to complete passport.'
    },
    {
      title: 'Return for the prize draw : 13:00',
      description:
        'Teams hand their completed maps in at Every Nation Church. We have music, photo booths, food & drinks on sale a little market running.  Meet and mingle with our neighbors'
    },
    {
      title: 'Enjoy the afternoon celebration : 14:00',
      description:
        'Music set by the fabulous local resident Steve Umculo!!! Award winning South African singer & songwriter known for his genre blending music of Afro centric grooves & folk harmonies'
    }
  ],
  businessStops: [
    {
      name: 'Riverbend Roasters',
      type: 'Coffee & Snacks',
      task: 'Match the secret blend to its aroma.',
      perk: 'Free cold brew mini cup.',
      imageUrl: 'assets/business-stops/3.png'
    },
    {
      name: 'Greenway Bikes',
      type: 'Outdoor Shop',
      task: 'Time a 30-second gear swap challenge.',
      perk: 'Helmet rental voucher.',
      imageUrl: 'assets/business-stops/4.png'
    },
    {
      name: 'Sunrise Deli',
      type: 'Neighborhood Deli',
      task: 'Build a dream picnic on the clue board.',
      perk: 'Pickle pin + snack box discount.',
      imageUrl: 'assets/business-stops/5.png'  
    },
    {
      name: 'Studio Bloom',
      type: 'Art & Crafts',
      task: 'Sketch the landmark in under 60 seconds.',
      perk: 'Class pass raffle ticket.',
      imageUrl: 'assets/business-stops/6.png'
    }
  ],
  ticketTiers: [
    {
      name: 'Explorer Pass',
      price: 'R 65',
      details: ['Map + clue kit', 'Team entry (up to 4)', 'Prize draw entry']
    },
    {
      name: 'Team Pass',
      price: 'R 300',
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
