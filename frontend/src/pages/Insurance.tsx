import React, { useState } from 'react';
import './Insurance.css';

interface InsuranceScheme {
  name: string;
  icon: string;
  description: string;
  coverage: string[];
  eligibility: string[];
  premium: string;
  benefits: string[];
  documents: string[];
  process: string[];
}

const insuranceSchemes: Record<string, InsuranceScheme> = {
  crop: {
    name: 'Crop Insurance',
    icon: '🌾',
    description: 'Comprehensive crop insurance scheme to protect farmers against crop losses due to natural calamities, pests, and diseases.',
    coverage: [
      'Natural calamities (drought, flood, cyclone, hailstorm)',
      'Pest and disease attacks',
      'Fire and lightning',
      'Landslides and inundation',
      'Post-harvest losses (up to 14 days)'
    ],
    eligibility: [
      'All farmers (loanee and non-loanee)',
      'Sharecroppers and tenant farmers',
      'Minimum age: 18 years',
      'Maximum age: 70 years',
      'Valid land documents required'
    ],
    premium: '2% for Kharif crops, 1.5% for Rabi crops, 5% for horticultural crops',
    benefits: [
      'Sum insured based on scale of finance',
      'Quick claim settlement within 60 days',
      'Premium subsidy by government',
      'Coverage for entire crop cycle',
      'Technology-based loss assessment'
    ],
    documents: [
      'Aadhaar card',
      'Bank account details',
      'Land ownership documents',
      'Sowing certificate',
      'Revenue records (7/12, 8A)'
    ],
    process: [
      'Visit nearest bank or insurance company',
      'Fill application form with required documents',
      'Pay premium amount',
      'Get policy certificate',
      'Report crop loss within 72 hours',
      'Claim settlement after assessment'
    ]
  },
  livestock: {
    name: 'Livestock Insurance',
    icon: '🐄',
    description: 'Insurance coverage for cattle, buffalo, sheep, goat, and poultry to protect against death due to diseases and accidents.',
    coverage: [
      'Death due to accident',
      'Death due to disease',
      'Surgical operations',
      'Strike, riot, and malicious damage',
      'Fire, lightning, flood, cyclone',
      'Earthquake and landslide'
    ],
    eligibility: [
      'Farmers owning livestock',
      'Dairy farmers and cooperatives',
      'Poultry farmers',
      'Animals aged 6 months to 8 years',
      'Healthy animals only'
    ],
    premium: '3-4% of sum insured for cattle, 6% for small ruminants, 8% for poultry',
    benefits: [
      'Sum insured up to market value',
      'Quick claim processing',
      'Veterinary care coverage',
      'Breeding failure compensation',
      'Transportation cost coverage'
    ],
    documents: [
      'Aadhaar card of owner',
      'Bank account details',
      'Veterinary health certificate',
      'Age proof of animal',
      'Photographs of animals'
    ],
    process: [
      'Get animals examined by veterinarian',
      'Submit application with documents',
      'Pay premium amount',
      'Get policy issued',
      'Report death/loss immediately',
      'Submit claim with post-mortem report'
    ]
  },
  equipment: {
    name: 'Farm Equipment Insurance',
    icon: '🚜',
    description: 'Insurance for agricultural machinery and equipment against theft, fire, and accidental damage.',
    coverage: [
      'Fire and explosion',
      'Theft and burglary',
      'Accidental damage',
      'Natural calamities',
      'Malicious damage',
      'Transit risks'
    ],
    eligibility: [
      'Farmers owning agricultural equipment',
      'Custom hiring centers',
      'Agricultural cooperatives',
      'Equipment value minimum ₹50,000',
      'Equipment age less than 10 years'
    ],
    premium: '1-3% of equipment value depending on type and age',
    benefits: [
      'Replacement cost coverage',
      'Repair and maintenance',
      'Third-party liability',
      'Breakdown assistance',
      'Depreciation benefits'
    ],
    documents: [
      'Purchase invoice of equipment',
      'Registration certificate',
      'Insurance declaration form',
      'Bank loan documents (if any)',
      'Photographs of equipment'
    ],
    process: [
      'Get equipment surveyed',
      'Submit application form',
      'Pay premium amount',
      'Get policy certificate',
      'Report damage/theft to police',
      'File insurance claim with documents'
    ]
  },
  weather: {
    name: 'Weather-Based Insurance',
    icon: '🌦️',
    description: 'Index-based insurance that provides payouts based on weather parameters like rainfall, temperature, and humidity.',
    coverage: [
      'Deficit or excess rainfall',
      'High or low temperature',
      'High humidity levels',
      'Drought conditions',
      'Unseasonal weather events'
    ],
    eligibility: [
      'All farmers in notified areas',
      'Minimum 1 acre land holding',
      'Crops covered under scheme',
      'Weather station within 20 km',
      'Valid land records'
    ],
    premium: '3-5% of sum insured with government subsidy',
    benefits: [
      'Quick payout based on weather data',
      'No crop cutting experiments',
      'Transparent claim process',
      'Covers entire district/block',
      'Technology-driven assessment'
    ],
    documents: [
      'Land ownership documents',
      'Aadhaar card',
      'Bank account details',
      'Crop sowing details',
      'GPS coordinates of land'
    ],
    process: [
      'Enroll during notification period',
      'Submit required documents',
      'Pay premium amount',
      'Monitor weather parameters',
      'Automatic payout if trigger reached',
      'Amount credited to bank account'
    ]
  },
  registration: {
    name: 'Insurance Registration',
    icon: '📝',
    description: 'Register for agricultural insurance by providing your details and required documents.',
    coverage: [],
    eligibility: [],
    premium: '',
    benefits: [],
    documents: [],
    process: []
  }
};

const Insurance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('crop');
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    idProofType: '',
    idProofFile: null as File | null,
    mobileNo: '',
    dateOfBirth: '',
    ageProofFile: null as File | null,
    incomeProofFile: null as File | null,
    clientPhotoFile: null as File | null,
    animalPhotoFile: null as File | null,
    insuranceType: 'crop'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const currentScheme = insuranceSchemes[activeTab];

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.idProofType) {
      newErrors.idProofType = 'Please select ID proof type';
    }

    if (!formData.idProofFile) {
      newErrors.idProofFile = 'ID proof document is required';
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old to register';
      } else if (age > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    if (!formData.ageProofFile) {
      newErrors.ageProofFile = 'Age proof document is required';
    }

    if (!formData.incomeProofFile) {
      newErrors.incomeProofFile = 'Income proof document is required';
    }

    if (!formData.clientPhotoFile) {
      newErrors.clientPhotoFile = 'Your photograph is required';
    }

    if (formData.insuranceType === 'livestock' && !formData.animalPhotoFile) {
      newErrors.animalPhotoFile = 'Animal photograph is required for livestock insurance';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          address: '',
          idProofType: '',
          idProofFile: null,
          mobileNo: '',
          dateOfBirth: '',
          ageProofFile: null,
          incomeProofFile: null,
          clientPhotoFile: null,
          animalPhotoFile: null,
          insuranceType: 'crop'
        });
      }, 3000);
    }
  };

  return (
    <div className="insurance-page" style={{ backgroundImage: 'url(/insurance.jpg)' }}>
      <div className="container">
        <div className="insurance-header">
          <h1>🛡️ Agricultural Insurance</h1>
          <p>Protect your farming investments with comprehensive insurance coverage</p>
        </div>

        <div className="insurance-tabs">
          {Object.entries(insuranceSchemes).map(([key, scheme]) => (
            <button
              key={key}
              className={`tab-button ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <span className="tab-icon">{scheme.icon}</span>
              <span className="tab-name">{scheme.name}</span>
            </button>
          ))}
        </div>

        <div className="insurance-content">
          {activeTab === 'registration' ? (
            <div className="registration-content">
              <div className="scheme-header">
                <div className="scheme-title">
                  <span className="scheme-icon-large">📝</span>
                  <h2>Insurance Registration</h2>
                </div>
                <p className="scheme-description">
                  Complete the form below to register for agricultural insurance. All fields are mandatory.
                </p>
              </div>

              {submitSuccess && (
                <div className="success-message">
                  ✅ Registration submitted successfully! We will contact you shortly.
                </div>
              )}

              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Personal Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
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
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="mobileNo">Mobile Number *</label>
                    <input
                      type="tel"
                      id="mobileNo"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      className={errors.mobileNo ? 'error' : ''}
                    />
                    {errors.mobileNo && <span className="error-message">{errors.mobileNo}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth * (Must be 18+ years)</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                      className={errors.dateOfBirth ? 'error' : ''}
                    />
                    {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                  </div>
                </div>

                <div className="form-section">
                  <h3>ID Proof</h3>
                  
                  <div className="form-group">
                    <label htmlFor="idProofType">ID Proof Type *</label>
                    <select
                      id="idProofType"
                      name="idProofType"
                      value={formData.idProofType}
                      onChange={handleInputChange}
                      className={errors.idProofType ? 'error' : ''}
                    >
                      <option value="">Select ID Proof</option>
                      <option value="aadhar">Aadhar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="driving">Driving License</option>
                    </select>
                    {errors.idProofType && <span className="error-message">{errors.idProofType}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="idProofFile">Upload ID Proof * (PDF, JPG, PNG - Max 5MB)</label>
                    <input
                      type="file"
                      id="idProofFile"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'idProofFile')}
                      className={errors.idProofFile ? 'error' : ''}
                    />
                    {formData.idProofFile && <span className="file-name">✓ {formData.idProofFile.name}</span>}
                    {errors.idProofFile && <span className="error-message">{errors.idProofFile}</span>}
                  </div>
                </div>

                <div className="form-section">
                  <h3>Supporting Documents</h3>
                  
                  <div className="form-group">
                    <label htmlFor="ageProofFile">Age Proof (Birth Certificate) * (PDF, JPG, PNG - Max 5MB)</label>
                    <input
                      type="file"
                      id="ageProofFile"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'ageProofFile')}
                      className={errors.ageProofFile ? 'error' : ''}
                    />
                    {formData.ageProofFile && <span className="file-name">✓ {formData.ageProofFile.name}</span>}
                    {errors.ageProofFile && <span className="error-message">{errors.ageProofFile}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="incomeProofFile">Income Proof (Income Certificate) * (PDF, JPG, PNG - Max 5MB)</label>
                    <input
                      type="file"
                      id="incomeProofFile"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'incomeProofFile')}
                      className={errors.incomeProofFile ? 'error' : ''}
                    />
                    {formData.incomeProofFile && <span className="file-name">✓ {formData.incomeProofFile.name}</span>}
                    {errors.incomeProofFile && <span className="error-message">{errors.incomeProofFile}</span>}
                  </div>
                </div>

                <div className="form-section">
                  <h3>Photographs</h3>
                  
                  <div className="form-group">
                    <label htmlFor="clientPhotoFile">Your Photograph * (JPG, PNG - Max 2MB)</label>
                    <input
                      type="file"
                      id="clientPhotoFile"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'clientPhotoFile')}
                      className={errors.clientPhotoFile ? 'error' : ''}
                    />
                    {formData.clientPhotoFile && <span className="file-name">✓ {formData.clientPhotoFile.name}</span>}
                    {errors.clientPhotoFile && <span className="error-message">{errors.clientPhotoFile}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="insuranceType">Insurance Type *</label>
                    <select
                      id="insuranceType"
                      name="insuranceType"
                      value={formData.insuranceType}
                      onChange={handleInputChange}
                    >
                      <option value="crop">Crop Insurance</option>
                      <option value="livestock">Livestock Insurance</option>
                      <option value="equipment">Farm Equipment Insurance</option>
                      <option value="weather">Weather-Based Insurance</option>
                    </select>
                  </div>

                  {formData.insuranceType === 'livestock' && (
                    <div className="form-group">
                      <label htmlFor="animalPhotoFile">Animal Photograph * (JPG, PNG - Max 2MB)</label>
                      <input
                        type="file"
                        id="animalPhotoFile"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'animalPhotoFile')}
                        className={errors.animalPhotoFile ? 'error' : ''}
                      />
                      {formData.animalPhotoFile && <span className="file-name">✓ {formData.animalPhotoFile.name}</span>}
                      {errors.animalPhotoFile && <span className="error-message">{errors.animalPhotoFile}</span>}
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Submit Registration
                  </button>
                  <button type="button" className="reset-btn" onClick={() => {
                    setFormData({
                      fullName: '',
                      address: '',
                      idProofType: '',
                      idProofFile: null,
                      mobileNo: '',
                      dateOfBirth: '',
                      ageProofFile: null,
                      incomeProofFile: null,
                      clientPhotoFile: null,
                      animalPhotoFile: null,
                      insuranceType: 'crop'
                    });
                    setErrors({});
                  }}>
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="scheme-header">
                <div className="scheme-title">
                  <span className="scheme-icon-large">{currentScheme.icon}</span>
                  <h2>{currentScheme.name}</h2>
                </div>
                <p className="scheme-description">{currentScheme.description}</p>
              </div>

              <div className="scheme-details-grid">
                <div className="detail-card">
                  <h3>🛡️ Coverage</h3>
                  <ul>
                    {currentScheme.coverage.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>✅ Eligibility</h3>
                  <ul>
                    {currentScheme.eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>💰 Premium</h3>
                  <p>{currentScheme.premium}</p>
                </div>

                <div className="detail-card">
                  <h3>🎯 Benefits</h3>
                  <ul>
                    {currentScheme.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>📄 Required Documents</h3>
                  <ul>
                    {currentScheme.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>📋 Application Process</h3>
                  <ol>
                    {currentScheme.process.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="insurance-footer">
          <div className="info-banner">
            <h3>🛡️ Secure Your Agricultural Future</h3>
            <p>
              Agricultural insurance provides financial protection against unforeseen losses 
              and helps farmers maintain their livelihood. Choose the right insurance scheme 
              based on your farming activities and risk assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;