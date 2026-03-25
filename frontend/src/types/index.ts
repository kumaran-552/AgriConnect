// User and Authentication Types
export type UserRole = 'Farmer' | 'Seller' | 'Expert' | 'Admin';

export interface UserProfile {
  userId: string;
  email: string;
  role: UserRole;
  displayName: string;
  phoneNumber?: string;
  location?: {
    district: string;
    state: string;
    pincode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Common Types
export interface Location {
  district: string;
  state: string;
}

export interface ContactInfo {
  phone: string;
  email?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
