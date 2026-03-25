import React, { useState, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import './Livestock.css';

interface LivestockListing {
  id: number;
  breed: string;
  age: string;
  gender: string;
  price: number;
  weight?: string;
  location: string;
  seller: string;
  phone: string;
  description: string;
  healthStatus: string;
  image: string;
}

interface AnimalCategory {
  id: string;
  name: string;
  icon: string;
  listings: LivestockListing[];
}

const livestockData: AnimalCategory[] = [
  {
    id: 'goats',
    name: 'Goats',
    icon: '🐐',
    listings: [
      {
        id: 1,
        breed: 'Boer Goat',
        age: '1.5 years',
        gender: 'Male',
        price: 18000,
        weight: '45 kg',
        location: 'Coimbatore, Tamil Nadu',
        seller: 'Rajesh Kumar',
        phone: '+91 98XXX XXXXX',
        description: 'Healthy Boer goat, excellent for meat production',
        healthStatus: 'Vaccinated, Dewormed',
        image: '🐐'
      },
      {
        id: 2,
        breed: 'Jamunapari Goat',
        age: '2 years',
        gender: 'Female',
        price: 22000,
        weight: '50 kg',
        location: 'Salem, Tamil Nadu',
        seller: 'Murugan S',
        phone: '+91 99XXX XXXXX',
        description: 'High milk yielding Jamunapari breed',
        healthStatus: 'Fully vaccinated',
        image: '🐐'
      },
      {
        id: 3,
        breed: 'Sirohi Goat',
        age: '1 year',
        gender: 'Male',
        price: 15000,
        weight: '38 kg',
        location: 'Madurai, Tamil Nadu',
        seller: 'Selvam P',
        phone: '+91 97XXX XXXXX',
        description: 'Hardy Sirohi breed, good for meat',
        healthStatus: 'Healthy, vaccinated',
        image: '🐐'
      },
      {
        id: 4,
        breed: 'Osmanabadi Goat',
        age: '1.5 years',
        gender: 'Female',
        price: 20000,
        weight: '42 kg',
        location: 'Erode, Tamil Nadu',
        seller: 'Karthik R',
        phone: '+91 96XXX XXXXX',
        description: 'Dual purpose breed for milk and meat',
        healthStatus: 'Vaccinated, excellent health',
        image: '🐐'
      }
    ]
  },
  {
    id: 'cows',
    name: 'Cows',
    icon: '🐄',
    listings: [
      {
        id: 5,
        breed: 'Jersey Cow',
        age: '3 years',
        gender: 'Female',
        price: 65000,
        weight: '400 kg',
        location: 'Trichy, Tamil Nadu',
        seller: 'Anand Dairy Farm',
        phone: '+91 94XXX XXXXX',
        description: 'High milk yielding Jersey cow, 15L per day',
        healthStatus: 'Vaccinated, AI bred',
        image: '🐄'
      },
      {
        id: 6,
        breed: 'Holstein Friesian',
        age: '4 years',
        gender: 'Female',
        price: 85000,
        weight: '550 kg',
        location: 'Namakkal, Tamil Nadu',
        seller: 'Green Valley Dairy',
        phone: '+91 93XXX XXXXX',
        description: 'Premium HF cow, 20L milk per day',
        healthStatus: 'Fully vaccinated, excellent health',
        image: '🐄'
      },
      {
        id: 7,
        breed: 'Gir Cow',
        age: '2.5 years',
        gender: 'Female',
        price: 55000,
        weight: '380 kg',
        location: 'Dindigul, Tamil Nadu',
        seller: 'Organic Farm Co.',
        phone: '+91 95XXX XXXXX',
        description: 'Indigenous Gir breed, A2 milk producer',
        healthStatus: 'Vaccinated, naturally bred',
        image: '🐄'
      },
      {
        id: 8,
        breed: 'Sahiwal Cow',
        age: '3.5 years',
        gender: 'Female',
        price: 60000,
        weight: '420 kg',
        location: 'Karur, Tamil Nadu',
        seller: 'Lakshmi Dairy',
        phone: '+91 92XXX XXXXX',
        description: 'Heat tolerant Sahiwal, 12L milk daily',
        healthStatus: 'Healthy, all vaccinations done',
        image: '🐄'
      }
    ]
  },
  {
    id: 'hens',
    name: 'Hens & Roosters',
    icon: '🐔',
    listings: [
      {
        id: 9,
        breed: 'Rhode Island Red',
        age: '8 months',
        gender: 'Female',
        price: 450,
        location: 'Chennai, Tamil Nadu',
        seller: 'Poultry Hub',
        phone: '+91 91XXX XXXXX',
        description: 'Excellent layer, 280 eggs per year',
        healthStatus: 'Vaccinated',
        image: '🐔'
      },
      {
        id: 10,
        breed: 'Kadaknath',
        age: '6 months',
        gender: 'Male',
        price: 800,
        location: 'Vellore, Tamil Nadu',
        seller: 'Black Chicken Farm',
        phone: '+91 90XXX XXXXX',
        description: 'Premium black meat chicken, high protein',
        healthStatus: 'Healthy, vaccinated',
        image: '🐓'
      },
      {
        id: 11,
        breed: 'Aseel',
        age: '1 year',
        gender: 'Male',
        price: 1200,
        location: 'Thanjavur, Tamil Nadu',
        seller: 'Country Chicken Farm',
        phone: '+91 89XXX XXXXX',
        description: 'Traditional fighting breed, strong and healthy',
        healthStatus: 'Excellent health',
        image: '🐓'
      },
      {
        id: 12,
        breed: 'Leghorn',
        age: '7 months',
        gender: 'Female',
        price: 400,
        location: 'Kanchipuram, Tamil Nadu',
        seller: 'Egg Farm Co.',
        phone: '+91 88XXX XXXXX',
        description: 'White egg layer, 300+ eggs annually',
        healthStatus: 'Vaccinated, healthy',
        image: '🐔'
      }
    ]
  },
  {
    id: 'poultry',
    name: 'Other Poultry',
    icon: '🦆',
    listings: [
      {
        id: 13,
        breed: 'Khaki Campbell Duck',
        age: '6 months',
        gender: 'Female',
        price: 600,
        location: 'Cuddalore, Tamil Nadu',
        seller: 'Duck Farm',
        phone: '+91 87XXX XXXXX',
        description: 'High egg production duck, 280 eggs/year',
        healthStatus: 'Vaccinated',
        image: '🦆'
      },
      {
        id: 14,
        breed: 'White Pekin Duck',
        age: '4 months',
        gender: 'Male',
        price: 550,
        location: 'Villupuram, Tamil Nadu',
        seller: 'Waterfowl Farm',
        phone: '+91 86XXX XXXXX',
        description: 'Meat duck, fast growing breed',
        healthStatus: 'Healthy, vaccinated',
        image: '🦆'
      },
      {
        id: 15,
        breed: 'Bronze Turkey',
        age: '8 months',
        gender: 'Male',
        price: 3500,
        weight: '8 kg',
        location: 'Tirunelveli, Tamil Nadu',
        seller: 'Turkey Farm',
        phone: '+91 85XXX XXXXX',
        description: 'Large bronze turkey for meat production',
        healthStatus: 'Vaccinated, excellent condition',
        image: '🦃'
      },
      {
        id: 16,
        breed: 'Embden Geese',
        age: '1 year',
        gender: 'Female',
        price: 2500,
        weight: '6 kg',
        location: 'Thoothukudi, Tamil Nadu',
        seller: 'Geese Farm',
        phone: '+91 84XXX XXXXX',
        description: 'White geese, good for meat and eggs',
        healthStatus: 'Healthy, vaccinated',
        image: '🪿'
      },
      {
        id: 17,
        breed: 'Guinea Fowl',
        age: '5 months',
        gender: 'Mixed',
        price: 350,
        location: 'Ramanathapuram, Tamil Nadu',
        seller: 'Exotic Birds Farm',
        phone: '+91 83XXX XXXXX',
        description: 'Hardy guinea fowl, pest control birds',
        healthStatus: 'Healthy',
        image: '🦜'
      },
      {
        id: 18,
        breed: 'Quail',
        age: '2 months',
        gender: 'Mixed',
        price: 80,
        location: 'Pudukkottai, Tamil Nadu',
        seller: 'Quail Farm',
        phone: '+91 82XXX XXXXX',
        description: 'Japanese quail for eggs and meat',
        healthStatus: 'Healthy batch',
        image: '🐦'
      }
    ]
  }
];

interface AuctionItem {
  id: number;
  name: string;
  breed: string;
  age: string;
  weight: string;
  basePrice: number;
  currentBid: number;
  image: string;
  description: string;
  seller: string;
  location: string;
}

const auctionItems: AuctionItem[] = [
  {
    id: 1,
    name: 'Premium Jersey Cow',
    breed: 'Jersey',
    age: '3 years',
    weight: '420 kg',
    basePrice: 70000,
    currentBid: 70000,
    image: '🐄',
    description: 'High milk yielding Jersey cow, 18L per day, excellent health',
    seller: 'Dairy Farm Co.',
    location: 'Coimbatore, Tamil Nadu'
  },
  {
    id: 2,
    name: 'Boer Goat Pair',
    breed: 'Boer',
    age: '1.5 years',
    weight: '45 kg each',
    basePrice: 35000,
    currentBid: 35000,
    image: '🐐',
    description: 'Healthy breeding pair, excellent meat quality',
    seller: 'Goat Farm',
    location: 'Salem, Tamil Nadu'
  }
];

const Livestock: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('goats');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuction, setShowAuction] = useState(false);
  
  // Auction State
  const [entryFeePaid, setEntryFeePaid] = useState(false);
  const [selectedAuctionItem, setSelectedAuctionItem] = useState<AuctionItem | null>(null);
  const [basePriceConfirmed, setBasePriceConfirmed] = useState(false);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [myBids, setMyBids] = useState<number[]>([]);
  const [auctionActive, setAuctionActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Streaming State
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState('');
  const [streamMode, setStreamMode] = useState<'viewer' | 'host'>('viewer');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Go Live Auth Modal State
  const [showGoLiveModal, setShowGoLiveModal] = useState(false);
  const [goLiveEmail, setGoLiveEmail] = useState('');
  const [goLivePassword, setGoLivePassword] = useState('');
  const [goLiveAuthError, setGoLiveAuthError] = useState('');
  const [goLiveAuthLoading, setGoLiveAuthLoading] = useState(false);
  const [showLiveStudio, setShowLiveStudio] = useState(false); // dedicated live studio view

  const { currentUser } = useAuth();

  // Cleanup stream on unmount
  // Attach stream to video element whenever isStreaming changes
  useEffect(() => {
    if (isStreaming && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [isStreaming]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleStartStream = async () => {
    setStreamError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'environment' },
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      streamRef.current = stream;
      setIsStreaming(true); // useEffect will attach stream to video after render
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        setStreamError('Camera/microphone access denied. Please allow access in your browser settings and reload.');
      } else if (err.name === 'NotFoundError') {
        setStreamError('No camera or microphone found on this device.');
      } else if (err.name === 'NotReadableError') {
        setStreamError('Camera is already in use by another application.');
      } else {
        setStreamError('Could not start stream: ' + err.message);
      }
    }
  };

  const handleStopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  const handleToggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = !audioTrack.enabled;
    }
  };

  const handleToggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = !videoTrack.enabled;
    }
  };

  const handleGoLiveClick = () => {
    if (currentUser) {
      setShowLiveStudio(true);
    } else {
      setShowGoLiveModal(true);
    }
  };

  const handleGoLiveAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setGoLiveAuthError('');
    setGoLiveAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth!, goLiveEmail, goLivePassword);
      setShowGoLiveModal(false);
      setShowLiveStudio(true);
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setGoLiveAuthError('Invalid email or password.');
      } else if (err.code === 'auth/user-not-found') {
        setGoLiveAuthError('No account found with this email.');
      } else {
        setGoLiveAuthError('Login failed. Please try again.');
      }
    }
    setGoLiveAuthLoading(false);
  };

  const handleExitStudio = () => {
    handleStopStream();
    setShowLiveStudio(false);
  };

  // Seller Farm Panel State
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  const getSellerListings = (sellerName: string) => {
    const results: (LivestockListing & { category: string; categoryIcon: string })[] = [];
    livestockData.forEach(cat => {
      cat.listings.forEach(listing => {
        if (listing.seller === sellerName) {
          results.push({ ...listing, category: cat.name, categoryIcon: cat.icon });
        }
      });
    });
    return results;
  };
  
  const currentCategory = livestockData.find(cat => cat.id === selectedCategory);

  const filteredListings = currentCategory?.listings.filter((listing: LivestockListing) =>
    listing.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  // Auction Timer Effect
  React.useEffect(() => {
    if (auctionActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setAuctionActive(false);
            setAuctionEnded(true);
            // Check if user is winner
            if (myBids.length > 0 && Math.max(...myBids) === currentBid) {
              setIsWinner(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [auctionActive, timeRemaining, myBids, currentBid]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handlePayEntryFee = () => {
    // Simulate payment
    setEntryFeePaid(true);
  };
  
  const handleSelectAuctionItem = (item: AuctionItem) => {
    setSelectedAuctionItem(item);
    setCurrentBid(item.currentBid);
    setShowTerms(true);
  };
  
  const handleConfirmBasePrice = () => {
    if (termsAccepted) {
      setBasePriceConfirmed(true);
      setAuctionActive(true);
      setTimeRemaining(300);
    }
  };
  
  const handlePlaceBid = () => {
    const bid = Number(bidAmount);
    if (bid > currentBid && bid >= (selectedAuctionItem?.basePrice || 0)) {
      setCurrentBid(bid);
      setMyBids([...myBids, bid]);
      setBidAmount('');
    }
  };
  
  const handleResetAuction = () => {
    setSelectedAuctionItem(null);
    setBasePriceConfirmed(false);
    setCurrentBid(0);
    setBidAmount('');
    setMyBids([]);
    setAuctionActive(false);
    setTimeRemaining(300);
    setAuctionEnded(false);
    setIsWinner(false);
    setTermsAccepted(false);
    setShowTerms(false);
  };

  return (
    <>
    <div className="livestock-page">
      <div className="container">
        <div className="livestock-header">
          <h1>🐄 Livestock Marketplace</h1>
          <p>Buy and sell quality livestock - Goats, Cows, Poultry & More</p>
        </div>

        <div className="main-tabs">
          <button
            className={`main-tab ${!showAuction ? 'active' : ''}`}
            onClick={() => setShowAuction(false)}
          >
            <span className="tab-icon">🛒</span>
            <span>Marketplace</span>
          </button>
          <button
            className={`main-tab ${showAuction ? 'active' : ''}`}
            onClick={() => setShowAuction(true)}
          >
            <span className="tab-icon">🔨</span>
            <span>Live Auction</span>
          </button>
          <button
            className="go-live-tab-btn"
            onClick={handleGoLiveClick}
          >
            <span className="go-live-dot"></span>
            Go Live
          </button>
        </div>

        {!showAuction ? (
          <>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by breed, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="animal-category-tabs">
              {livestockData.map((category) => (
                <button
                  key={category.id}
                  className={`animal-tab ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="animal-icon">{category.icon}</span>
                  <span className="animal-name">{category.name}</span>
                </button>
              ))}
            </div>

            <div className="listings-grid">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing: LivestockListing) => (
                  <div key={listing.id} className="listing-card">
                    <div className="listing-image">{listing.image}</div>
                    <div className="listing-info">
                      <h3 className="listing-breed">{listing.breed}</h3>
                      <div className="listing-details">
                        <div className="detail-row">
                          <span className="detail-label">Age:</span>
                          <span className="detail-value">{listing.age}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Gender:</span>
                          <span className="detail-value">{listing.gender}</span>
                        </div>
                        {listing.weight && (
                          <div className="detail-row">
                            <span className="detail-label">Weight:</span>
                            <span className="detail-value">{listing.weight}</span>
                          </div>
                        )}
                        <div className="detail-row">
                          <span className="detail-label">Health:</span>
                          <span className="detail-value health">{listing.healthStatus}</span>
                        </div>
                      </div>
                      <p className="listing-description">{listing.description}</p>
                      <div className="listing-location">
                        <span>📍 {listing.location}</span>
                      </div>
                      <div className="listing-seller">
                        <span>👤 {listing.seller}</span>
                        <span>📞 {listing.phone}</span>
                      </div>
                      <div className="listing-footer">
                        <div className="listing-price">
                          <span className="price">₹{listing.price.toLocaleString()}</span>
                        </div>
                        <button className="contact-btn" onClick={() => setSelectedSeller(listing.seller)}>Contact Seller</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-listings">
                  <p>No livestock found matching your search.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="auction-content">
            {!entryFeePaid ? (
              <div className="entry-fee-section">
                <div className="entry-fee-card">
                  <h2>🎫 Auction Entry Fee</h2>
                  <p className="entry-fee-description">
                    To participate in the live livestock auction, you need to pay an entry fee. 
                    This ensures serious bidders and maintains auction integrity.
                  </p>
                  <div className="entry-fee-amount">
                    <span className="fee-label">Entry Fee:</span>
                    <span className="fee-value">₹500</span>
                  </div>
                  <div className="entry-fee-benefits">
                    <h3>What you get:</h3>
                    <ul>
                      <li>✅ Access to live video auction stream</li>
                      <li>✅ Ability to place bids on premium livestock</li>
                      <li>✅ Real-time bidding updates</li>
                      <li>✅ 5-minute auction window per item</li>
                      <li>✅ Secure payment processing</li>
                    </ul>
                  </div>
                  <button className="pay-entry-btn" onClick={handlePayEntryFee}>
                    Pay Entry Fee ₹500
                  </button>
                  <p className="entry-fee-note">
                    * Entry fee is non-refundable and valid for today's auction session
                  </p>
                </div>
              </div>
            ) : !selectedAuctionItem ? (
              <div className="auction-items-section">
                <div className="auction-header">
                  <h2>🔴 Live Auction - Select Item</h2>
                  <div className="entry-paid-badge">✅ Entry Fee Paid</div>
                </div>
                <p className="auction-description">
                  Choose a livestock item to start bidding. Each auction lasts 5 minutes.
                </p>
                <div className="auction-items-grid">
                  {auctionItems.map((item) => (
                    <div key={item.id} className="auction-item-card">
                      <div className="auction-item-image">{item.image}</div>
                      <div className="auction-item-info">
                        <h3>{item.name}</h3>
                        <div className="auction-item-details">
                          <p><strong>Breed:</strong> {item.breed}</p>
                          <p><strong>Age:</strong> {item.age}</p>
                          <p><strong>Weight:</strong> {item.weight}</p>
                          <p><strong>Location:</strong> {item.location}</p>
                        </div>
                        <p className="auction-item-description">{item.description}</p>
                        <div className="auction-item-price">
                          <span className="base-price-label">Base Price:</span>
                          <span className="base-price-value">₹{item.basePrice.toLocaleString()}</span>
                        </div>
                        <button 
                          className="select-auction-btn"
                          onClick={() => handleSelectAuctionItem(item)}
                        >
                          Start Bidding
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : showTerms ? (
              <div className="terms-modal">
                <div className="terms-content">
                  <h2>⚖️ Auction Terms & Conditions</h2>
                  <div className="terms-list">
                    <h3>Important Rules:</h3>
                    <ol>
                      <li>
                        <strong>Base Price Confirmation:</strong> You must confirm and code the base price 
                        of ₹{selectedAuctionItem.basePrice.toLocaleString()} before participating in the auction.
                      </li>
                      <li>
                        <strong>Bidding Rules:</strong> You can increase the bid amount during the 5-minute 
                        auction window. Each bid must be higher than the current bid.
                      </li>
                      <li>
                        <strong>Winner Announcement:</strong> The winner will be announced after 5 minutes 
                        when the auction timer ends.
                      </li>
                      <li>
                        <strong>⚠️ Penalty Clause:</strong> If you win the bid but fail to purchase the 
                        livestock, you will be charged a penalty of ₹500. This penalty is mandatory and 
                        non-negotiable.
                      </li>
                      <li>
                        <strong>Payment:</strong> Winner must complete payment within 24 hours of winning 
                        the auction.
                      </li>
                      <li>
                        <strong>Delivery:</strong> Livestock delivery will be arranged after full payment 
                        is received.
                      </li>
                      <li>
                        <strong>No Refunds:</strong> All bids are final. Entry fees and penalties are 
                        non-refundable.
                      </li>
                    </ol>
                  </div>
                  <div className="terms-acceptance">
                    <label className="terms-checkbox">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <span>
                        I have read and accept all terms and conditions, including the ₹500 penalty 
                        for non-purchase after winning the bid.
                      </span>
                    </label>
                  </div>
                  <div className="terms-actions">
                    <button 
                      className="confirm-terms-btn"
                      onClick={handleConfirmBasePrice}
                      disabled={!termsAccepted}
                    >
                      Confirm & Start Auction
                    </button>
                    <button 
                      className="cancel-terms-btn"
                      onClick={handleResetAuction}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="auction-live-section">
                <div className="auction-live-header">
                  <h2>🔴 LIVE AUCTION</h2>
                  {auctionActive && (
                    <div className="auction-timer">
                      <span className="timer-label">Time Remaining:</span>
                      <span className="timer-value">{formatTime(timeRemaining)}</span>
                    </div>
                  )}
                </div>

                <div className="auction-live-content">
                  <div className="video-section">
                    <div className="stream-mode-toggle">
                      <button
                        className={`stream-mode-btn ${streamMode === 'viewer' ? 'active' : ''}`}
                        onClick={() => { setStreamMode('viewer'); handleStopStream(); }}
                      >
                        👁 Watch Stream
                      </button>
                      <button
                        className={`stream-mode-btn ${streamMode === 'host' ? 'active' : ''}`}
                        onClick={() => setStreamMode('host')}
                      >
                        📡 Go Live (Host)
                      </button>
                    </div>

                    {streamMode === 'host' ? (
                      <div className="live-video-container">
                        {isStreaming ? (
                          <>
                            <div className="live-indicator">
                              <span className="live-dot"></span> LIVE
                            </div>
                            <video
                              ref={videoRef}
                              className="live-video"
                              autoPlay
                              muted
                              playsInline
                            />
                            <button className="stop-stream-btn" onClick={handleStopStream}>
                              ⏹ Stop Stream
                            </button>
                          </>
                        ) : (
                          <div className="start-stream-panel">
                            <div className="stream-icon">📹</div>
                            <h3>Start Your Live Stream</h3>
                            <p>Show your livestock to all bidders in real time using your camera.</p>
                            {streamError && <p className="stream-error">{streamError}</p>}
                            <button className="start-stream-btn" onClick={handleStartStream}>
                              🔴 Go Live Now
                            </button>
                            <p className="stream-note">Your browser will ask for camera & microphone permission.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="live-video-placeholder">
                        <div className="video-overlay">
                          <span className="live-badge">🔴 LIVE</span>
                          <div className="video-animal-display">
                            <span className="video-animal-icon">{selectedAuctionItem.image}</span>
                            <h3>{selectedAuctionItem.name}</h3>
                          </div>
                          <p className="video-note">📹 Live video stream of {selectedAuctionItem.name}</p>
                          <p className="viewer-note">Waiting for host to start stream...</p>
                        </div>
                      </div>
                    )}

                    <div className="auction-item-details-live">
                      <h3>{selectedAuctionItem.name}</h3>
                      <p><strong>Breed:</strong> {selectedAuctionItem.breed}</p>
                      <p><strong>Age:</strong> {selectedAuctionItem.age}</p>
                      <p><strong>Weight:</strong> {selectedAuctionItem.weight}</p>
                      <p><strong>Seller:</strong> {selectedAuctionItem.seller}</p>
                      <p><strong>Location:</strong> {selectedAuctionItem.location}</p>
                    </div>
                  </div>

                  <div className="bidding-section">
                    <div className="current-bid-display">
                      <h3>Current Highest Bid</h3>
                      <div className="current-bid-amount">
                        ₹{currentBid.toLocaleString()}
                      </div>
                      <p className="base-price-info">
                        Base Price: ₹{selectedAuctionItem.basePrice.toLocaleString()}
                      </p>
                    </div>

                    {auctionActive && !auctionEnded && (
                      <div className="place-bid-section">
                        <h3>Place Your Bid</h3>
                        <div className="bid-input-group">
                          <span className="currency-symbol">₹</span>
                          <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter bid amount"
                            min={currentBid + 1000}
                            step="1000"
                            className="bid-input"
                          />
                        </div>
                        <button 
                          className="place-bid-btn"
                          onClick={handlePlaceBid}
                          disabled={!bidAmount || Number(bidAmount) <= currentBid}
                        >
                          Place Bid
                        </button>
                        <p className="bid-hint">
                          * Bid must be higher than current bid
                        </p>
                      </div>
                    )}

                    {myBids.length > 0 && (
                      <div className="my-bids-section">
                        <h3>Your Bids</h3>
                        <div className="my-bids-list">
                          {myBids.map((bid, index) => (
                            <div key={index} className="my-bid-item">
                              <span>Bid #{index + 1}:</span>
                              <span className="my-bid-amount">₹{bid.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {auctionEnded && (
                      <div className={`auction-result ${isWinner ? 'winner' : 'not-winner'}`}>
                        {isWinner ? (
                          <>
                            <h2>🎉 Congratulations!</h2>
                            <p>You won the auction!</p>
                            <div className="winning-bid">
                              <span>Winning Bid:</span>
                              <span className="winning-amount">₹{currentBid.toLocaleString()}</span>
                            </div>
                            <div className="winner-actions">
                              <button className="proceed-payment-btn">
                                Proceed to Payment
                              </button>
                              <p className="penalty-warning">
                                ⚠️ Remember: Failure to complete purchase will result in ₹500 penalty
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <h2>Auction Ended</h2>
                            <p>Unfortunately, you did not win this auction.</p>
                            <div className="final-bid">
                              <span>Final Bid:</span>
                              <span>₹{currentBid.toLocaleString()}</span>
                            </div>
                            <button className="try-again-btn" onClick={handleResetAuction}>
                              Try Another Auction
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {!auctionEnded && (
                  <div className="auction-info-banner">
                    <h3>📋 Auction Guidelines</h3>
                    <ul>
                      <li>Auction duration: 5 minutes</li>
                      <li>Place bids higher than the current bid</li>
                      <li>Winner announced when timer reaches 0:00</li>
                      <li>₹500 penalty applies if winner doesn't purchase</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    {/* Seller Farm Panel */}
    {selectedSeller && (() => {
      const sellerListings = getSellerListings(selectedSeller);
      const firstListing = sellerListings[0];
      return (
        <div className="seller-panel-overlay" onClick={() => setSelectedSeller(null)}>
          <div className="seller-panel" onClick={e => e.stopPropagation()}>
            <button className="seller-panel-close" onClick={() => setSelectedSeller(null)}>✕</button>

            <div className="seller-panel-header">
              <div className="seller-farm-avatar">🏡</div>
              <div>
                <h2>{selectedSeller}'s Farm</h2>
                <p className="seller-panel-location">📍 {firstListing?.location}</p>
                <p className="seller-panel-phone">📞 {firstListing?.phone}</p>
              </div>
            </div>

            <div className="seller-panel-stats">
              <div className="seller-stat">
                <span className="seller-stat-num">{sellerListings.length}</span>
                <span className="seller-stat-label">Animals Listed</span>
              </div>
              <div className="seller-stat">
                <span className="seller-stat-num">
                  {Array.from(new Set(sellerListings.map(l => l.category))).length}
                </span>
                <span className="seller-stat-label">Categories</span>
              </div>
              <div className="seller-stat">
                <span className="seller-stat-num">
                  ₹{Math.min(...sellerListings.map(l => l.price)).toLocaleString()}+
                </span>
                <span className="seller-stat-label">Starting Price</span>
              </div>
            </div>

            <h3 className="seller-panel-section-title">🐐 Available for Sale</h3>
            <div className="seller-listings-grid">
              {sellerListings.map(item => (
                <div key={item.id} className="seller-listing-card">
                  <div className="seller-listing-top">
                    <span className="seller-listing-icon">{item.image}</span>
                    <span className="seller-listing-category">{item.categoryIcon} {item.category}</span>
                  </div>
                  <h4>{item.breed}</h4>
                  <div className="seller-listing-meta">
                    <span>🗓 {item.age}</span>
                    <span>⚧ {item.gender}</span>
                    {item.weight && <span>⚖️ {item.weight}</span>}
                  </div>
                  <p className="seller-listing-desc">{item.description}</p>
                  <div className="seller-listing-health">✅ {item.healthStatus}</div>
                  <div className="seller-listing-footer">
                    <span className="seller-listing-price">₹{item.price.toLocaleString()}</span>
                    <a href={`tel:${item.phone}`} className="seller-call-btn">📞 Call</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="seller-panel-contact">
              <a href={`tel:${firstListing?.phone}`} className="seller-contact-primary">
                📞 Call {selectedSeller}
              </a>
              <a href={`https://wa.me/${firstListing?.phone?.replace(/\D/g, '')}`}
                target="_blank" rel="noreferrer"
                className="seller-contact-whatsapp">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      );
    })()}

    {/* Live Studio */}
    {showLiveStudio && (
      <div className="live-studio-overlay">
        <div className="live-studio-header">
          <div className="live-studio-title">
            <span className="live-studio-logo">📡</span>
            <span>AgriConnect Live Studio</span>
            {isStreaming && <span className="live-studio-badge"><span className="go-live-dot"></span> LIVE</span>}
          </div>
          <button className="live-studio-exit" onClick={handleExitStudio}>✕ Exit Studio</button>
        </div>

        <div className="live-studio-body">
          <div className="live-studio-video-wrap">
            {isStreaming ? (
              <video
                ref={videoRef}
                className="live-studio-video"
                autoPlay
                muted
                playsInline
              />
            ) : (
              <div className="live-studio-placeholder">
                <div className="live-studio-cam-icon">📷</div>
                <p>Camera preview will appear here</p>
              </div>
            )}
          </div>

          <div className="live-studio-controls">
            <div className="live-studio-info">
              <h3>Welcome, {currentUser?.email}</h3>
              <p>You are ready to go live to all auction viewers.</p>
            </div>

            {streamError && <div className="stream-error">{streamError}</div>}

            {!isStreaming ? (
              <button className="live-studio-go-btn" onClick={handleStartStream}>
                <span className="go-live-dot"></span> Start Live Stream
              </button>
            ) : (
              <>
                <div className="stream-controls-row">
                  <button className="stream-ctrl-btn" onClick={handleToggleMic} title="Toggle Microphone">
                    🎙 Mic
                  </button>
                  <button className="stream-ctrl-btn" onClick={handleToggleCamera} title="Toggle Camera">
                    📷 Camera
                  </button>
                </div>
                <button className="live-studio-stop-btn" onClick={handleStopStream}>
                  ⏹ Stop Stream
                </button>
              </>
            )}

            <div className="live-studio-tips">
              <h4>Tips for a great stream:</h4>
              <ul>
                <li>📶 Ensure stable internet connection</li>
                <li>💡 Good lighting helps viewers see your livestock</li>
                <li>🎙 Speak clearly when describing animals</li>
                <li>📱 Keep camera steady for best quality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Go Live Auth Modal */}
    {showGoLiveModal && (
      <div className="go-live-modal-overlay" onClick={() => setShowGoLiveModal(false)}>
        <div className="go-live-modal" onClick={e => e.stopPropagation()}>
          <button className="go-live-modal-close" onClick={() => setShowGoLiveModal(false)}>✕</button>
          <div className="go-live-modal-header">
            <div className="go-live-modal-icon">📡</div>
            <h2>Go Live</h2>
            <p>Sign in to start your live auction stream</p>
          </div>
          <form onSubmit={handleGoLiveAuth} className="go-live-form">
            {goLiveAuthError && (
              <div className="go-live-error">{goLiveAuthError}</div>
            )}
            <div className="go-live-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={goLiveEmail}
                onChange={e => setGoLiveEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="go-live-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={goLivePassword}
                onChange={e => setGoLivePassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="go-live-submit-btn"
              disabled={goLiveAuthLoading}
            >
              {goLiveAuthLoading ? (
                <span>Verifying...</span>
              ) : (
                <><span className="go-live-dot"></span> Start Live Stream</>
              )}
            </button>
            <p className="go-live-register-note">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default Livestock;
