/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  capacity: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  sizeSqFt: number;
  bedType: string;
  features: string[];
}

export interface BookingConfig {
  directBookingTitle: string;
  directBookingMessage: string;
  directBookingPhone: string;
  directBookingNote: string;
  whatsappNumber: string;
  whatsappMessageIntro: string;
  airbnbUrl: string;
  calendarUrl: string;
  reserveButtonLabel: string;
  reserveNote: string;
  unavailableError: string;
  unavailableLabel: string;
  selectDatePlaceholder: string;
  calendarLegendSelected: string;
  calendarLegendInRange: string;
  calendarLegendUnavailable: string;
  minNights: number;
  taxRate: number;
  cleanFee: number;
  currencySymbol: string;
}

export interface BookedRange {
  start: string; // ISO yyyy-mm-dd
  end: string; // ISO yyyy-mm-dd
}

export interface BookingInquiry {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalNights: number;
  totalPrice: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1 to 5
  date: string;
  text: string;
  stayedIn: string; // Room Name
  hostReply?: string; // Greeda's response
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  category: 'nature' | 'dining' | 'utilities';
  icon: string; // lucide icon name
  image: string;
  highlights: string[];
}

export interface FloraFaunaItem {
  id: string;
  localName: string;
  scientificName: string;
  description?: string;
  category: 'flora' | 'fauna';
  image: string;
}

export interface ContentImage {
  src: string;
  alt: string;
  caption?: string;
  captionSub?: string;
  overlayLabel?: string;
}

export interface NavMenuItem {
  label: string;
  href: string;
}

export interface TrustMetric {
  value: string;
  label: string;
  icon: string;
}

export interface SectionHighlight {
  title: string;
  text: string;
}

export interface CategoryTab {
  label: string;
  value: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    establishedLabel: string;
    seasonalNotices: { [month: string]: string }; // keyed "01"-"12"
    seasonal: {
      enabled: boolean;
      title: string;
      description: string;
      image: ContentImage;
    };
    locationShort: string;
    heritageBadge: string;
  };
  nav: {
    menuItems: NavMenuItem[];
    bookButtonLabel: string;
    mobileDrawerTitle: string;
    mobileFooterNote: string;
  };
  hero: {
    badge: string;
    headingLines: string[];
    paragraph: string;
    primaryCta: string;
    secondaryCta: string;
    trustMetrics: TrustMetric[];
    mainImage: ContentImage;
    polaroidImage: ContentImage;
    medalLabel: string;
  };
  sanctuary: {
    eyebrow: string;
    headingLines: string[];
    paragraphs: string[];
    images: ContentImage[];
    highlights: SectionHighlight[];
  };
  rooms: {
    eyebrow: string;
    heading: string;
    description: string;
    highlightsLabel: string;
    selectButtonLabel: string;
    selectedButtonLabel: string;
    activeSelectionLabel: string;
    minNightsSuffix: string;
    sleepsLabel: string;
    areaLabel: string;
    bedsLabel: string;
    guestsSuffix: string;
    areaSuffix: string;
  };
  amenitiesSection: {
    eyebrow: string;
    heading: string;
    description: string;
    categories: CategoryTab[];
    spotlightEyebrow: string;
    highlightsLabel: string;
  };
  floraFaunaSection: {
    eyebrow: string;
    heading: string;
    description: string;
    scientificNameLabel: string;
  };
  bookingSection: Record<string, string>;
  reviewsSection: Record<string, string>;
  locationSection: Record<string, string>;
  faqSection: {
    eyebrow: string;
    heading: string;
    description: string;
    categoryLabel: string;
  };
  footer: {
    tagline: string;
    roomsHeading: string;
    contactHeading: string;
    address: string;
    phone: string;
    email: string;
    copyrightSuffix: string;
    legalLinks: string[];
    madeWithNote: string;
  };
}
