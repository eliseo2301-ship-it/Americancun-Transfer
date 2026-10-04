export type ServiceType = 'AIRPORT_HOTEL' | 'HOTEL_HOTEL' | 'TOUR';

export type VehicleCategory = 'PER_PERSON' | 'GROUP_VAN' | 'VIP_SUBURBAN';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'DISPATCHED' | 'COMPLETED' | 'CANCELLED';

export type PaymentMethod = 'BANK_TRANSFER' | 'CASH';

export type PaymentStatus = 'PENDING' | 'VERIFIED' | 'PAID';

export interface CustomerData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  language?: string;
}

export interface BookingRequest {
  serviceType: ServiceType;
  origin: string;
  destination: string;
  dateTime: string;
  returnDateTime?: string;
  isRoundTrip: boolean;
  passengers: number;
  category: VehicleCategory;
  paymentMethod: PaymentMethod;
  currency?: 'USD' | 'MXN';
  flightNumber?: string;
  terminal?: string;
  hotelName?: string;
  notes?: string;
  customer: CustomerData;
}

export interface BookingResponse {
  id: string;
  bookingCode: string;
  serviceType: ServiceType;
  origin: string;
  destination: string;
  dateTime: string;
  returnDateTime?: string;
  isRoundTrip: boolean;
  passengers: number;
  category: VehicleCategory;
  categoryLabel: string;
  status: BookingStatus;
  totalAmount: number;
  currency: 'USD' | 'MXN';
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  speiDetails?: {
    bankName: string;
    beneficiary: string;
    clabe: string;
    concept: string;
    amount: number;
    currency: string;
  };
  flightNumber?: string;
  terminal?: string;
  hotelName?: string;
  notes?: string;
  assignedVehicle?: string;
  driverName?: string;
  driverPhone?: string;
  alarmScheduledTime: string; // 60 mins before pickup
  customer: CustomerData;
  createdAt: string;
}

export interface DestinationItem {
  id: string;
  slug: string;
  name: string;
  region: 'quintana_roo' | 'yucatan' | 'parques';
  regionLabel: string;
  tagline: string;
  description: string;
  estimatedDuration: string;
  distanceKm: number;
  pricePerPersonUsd: number;
  priceGroupVanUsd: number;
  priceVipUsd: number;
  popular: boolean;
  imageUrl: string;
  features: string[];
}

export interface QuoteCalculation {
  serviceType: ServiceType;
  origin: string;
  destination: string;
  isRoundTrip: boolean;
  passengers: number;
  category: VehicleCategory;
  currency: 'USD' | 'MXN';
  unitPrice: number;
  subtotal: number;
  roundTripDiscount: number;
  bestPriceGuaranteeSavings: number;
  total: number;
  estimatedMinutes: number;
  includedAmenities: string[];
}
