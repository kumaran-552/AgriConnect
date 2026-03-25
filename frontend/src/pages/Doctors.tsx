import React, { useState } from 'react';
import './Doctors.css';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  qualification: string;
  experience: string;
  clinic: string;
  location: string;
  phone: string;
  emergency: string;
  email: string;
  availability: string;
  services: string[];
  rating: number;
  image: string;
  emergency24x7: boolean;
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    specialization: 'Large Animal Veterinarian',
    qualification: 'B.V.Sc., M.V.Sc.',
    experience: '15 years',
    clinic: 'Livestock Care Clinic',
    location: 'Coimbatore, Tamil Nadu',
    phone: '+91 98XXX XXXXX',
    emergency: '+91 98XXX XXXXX',
    email: 'rajesh.vet@example.com',
    availability: 'Mon-Sat: 9 AM - 6 PM',
    services: ['Cattle treatment', 'Buffalo care', 'Goat & Sheep', 'Emergency surgery', 'Vaccination'],
    rating: 4.8,
    image: '👨‍⚕️',
    emergency24x7: true
  },
  {
    id: 2,
    name: 'Dr. Priya Selvam',
    specialization: 'Poultry Veterinarian',
    qualification: 'B.V.Sc., Ph.D.',
    experience: '12 years',
    clinic: 'Poultry Health Center',
    location: 'Namakkal, Tamil Nadu',
    phone: '+91 97XXX XXXXX',
    emergency: '+91 97XXX XXXXX',
    email: 'priya.poultry@example.com',
    availability: 'Mon-Sun: 8 AM - 8 PM',
    services: ['Poultry diseases', 'Vaccination programs', 'Farm consultation', 'Disease outbreak management'],
    rating: 4.9,
    image: '👩‍⚕️',
    emergency24x7: true
  },
  {
    id: 3,
    name: 'Dr. Murugan S',
    specialization: 'Small Animal & Pet Care',
    qualification: 'B.V.Sc., M.V.Sc.',
    experience: '10 years',
    clinic: 'Pet Care Veterinary Hospital',
    location: 'Chennai, Tamil Nadu',
    phone: '+91 96XXX XXXXX',
    emergency: '+91 96XXX XXXXX',
    email: 'murugan.pets@example.com',
    availability: 'Mon-Sat: 10 AM - 7 PM',
    services: ['Dog & Cat care', 'Rabbit treatment', 'Pet surgery', 'Grooming', 'Pet vaccination'],
    rating: 4.7,
    image: '👨‍⚕️',
    emergency24x7: false
  },
  {
    id: 4,
    name: 'Dr. Lakshmi Devi',
    specialization: 'Dairy Cattle Specialist',
    qualification: 'B.V.Sc., M.V.Sc., Ph.D.',
    experience: '18 years',
    clinic: 'Dairy Health Clinic',
    location: 'Erode, Tamil Nadu',
    phone: '+91 95XXX XXXXX',
    emergency: '+91 95XXX XXXXX',
    email: 'lakshmi.dairy@example.com',
    availability: 'Mon-Sat: 8 AM - 6 PM',
    services: ['Milk fever treatment', 'Mastitis care', 'Artificial insemination', 'Pregnancy diagnosis', 'Nutrition consultation'],
    rating: 4.9,
    image: '👩‍⚕️',
    emergency24x7: true
  },
  {
    id: 5,
    name: 'Dr. Venkatesh Babu',
    specialization: 'Equine & Large Animal',
    qualification: 'B.V.Sc., M.V.Sc.',
    experience: '14 years',
    clinic: 'Equine Care Center',
    location: 'Madurai, Tamil Nadu',
    phone: '+91 94XXX XXXXX',
    emergency: '+91 94XXX XXXXX',
    email: 'venkatesh.equine@example.com',
    availability: 'Tue-Sun: 9 AM - 5 PM',
    services: ['Horse treatment', 'Donkey care', 'Large animal surgery', 'Hoof care', 'Emergency services'],
    rating: 4.6,
    image: '👨‍⚕️',
    emergency24x7: false
  },
  {
    id: 6,
    name: 'Dr. Meena Sundaram',
    specialization: 'Wildlife & Exotic Animals',
    qualification: 'B.V.Sc., M.V.Sc.',
    experience: '11 years',
    clinic: 'Exotic Animal Clinic',
    location: 'Salem, Tamil Nadu',
    phone: '+91 93XXX XXXXX',
    emergency: '+91 93XXX XXXXX',
    email: 'meena.wildlife@example.com',
    availability: 'Mon-Fri: 10 AM - 6 PM',
    services: ['Exotic birds', 'Reptile care', 'Wildlife rescue', 'Zoo consultation', 'Emergency care'],
    rating: 4.8,
    image: '👩‍⚕️',
    emergency24x7: false
  }
];

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEmergency = !showEmergencyOnly || doctor.emergency24x7;
    
    return matchesSearch && matchesEmergency;
  });

  return (
    <div className="doctors-page">
      <div className="container">
        <div className="doctors-header">
          <h1>🩺 Veterinary Directory</h1>
          <p>Find qualified veterinary doctors for emergency and routine animal care</p>
        </div>

        <div className="emergency-banner">
          <div className="emergency-icon">🚨</div>
          <div className="emergency-content">
            <h2>Emergency Veterinary Services</h2>
            <p>For immediate animal health emergencies, contact our 24x7 helpline</p>
            <div className="emergency-numbers">
              <a href="tel:+911800XXXX" className="emergency-number">📞 1800-XXX-XXXX (Toll Free)</a>
              <a href="tel:+919XXXXXXXXX" className="emergency-number">📱 +91 9XXXX XXXXX (Mobile)</a>
            </div>
          </div>
        </div>

        <div className="search-filter-bar">
          <input
            type="text"
            placeholder="Search by name, specialization, location, or services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <label className="emergency-filter">
            <input
              type="checkbox"
              checked={showEmergencyOnly}
              onChange={(e) => setShowEmergencyOnly(e.target.checked)}
            />
            <span>24x7 Emergency Only</span>
          </label>
        </div>

        <div className="doctors-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                {doctor.emergency24x7 && (
                  <div className="emergency-badge">24x7 Emergency</div>
                )}
                <div className="doctor-avatar">{doctor.image}</div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialization">{doctor.specialization}</p>
                  <div className="doctor-qualification">
                    <span>🎓 {doctor.qualification}</span>
                  </div>
                  <div className="doctor-experience">
                    <span>💼 {doctor.experience} experience</span>
                  </div>
                  <div className="doctor-rating">
                    <span>⭐ {doctor.rating} / 5.0</span>
                  </div>

                  <div className="clinic-info">
                    <h4>🏥 {doctor.clinic}</h4>
                    <p className="clinic-location">📍 {doctor.location}</p>
                  </div>

                  <div className="doctor-services">
                    <h4>Services Offered:</h4>
                    <div className="services-tags">
                      {doctor.services.map((service, index) => (
                        <span key={index} className="service-tag">{service}</span>
                      ))}
                    </div>
                  </div>

                  <div className="doctor-contact">
                    <div className="contact-item">
                      <span className="contact-icon">📞</span>
                      <span>{doctor.phone}</span>
                    </div>
                    {doctor.emergency24x7 && (
                      <div className="contact-item emergency-contact">
                        <span className="contact-icon">🚨</span>
                        <span>Emergency: {doctor.emergency}</span>
                      </div>
                    )}
                    <div className="contact-item">
                      <span className="contact-icon">📧</span>
                      <span>{doctor.email}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">🕒</span>
                      <span>{doctor.availability}</span>
                    </div>
                  </div>

                  <div className="doctor-actions">
                    <button className="call-btn">📞 Call Now</button>
                    <button className="appointment-btn">📅 Book Appointment</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-doctors">
              <p>No veterinary doctors found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
