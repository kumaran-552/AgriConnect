import React, { useState } from 'react';
import './Products.css';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  seller: string;
  rating: number;
  inStock: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}

const productCategories: Category[] = [
  {
    id: 'eggs',
    name: 'Eggs',
    icon: '🥚',
    products: [
      {
        id: 1,
        name: 'Farm Fresh Chicken Eggs',
        price: 80,
        unit: 'dozen',
        image: '🥚',
        description: 'Fresh organic chicken eggs from free-range hens',
        seller: 'Green Valley Farm',
        rating: 4.5,
        inStock: true
      },
      {
        id: 2,
        name: 'Duck Eggs',
        price: 120,
        unit: 'dozen',
        image: '🦆',
        description: 'Nutritious duck eggs, rich in protein',
        seller: 'Lakeside Poultry',
        rating: 4.3,
        inStock: true
      },
      {
        id: 3,
        name: 'Country Eggs (Desi)',
        price: 150,
        unit: 'dozen',
        image: '🐓',
        description: 'Traditional country chicken eggs, naturally raised',
        seller: 'Village Farms',
        rating: 4.8,
        inStock: true
      }
    ]
  },
  {
    id: 'milk',
    name: 'Milk & Dairy',
    icon: '🥛',
    products: [
      {
        id: 4,
        name: 'Fresh Cow Milk',
        price: 60,
        unit: 'liter',
        image: '🐄',
        description: 'Pure cow milk, delivered fresh daily',
        seller: 'Dairy Fresh Co.',
        rating: 4.6,
        inStock: true
      },
      {
        id: 5,
        name: 'Buffalo Milk',
        price: 75,
        unit: 'liter',
        image: '🐃',
        description: 'Rich buffalo milk, high fat content',
        seller: 'Buffalo Dairy Farm',
        rating: 4.4,
        inStock: true
      },
      {
        id: 6,
        name: 'Goat Milk',
        price: 100,
        unit: 'liter',
        image: '🐐',
        description: 'Easy to digest goat milk, ideal for all ages',
        seller: 'Hill Farm Dairy',
        rating: 4.7,
        inStock: false
      }
    ]
  },
  {
    id: 'fertilizers',
    name: 'Fertilizers',
    icon: '🌱',
    products: [
      {
        id: 7,
        name: 'Organic Compost',
        price: 400,
        unit: '50kg bag',
        image: '♻️',
        description: 'Premium organic compost for healthy soil',
        seller: 'EcoGrow Supplies',
        rating: 4.5,
        inStock: true
      },
      {
        id: 8,
        name: 'NPK Fertilizer (19:19:19)',
        price: 850,
        unit: '50kg bag',
        image: '🧪',
        description: 'Balanced NPK fertilizer for all crops',
        seller: 'AgriChem Ltd',
        rating: 4.2,
        inStock: true
      },
      {
        id: 9,
        name: 'Vermicompost',
        price: 500,
        unit: '50kg bag',
        image: '🪱',
        description: 'Rich vermicompost with earthworm castings',
        seller: 'Worm Farm Co.',
        rating: 4.8,
        inStock: true
      },
      {
        id: 10,
        name: 'Urea Fertilizer',
        price: 600,
        unit: '50kg bag',
        image: '💎',
        description: 'High nitrogen urea for crop growth',
        seller: 'FarmChem India',
        rating: 4.3,
        inStock: true
      }
    ]
  },
  {
    id: 'ropes',
    name: 'Ropes & Tools',
    icon: '🪢',
    products: [
      {
        id: 11,
        name: 'Nylon Rope',
        price: 250,
        unit: '50m roll',
        image: '🪢',
        description: 'Strong nylon rope for farm use',
        seller: 'Farm Tools Hub',
        rating: 4.4,
        inStock: true
      },
      {
        id: 12,
        name: 'Jute Rope',
        price: 180,
        unit: '50m roll',
        image: '🧵',
        description: 'Natural biodegradable jute rope',
        seller: 'Eco Farm Supplies',
        rating: 4.6,
        inStock: true
      },
      {
        id: 13,
        name: 'Plastic Twine',
        price: 150,
        unit: '100m roll',
        image: '🎀',
        description: 'Durable plastic twine for bundling',
        seller: 'AgriTools Store',
        rating: 4.1,
        inStock: true
      }
    ]
  },
  {
    id: 'medicine',
    name: 'Animal Medicine',
    icon: '💊',
    products: [
      {
        id: 14,
        name: 'Deworming Tablets',
        price: 350,
        unit: 'pack of 10',
        image: '💊',
        description: 'Broad spectrum dewormer for livestock',
        seller: 'VetCare Pharma',
        rating: 4.7,
        inStock: true
      },
      {
        id: 15,
        name: 'Antibiotic Injection',
        price: 450,
        unit: '100ml bottle',
        image: '💉',
        description: 'Veterinary antibiotic for infections',
        seller: 'Animal Health Co.',
        rating: 4.5,
        inStock: true
      },
      {
        id: 16,
        name: 'Vitamin Supplement',
        price: 280,
        unit: '500ml bottle',
        image: '🧴',
        description: 'Multi-vitamin supplement for animals',
        seller: 'LiveStock Care',
        rating: 4.6,
        inStock: true
      },
      {
        id: 17,
        name: 'Anti-Tick Spray',
        price: 320,
        unit: '500ml spray',
        image: '🦟',
        description: 'Effective tick and flea control spray',
        seller: 'PestFree Vet',
        rating: 4.4,
        inStock: false
      }
    ]
  }
];

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('eggs');
  const [searchTerm, setSearchTerm] = useState('');

  const currentCategory = productCategories.find(cat => cat.id === selectedCategory);
  
  const filteredProducts = currentCategory?.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>🛒 Products Marketplace</h1>
          <p>Buy and sell agricultural products and supplies</p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-tabs">
          {productCategories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
                <div className="product-image">{product.image}</div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-seller">
                    <span>👤 {product.seller}</span>
                  </div>
                  <div className="product-rating">
                    <span>⭐ {product.rating}</span>
                  </div>
                  <div className="product-footer">
                    <div className="product-price">
                      <span className="price">₹{product.price}</span>
                      <span className="unit">/{product.unit}</span>
                    </div>
                    {product.inStock ? (
                      <button className="add-to-cart-btn">Add to Cart</button>
                    ) : (
                      <button className="out-of-stock-btn" disabled>Out of Stock</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
