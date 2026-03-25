# Design Document: Smart Agri Support Web Application

## Overview

The Smart Agri Support Web Application is a full-stack web platform built with React.js frontend and Python backend (Flask/FastAPI), leveraging Firebase for authentication, database, and storage. The system provides farmers and rural entrepreneurs with comprehensive agricultural support through seven integrated modules: disease management, horticulture services, poultry guidance, product marketplace, livestock marketplace, expert consultancy, and veterinary directory.

The architecture follows a modern three-tier pattern with clear separation between presentation (React), business logic (Python API), and data persistence (Firebase). Real-time data synchronization is achieved through Firestore listeners, and role-based access control ensures appropriate feature access across user types (Farmer, Seller, Expert, Admin).

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (React.js)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Disease  │  │Horticulture│ │ Poultry  │  │Marketplace│   │
│  │ Module   │  │  Module   │  │  Module  │  │  Modules  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Expert  │  │Veterinary │  │Dashboard │                  │
│  │Consultancy│ │ Directory │  │          │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTPS / REST API
                            │
┌─────────────────────────────────────────────────────────────┐
│              Application Layer (Python Backend)              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Routes (Flask/FastAPI)               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Auth    │  │ Disease  │  │Marketplace│  │  Expert  │  │
│  │ Service  │  │ Service  │  │ Service   │  │ Service  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Image   │  │Validation│  │  Search  │                 │
│  │ Service  │  │ Service  │  │ Service  │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────────────────────────────────────────────┘
                            │
                    Firebase SDK
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer (Firebase)                      │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │    Firestore     │  │  Cloud Storage   │               │
│  │   (Database)     │  │  (Image Storage) │               │
│  └──────────────────┘  └──────────────────┘               │
│  ┌──────────────────┐                                      │
│  │  Authentication  │                                      │
│  └──────────────────┘                                      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack Rationale

- **React.js Frontend**: Component-based architecture enables modular development, reusable UI components, and efficient state management for real-time updates
- **Python Backend (Flask/FastAPI)**: Provides RESTful API layer for business logic, data validation, and Firebase integration. FastAPI offers automatic API documentation and type validation
- **Firebase Firestore**: NoSQL document database provides real-time synchronization, offline support, and scalable data storage without complex infrastructure management
- **Firebase Storage**: Managed object storage for images with automatic CDN distribution and secure access control
- **Firebase Authentication**: Handles user identity, session management, and integrates seamlessly with Firestore security rules

### Deployment Architecture

- **Frontend**: Firebase Hosting or cloud platform (Vercel, Netlify) for static React build with CDN distribution
- **Backend**: Cloud platform (Google Cloud Run, AWS Lambda, Heroku) for Python API with auto-scaling
- **Database & Storage**: Firebase managed services with automatic backups and global distribution

## Components and Interfaces

### Frontend Components

#### 1. Authentication Components

**LoginComponent**
- Renders login form with email/password fields
- Calls Firebase Authentication SDK
- Redirects to dashboard on successful authentication
- Displays error messages for invalid credentials

**RegisterComponent**
- Renders registration form with email, password, role selection
- Validates password strength (minimum 8 characters, mixed case, numbers)
- Creates user profile in Firestore after successful registration
- Assigns default role (Farmer) if not specified

**AuthGuard**
- Higher-order component protecting routes
- Checks authentication status before rendering protected components
- Redirects unauthenticated users to login page
- Validates role-based permissions for restricted features

#### 2. Disease Management Components

**DiseaseSearchComponent**
- Renders search input with autocomplete suggestions
- Queries Firestore diseases collection
- Displays search results as cards with disease names and thumbnails
- Supports filtering by crop type

**DiseaseDetailComponent**
- Displays complete disease information (symptoms, causes, treatments)
- Renders uploaded reference images in gallery format
- Provides image upload functionality for authenticated users
- Includes social sharing buttons

**ImageUploadComponent**
- Reusable component for image uploads across modules
- Validates file type and size before upload
- Shows upload progress indicator
- Compresses images client-side before sending to backend
- Generates preview thumbnails

#### 3. Horticulture Components

**PlantExchangeListComponent**
- Displays grid of plant listings with images, names, prices
- Implements infinite scroll for large datasets
- Provides filter controls (price range, plant type, location)
- Shows "Exchange" or "Sale" badges

**PlantListingFormComponent**
- Multi-step form for creating plant listings
- Fields: plant name, description, price, exchange terms, location
- Image upload with drag-and-drop support
- Form validation with real-time feedback

**TrainingResourcesComponent**
- Displays training schedules in calendar view
- Lists video tutorials with thumbnails and durations
- Categorizes resources by topic (beginner, intermediate, advanced)
- Embeds video player for in-app viewing

#### 4. Poultry Module Components

**PoultryGuidesComponent**
- Tabbed interface for different poultry types (ducks, hens, eggs)
- Renders rich text content with images
- Includes sections for feed management and disease prevention
- Provides downloadable PDF guides

#### 5. Marketplace Components

**ProductListComponent**
- Grid layout displaying product cards
- Each card shows image, name, price, seller rating
- Filter sidebar (category, price range, location)
- Search bar with real-time results

**ProductDetailComponent**
- Full product information display
- Image carousel for multiple product photos
- Seller contact information with "Contact Seller" button
- Related products section

**ListingFormComponent**
- Unified form component for products and livestock
- Dynamic fields based on listing type
- Image upload with multiple file support
- Location picker with map integration
- Price input with currency formatting

**LivestockListComponent**
- Similar to ProductListComponent but with livestock-specific filters
- Displays animal type, age, health status badges
- Location-based sorting

#### 6. Expert Consultancy Components

**QuerySubmissionComponent**
- Form for submitting consultation queries
- Text area for question with character counter
- Category selection (crops, soil, livestock, general)
- Image attachment support
- Displays estimated response time

**QueryListComponent**
- Displays user's submitted queries with status indicators
- Shows pending, answered, and closed queries
- Filters by status and date
- Click to view full query and responses

**ExpertDashboardComponent**
- Available only to Expert role users
- Lists pending queries requiring response
- Provides response editor with rich text formatting
- Tracks response metrics (response time, satisfaction ratings)

#### 7. Veterinary Directory Components

**DoctorListComponent**
- Card-based layout of veterinary doctors
- Displays name, specialization, location, contact
- Search and filter by location and specialization
- Shows availability status

**DoctorDetailComponent**
- Complete doctor profile with qualifications
- Contact information (phone, email, address)
- Consultation booking form (if booking enabled)
- Reviews and ratings section

#### 8. Dashboard Components

**UserDashboardComponent**
- Role-specific dashboard layout
- For Sellers: displays active listings, views, contacts
- For Farmers: shows saved items, recent queries, recommendations
- For Experts: shows pending queries and response statistics
- For Admins: system-wide statistics and content moderation tools

**ListingManagementComponent**
- Table view of user's listings
- Edit and delete actions
- Status indicators (active, pending, sold)
- Analytics (views, contacts, conversion rate)

### Backend Services

#### 1. Authentication Service

```python
class AuthService:
    def verify_token(token: str) -> dict:
        """Verifies Firebase ID token and returns user claims"""
        
    def get_user_role(user_id: str) -> str:
        """Retrieves user role from Firestore user profile"""
        
    def check_permission(user_id: str, required_role: str) -> bool:
        """Validates if user has required role for operation"""
        
    def create_user_profile(user_id: str, email: str, role: str) -> dict:
        """Creates initial user profile in Firestore"""
```

#### 2. Disease Service

```python
class DiseaseService:
    def search_diseases(query: str, crop_type: str = None) -> list:
        """Searches diseases by name or keyword with optional crop filter"""
        
    def get_disease_detail(disease_id: str) -> dict:
        """Retrieves complete disease information"""
        
    def add_disease_image(disease_id: str, image_file: bytes, user_id: str) -> str:
        """Uploads disease reference image and returns URL"""
```

#### 3. Marketplace Service

```python
class MarketplaceService:
    def create_listing(listing_data: dict, user_id: str) -> str:
        """Creates product or livestock listing and returns listing ID"""
        
    def get_listings(listing_type: str, filters: dict, page: int, limit: int) -> dict:
        """Retrieves paginated listings with filters applied"""
        
    def update_listing(listing_id: str, updates: dict, user_id: str) -> bool:
        """Updates listing if user is owner"""
        
    def delete_listing(listing_id: str, user_id: str) -> bool:
        """Soft deletes listing and removes images"""
        
    def get_user_listings(user_id: str) -> list:
        """Retrieves all listings created by user"""
```

#### 4. Image Service

```python
class ImageService:
    def upload_image(image_file: bytes, path: str, metadata: dict) -> str:
        """Uploads image to Firebase Storage and returns public URL"""
        
    def compress_image(image_file: bytes, max_size: int) -> bytes:
        """Compresses image to reduce file size"""
        
    def generate_thumbnail(image_file: bytes, size: tuple) -> bytes:
        """Creates thumbnail version of image"""
        
    def delete_image(image_url: str) -> bool:
        """Removes image from Firebase Storage"""
        
    def validate_image(image_file: bytes) -> tuple:
        """Validates image format and size, returns (is_valid, error_message)"""
```

#### 5. Expert Service

```python
class ExpertService:
    def submit_query(query_data: dict, user_id: str) -> str:
        """Creates consultation query and returns query ID"""
        
    def get_pending_queries(expert_id: str) -> list:
        """Retrieves queries awaiting expert response"""
        
    def submit_response(query_id: str, response_text: str, expert_id: str) -> bool:
        """Adds expert response to query"""
        
    def get_user_queries(user_id: str, status: str = None) -> list:
        """Retrieves user's submitted queries with optional status filter"""
```

#### 6. Search Service

```python
class SearchService:
    def search_all(query: str, categories: list = None) -> dict:
        """Searches across all modules and returns categorized results"""
        
    def apply_filters(collection: str, filters: dict) -> list:
        """Applies filter criteria to Firestore query"""
        
    def build_search_index(document: dict, collection: str) -> None:
        """Creates search index for document (for future Algolia integration)"""
```

#### 7. Validation Service

```python
class ValidationService:
    def validate_listing_data(data: dict, listing_type: str) -> tuple:
        """Validates listing data, returns (is_valid, errors)"""
        
    def validate_price(price: any) -> tuple:
        """Validates price is positive number"""
        
    def validate_contact_info(contact: dict) -> tuple:
        """Validates phone and email formats"""
        
    def sanitize_input(text: str) -> str:
        """Removes potentially harmful content from user input"""
```

### API Endpoints

#### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (handled by Firebase client SDK)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

#### Disease Management Endpoints
- `GET /api/diseases/search?q={query}&crop={type}` - Search diseases
- `GET /api/diseases/{disease_id}` - Get disease details
- `POST /api/diseases/{disease_id}/images` - Upload disease image

#### Horticulture Endpoints
- `GET /api/plants` - List plant exchange listings
- `POST /api/plants` - Create plant listing
- `GET /api/plants/{plant_id}` - Get plant details
- `PUT /api/plants/{plant_id}` - Update plant listing
- `DELETE /api/plants/{plant_id}` - Delete plant listing
- `GET /api/training` - Get training resources
- `GET /api/training/{resource_id}` - Get specific training resource

#### Poultry Endpoints
- `GET /api/poultry/guides` - Get all poultry guides
- `GET /api/poultry/guides/{type}` - Get guides for specific poultry type

#### Marketplace Endpoints
- `GET /api/products` - List products with filters
- `POST /api/products` - Create product listing
- `GET /api/products/{product_id}` - Get product details
- `PUT /api/products/{product_id}` - Update product
- `DELETE /api/products/{product_id}` - Delete product
- `GET /api/livestock` - List livestock with filters
- `POST /api/livestock` - Create livestock listing
- `GET /api/livestock/{livestock_id}` - Get livestock details
- `PUT /api/livestock/{livestock_id}` - Update livestock listing
- `DELETE /api/livestock/{livestock_id}` - Delete livestock listing

#### Expert Consultancy Endpoints
- `POST /api/queries` - Submit consultation query
- `GET /api/queries` - Get user's queries
- `GET /api/queries/pending` - Get pending queries (Expert role)
- `POST /api/queries/{query_id}/response` - Submit expert response
- `GET /api/queries/{query_id}` - Get query details

#### Veterinary Directory Endpoints
- `GET /api/doctors` - List veterinary doctors
- `GET /api/doctors/{doctor_id}` - Get doctor details
- `POST /api/doctors/{doctor_id}/booking` - Request consultation booking

#### Dashboard Endpoints
- `GET /api/dashboard/stats` - Get user dashboard statistics
- `GET /api/dashboard/listings` - Get user's listings

## Data Models

### User Profile
```typescript
interface UserProfile {
  userId: string;              // Firebase Auth UID
  email: string;
  role: 'Farmer' | 'Seller' | 'Expert' | 'Admin';
  displayName: string;
  phoneNumber?: string;
  location?: {
    district: string;
    state: string;
    pincode: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Disease Entry
```typescript
interface DiseaseEntry {
  diseaseId: string;
  name: string;
  cropType: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  preventionMeasures: string[];
  images: string[];            // Array of image URLs
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Plant Listing
```typescript
interface PlantListing {
  listingId: string;
  sellerId: string;
  plantName: string;
  scientificName?: string;
  description: string;
  listingType: 'Sale' | 'Exchange';
  price?: number;              // Required if listingType is 'Sale'
  exchangeTerms?: string;      // Required if listingType is 'Exchange'
  images: string[];
  location: {
    district: string;
    state: string;
  };
  status: 'Active' | 'Sold' | 'Inactive';
  views: number;
  contactRequests: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Training Resource
```typescript
interface TrainingResource {
  resourceId: string;
  title: string;
  description: string;
  type: 'Video' | 'Document' | 'Schedule';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl?: string;
  documentUrl?: string;
  schedule?: {
    date: Timestamp;
    duration: number;          // in minutes
    instructor: string;
    location: string;
  };
  thumbnailUrl?: string;
  createdAt: Timestamp;
}
```

### Poultry Guide
```typescript
interface PoultryGuide {
  guideId: string;
  poultryType: 'Ducks' | 'Hens' | 'Eggs';
  title: string;
  content: string;             // Rich text HTML
  sections: {
    sectionTitle: string;
    sectionContent: string;
    images: string[];
  }[];
  tags: string[];
  pdfUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Product Listing
```typescript
interface ProductListing {
  listingId: string;
  sellerId: string;
  productName: string;
  category: 'Fertilizers' | 'Tools' | 'Ropes' | 'Veterinary Medicines' | 'Other';
  description: string;
  price: number;
  unit: string;                // e.g., 'kg', 'piece', 'liter'
  images: string[];
  sellerContact: {
    phone: string;
    email?: string;
  };
  location: {
    district: string;
    state: string;
  };
  stockStatus: 'In Stock' | 'Out of Stock' | 'Limited';
  status: 'Active' | 'Sold' | 'Inactive';
  views: number;
  contactRequests: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Livestock Listing
```typescript
interface LivestockListing {
  listingId: string;
  sellerId: string;
  animalType: 'Goat' | 'Cow' | 'Rabbit' | 'Duck' | 'Hen' | 'Eggs';
  breed?: string;
  age?: {
    value: number;
    unit: 'days' | 'months' | 'years';
  };
  quantity: number;
  price: number;
  priceUnit: 'per animal' | 'per dozen' | 'total';
  healthStatus: string;
  vaccination: boolean;
  description: string;
  images: string[];
  sellerContact: {
    phone: string;
    email?: string;
  };
  location: {
    district: string;
    state: string;
  };
  status: 'Available' | 'Sold' | 'Reserved' | 'Inactive';
  views: number;
  contactRequests: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Consultation Query
```typescript
interface ConsultationQuery {
  queryId: string;
  userId: string;
  category: 'Crops' | 'Soil' | 'Livestock' | 'General';
  questionText: string;
  images: string[];
  status: 'Pending' | 'Answered' | 'Closed';
  expertId?: string;
  response?: {
    responseText: string;
    respondedAt: Timestamp;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Veterinary Doctor
```typescript
interface VeterinaryDoctor {
  doctorId: string;
  name: string;
  qualifications: string[];
  specialization: string[];
  experience: number;          // years
  contact: {
    phone: string;
    email?: string;
    address: string;
  };
  location: {
    district: string;
    state: string;
  };
  availability: {
    days: string[];
    hours: string;
  };
  consultationFee?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Firestore Collections Structure

```
users/
  {userId}/
    - UserProfile data

diseases/
  {diseaseId}/
    - DiseaseEntry data

plants/
  {listingId}/
    - PlantListing data

training/
  {resourceId}/
    - TrainingResource data

poultry/
  {guideId}/
    - PoultryGuide data

products/
  {listingId}/
    - ProductListing data

livestock/
  {listingId}/
    - LivestockListing data

queries/
  {queryId}/
    - ConsultationQuery data

doctors/
  {doctorId}/
    - VeterinaryDoctor data
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: User Registration Creates Profile

*For any* valid user registration data (email, password, role), when a user registers, the system should create a user profile in Firestore with the specified role, and retrieving the profile should return the same user data.

**Validates: Requirements 1.2**

### Property 2: Authentication Grants Access

*For any* valid user credentials, when a user logs in, the system should establish a session, and subsequent requests with that session should be authenticated.

**Validates: Requirements 1.3, 1.4**

### Property 3: Role-Based Access Control

*For any* user and protected resource, when the user attempts to access the resource, access should be granted if and only if the user's role has the required permissions.

**Validates: Requirements 1.5**

### Property 4: Logout Invalidates Session

*For any* authenticated user session, when the user logs out, subsequent requests using that session should be rejected as unauthenticated.

**Validates: Requirements 1.6**

### Property 5: Disease Search Returns Matches

*For any* search query and disease database, when a user searches for diseases, all returned results should contain the search query in the disease name, crop type, or keywords.

**Validates: Requirements 2.2**

### Property 6: Disease Entry Completeness

*For any* disease entry, when displayed to a user, the rendered output should contain all required fields: symptoms, causes, and treatments.

**Validates: Requirements 2.3**

### Property 7: Image Upload Round Trip

*For any* valid image file (JPEG, PNG, WebP under 5MB), when uploaded to the system, the image should be stored in Image_Storage and retrieving it should return a valid accessible URL.

**Validates: Requirements 2.4, 3.2, 6.3, 7.3, 14.4**

### Property 8: Image Format Validation

*For any* file upload, the system should accept files with JPEG, PNG, or WebP format and reject files with other formats or exceeding 5MB size limit.

**Validates: Requirements 2.5, 14.1**

### Property 9: Listing Creation Round Trip

*For any* valid listing data (plant, product, or livestock), when a user creates a listing, the listing should be stored in Firestore, and retrieving it should return equivalent listing data with the same fields and values.

**Validates: Requirements 3.1, 6.2, 7.1**

### Property 10: Image Count Limits

*For any* listing type, the system should accept up to the maximum allowed images (5 for plants, 3 for products, 4 for livestock) and reject attempts to upload more than the limit.

**Validates: Requirements 3.3**

### Property 11: Active Listings Visibility

*For any* active listing in the system, when a user views the marketplace or exchange, the listing should appear in the results.

**Validates: Requirements 3.4, 6.5, 7.4**

### Property 12: Search and Filter Accuracy

*For any* search query and filter criteria, all returned results should match the search text and satisfy all applied filters (category, price range, location).

**Validates: Requirements 3.5, 6.5, 7.4, 9.3, 11.2, 11.4**

### Property 13: Contact Information Accessibility

*For any* listing (plant, product, livestock) or doctor profile, when a user views the details, the seller's or doctor's contact information should be displayed.

**Validates: Requirements 3.6, 6.7, 7.6, 9.4**

### Property 14: Training Resources Display

*For any* training resource in the system, when a user accesses the training section, the resource should appear in the list organized by its category and difficulty level.

**Validates: Requirements 4.2, 4.5**

### Property 15: Training Resource Content Retrieval

*For any* training resource, when a user selects it, the system should return the complete resource content (video URL, document, or schedule details).

**Validates: Requirements 4.3**

### Property 16: Poultry Guides Organization

*For any* poultry guide, when a user accesses the poultry module, the guide should appear under the correct poultry type category (ducks, hens, or eggs).

**Validates: Requirements 5.2**

### Property 17: Poultry Information Search

*For any* search query in the poultry module, all returned guide sections should contain the search query in their title or content.

**Validates: Requirements 5.4**

### Property 18: Seller Role Listing Permission

*For any* user, the system should allow product listing creation if and only if the user has Seller or Admin role.

**Validates: Requirements 6.1**

### Property 19: Query Submission Round Trip

*For any* valid consultation query, when a user submits it, the query should be stored in Firestore with status "Pending", and retrieving it should return the same query text and attached images.

**Validates: Requirements 8.1**

### Property 20: Query Image Attachment Limit

*For any* consultation query, the system should accept up to 3 attached images and reject attempts to attach more than 3 images.

**Validates: Requirements 8.2**

### Property 21: Expert Query Visibility

*For any* user with Expert role, when accessing pending queries, all queries with status "Pending" should be displayed.

**Validates: Requirements 8.3**

### Property 22: Expert Response Linkage

*For any* consultation query and expert response, when an expert submits a response, the response should be linked to the original query, and retrieving the query should include the response text.

**Validates: Requirements 8.4**

### Property 23: Query Status Display

*For any* user's submitted queries, when the user views their queries, each query should display its current status (Pending, Answered, Closed) and any expert responses.

**Validates: Requirements 8.5**

### Property 24: Doctor Directory Completeness

*For any* registered veterinary doctor, when a user accesses the doctor directory, the doctor should appear in the list with complete contact information.

**Validates: Requirements 9.2, 9.4**

### Property 25: Doctor Appointment Booking

*For any* doctor with booking enabled and any user, when the user requests an appointment, the system should create a booking request linked to the doctor and user.

**Validates: Requirements 9.5**

### Property 26: Dashboard Listing Display

*For any* user with Seller or Admin role, when accessing the dashboard, all of the user's active listings should be displayed organized by type (products, plants, livestock).

**Validates: Requirements 10.1, 10.2**

### Property 27: Listing Update Round Trip

*For any* existing listing and valid update data, when a user edits the listing, the changes should be saved to Firestore, and retrieving the listing should return the updated values.

**Validates: Requirements 10.3**

### Property 28: Listing Deletion Cleanup

*For any* listing, when a user deletes it, the listing status should be marked as "Inactive", and all associated images should be removed from Image_Storage.

**Validates: Requirements 10.4, 14.5**

### Property 29: Listing Statistics Accuracy

*For any* listing, the displayed statistics (views, contact requests) should match the actual count of view and contact events for that listing.

**Validates: Requirements 10.5**

### Property 30: Real-time Listing Updates

*For any* new listing creation, when the listing is created by any user, all active marketplace views should display the new listing within 2 seconds.

**Validates: Requirements 13.2**

### Property 31: Real-time Query Response Updates

*For any* consultation query, when an expert submits a response, the user's query view should update to show the response within 2 seconds.

**Validates: Requirements 13.3**

### Property 32: Real-time Modification Propagation

*For any* listing modification or deletion, all active user sessions viewing that listing should reflect the changes within 2 seconds.

**Validates: Requirements 13.4**

### Property 33: Image Compression

*For any* uploaded image, the stored version should be compressed to reduce file size while maintaining acceptable visual quality.

**Validates: Requirements 14.3**

### Property 34: Thumbnail Generation

*For any* uploaded image, the system should generate a thumbnail version with reduced dimensions for use in list views.

**Validates: Requirements 14.6**

### Property 35: Form Validation Error Messages

*For any* form submission with missing required fields, the system should reject the submission and display specific error messages indicating which fields are required.

**Validates: Requirements 15.1**

### Property 36: Data Format Validation

*For any* form input with invalid data format (e.g., non-numeric price, invalid email), the system should reject the input and display format requirements.

**Validates: Requirements 15.2**

### Property 37: Price Validation

*For any* price input, the system should accept positive numeric values and reject negative numbers, zero, or non-numeric values.

**Validates: Requirements 15.6**

### Property 38: Contact Information Format Validation

*For any* contact information input (phone number, email), the system should validate the format and reject invalid formats (e.g., phone numbers with letters, malformed email addresses).

**Validates: Requirements 15.7**

## Error Handling

### Authentication Errors

**Invalid Credentials**
- When Firebase Authentication rejects credentials, return HTTP 401 with message "Invalid email or password"
- Log failed login attempts for security monitoring
- Implement rate limiting to prevent brute force attacks (max 5 attempts per 15 minutes)

**Expired Session**
- When a session token expires, return HTTP 401 with message "Session expired, please log in again"
- Clear client-side authentication state
- Redirect to login page

**Insufficient Permissions**
- When a user attempts unauthorized action, return HTTP 403 with message "You do not have permission to perform this action"
- Log permission violations for security audit

### Data Validation Errors

**Missing Required Fields**
- Return HTTP 400 with JSON object mapping field names to error messages
- Example: `{"productName": "Product name is required", "price": "Price is required"}`

**Invalid Data Format**
- Return HTTP 400 with specific format requirements
- Example: `{"price": "Price must be a positive number", "email": "Invalid email format"}`

**Data Constraints Violation**
- Return HTTP 400 with constraint explanation
- Example: `{"images": "Maximum 5 images allowed per plant listing"}`

### Image Upload Errors

**Invalid File Format**
- Return HTTP 400 with message "Only JPEG, PNG, and WebP formats are supported"
- Include list of accepted formats in response

**File Size Exceeded**
- Return HTTP 413 with message "Image size exceeds 5MB limit"
- Include maximum allowed size in response

**Upload Failure**
- If Firebase Storage upload fails, return HTTP 500 with message "Image upload failed, please try again"
- Preserve user's form data to allow retry without re-entering information
- Log error details for debugging

**Compression Failure**
- If image compression fails, attempt upload without compression
- Log warning for investigation
- If upload still fails, return HTTP 500 with retry option

### Database Errors

**Firestore Write Failure**
- Return HTTP 500 with message "Failed to save data, please try again"
- Implement retry logic with exponential backoff (3 attempts)
- Log error with full context for debugging

**Firestore Read Failure**
- Return HTTP 500 with message "Failed to retrieve data, please try again"
- Implement caching to serve stale data if available
- Log error for investigation

**Document Not Found**
- Return HTTP 404 with message "Requested resource not found"
- Suggest alternative actions (e.g., "Browse all listings")

**Concurrent Modification**
- Use Firestore transactions for updates to prevent race conditions
- If transaction fails due to conflict, retry up to 3 times
- Return HTTP 409 with message "Resource was modified by another user, please refresh and try again"

### Network Errors

**Connection Timeout**
- Set request timeout to 30 seconds
- Return HTTP 504 with message "Request timed out, please check your connection and try again"
- Preserve user input for retry

**Network Unavailable**
- Detect offline status on client
- Display message "You are offline. Changes will be saved when connection is restored"
- Queue operations for execution when online
- Use Firestore offline persistence for data access

### Search and Filter Errors

**No Results Found**
- Return HTTP 200 with empty results array
- Include message "No results found for your search"
- Suggest alternative search terms or show popular items

**Invalid Filter Parameters**
- Return HTTP 400 with message "Invalid filter parameters"
- Specify which parameters are invalid and expected format

### Real-time Synchronization Errors

**Listener Connection Failure**
- Attempt to reconnect Firestore listener automatically
- Display warning "Real-time updates temporarily unavailable"
- Fall back to polling every 30 seconds
- Log connection failures for monitoring

**Listener Error**
- If listener encounters error, close and recreate listener
- Log error details for debugging
- Notify user if real-time updates are unavailable

### Rate Limiting

**Too Many Requests**
- Implement rate limiting: 100 requests per minute per user
- Return HTTP 429 with message "Too many requests, please try again in X seconds"
- Include Retry-After header with wait time

### Error Logging

All errors should be logged with:
- Timestamp
- User ID (if authenticated)
- Request details (endpoint, method, parameters)
- Error type and message
- Stack trace (for server errors)
- Client information (browser, device type)

Critical errors (authentication failures, database errors, permission violations) should trigger alerts for immediate investigation.

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, error conditions, and integration points between components. Unit tests provide concrete examples of correct behavior and catch specific bugs.

**Property Tests**: Verify universal properties across all inputs through randomized testing. Property tests ensure general correctness by testing properties that should hold for any valid input.

Together, these approaches provide comprehensive coverage: unit tests catch concrete bugs and validate specific scenarios, while property tests verify general correctness across the input space.

### Property-Based Testing Configuration

**Testing Library**: Use **Hypothesis** for Python backend testing (property-based testing library with excellent support for generating complex data structures)

**Test Configuration**:
- Minimum 100 iterations per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: `# Feature: smart-agri-support, Property {number}: {property_text}`

**Example Property Test Structure**:
```python
from hypothesis import given, strategies as st
import pytest

# Feature: smart-agri-support, Property 9: Listing Creation Round Trip
@given(
    plant_name=st.text(min_size=1, max_size=100),
    description=st.text(min_size=10, max_size=500),
    price=st.floats(min_value=0.01, max_value=100000)
)
def test_plant_listing_round_trip(plant_name, description, price):
    """For any valid listing data, creating and retrieving should return equivalent data"""
    # Create listing
    listing_data = {
        "plantName": plant_name,
        "description": description,
        "price": price,
        "listingType": "Sale"
    }
    listing_id = marketplace_service.create_listing(listing_data, user_id="test_user")
    
    # Retrieve listing
    retrieved = marketplace_service.get_listing(listing_id)
    
    # Verify equivalence
    assert retrieved["plantName"] == plant_name
    assert retrieved["description"] == description
    assert retrieved["price"] == price
```

### Unit Testing Strategy

**Frontend Unit Tests (Jest + React Testing Library)**:
- Component rendering tests
- User interaction tests (clicks, form submissions)
- State management tests
- API integration tests (mocked)
- Accessibility tests

**Backend Unit Tests (pytest)**:
- Service method tests with specific inputs
- API endpoint tests with various request scenarios
- Error handling tests
- Authentication and authorization tests
- Data validation tests

**Integration Tests**:
- End-to-end user flows (registration → login → create listing → view listing)
- Firebase integration tests (using Firebase emulator)
- Image upload and retrieval flows
- Real-time synchronization tests

### Test Coverage Goals

- **Backend**: Minimum 85% code coverage
- **Frontend**: Minimum 80% code coverage
- **Critical paths**: 100% coverage (authentication, payment, data persistence)

### Testing Environments

**Local Development**:
- Firebase Emulator Suite for Firestore, Authentication, and Storage
- Mock external services
- Fast test execution for rapid feedback

**CI/CD Pipeline**:
- Automated test execution on every commit
- Parallel test execution for speed
- Test results reported in pull requests
- Block merges if tests fail

**Staging Environment**:
- Real Firebase project (separate from production)
- End-to-end tests with real services
- Performance testing
- Security testing

### Test Data Management

**Property Test Data Generation**:
- Use Hypothesis strategies to generate valid and invalid inputs
- Generate edge cases automatically (empty strings, maximum values, special characters)
- Ensure generated data respects business constraints

**Unit Test Data**:
- Maintain fixture files for common test scenarios
- Use factory functions for creating test objects
- Seed database with consistent test data for integration tests

### Continuous Testing

- Run unit tests on every file save (watch mode)
- Run full test suite before commits (pre-commit hook)
- Run integration tests in CI/CD pipeline
- Run property tests with extended iterations (1000+) nightly
- Monitor test execution time and optimize slow tests

### Test Documentation

Each test should include:
- Clear description of what is being tested
- Reference to requirement or property being validated
- Expected behavior
- Any setup or teardown requirements

Property tests must include:
- Comment with feature name and property number
- Description of the universal property being tested
- Explanation of the generated input space
