import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProperties } from '../src/data/propertiesData.js';
import { verifiedCatalog } from './verified_image_catalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '../src/data/propertiesData.js');

console.log(`Starting gallery update for ${initialProperties.length} properties...`);

// Mapping of types to catalog keys
const typeMap = {
  "Apartment": "Apartment",
  "Luxury Villa": "Luxury Villa",
  "Individual House": "Individual House",
  "Penthouse": "Penthouse",
  "Duplex": "Duplex",
  "Builder Floor": "Builder Floor"
};

// Update each property
const updatedProperties = initialProperties.map((p, idx) => {
  const catType = typeMap[p.propertyType] || "Apartment";
  const extList = verifiedCatalog.exteriors[catType] || verifiedCatalog.exteriors.Apartment;
  
  // Deterministic offset based on property ID number or idx
  const numMatch = p.id.match(/\d+$/);
  const num = numMatch ? parseInt(numMatch[0], 10) : idx;
  const hash = (idx * 7 + num * 3) >>> 0;

  const exterior = extList[hash % extList.length];
  const living = verifiedCatalog.livingRooms[hash % verifiedCatalog.livingRooms.length];
  const bedroom = verifiedCatalog.bedrooms[(hash + 1) % verifiedCatalog.bedrooms.length];
  const kitchen = verifiedCatalog.kitchens[(hash + 2) % verifiedCatalog.kitchens.length];
  const bathroom = verifiedCatalog.bathrooms[(hash + 3) % verifiedCatalog.bathrooms.length];
  const balcony = verifiedCatalog.balconiesOrDining[(hash + 4) % verifiedCatalog.balconiesOrDining.length];

  const images = [
    exterior,
    living,
    bedroom,
    kitchen,
    bathroom,
    balcony
  ];

  return {
    ...p,
    images
  };
});

// Verify consistency
console.log('Verifying generated galleries:');
let allCorrect = true;
updatedProperties.forEach((p, i) => {
  if (!p.images || p.images.length !== 6) {
    console.error(`Property ${p.id} does not have 6 images!`);
    allCorrect = false;
  }
  const unique = new Set(p.images);
  if (unique.size !== 6) {
    console.warn(`Property ${p.id} has duplicate images (${unique.size}/6)`);
  }
});

if (!allCorrect) {
  console.error('Validation failed! Aborting write.');
  process.exit(1);
}

console.log('Writing updated propertiesData.js...');
const fileContent = `// BharatNivas Real Estate Marketplace — Complete Comprehensive Properties Catalog
// Generated with 20 unique properties per Property Type for EVERY city
// Updated with sequential high-res gallery: 1. Exterior, 2. Living Room, 3. Bedroom, 4. Kitchen, 5. Bathroom, 6. Balcony/Dining

export const initialProperties = ${JSON.stringify(updatedProperties, null, 2)};
`;

fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`Successfully updated ${updatedProperties.length} properties in ${targetPath}!`);
