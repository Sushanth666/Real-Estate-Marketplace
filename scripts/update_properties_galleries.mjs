import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProperties } from '../src/data/propertiesData.js';
import { verifiedCatalog } from './verified_image_catalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '../src/data/propertiesData.js');

console.log(`Starting gallery update for ${initialProperties.length} properties...`);

const typeList = [
  "Apartment",
  "Luxury Villa",
  "Individual House",
  "Penthouse",
  "Duplex",
  "Builder Floor"
];

// Track index per property type
const typeCounters = {
  "Apartment": 0,
  "Luxury Villa": 0,
  "Individual House": 0,
  "Penthouse": 0,
  "Duplex": 0,
  "Builder Floor": 0
};

// Update each property
const updatedProperties = initialProperties.map((p) => {
  const pType = p.propertyType || "Apartment";
  const typeIdx = Math.max(0, typeList.indexOf(pType));
  const count = typeCounters[pType]++;

  const extList = verifiedCatalog.exteriors[pType] || verifiedCatalog.exteriors.Apartment;

  const exterior = extList[count % extList.length];
  const living = verifiedCatalog.livingRooms[(Math.floor(count / 8) + typeIdx) % verifiedCatalog.livingRooms.length];
  const bedroom = verifiedCatalog.bedrooms[(Math.floor(count / 64) + typeIdx * 2) % verifiedCatalog.bedrooms.length];
  const kitchen = verifiedCatalog.kitchens[(count * 3 + typeIdx + 1) % verifiedCatalog.kitchens.length];
  const bathroom = verifiedCatalog.bathrooms[(count * 5 + typeIdx * 3 + 2) % verifiedCatalog.bathrooms.length];
  const balcony = verifiedCatalog.balconiesOrDining[(count * 7 + typeIdx * 5 + 3) % verifiedCatalog.balconiesOrDining.length];

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

// Verification:
console.log('Verifying generated galleries:');
let allCorrect = true;
const galleryCombinations = new Set();

updatedProperties.forEach((p) => {
  if (!p.images || p.images.length !== 6) {
    console.error(`Property ${p.id} does not have 6 images!`);
    allCorrect = false;
  }
  const unique = new Set(p.images);
  if (unique.size !== 6) {
    console.warn(`Property ${p.id} has duplicate images (${unique.size}/6)`);
    allCorrect = false;
  }
  galleryCombinations.add(p.images.join(' | '));
});

console.log(`Total properties: ${updatedProperties.length}`);
console.log(`Unique 6-image gallery combinations: ${galleryCombinations.size}`);

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
