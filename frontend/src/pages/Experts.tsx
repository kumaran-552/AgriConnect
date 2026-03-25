import React, { useState } from 'react';
import './Experts.css';

interface Expert {
  id: number;
  name: string;
  specialization: string;
  qualification: string;
  experience: string;
  location: string;
  phone: string;
  email: string;
  languages: string[];
  expertise: string[];
  availability: string;
  consultationFee: string;
  rating: number;
  image: string;
}

interface ExpertCategory {
  id: string;
  name: string;
  icon: string;
  experts: Expert[];
}

const expertCategories: ExpertCategory[] = [
  {
    id: 'crops',
    name: 'Crop Specialists',
    icon: '🌾',
    experts: [
      {
        id: 1,
        name: 'Dr. Ramesh Kumar',
        specialization: 'Rice & Millet Cultivation',
        qualification: 'Ph.D. in Agronomy',
        experience: '15 years',
        location: 'Coimbatore, Tamil Nadu',
        phone: '+91 98XXX XXXXX',
        email: 'ramesh.agri@example.com',
        languages: ['Tamil', 'English', 'Hindi'],
        expertise: ['Rice cultivation', 'Millet farming', 'Organic farming', 'Soil management'],
        availability: 'Mon-Sat, 9 AM - 6 PM',
        consultationFee: '₹500 per session',
        rating: 4.8,
        image: '👨‍🌾'
      },
      {
        id: 2,
        name: 'Dr. Priya Selvam',
        specialization: 'Sugarcane & Cash Crops',
        qualification: 'M.Sc. Agriculture, Ph.D.',
        experience: '12 years',
        location: 'Erode, Tamil Nadu',
        phone: '+91 97XXX XXXXX',
        email: 'priya.crops@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Sugarcane cultivation', 'Cotton farming', 'Crop rotation', 'Pest management'],
        availability: 'Mon-Fri, 10 AM - 5 PM',
        consultationFee: '₹600 per session',
        rating: 4.7,
        image: '👩‍🌾'
      },
      {
        id: 3,
        name: 'Mr. Murugan S',
        specialization: 'Pulses & Oilseeds',
        qualification: 'M.Sc. Agronomy',
        experience: '10 years',
        location: 'Madurai, Tamil Nadu',
        phone: '+91 96XXX XXXXX',
        email: 'murugan.pulses@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Pulse cultivation', 'Groundnut farming', 'Intercropping', 'Seed treatment'],
        availability: 'Tue-Sun, 8 AM - 4 PM',
        consultationFee: '₹400 per session',
        rating: 4.6,
        image: '👨‍🌾'
      }
    ]
  },
  {
    id: 'horticulture',
    name: 'Horticulture Experts',
    icon: '🌿',
    experts: [
      {
        id: 4,
        name: 'Dr. Lakshmi Devi',
        specialization: 'Fruit Crops & Orchards',
        qualification: 'Ph.D. in Horticulture',
        experience: '18 years',
        location: 'Salem, Tamil Nadu',
        phone: '+91 95XXX XXXXX',
        email: 'lakshmi.horti@example.com',
        languages: ['Tamil', 'English', 'Telugu'],
        expertise: ['Mango cultivation', 'Banana farming', 'Orchard management', 'Post-harvest'],
        availability: 'Mon-Sat, 9 AM - 5 PM',
        consultationFee: '₹700 per session',
        rating: 4.9,
        image: '👩‍🌾'
      },
      {
        id: 5,
        name: 'Mr. Karthik Raj',
        specialization: 'Vegetable Cultivation',
        qualification: 'M.Sc. Horticulture',
        experience: '8 years',
        location: 'Dindigul, Tamil Nadu',
        phone: '+91 94XXX XXXXX',
        email: 'karthik.veg@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Tomato farming', 'Onion cultivation', 'Polyhouse farming', 'Drip irrigation'],
        availability: 'Mon-Fri, 10 AM - 6 PM',
        consultationFee: '₹450 per session',
        rating: 4.5,
        image: '👨‍🌾'
      },
      {
        id: 6,
        name: 'Dr. Anitha Kumari',
        specialization: 'Floriculture & Landscaping',
        qualification: 'Ph.D. Floriculture',
        experience: '14 years',
        location: 'Chennai, Tamil Nadu',
        phone: '+91 93XXX XXXXX',
        email: 'anitha.flowers@example.com',
        languages: ['Tamil', 'English', 'Hindi'],
        expertise: ['Rose cultivation', 'Jasmine farming', 'Greenhouse management', 'Export quality'],
        availability: 'Tue-Sat, 9 AM - 5 PM',
        consultationFee: '₹650 per session',
        rating: 4.8,
        image: '👩‍🌾'
      }
    ]
  },
  {
    id: 'livestock',
    name: 'Livestock Experts',
    icon: '🐄',
    experts: [
      {
        id: 7,
        name: 'Dr. Venkatesh Babu',
        specialization: 'Dairy Farming',
        qualification: 'B.V.Sc., M.V.Sc.',
        experience: '20 years',
        location: 'Namakkal, Tamil Nadu',
        phone: '+91 92XXX XXXXX',
        email: 'venkatesh.dairy@example.com',
        languages: ['Tamil', 'English', 'Kannada'],
        expertise: ['Dairy management', 'Cattle breeding', 'Milk production', 'Feed formulation'],
        availability: 'Mon-Sat, 8 AM - 6 PM',
        consultationFee: '₹800 per session',
        rating: 4.9,
        image: '👨‍⚕️'
      },
      {
        id: 8,
        name: 'Dr. Meena Sundaram',
        specialization: 'Goat & Sheep Farming',
        qualification: 'M.V.Sc. Animal Husbandry',
        experience: '11 years',
        location: 'Karur, Tamil Nadu',
        phone: '+91 91XXX XXXXX',
        email: 'meena.goat@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Goat breeding', 'Sheep management', 'Disease prevention', 'Nutrition'],
        availability: 'Mon-Fri, 9 AM - 5 PM',
        consultationFee: '₹550 per session',
        rating: 4.7,
        image: '👩‍⚕️'
      }
    ]
  },
  {
    id: 'poultry',
    name: 'Poultry Experts',
    icon: '🐔',
    experts: [
      {
        id: 9,
        name: 'Mr. Selvam Rajan',
        specialization: 'Broiler & Layer Farming',
        qualification: 'M.Sc. Poultry Science',
        experience: '16 years',
        location: 'Namakkal, Tamil Nadu',
        phone: '+91 90XXX XXXXX',
        email: 'selvam.poultry@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Broiler management', 'Layer farming', 'Hatchery operations', 'Feed management'],
        availability: 'Mon-Sat, 8 AM - 6 PM',
        consultationFee: '₹600 per session',
        rating: 4.8,
        image: '👨‍🌾'
      },
      {
        id: 10,
        name: 'Dr. Kavitha Devi',
        specialization: 'Duck & Turkey Farming',
        qualification: 'Ph.D. Poultry Science',
        experience: '9 years',
        location: 'Trichy, Tamil Nadu',
        phone: '+91 89XXX XXXXX',
        email: 'kavitha.duck@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Duck farming', 'Turkey rearing', 'Disease control', 'Breeding programs'],
        availability: 'Tue-Sat, 10 AM - 5 PM',
        consultationFee: '₹500 per session',
        rating: 4.6,
        image: '👩‍⚕️'
      }
    ]
  },
  {
    id: 'soil',
    name: 'Soil & Water Experts',
    icon: '🌍',
    experts: [
      {
        id: 11,
        name: 'Dr. Rajendran M',
        specialization: 'Soil Science & Fertility',
        qualification: 'Ph.D. Soil Science',
        experience: '22 years',
        location: 'Coimbatore, Tamil Nadu',
        phone: '+91 88XXX XXXXX',
        email: 'rajendran.soil@example.com',
        languages: ['Tamil', 'English', 'Malayalam'],
        expertise: ['Soil testing', 'Nutrient management', 'Soil conservation', 'Organic amendments'],
        availability: 'Mon-Fri, 9 AM - 5 PM',
        consultationFee: '₹750 per session',
        rating: 4.9,
        image: '👨‍🔬'
      },
      {
        id: 12,
        name: 'Dr. Sangeetha Ravi',
        specialization: 'Irrigation & Water Management',
        qualification: 'Ph.D. Agricultural Engineering',
        experience: '13 years',
        location: 'Thanjavur, Tamil Nadu',
        phone: '+91 87XXX XXXXX',
        email: 'sangeetha.water@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Drip irrigation', 'Sprinkler systems', 'Water conservation', 'Precision farming'],
        availability: 'Mon-Sat, 10 AM - 6 PM',
        consultationFee: '₹650 per session',
        rating: 4.7,
        image: '👩‍🔬'
      }
    ]
  },
  {
    id: 'organic',
    name: 'Organic Farming Experts',
    icon: '♻️',
    experts: [
      {
        id: 13,
        name: 'Mr. Natarajan K',
        specialization: 'Organic Farming & Certification',
        qualification: 'M.Sc. Organic Agriculture',
        experience: '17 years',
        location: 'Madurai, Tamil Nadu',
        phone: '+91 86XXX XXXXX',
        email: 'natarajan.organic@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Organic certification', 'Composting', 'Biopesticides', 'Natural farming'],
        availability: 'Mon-Sat, 9 AM - 5 PM',
        consultationFee: '₹700 per session',
        rating: 4.8,
        image: '👨‍🌾'
      },
      {
        id: 14,
        name: 'Dr. Geetha Lakshmi',
        specialization: 'Vermicompost & Biofertilizers',
        qualification: 'Ph.D. Microbiology',
        experience: '10 years',
        location: 'Salem, Tamil Nadu',
        phone: '+91 85XXX XXXXX',
        email: 'geetha.bio@example.com',
        languages: ['Tamil', 'English'],
        expertise: ['Vermicomposting', 'Biofertilizers', 'Microbial inoculants', 'Waste management'],
        availability: 'Tue-Sat, 10 AM - 5 PM',
        consultationFee: '₹550 per session',
        rating: 4.7,
        image: '👩‍🔬'
      }
    ]
  }
];

const Experts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('crops');
  const [searchTerm, setSearchTerm] = useState('');

  const currentCategory = expertCategories.find(cat => cat.id === selectedCategory);
  
  const filteredExperts = currentCategory?.experts.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="experts-page">
      <div className="container">
        <div className="experts-header">
          <h1>👨‍🌾 Expert Consultation</h1>
          <p>Connect with experienced agricultural experts for professional guidance</p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search experts by name, specialization, or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="expert-category-tabs">
          {expertCategories.map((category) => (
            <button
              key={category.id}
              className={`expert-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="expert-icon">{category.icon}</span>
              <span className="expert-category-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="experts-grid">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert) => (
              <div key={expert.id} className="expert-card">
                <div className="expert-avatar">{expert.image}</div>
                <div className="expert-info">
                  <h3 className="expert-name">{expert.name}</h3>
                  <p className="expert-specialization">{expert.specialization}</p>
                  <div className="expert-qualification">
                    <span>🎓 {expert.qualification}</span>
                  </div>
                  <div className="expert-experience">
                    <span>💼 {expert.experience} experience</span>
                  </div>
                  <div className="expert-rating">
                    <span>⭐ {expert.rating} / 5.0</span>
                  </div>
                  
                  <div className="expert-expertise">
                    <h4>Areas of Expertise:</h4>
                    <div className="expertise-tags">
                      {expert.expertise.map((exp, index) => (
                        <span key={index} className="expertise-tag">{exp}</span>
                      ))}
                    </div>
                  </div>

                  <div className="expert-languages">
                    <span>🗣️ Languages: {expert.languages.join(', ')}</span>
                  </div>

                  <div className="expert-details">
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{expert.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📞</span>
                      <span>{expert.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📧</span>
                      <span>{expert.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🕒</span>
                      <span>{expert.availability}</span>
                    </div>
                    <div className="detail-item fee">
                      <span className="detail-icon">💰</span>
                      <span className="fee-amount">{expert.consultationFee}</span>
                    </div>
                  </div>

                  <button className="consult-btn">Book Consultation</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-experts">
              <p>No experts found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experts;
