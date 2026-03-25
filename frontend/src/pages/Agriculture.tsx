import React, { useState } from 'react';
import './Agriculture.css';

interface CropInfo {
  name: string;
  icon: string;
  description: string;
  varieties: string[];
  season: string;
  soilType: string;
  climate: string;
  diseases: string[];
  tips: string[];
}

const cropData: Record<string, CropInfo> = {
  rice: {
    name: 'Rice',
    icon: '🌾',
    description: 'Rice cultivation is a water-intensive, labor-intensive process requiring warm temperatures, high humidity, and well-managed irrigation, with methods ranging from traditional flooding to modern direct-seeded and SRI techniques.',
    varieties: [
      'Long-grain: Basmati, Jasmine (aromatic and fluffy)',
      'Medium-grain: Arborio, Calrose (tender and moist)', 
      'Short-grain: Sushi rice, glutinous rice (plump and sticky)',
      'Specialty: Brown rice (retains bran, more nutritious)',
      'Local varieties: Ponni, Samba, Kuruvai, Thaladi, ADT-43, CO-47'
    ],
    season: 'Primarily Kharif crop (sown with monsoon onset). Some regions cultivate Rabi rice using irrigation. Requires careful timing for adequate water during panicle initiation and flowering stages.',
    soilType: 'Prefers fertile, well-drained clay or loamy soils that can retain water for flooded cultivation method. Grows from below sea level to 2000 meters above sea level.',
    climate: 'Thrives in tropical and subtropical climates with optimal day temperatures of 25–33°C, night temperatures of 15–20°C, high humidity, and annual rainfall exceeding 100 cm (irrigation can compensate for lower rainfall).',
    diseases: [
      'Blast - fungal disease affecting leaves and panicles',
      'Brown spot - causes brown lesions on leaves',
      'Sheath blight - affects leaf sheaths and stems',
      'Bacterial leaf blight - bacterial infection',
      'Various pest attacks requiring integrated management'
    ],
    tips: [
      '1. Land Preparation: Fields are plowed to loosen soil and leveled for uniform water distribution. Puddling involves tilling soil in standing water to create soft muddy bed that reduces water loss',
      '2. Seed Selection & Nursery: Select high-yielding, disease-resistant seeds. Seeds are sown in prepared nursery bed and raised for 20–30 days with proper seed treatment for better germination',
      '3. Transplanting: Young seedlings (20-30 days old) are uprooted and transplanted into puddled fields with proper spacing of 20–25 cm. Direct seeding is an alternative method used in some regions',
      '4. Water Management: Maintain 5–10 cm of standing water during most growing season. Proper drainage management later prevents lodging and ensures healthy growth',
      '5. Nutrient & Weed Management: Apply fertilizers (nitrogen, phosphorus, potassium) at different growth stages. Use manual or chemical weed control methods as needed',
      '6. Growth & Flowering: Monitor tiller formation, panicle development, pollination, and grain filling stages. Ensure adequate water and nutrients during critical growth periods',
      '7. Maturity Stage: Grains change from green to golden yellow. Drain fields 7–10 days before harvest to facilitate harvesting and prevent grain quality deterioration',
      '8. Harvesting: Harvest when 80–85% of grains are mature using sickles or machines. Follow with threshing and drying grains to about 14% moisture for safe storage',
      '9. Post-Harvest Processing: Clean, mill (to produce white or brown rice), and store in dry, pest-free conditions. Proper storage maintains grain quality and prevents losses'
    ]
  },
  millets: {
    name: 'Millets',
    icon: '🌰',
    description: 'Nutritious small-seeded cereals that are drought-resistant and climate-resilient.',
    varieties: ['Pearl Millet', 'Finger Millet (Ragi)', 'Foxtail Millet', 'Little Millet', 'Barnyard Millet'],
    season: 'Kharif (June-September) & Summer (February-May)',
    soilType: 'Well-drained sandy loam to clay loam soil',
    climate: 'Semi-arid regions with 400-600mm rainfall',
    diseases: ['Downy mildew', 'Blast', 'Smut', 'Ergot'],
    tips: [
      'Drought-tolerant, requires minimal water',
      'Rich in nutrients - iron, calcium, fiber',
      'Intercrop with legumes for soil health',
      'Store properly to prevent pest infestation'
    ]
  },
  sugarcane: {
    name: 'Sugarcane',
    icon: '🎋',
    description: 'Major cash crop of Tamil Nadu, primarily grown in delta regions with assured irrigation.',
    varieties: ['CO-86032', 'COC-671', 'CO-94012', 'CO-0238', 'CO-99004'],
    season: 'Year-round planting, 12-18 months crop cycle',
    soilType: 'Deep, well-drained fertile soil with pH 6.0-7.5',
    climate: 'Tropical climate with 1500-2500mm rainfall',
    diseases: ['Red rot', 'Smut', 'Wilt', 'Mosaic virus', 'Scale insects'],
    tips: [
      'Plant disease-free setts',
      'Maintain proper spacing (90cm rows)',
      'Apply balanced fertilizers',
      'Ensure adequate irrigation throughout'
    ]
  },
  pulses: {
    name: 'Pulses',
    icon: '🫘',
    description: 'Protein-rich legumes that improve soil fertility through nitrogen fixation.',
    varieties: ['Black gram', 'Green gram', 'Red gram', 'Bengal gram', 'Cowpea', 'Field pea'],
    season: 'Rabi (October-March) & Summer (February-May)',
    soilType: 'Well-drained loamy soil with good organic matter',
    climate: 'Cool, dry weather during flowering and pod formation',
    diseases: ['Powdery mildew', 'Yellow mosaic virus', 'Anthracnose', 'Pod borer'],
    tips: [
      'Inoculate seeds with Rhizobium',
      'Avoid waterlogging conditions',
      'Use integrated pest management',
      'Harvest at proper maturity for quality'
    ]
  },
  cotton: {
    name: 'Cotton',
    icon: '🌸',
    description: 'Important fiber crop grown in western and southern districts of Tamil Nadu.',
    varieties: ['MCU-5', 'SVPR-2', 'KC-2', 'Suraj', 'Bt Cotton varieties'],
    season: 'Kharif (June-October)',
    soilType: 'Black cotton soil, red soil with good drainage',
    climate: 'Semi-arid climate with 500-1000mm rainfall',
    diseases: ['Bollworm', 'Whitefly', 'Aphids', 'Wilt', 'Leaf curl virus'],
    tips: [
      'Use certified Bt cotton seeds',
      'Maintain proper plant population',
      'Regular monitoring for pest attacks',
      'Harvest cotton at right moisture content'
    ]
  },
  groundnut: {
    name: 'Groundnut',
    icon: '🥜',
    description: 'Major oilseed crop providing both oil and protein, grown across Tamil Nadu.',
    varieties: ['TMV-2', 'VRI-2', 'CO-2', 'ALR-2', 'TMV-7', 'VRI-3'],
    season: 'Kharif (June-September) & Rabi (November-February)',
    soilType: 'Well-drained sandy loam soil with pH 6.0-7.0',
    climate: 'Warm climate with 500-750mm well-distributed rainfall',
    diseases: ['Tikka disease', 'Rust', 'Bud necrosis', 'Collar rot', 'Aphids'],
    tips: [
      'Use calcium-rich gypsum for pod development',
      'Maintain soil moisture during pegging',
      'Practice crop rotation with cereals',
      'Proper curing before storage'
    ]
  },
  horticulture: {
    name: 'Horticultural Crops',
    icon: '🍎',
    description: 'Diverse range of fruits, vegetables, spices, and plantation crops grown in Tamil Nadu.',
    varieties: ['Mango', 'Banana', 'Coconut', 'Turmeric', 'Cardamom', 'Tomato', 'Onion', 'Chili'],
    season: 'Year-round depending on crop type',
    soilType: 'Varies by crop - well-drained fertile soil preferred',
    climate: 'Tropical to temperate based on altitude and location',
    diseases: ['Fruit fly', 'Powdery mildew', 'Bacterial wilt', 'Viral diseases'],
    tips: [
      'Use drip irrigation for water efficiency',
      'Practice integrated nutrient management',
      'Post-harvest handling is crucial',
      'Value addition increases profitability'
    ]
  },
  pricePrediction: {
    name: 'Price Prediction',
    icon: '💰',
    description: 'Get real-time market price predictions and trends for major agricultural commodities in Tamil Nadu.',
    varieties: [],
    season: '',
    soilType: '',
    climate: '',
    diseases: [],
    tips: []
  }
};

const Agriculture: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rice');
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [priceMode, setPriceMode] = useState<'buy' | 'sell'>('sell');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [showAIPrediction, setShowAIPrediction] = useState(false);

  const currentCrop = cropData[activeTab];

  // Generate historical data for last 10 years
  const generateHistoricalData = (crop: string, year: number) => {
    const basePrice = {
      rice: 2400,
      millets: 2800,
      sugarcane: 2700,
      pulses: 5500,
      cotton: 7500,
      groundnut: 4800
    }[crop] || 2500;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const yearFactor = (year - 2014) * 0.05; // 5% increase per year
    
    return months.map((month, index) => {
      const seasonalVariation = Math.sin((index / 12) * Math.PI * 2) * 200;
      const randomVariation = (Math.random() - 0.5) * 100;
      const buyPrice = Math.round(basePrice * (1 + yearFactor) + seasonalVariation + randomVariation);
      const sellPrice = Math.round(buyPrice * 1.08); // 8% markup for sell price
      
      return {
        month,
        buyPrice,
        sellPrice
      };
    });
  };

  // AI-powered prediction for next year
  const generateAIPrediction = (crop: string) => {
    const currentYearData = generateHistoricalData(crop, 2024);
    const avgCurrentPrice = currentYearData.reduce((sum, d) => sum + d.sellPrice, 0) / 12;
    
    // AI prediction factors: trend, seasonality, market conditions
    const trendFactor = 1.07; // 7% growth trend
    const marketVolatility = 0.03; // 3% volatility
    
    return currentYearData.map((data, index) => {
      const predictedPrice = Math.round(
        data.sellPrice * trendFactor * (1 + (Math.random() - 0.5) * marketVolatility)
      );
      return {
        month: data.month,
        buyPrice: Math.round(predictedPrice / 1.08),
        sellPrice: predictedPrice
      };
    });
  };

  // Price data for graphical representation
  const priceHistory: Record<string, { month: string; buyPrice: number; sellPrice: number }[]> = {
    rice: [
      { month: 'Jan', buyPrice: 2600, sellPrice: 2800 },
      { month: 'Feb', buyPrice: 2650, sellPrice: 2850 },
      { month: 'Mar', buyPrice: 2700, sellPrice: 2900 },
      { month: 'Apr', buyPrice: 2750, sellPrice: 2950 },
      { month: 'May', buyPrice: 2800, sellPrice: 3000 },
      { month: 'Jun', buyPrice: 2850, sellPrice: 3050 },
      { month: 'Jul (Predicted)', buyPrice: 2950, sellPrice: 3150 }
    ],
    millets: [
      { month: 'Jan', buyPrice: 2900, sellPrice: 3100 },
      { month: 'Feb', buyPrice: 2950, sellPrice: 3150 },
      { month: 'Mar', buyPrice: 3000, sellPrice: 3200 },
      { month: 'Apr', buyPrice: 3050, sellPrice: 3250 },
      { month: 'May', buyPrice: 3100, sellPrice: 3300 },
      { month: 'Jun', buyPrice: 3150, sellPrice: 3350 },
      { month: 'Jul (Predicted)', buyPrice: 3250, sellPrice: 3450 }
    ],
    sugarcane: [
      { month: 'Jan', buyPrice: 2850, sellPrice: 3000 },
      { month: 'Feb', buyPrice: 2900, sellPrice: 3050 },
      { month: 'Mar', buyPrice: 2950, sellPrice: 3100 },
      { month: 'Apr', buyPrice: 2980, sellPrice: 3130 },
      { month: 'May', buyPrice: 3000, sellPrice: 3150 },
      { month: 'Jun', buyPrice: 3020, sellPrice: 3170 },
      { month: 'Jul (Predicted)', buyPrice: 3050, sellPrice: 3200 }
    ],
    pulses: [
      { month: 'Jan', buyPrice: 5800, sellPrice: 6200 },
      { month: 'Feb', buyPrice: 5900, sellPrice: 6300 },
      { month: 'Mar', buyPrice: 6000, sellPrice: 6400 },
      { month: 'Apr', buyPrice: 6150, sellPrice: 6550 },
      { month: 'May', buyPrice: 6300, sellPrice: 6700 },
      { month: 'Jun', buyPrice: 6450, sellPrice: 6850 },
      { month: 'Jul (Predicted)', buyPrice: 6800, sellPrice: 7200 }
    ],
    cotton: [
      { month: 'Jan', buyPrice: 8200, sellPrice: 8600 },
      { month: 'Feb', buyPrice: 8150, sellPrice: 8550 },
      { month: 'Mar', buyPrice: 8100, sellPrice: 8500 },
      { month: 'Apr', buyPrice: 8000, sellPrice: 8400 },
      { month: 'May', buyPrice: 7900, sellPrice: 8300 },
      { month: 'Jun', buyPrice: 7800, sellPrice: 8200 },
      { month: 'Jul (Predicted)', buyPrice: 7500, sellPrice: 7900 }
    ],
    groundnut: [
      { month: 'Jan', buyPrice: 4900, sellPrice: 5200 },
      { month: 'Feb', buyPrice: 5000, sellPrice: 5300 },
      { month: 'Mar', buyPrice: 5100, sellPrice: 5400 },
      { month: 'Apr', buyPrice: 5200, sellPrice: 5500 },
      { month: 'May', buyPrice: 5300, sellPrice: 5600 },
      { month: 'Jun', buyPrice: 5400, sellPrice: 5700 },
      { month: 'Jul (Predicted)', buyPrice: 5650, sellPrice: 5950 }
    ]
  };

  const getCurrentPrices = (crop: string) => {
    const history = priceHistory[crop];
    const current = history[history.length - 2];
    const predicted = history[history.length - 1];
    return { current, predicted };
  };

  const getMaxPrice = (crop: string) => {
    const history = priceHistory[crop];
    return Math.max(...history.map(h => Math.max(h.buyPrice, h.sellPrice)));
  };

  return (
    <div className={`agriculture-page ${activeTab === 'rice' ? 'rice-page' : ''} ${activeTab === 'millets' ? 'millets-page' : ''} ${activeTab === 'sugarcane' ? 'sugarcane-page' : ''} ${activeTab === 'pulses' ? 'pulses-page' : ''} ${activeTab === 'cotton' ? 'cotton-page' : ''} ${activeTab === 'groundnut' ? 'groundnut-page' : ''} ${activeTab === 'horticulture' ? 'horticulture-page-bg' : ''}`}>
      <div className="container">
        <div className="agriculture-header">
          <h1>🌱 Agriculture in Tamil Nadu</h1>
          <p>Explore Tamil Nadu's major crops and their cultivation practices</p>
        </div>

        <div className="crop-tabs">
          {Object.entries(cropData).map(([key, crop]) => (
            <button
              key={key}
              className={`tab-button ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <span className="tab-icon">{crop.icon}</span>
              <span className="tab-name">{crop.name}</span>
            </button>
          ))}
        </div>

        <div className={`crop-content ${activeTab === 'rice' ? 'rice-content' : ''} ${activeTab === 'millets' ? 'millets-content' : ''} ${activeTab === 'sugarcane' ? 'sugarcane-content' : ''} ${activeTab === 'pulses' ? 'pulses-content' : ''} ${activeTab === 'cotton' ? 'cotton-content' : ''} ${activeTab === 'groundnut' ? 'groundnut-content' : ''} ${activeTab === 'horticulture' ? 'horticulture-content-bg' : ''}`}>
          {activeTab === 'pricePrediction' ? (
            <div className="price-prediction-content">
              <div className="crop-header">
                <div className="crop-title">
                  <span className="crop-icon-large">💰</span>
                  <h2>Price Prediction</h2>
                </div>
                <p className="crop-description">
                  Get real-time market price predictions and trends for major agricultural commodities in Tamil Nadu.
                </p>
              </div>

              <div className="crop-selector">
                <h3>Select Crop:</h3>
                <div className="crop-buttons">
                  {Object.entries(cropData)
                    .filter(([key]) => key !== 'pricePrediction')
                    .map(([key, crop]) => (
                      <button
                        key={key}
                        className={`crop-select-btn ${selectedCrop === key ? 'active' : ''}`}
                        onClick={() => setSelectedCrop(key)}
                      >
                        <span className="btn-icon">{crop.icon}</span>
                        <span className="btn-text">{crop.name}</span>
                      </button>
                    ))}
                </div>
              </div>

              <div className="price-mode-toggle">
                <button
                  className={`mode-btn ${priceMode === 'sell' ? 'active' : ''}`}
                  onClick={() => setPriceMode('sell')}
                >
                  📤 Sell Price
                </button>
                <button
                  className={`mode-btn ${priceMode === 'buy' ? 'active' : ''}`}
                  onClick={() => setPriceMode('buy')}
                >
                  📥 Buy Price
                </button>
              </div>

              {/* Year Selector and AI Toggle */}
              <div className="year-selector-container">
                <div className="year-selector">
                  <label htmlFor="yearSelect">Select Year:</label>
                  <select
                    id="yearSelect"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="ai-toggle">
                  <button
                    className={`ai-btn ${showAIPrediction ? 'active' : ''}`}
                    onClick={() => setShowAIPrediction(!showAIPrediction)}
                  >
                    🤖 {showAIPrediction ? 'Hide' : 'Show'} AI Prediction (2025)
                  </button>
                </div>
              </div>

              {/* Line Graph */}
              <div className="line-graph-container">
                <h3>
                  {cropData[selectedCrop].name} - Monthly Price Trend ({selectedYear})
                  {showAIPrediction && ' vs AI Prediction (2025)'}
                </h3>
                <div className="line-graph-wrapper">
                  <div className="line-graph">
                    <svg width="100%" height="400" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map(i => (
                        <line
                          key={`grid-${i}`}
                          x1="50"
                          y1={50 + i * 70}
                          x2="950"
                          y2={50 + i * 70}
                          stroke="#e0e0e0"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Historical Data Line */}
                      {(() => {
                        const data = generateHistoricalData(selectedCrop, selectedYear);
                        const prices = data.map(d => priceMode === 'sell' ? d.sellPrice : d.buyPrice);
                        const maxPrice = Math.max(...prices);
                        const minPrice = Math.min(...prices);
                        const priceRange = maxPrice - minPrice;
                        
                        const points = data.map((d, i) => {
                          const x = 50 + (i * 75);
                          const price = priceMode === 'sell' ? d.sellPrice : d.buyPrice;
                          const y = 330 - ((price - minPrice) / priceRange) * 280;
                          return `${x},${y}`;
                        }).join(' ');

                        return (
                          <>
                            <polyline
                              points={points}
                              fill="none"
                              stroke="#4caf50"
                              strokeWidth="3"
                            />
                            {data.map((d, i) => {
                              const x = 50 + (i * 75);
                              const price = priceMode === 'sell' ? d.sellPrice : d.buyPrice;
                              const y = 330 - ((price - minPrice) / priceRange) * 280;
                              return (
                                <g key={`point-${i}`}>
                                  <circle cx={x} cy={y} r="5" fill="#4caf50" />
                                  <text x={x} y={y - 10} textAnchor="middle" fontSize="12" fill="#333">
                                    ₹{price}
                                  </text>
                                  <text x={x} y={370} textAnchor="middle" fontSize="12" fill="#666">
                                    {d.month}
                                  </text>
                                </g>
                              );
                            })}
                          </>
                        );
                      })()}

                      {/* AI Prediction Line */}
                      {showAIPrediction && (() => {
                        const data = generateAIPrediction(selectedCrop);
                        const historicalData = generateHistoricalData(selectedCrop, selectedYear);
                        const allPrices = [
                          ...historicalData.map(d => priceMode === 'sell' ? d.sellPrice : d.buyPrice),
                          ...data.map(d => priceMode === 'sell' ? d.sellPrice : d.buyPrice)
                        ];
                        const maxPrice = Math.max(...allPrices);
                        const minPrice = Math.min(...allPrices);
                        const priceRange = maxPrice - minPrice;
                        
                        const points = data.map((d, i) => {
                          const x = 50 + (i * 75);
                          const price = priceMode === 'sell' ? d.sellPrice : d.buyPrice;
                          const y = 330 - ((price - minPrice) / priceRange) * 280;
                          return `${x},${y}`;
                        }).join(' ');

                        return (
                          <>
                            <polyline
                              points={points}
                              fill="none"
                              stroke="#ff9800"
                              strokeWidth="3"
                              strokeDasharray="5,5"
                            />
                            {data.map((d, i) => {
                              const x = 50 + (i * 75);
                              const price = priceMode === 'sell' ? d.sellPrice : d.buyPrice;
                              const y = 330 - ((price - minPrice) / priceRange) * 280;
                              return (
                                <circle key={`ai-point-${i}`} cx={x} cy={y} r="4" fill="#ff9800" />
                              );
                            })}
                          </>
                        );
                      })()}

                      {/* Legend */}
                      <g transform="translate(750, 20)">
                        <line x1="0" y1="0" x2="30" y2="0" stroke="#4caf50" strokeWidth="3" />
                        <text x="35" y="5" fontSize="14" fill="#333">{selectedYear} Actual</text>
                        {showAIPrediction && (
                          <>
                            <line x1="0" y1="20" x2="30" y2="20" stroke="#ff9800" strokeWidth="3" strokeDasharray="5,5" />
                            <text x="35" y="25" fontSize="14" fill="#333">2025 AI Prediction</text>
                          </>
                        )}
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              {showAIPrediction && (
                <div className="ai-insights">
                  <h3>🤖 AI-Powered Market Insights</h3>
                  <div className="insights-grid">
                    <div className="insight-card">
                      <h4>📈 Trend Analysis</h4>
                      <p>Based on historical data and market patterns, prices are expected to increase by 7% in 2025 due to increased demand and production costs.</p>
                    </div>
                    <div className="insight-card">
                      <h4>🌦️ Weather Impact</h4>
                      <p>Favorable monsoon predictions suggest stable supply, which may moderate price increases in the second half of 2025.</p>
                    </div>
                    <div className="insight-card">
                      <h4>💡 Recommendation</h4>
                      <p>Best selling period: March-May 2025. Consider storing produce if prices are below ₹{Math.round(generateAIPrediction(selectedCrop)[0].sellPrice * 0.95)}.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="price-chart-container">
                <h3>
                  {cropData[selectedCrop].name} - {priceMode === 'sell' ? 'Selling' : 'Buying'} Price Trend
                </h3>
                <div className="chart-wrapper">
                  <div className="chart">
                    {priceHistory[selectedCrop].map((data, index) => {
                      const price = priceMode === 'sell' ? data.sellPrice : data.buyPrice;
                      const maxPrice = getMaxPrice(selectedCrop);
                      const height = (price / maxPrice) * 100;
                      const isPredicted = data.month.includes('Predicted');
                      
                      return (
                        <div key={index} className="chart-bar-container">
                          <div className="chart-bar-wrapper">
                            <div
                              className={`chart-bar ${isPredicted ? 'predicted' : ''}`}
                              style={{ height: `${height}%` }}
                            >
                              <span className="bar-value">₹{price}</span>
                            </div>
                          </div>
                          <div className="chart-label">{data.month}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="price-comparison">
                <div className="comparison-card current">
                  <h4>Current {priceMode === 'sell' ? 'Selling' : 'Buying'} Price</h4>
                  <div className="price-value">
                    ₹{priceMode === 'sell' 
                      ? getCurrentPrices(selectedCrop).current.sellPrice 
                      : getCurrentPrices(selectedCrop).current.buyPrice}
                    <span className="unit">/quintal</span>
                  </div>
                  <p className="price-date">As of June 2024</p>
                </div>
                <div className="comparison-arrow">→</div>
                <div className="comparison-card predicted">
                  <h4>Predicted {priceMode === 'sell' ? 'Selling' : 'Buying'} Price</h4>
                  <div className="price-value">
                    ₹{priceMode === 'sell' 
                      ? getCurrentPrices(selectedCrop).predicted.sellPrice 
                      : getCurrentPrices(selectedCrop).predicted.buyPrice}
                    <span className="unit">/quintal</span>
                  </div>
                  <p className="price-date">Expected July 2024</p>
                </div>
              </div>

              <div className="prediction-info">
                <div className="info-box">
                  <h4>📊 About Price Predictions</h4>
                  <p>
                    Our price predictions are based on historical market data, seasonal trends, 
                    weather patterns, and current market conditions. These predictions help farmers 
                    make informed decisions about when to sell their produce for maximum profit.
                  </p>
                </div>
                <div className="info-box">
                  <h4>⚠️ Important Note</h4>
                  <p>
                    Price predictions are estimates and actual market prices may vary based on 
                    supply-demand dynamics, government policies, and unforeseen market conditions. 
                    Always consult local market experts before making major decisions.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="crop-header">
                <div className="crop-title">
                  <span className="crop-icon-large">{currentCrop.icon}</span>
                  <h2>{currentCrop.name}</h2>
                </div>
                <p className="crop-description">{currentCrop.description}</p>
              </div>

              <div className="crop-details-grid">
                <div className="detail-card">
                  <h3>🌱 Popular Varieties</h3>
                  <ul>
                    {currentCrop.varieties.map((variety, index) => (
                      <li key={index}>{variety}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>📅 Growing Season</h3>
                  <p>{currentCrop.season}</p>
                </div>

                <div className="detail-card">
                  <h3>🌍 Soil Requirements</h3>
                  <p>{currentCrop.soilType}</p>
                </div>

                <div className="detail-card">
                  <h3>�️ Climate Needs</h3>
                  <p>{currentCrop.climate}</p>
                </div>

                <div className="detail-card">
                  <h3>🦠 Common Diseases</h3>
                  <ul>
                    {currentCrop.diseases.map((disease, index) => (
                      <li key={index}>{disease}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3>💡 Cultivation Tips</h3>
                  <ul>
                    {currentCrop.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="agriculture-footer">
          <div className="info-banner">
            <h3>🌾 Tamil Nadu Agriculture</h3>
            <p>
              Tamil Nadu's diverse agro-climatic conditions support cultivation of various crops 
              across different seasons. The state's agriculture is characterized by intensive 
              cultivation, high productivity, and adoption of modern farming techniques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agriculture;
