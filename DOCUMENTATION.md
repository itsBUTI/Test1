# BMW AutoSallon - Luxury Dealership Website

## 🎯 Project Overview

A fully responsive, modern premium car dealership website built with React, Vite, React Router, Tailwind CSS, and Framer Motion. Features advanced vehicle filtering, test drive booking, financing calculator, and a complete admin dashboard.

**Status**: ✅ Development Complete  
**Server**: Running on `http://localhost:5174`

---

## 📋 Features Implemented

### 1. **Homepage** ✅
- Full-width hero section with CTA buttons
- Featured cars carousel (automatic rotation)
- "Why Choose Us" section with 4 benefit cards
- Financing banner
- Customer testimonials slider
- Contact form with message functionality
- Responsive design for all screen sizes

### 2. **Inventory Page** ✅
- **Advanced Filtering System**:
  - Price range slider
  - Model selection dropdown
  - Body type filter (Sedan, SUV, Coupe, Wagon)
  - Fuel type filter (Petrol, Diesel, Hybrid, Electric)
  - Transmission filter (Auto/Manual)
  - Year range selector
  - Color selection
  - Mileage range
  - Real-time search by model, year, keywords
- Car grid with image, specs, and pricing
- Quick view and details buttons
- Filter reset functionality
- Results counter

### 3. **Vehicle Details Page** ✅
- Image gallery with thumbnail navigation
- Image zoom functionality
- Multiple image carousel
- **Tabbed Content**:
  - Description & condition
  - Features list
  - Technical specifications
  - Financing information
- Info panel with:
  - Bold price display
  - Key vehicle info
  - Monthly payment estimate
  - Call dealer button
  - Book test drive button
  - Save vehicle button
  - Certification badges
- **Lead Capture Form**:
  - Name, email, phone, message
  - Automatic inquiry logging

### 4. **Test Drive Booking** ✅
- Vehicle selection (pre-filled if coming from vehicle page)
- Personal information collection
- Date and time picker
- Confirmation messaging
- Booking stored in system

### 5. **Financing Page** ✅
- Monthly Payment Calculator
- Real-time calculation with:
  - Car price slider
  - Down payment input
  - Interest rate adjustment
  - Loan term selection (24-84 months)
- Quick preset buttons for common prices
- Total interest and payment display
- Financing application form
- Monthly income collection for pre-approval

### 6. **Admin Panel** ✅
- **Secure Login** (Demo: admin / admin123)
- **Vehicle Management**:
  - Add new vehicles
  - Edit existing vehicles
  - Delete vehicles
  - Mark as featured
  - Mark as sold
  - Multi-field form with validation
  - Image URL input
  - Features list (line-separated)
- **Test Drive Bookings View**:
  - Complete booking information
  - Customer contact details
  - Appointment scheduling
- **Inquiries/Leads View**:
  - All customer inquiries
  - Financing applications
  - Message logs
  - Contact information
  - Inquiry type badges

### 7. **Mobile Optimization** ✅
- Sticky call button (floating action)
- Sticky WhatsApp button (floating action)
- Responsive navigation with mobile menu
- Touch-friendly interface
- Mobile-first design approach
- Optimized form inputs for mobile

### 8. **SEO & Meta Tags** ✅
- React Helmet for page-level SEO
- Meta descriptions on all pages
- Dynamic title tags
- Structured data ready
- OG tags support (can be added)

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Home.jsx               # Homepage with hero and features
│   ├── Inventory.jsx          # Car listing with advanced filtering
│   ├── VehicleDetails.jsx     # Single vehicle details page
│   ├── TestDriveBooking.jsx   # Test drive booking form
│   ├── Financing.jsx          # Financing calculator & application
│   └── admin/
│       └── AdminPanel.jsx     # Admin dashboard (login, CRUD)
├── components/
│   ├── common/
│   │   └── Layout.jsx         # Header, Footer, StickyButtons
│   ├── FeaturedCarsCarousel.jsx
│   ├── TestimonialsSlider.jsx
│   └── admin/
│       ├── AdminVehicleForm.jsx
│       ├── AdminBookingsList.jsx
│       └── AdminInquiriesList.jsx
├── context/
│   └── AppContext.jsx         # Global state management
├── data/
│   └── mockData.js            # Sample vehicle & testimonial data
├── App.jsx                    # Main router setup
├── index.css                  # Tailwind + custom styles
└── main.jsx                   # React entry point
```

---

## 🚀 Getting Started

### **Installation**

```bash
cd BMW-AutoSallon
npm install --legacy-peer-deps
npm run dev
```

App will be available at: `http://localhost:5174`

### **Build for Production**

```bash
npm run build
npm run preview
```

### **Linting**

```bash
npm run lint
```

---

## 🎨 Design System

### **Color Palette**
- **Primary Blue**: `#004B87` (BMW Blue)
- **Dark**: `#1a1a1a` (BMW Dark)
- **Light**: `#f5f5f5` (Off-white)
- **Accent**: Blue gradients

### **Typography**
- **Font**: System UI, -apple-system (responsive)
- **Headings**: Bold, up to 5xl
- **Body**: 16-18px base

### **Components**
- `.btn-luxury` - Primary CTA button
- `.btn-outline` - Secondary button
- `.glass-card` - Card with backdrop blur
- `.section-title` - Section heading
- `.container-luxury` - Max-width container (7xl)

---

## 💾 State Management

### **AppContext** (`src/context/AppContext.jsx`)

```javascript
useAppContext() returns {
  vehicles,              // Array of all vehicles
  addVehicle(vehicle),   // Add new vehicle
  updateVehicle(id, data), // Update vehicle
  deleteVehicle(id),     // Delete vehicle
  bookings,              // Array of test drive bookings
  addBooking(booking),   // Add test drive booking
  inquiries,             // Array of inquiries/leads
  addInquiry(inquiry),   // Add inquiry
  user,                  // Current user
  setUser(),             // Set user
  isAdminLoggedIn,       // Admin auth state
  setIsAdminLoggedIn()   // Set admin auth
}
```

---

## 📊 Mock Data

**Sample Vehicles**: 6 BMW models (3 Series, 5 Series, X5, X6, i7, Z4)
**Sample Testimonials**: 3 customer reviews
**All data** in `src/data/mockData.js`

---

## 🔐 Admin Panel

### **Login Credentials**
- **Username**: `admin`
- **Password**: `admin123`

### **Features**
1. **Vehicle Management**: Full CRUD operations
2. **Bookings**: View all test drive bookings
3. **Inquiries**: View all customer inquiries and financing applications
4. **Status Badges**: Featured/Sold indicators

---

## 📱 Forms & Submissions

### **Lead Capture**
1. **Vehicle Inquiry** - Auto-logged when user submits form on details page
2. **Test Drive Booking** - Stored with date/time preferences
3. **Financing Application** - Collected for pre-approval
4. **Contact Form** - Homepage inquiry submissions

All data stored in `AppContext` (in production, would go to backend)

---

## 🎬 Animations

Using **Framer Motion**:
- Page transitions fade in/slide in
- Card hover effects
- Carousel transitions
- Button interactions
- Lazy loading on scroll (can be enhanced)

---

## 🔧 Dependencies

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^6.20.0",
  "framer-motion": "^10.16.16",
  "lucide-react": "^0.408.0",
  "react-helmet-async": "^2.0.4",
  "tailwindcss": "^3.3.6",
  "postcss": "^8.4.32",
  "autoprefixer": "^10.4.16"
}
```

---

## 📝 Next Steps (Optional Enhancements)

1. **Backend Integration**
   - Connect to real database (MongoDB, PostgreSQL)
   - User authentication with JWT
   - Vehicle image uploads to cloud storage

2. **Email Notifications**
   - Booking confirmations
   - Inquiry acknowledgments
   - Admin alerts

3. **Payment Integration**
   - Stripe/PayPal for deposits
   - Online payment processing

4. **Analytics**
   - Google Analytics integration
   - User behavior tracking
   - Conversion tracking

5. **Advanced Features**
   - Vehicle comparison
   - Trade-in valuation calculator
   - AR vehicle preview
   - Live chat support
   - Google/Facebook reviews integration

6. **Security**
   - HTTPS setup
   - CSRF protection
   - Input validation & sanitization
   - Rate limiting

---

## 📞 Support

For issues or questions, refer to the code comments and component documentation in each file.

---

**Built with ❤️ for a premium automotive experience**
