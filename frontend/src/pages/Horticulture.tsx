import React, { useState } from 'react';
import './Horticulture.css';

interface HorticultureInfo {
  name: string;
  icon: string;
  description: string;
  examples: string[];
  practices: string[];
  benefits: string[];
  techniques: string[];
  challenges: string[];
}

const horticultureData: Record<string, HorticultureInfo> = {
  fruits: {
    name: 'Fruits',
    icon: '🍎',
    description: 'Fruit cultivation involves growing edible fruits for fresh consumption, processing, and commercial purposes.',
    examples: ['Mango', 'Banana', 'Orange', 'Grapes', 'Pomegranate', 'Guava', 'Papaya', 'Coconut'],
    practices: [
      'Orchard establishment and layout planning',
      'Grafting and budding techniques',
      'Pruning and training systems',
      'Integrated pest and disease management',
      'Harvest timing and post-harvest handling'
    ],
    benefits: [
      'High nutritional value and vitamins',
      'Economic returns from commercial orchards',
      'Export potential for quality fruits',
      'Value addition through processing',
      'Employment generation in rural areas'
    ],
    techniques: [
      'Drip irrigation for water efficiency',
      'Canopy management for better light penetration',
      'Mulching for moisture conservation',
      'Organic farming practices',
      'Protected cultivation in greenhouses'
    ],
    challenges: [
      'Climate change affecting fruit quality',
      'Post-harvest losses during transportation',
      'Market price fluctuations',
      'Pest and disease management',
      'Water scarcity in drought-prone areas'
    ]
  },
  vegetables: {
    name: 'Vegetables',
    icon: '🥬',
    description: 'Vegetable cultivation focuses on growing edible plant parts including leaves, roots, stems, and pods.',
    examples: ['Tomato', 'Onion', 'Potato', 'Cabbage', 'Cauliflower', 'Brinjal', 'Okra', 'Chili'],
    practices: [
      'Seed bed preparation and nursery management',
      'Transplanting and direct seeding',
      'Crop rotation and intercropping',
      'Nutrient management and fertilization',
      'Weed control and cultivation practices'
    ],
    benefits: [
      'Essential source of vitamins and minerals',
      'Short duration crops with quick returns',
      'Suitable for small-scale farming',
      'High demand in urban markets',
      'Processing opportunities for value addition'
    ],
    techniques: [
      'Raised bed cultivation for better drainage',
      'Polyhouse cultivation for year-round production',
      'Hydroponic and soilless culture',
      'Integrated nutrient management',
      'Precision farming techniques'
    ],
    challenges: [
      'Seasonal price variations',
      'High perishability and storage issues',
      'Intensive labor requirements',
      'Pest and disease pressure',
      'Market access and transportation'
    ]
  },
  flowers: {
    name: 'Flowers',
    icon: '🌸',
    description: 'Floriculture involves cultivation of flowers for ornamental, commercial, and cultural purposes.',
    examples: ['Rose', 'Jasmine', 'Marigold', 'Chrysanthemum', 'Tuberose', 'Gerbera', 'Carnation', 'Orchid'],
    practices: [
      'Greenhouse and polyhouse cultivation',
      'Cut flower production and handling',
      'Flower arrangement and packaging',
      'Post-harvest treatments and storage',
      'Marketing and distribution systems'
    ],
    benefits: [
      'High economic returns per unit area',
      'Export potential for cut flowers',
      'Cultural and religious significance',
      'Aesthetic and environmental benefits',
      'Employment in floriculture industry'
    ],
    techniques: [
      'Controlled environment agriculture',
      'Tissue culture propagation',
      'Growth regulators for quality improvement',
      'Cold storage and preservation',
      'Automated irrigation systems'
    ],
    challenges: [
      'High initial investment costs',
      'Technical expertise requirements',
      'Market demand fluctuations',
      'Quality maintenance during transport',
      'Competition from imported flowers'
    ]
  },
  trees: {
    name: 'Trees',
    icon: '🌳',
    description: 'Tree cultivation includes fruit trees, timber trees, and multipurpose trees for various benefits.',
    examples: ['Teak', 'Eucalyptus', 'Neem', 'Banyan', 'Peepal', 'Mahogany', 'Sandalwood', 'Bamboo'],
    practices: [
      'Site selection and soil preparation',
      'Nursery raising and transplanting',
      'Spacing and plantation layout',
      'Pruning and maintenance operations',
      'Harvesting and utilization planning'
    ],
    benefits: [
      'Carbon sequestration and climate mitigation',
      'Timber and non-timber forest products',
      'Soil conservation and erosion control',
      'Biodiversity conservation',
      'Aesthetic and recreational value'
    ],
    techniques: [
      'Agroforestry systems integration',
      'Clonal propagation methods',
      'Silvicultural practices',
      'Integrated pest management',
      'Sustainable harvesting practices'
    ],
    challenges: [
      'Long gestation period for returns',
      'Land availability and tenure issues',
      'Climate change impacts',
      'Pest and disease management',
      'Market linkages for forest products'
    ]
  },
  shrubs: {
    name: 'Shrubs',
    icon: '🌿',
    description: 'Shrub cultivation involves growing woody plants smaller than trees for landscaping and commercial purposes.',
    examples: ['Hibiscus', 'Bougainvillea', 'Ixora', 'Croton', 'Duranta', 'Lantana', 'Oleander', 'Azalea'],
    practices: [
      'Landscape design and planning',
      'Propagation through cuttings',
      'Pruning and shaping techniques',
      'Soil preparation and planting',
      'Maintenance and care practices'
    ],
    benefits: [
      'Landscaping and beautification',
      'Low maintenance requirements',
      'Soil erosion control',
      'Wildlife habitat creation',
      'Air purification benefits'
    ],
    techniques: [
      'Layering and grafting methods',
      'Container cultivation',
      'Topiary and hedge formation',
      'Integrated landscape management',
      'Water-efficient irrigation'
    ],
    challenges: [
      'Seasonal growth variations',
      'Pruning and maintenance costs',
      'Pest and disease susceptibility',
      'Site-specific adaptation',
      'Market demand for ornamental plants'
    ]
  },
  ornamental: {
    name: 'Ornamental Plants',
    icon: '🪴',
    description: 'Ornamental plant cultivation focuses on plants grown primarily for decorative purposes in gardens and interiors.',
    examples: ['Coleus', 'Caladium', 'Ferns', 'Palms', 'Succulents', 'Foliage plants', 'Bonsai', 'Cacti'],
    practices: [
      'Indoor and outdoor plant cultivation',
      'Container gardening techniques',
      'Plant propagation and multiplication',
      'Aesthetic arrangement and display',
      'Specialized care and maintenance'
    ],
    benefits: [
      'Interior decoration and ambiance',
      'Stress reduction and mental health',
      'Air quality improvement',
      'Educational and therapeutic value',
      'Commercial nursery opportunities'
    ],
    techniques: [
      'Tissue culture propagation',
      'Hydroponics and soilless culture',
      'Growth medium optimization',
      'Light and temperature control',
      'Specialized fertilization programs'
    ],
    challenges: [
      'Specific environmental requirements',
      'Pest and disease management',
      'Seasonal demand variations',
      'Transportation and handling',
      'Consumer awareness and education'
    ]
  }
};

const Horticulture: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fruits');

  const currentCategory = horticultureData[activeTab];

  return (
    <div className="horticulture-page">
      <div className="container">
        <div className="horticulture-header">
          <h1>🌿 Horticulture</h1>
          <p className="horticulture-definition">
            Horticulture is the art and science of cultivating fruits, vegetables, flowers, trees, shrubs, and ornamental plants. 
            It encompasses various practices related to the cultivation of garden crops and is generally associated with more 
            professional and technical aspects of plant cultivation on a smaller and more controlled scale than agronomy.
          </p>
        </div>

        <div className="horticulture-tabs">
          {Object.entries(horticultureData).map(([key, category]) => (
            <button
              key={key}
              className={`tab-button ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="category-content">
          <div className="category-header">
            <div className="category-title">
              <span className="category-icon-large">{currentCategory.icon}</span>
              <h2>{currentCategory.name}</h2>
            </div>
            <p className="category-description">{currentCategory.description}</p>
          </div>

          <div className="category-details-grid">
            <div className="detail-card">
              <h3>🌱 Common Examples</h3>
              <div className="examples-grid">
                {currentCategory.examples.map((example, index) => (
                  <span key={index} className="example-tag">{example}</span>
                ))}
              </div>
            </div>

            <div className="detail-card">
              <h3>🔧 Cultivation Practices</h3>
              <ul>
                {currentCategory.practices.map((practice, index) => (
                  <li key={index}>{practice}</li>
                ))}
              </ul>
            </div>

            <div className="detail-card">
              <h3>✨ Benefits</h3>
              <ul>
                {currentCategory.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="detail-card">
              <h3>🛠️ Modern Techniques</h3>
              <ul>
                {currentCategory.techniques.map((technique, index) => (
                  <li key={index}>{technique}</li>
                ))}
              </ul>
            </div>

            <div className="detail-card">
              <h3>⚠️ Challenges</h3>
              <ul>
                {currentCategory.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="horticulture-footer">
          <div className="info-banner">
            <h3>🌺 Horticulture Excellence</h3>
            <p>
              Horticulture combines traditional knowledge with modern scientific techniques to achieve 
              sustainable production of high-quality crops. It plays a crucial role in food security, 
              environmental conservation, and economic development while enhancing the aesthetic value 
              of our surroundings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horticulture;
