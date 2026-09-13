/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Room, AmenityItem, Review, FloraFaunaItem, SiteContent, BookingConfig } from './types';
import roomsJson from './content/rooms.json';
import amenitiesJson from './content/amenities.json';
import floraFaunaJson from './content/floraFauna.json';
import reviewsJson from './content/reviews.json';
import faqsJson from './content/faqs.json';
import siteJson from './content/site.json';
import bookingJson from './content/booking.json';
import galleryJson from './content/gallery.json';

export const ROOMS: Room[] = (roomsJson as { rooms: Room[] }).rooms;
export const AMENITIES: AmenityItem[] = (amenitiesJson as { items: AmenityItem[] }).items;
export const FLORA_FAUNA: FloraFaunaItem[] = (floraFaunaJson as { items: FloraFaunaItem[] }).items;
export const INITIAL_REVIEWS: Review[] = (reviewsJson as { reviews: Review[] }).reviews;
export const FAQS = (faqsJson as { items: { category: string; question: string; answer: string }[] }).items;
export const SITE = siteJson as unknown as SiteContent;
export const BOOKING: BookingConfig = bookingJson as BookingConfig;
export const GALLERY = galleryJson as { title: string; description: string; featuredPhotoIds: string[]; photos: { id: string; src: string; alt: string; caption?: string }[] };
