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
      title: 'Arrive and check in : 10:00',
      description:
        'Arrive at Every Nation Rosebank, 20A 7th Avenue, Parktown North. Enjoy music, photo booths, food, drinks, and community stalls while learning about local NGOs.'
    },
    {
      title: 'Enjoy carnival games & activities : 11:00',
      description:
        'Take part in fun rides, inflatables, and game stations with prizes for all ages.'
    },
    {
      title: 'Fundraising spotlight : 13:00',
      description:
        'Join the NGO spotlight moment, hear impact stories, and take part in prize announcements.'
    },
    {
      title: 'Community celebration : 14:00',
      description:
        'Wrap up the day together with live entertainment and a celebration of what the community raised.'
    }
  ],
  businessStops: [
    {
      name: 'Inflatable Adventure Zone',
      type: 'Kids & Family',
      task: 'Bounce, climb, and slide through supervised inflatable obstacle fun.',
      perk: 'Prize tokens for completed rounds.',
      imageUrl: 'assets/business-stops/3.png'
    },
    {
      name: 'Classic Carnival Games',
      type: 'Games Arena',
      task: 'Play ring toss, bean bag throws, and target games to win prizes.',
      perk: 'Win vouchers redeemable at food and activity stalls.',
      imageUrl: 'assets/business-stops/4.png'
    },
    {
      name: 'Treats & Snack Corner',
      type: 'Food Stalls',
      task: 'Enjoy sweets, refreshments, and family-friendly snack options.',
      perk: 'Festival treat specials available all day.',
      imageUrl: 'assets/business-stops/5.png'  
    },
    {
      name: 'Community NGO Market',
      type: 'Community Impact',
      task: 'Meet local NGOs, discover their work, and support their campaigns.',
      perk: 'Donation opportunities and volunteer sign-up stations.',
      imageUrl: 'assets/business-stops/6.png'
    }
  ],
  ticketTiers: [
    {
      name: 'Carnival Entry',
      price: 'R 100',
      details: ['Includes R50 carnival vouchers', 'Secure parking included', 'Access to games and community stalls']
    },
    {
      name: 'Family Pack',
      price: 'R 380',
      details: [
        'Entry for 4 people',
        'R200 total carnival vouchers',
        'Secure parking included'
      ]
    },
    {
      name: 'Sponsor Package',
      price: 'Contact us',
      details: [
        'Support NGO fundraising goals',
        'Brand visibility at the event'
      ]
    }
  ],
  faqItems: [
    {
      question: 'What time does the event run?',
      answer: 'The carnival runs from 10:00 to 14:00 on Saturday, July 18.'
    },
    {
      question: 'Where is the carnival happening?',
      answer:
        'At Every Nation Rosebank, 20A 7th Ave, Parktown North.'
    },
    {
      question: 'Is the event family friendly?',
      answer:
        'Yes! Activities are suitable for children, teens, and adults.'
    },
    {
      question: 'How do donations help NGOs?',
      answer:
        'Ticket purchases and additional donations go toward local NGO programs supported by the event.'
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
