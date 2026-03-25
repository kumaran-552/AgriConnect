import React, { useState } from 'react';
import './Poultry.css';

interface PoultryInfo {
  name: string;
  icon: string;
  description: string;
  breeds: string[];
  housing: string[];
  feeding: string[];
  production: string[];
  diseases: string[];
  management: string[];
}

const poultryData: Record<string, PoultryInfo> = {
  chickens: {
    name: 'Chickens',
    icon: '🐔',
    description: 'Chicken farming is the most common form of poultry farming, involving raising chickens for meat (broilers) and eggs (layers).',
    breeds: ['Rhode Island Red', 'Leghorn', 'Brahma', 'Aseel', 'Kadaknath', 'Desi Fowl', 'Broiler', 'Layer'],
    housing: [
      'Deep litter system with proper ventilation',
      'Battery cage system for layers',
      'Free-range housing for organic farming',
      'Brooder houses for chicks',
      'Separate housing for different age groups'
    ],
    feeding: [
      'Starter feed (0-6 weeks): 20-24% protein',
      'Grower feed (6-18 weeks): 16-18% protein',
      'Layer feed (18+ weeks): 16-18% protein with calcium',
      'Broiler feed: High energy and protein content',
      'Fresh water availability 24/7'
    ],
    production: [
      'Egg production: 250-300 eggs per year per layer',
      'Broiler ready for market: 6-8 weeks (2-2.5 kg)',
      'Feed conversion ratio: 1.8-2.2 for broilers',
      'Peak laying period: 25-72 weeks of age',
      'Hatching rate: 80-85% under proper conditions'
    ],
    diseases: [
      'Newcastle Disease - Vaccination required',
      'Infectious Bronchitis - Respiratory infection',
      'Fowl Pox - Viral disease affecting skin',
      'Coccidiosis - Intestinal parasitic disease',
      'Marek\'s Disease - Viral cancer in chickens'
    ],
    management: [
      'Regular vaccination schedule',
      'Proper biosecurity measures',
      'Temperature control (18-24°C optimal)',
      'Lighting program for layers (14-16 hours)',
      'Record keeping for production and health'
    ]
  },
  ducks: {
    name: 'Ducks',
    icon: '🦆',
    description: 'Duck farming involves raising ducks primarily for meat and eggs, with ducks being hardy and adaptable to various climatic conditions.',
    breeds: ['Khaki Campbell', 'Indian Runner', 'Pekin', 'Muscovy', 'Mallard', 'White Pekin', 'Rouen', 'Call Duck'],
    housing: [
      'Semi-intensive system with water access',
      'Shelter with 3-4 sq ft per duck',
      'Separate nesting boxes for layers',
      'Fencing to protect from predators',
      'Drainage system for wet areas'
    ],
    feeding: [
      'Starter feed (0-3 weeks): 20-22% protein',
      'Grower feed (3-7 weeks): 16-18% protein',
      'Layer feed: 16-17% protein with calcium',
      'Foraging supplements with greens',
      'Clean water for drinking and dabbling'
    ],
    production: [
      'Egg production: 200-300 eggs per year',
      'Market weight: 2-3 kg at 7-8 weeks',
      'Feed conversion ratio: 2.5-3.0',
      'Laying period: 5-7 months per year',
      'Duck eggs larger than chicken eggs'
    ],
    diseases: [
      'Duck Viral Hepatitis - Affects young ducklings',
      'Duck Plague - Highly contagious viral disease',
      'Aspergillosis - Fungal respiratory infection',
      'Botulism - Bacterial toxin poisoning',
      'External parasites - Lice and mites'
    ],
    management: [
      'Water management for swimming and cleaning',
      'Predator protection especially at night',
      'Seasonal breeding management',
      'Proper ventilation in housing',
      'Regular health monitoring'
    ]
  },
  turkeys: {
    name: 'Turkeys',
    icon: '🦃',
    description: 'Turkey farming focuses on raising turkeys for meat production, with turkeys being larger birds requiring specific management practices.',
    breeds: ['Broad Breasted White', 'Bronze', 'Bourbon Red', 'Narragansett', 'Black Spanish', 'Royal Palm', 'Slate', 'White Holland'],
    housing: [
      'Large floor space: 4-5 sq ft per bird',
      'High ceiling for flying space',
      'Separate brooding area for poults',
      'Strong fencing due to flying ability',
      'Weather protection and ventilation'
    ],
    feeding: [
      'Turkey starter (0-6 weeks): 26-28% protein',
      'Grower feed (6-14 weeks): 20-22% protein',
      'Finisher feed (14+ weeks): 16-18% protein',
      'Higher protein requirements than chickens',
      'Adequate calcium and phosphorus'
    ],
    production: [
      'Market weight: 8-15 kg at 16-20 weeks',
      'Feed conversion ratio: 2.5-3.5',
      'Breeding season: Spring to early summer',
      'Egg production: 80-100 eggs per season',
      'Longer growing period than chickens'
    ],
    diseases: [
      'Blackhead Disease - Protozoan infection',
      'Turkey Rhinotracheitis - Respiratory disease',
      'Fowl Cholera - Bacterial infection',
      'Erysipelas - Bacterial skin infection',
      'Mycoplasma infections - Respiratory issues'
    ],
    management: [
      'Careful brooding temperature control',
      'Gradual transition to outdoor access',
      'Monitoring for aggressive behavior',
      'Seasonal breeding management',
      'Higher space requirements than chickens'
    ]
  },
  geese: {
    name: 'Geese',
    icon: '🪿',
    description: 'Goose farming involves raising geese for meat, eggs, and down feathers, with geese being excellent grazers and hardy birds.',
    breeds: ['Embden', 'Toulouse', 'Chinese', 'African', 'Pilgrim', 'Sebastopol', 'Roman Tufted', 'Pomeranian'],
    housing: [
      'Large grazing area: 200-400 sq m per bird',
      'Simple shelter for weather protection',
      'Access to water for swimming',
      'Nesting boxes for breeding geese',
      'Secure fencing from ground predators'
    ],
    feeding: [
      'Gosling starter (0-3 weeks): 20-22% protein',
      'Grower feed (3-8 weeks): 15-16% protein',
      'Maintenance feed: 14-15% protein',
      'Excellent grazers - pasture-based feeding',
      'Supplemental grain during winter'
    ],
    production: [
      'Market weight: 4-6 kg at 10-12 weeks',
      'Egg production: 25-50 eggs per season',
      'Down feather collection annually',
      'Grazing efficiency: 1 goose per 1000 sq m',
      'Long productive life: 8-10 years'
    ],
    diseases: [
      'Goose Parvovirus - Affects young goslings',
      'Avian Influenza - Respiratory infection',
      'Gizzard worm - Internal parasite',
      'Aspergillosis - Fungal infection',
      'Lead poisoning - From contaminated water'
    ],
    management: [
      'Pasture rotation for optimal grazing',
      'Seasonal breeding management',
      'Water quality maintenance',
      'Predator control measures',
      'Minimal housing requirements due to hardiness'
    ]
  }
};

const Poultry: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chickens');
  const [showGetOrder, setShowGetOrder] = useState(false);
  
  // Get Order Form State
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    location: '',
    farmInfraPhoto: null as File | null,
    tenderAmount: '',
    farmLicense: null as File | null,
    surityDocument: null as File | null
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const currentBird = poultryData[activeTab];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 5MB' }));
        return;
      }
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setFormErrors(prev => ({ ...prev, [fieldName]: 'Only JPG, PNG, or PDF files are allowed' }));
        return;
      }
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      setFormErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }
    
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    
    if (!formData.farmInfraPhoto) {
      errors.farmInfraPhoto = 'Farm infrastructure photo is required';
    }
    
    if (!formData.tenderAmount.trim()) {
      errors.tenderAmount = 'Tender amount is required';
    } else if (isNaN(Number(formData.tenderAmount)) || Number(formData.tenderAmount) <= 0) {
      errors.tenderAmount = 'Please enter a valid amount';
    }
    
    if (!formData.farmLicense) {
      errors.farmLicense = 'Farm license certificate is required';
    }
    
    if (!formData.surityDocument) {
      errors.surityDocument = 'Surety document is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          address: '',
          phoneNumber: '',
          location: '',
          farmInfraPhoto: null,
          tenderAmount: '',
          farmLicense: null,
          surityDocument: null
        });
        setSubmitSuccess(false);
      }, 3000);
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phoneNumber: '',
      location: '',
      farmInfraPhoto: null,
      tenderAmount: '',
      farmLicense: null,
      surityDocument: null
    });
    setFormErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div className="poultry-page" style={{ backgroundImage: 'url(/poultry.jpg)' }}>
      <div className="container">
        <div className="poultry-header">
          <h1>🐔 Poultry Farming</h1>
          <p className="poultry-definition">
            Poultry farming involves raising domesticated birds like chickens, ducks, turkeys, and geese for meat, 
            eggs, and feathers, offering a profitable and scalable agricultural venture. It provides essential 
            protein sources and can be adapted to various scales from backyard to commercial operations.
          </p>
        </div>

        <div className="poultry-main-tabs">
          <button
            className={`main-tab-button ${!showGetOrder ? 'active' : ''}`}
            onClick={() => setShowGetOrder(false)}
          >
            <span className="main-tab-icon">📚</span>
            <span className="main-tab-name">Poultry Guides</span>
          </button>
          <button
            className={`main-tab-button ${showGetOrder ? 'active' : ''}`}
            onClick={() => setShowGetOrder(true)}
          >
            <span className="main-tab-icon">📋</span>
            <span className="main-tab-name">Get Order</span>
          </button>
        </div>

        {!showGetOrder ? (
          <>
            <div className="poultry-tabs">
              {Object.entries(poultryData).map(([key, bird]) => (
                <button
                  key={key}
                  className={`tab-button ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  <span className="tab-icon">{bird.icon}</span>
                  <span className="tab-name">{bird.name}</span>
                </button>
              ))}
            </div>

            <div className="bird-content">
              <div className="bird-header">
                <div className="bird-title">
                  <span className="bird-icon-large">{currentBird.icon}</span>
                  <h2>{currentBird.name}</h2>
                </div>
                <p className="bird-description">{currentBird.description}</p>
              </div>

              <div className="bird-details-grid">
                <div className="detail-card">
                  <h3>🐣 Popular Breeds</h3>
                  <div className="breeds-grid">
                    {currentBird.breeds.map((breed, index) => (
                      <span key={index} className="breed-tag">{breed}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-card">
                  <h3>🏠 Housing Requirements</h3>
                  <ul>
                    {currentBird.housing.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>🌾 Feeding Guidelines</h3>
                  <ul>
                    {currentBird.feeding.map((guideline, index) => (
                      <li key={index}>{guideline}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>📊 Production Data</h3>
                  <ul>
                    {currentBird.production.map((data, index) => (
                      <li key={index}>{data}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>🦠 Common Diseases</h3>
                  <ul>
                    {currentBird.diseases.map((disease, index) => (
                      <li key={index}>{disease}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>⚙️ Management Practices</h3>
                  <ul>
                    {currentBird.management.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="poultry-footer">
              <div className="info-banner">
                <h3>🥚 Poultry Excellence</h3>
                <p>
                  Successful poultry farming requires proper planning, good management practices, and attention to 
                  bird health and welfare. With the right approach, poultry farming can provide sustainable income 
                  while contributing to food security and rural development.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="get-order-content">
            <div className="get-order-header">
              <h2>📋 Investment Order Application</h2>
              <p className="get-order-description">
                Submit your application to receive investment orders from investors for poultry supply. 
                Investors will provide funding for domestic avian supply, and you will manage the production 
                and delivery of quality poultry products.
              </p>
            </div>

            {submitSuccess && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <p>Your order application has been submitted successfully! We will review your application and contact you soon.</p>
              </div>
            )}

            <form className="get-order-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>👤 Personal Information</h3>
                
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={formErrors.name ? 'error' : ''}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    rows={3}
                    className={formErrors.address ? 'error' : ''}
                  />
                  {formErrors.address && <span className="error-message">{formErrors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={formErrors.phoneNumber ? 'error' : ''}
                    />
                    {formErrors.phoneNumber && <span className="error-message">{formErrors.phoneNumber}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location (District/State) *</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Coimbatore, Tamil Nadu"
                      className={formErrors.location ? 'error' : ''}
                    />
                    {formErrors.location && <span className="error-message">{formErrors.location}</span>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>🏭 Farm Information</h3>
                
                <div className="form-group">
                  <label htmlFor="farmInfraPhoto">Farm Infrastructure Photo *</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="farmInfraPhoto"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={(e) => handleFileChange(e, 'farmInfraPhoto')}
                      className={formErrors.farmInfraPhoto ? 'error' : ''}
                    />
                    <label htmlFor="farmInfraPhoto" className="file-label">
                      <span className="file-icon">📷</span>
                      <span>{formData.farmInfraPhoto ? formData.farmInfraPhoto.name : 'Choose photo of your farm'}</span>
                    </label>
                  </div>
                  <small className="file-hint">JPG, PNG format. Max size: 5MB</small>
                  {formErrors.farmInfraPhoto && <span className="error-message">{formErrors.farmInfraPhoto}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="tenderAmount">Amount to Code for Tender (₹) *</label>
                  <input
                    type="number"
                    id="tenderAmount"
                    name="tenderAmount"
                    value={formData.tenderAmount}
                    onChange={handleInputChange}
                    placeholder="Enter tender amount in rupees"
                    min="0"
                    step="1000"
                    className={formErrors.tenderAmount ? 'error' : ''}
                  />
                  {formErrors.tenderAmount && <span className="error-message">{formErrors.tenderAmount}</span>}
                </div>
              </div>

              <div className="form-section">
                <h3>📄 Required Documents</h3>
                
                <div className="form-group">
                  <label htmlFor="farmLicense">Farm License Verified Certificate *</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="farmLicense"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      onChange={(e) => handleFileChange(e, 'farmLicense')}
                      className={formErrors.farmLicense ? 'error' : ''}
                    />
                    <label htmlFor="farmLicense" className="file-label">
                      <span className="file-icon">📜</span>
                      <span>{formData.farmLicense ? formData.farmLicense.name : 'Upload farm license certificate'}</span>
                    </label>
                  </div>
                  <small className="file-hint">JPG, PNG, or PDF format. Max size: 5MB</small>
                  {formErrors.farmLicense && <span className="error-message">{formErrors.farmLicense}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="surityDocument">Surety Document *</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="surityDocument"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      onChange={(e) => handleFileChange(e, 'surityDocument')}
                      className={formErrors.surityDocument ? 'error' : ''}
                    />
                    <label htmlFor="surityDocument" className="file-label">
                      <span className="file-icon">🔒</span>
                      <span>{formData.surityDocument ? formData.surityDocument.name : 'Upload surety document'}</span>
                    </label>
                  </div>
                  <small className="file-hint">JPG, PNG, or PDF format. Max size: 5MB</small>
                  {formErrors.surityDocument && <span className="error-message">{formErrors.surityDocument}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Submit Application
                </button>
                <button type="button" className="reset-button" onClick={resetForm}>
                  Reset Form
                </button>
              </div>
            </form>

            <div className="order-info-banner">
              <h3>💡 Important Information</h3>
              <ul>
                <li>All fields marked with * are mandatory</li>
                <li>Ensure your farm license is valid and up-to-date</li>
                <li>The tender amount should reflect your production capacity</li>
                <li>Applications are reviewed within 5-7 business days</li>
                <li>You will be contacted via phone for further verification</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Poultry;
