import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProperties } from '../src/data/propertiesData.js';
import { verifiedCatalog } from './verified_image_catalog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '../src/data/propertiesData.js');

console.log(`Starting comprehensive update for ${initialProperties.length} properties...`);

// Rich pools of evocative luxury naming components
const prefixes = [
  "The", "Royal", "Grand", "Imperial", "Prestige", "Signature", "Heritage", "Sovereign", 
  "Aura", "Zenith", "Elysium", "Solitaire", "Bespoke", "Emerald", "Sapphire", "Golden", 
  "Silver", "Coromandel", "Windsor", "Belvedere", "Marina", "Azure", "Ivory", "Regent", 
  "Vanguard", "Halcyon", "Meridian", "Celestial", "Highland", "Opaline", "Sunstone", 
  "Magnolia", "Camellia", "Crescent", "Luminescence", "Monarch", "Palatial", "Seraphic"
];

const natureThemes = [
  "Oak", "Palms", "Meadows", "Pines", "Grove", "Bay", "Waters", "Springs", "Crest", 
  "Ridge", "Gardens", "Breeze", "Valley", "Horizons", "Shores", "Woods", "Haven", 
  "Sanctuary", "Mist", "Falls", "Bluff", "Terrace", "Boulevard", "Brook", "Canopy", 
  "Willow", "Orchid", "Hills", "Lakes", "Cove", "Glade", "Verdant", "Cascade", "Flora"
];

const typologyTypes = {
  Apartment: ["Towers", "Heights", "Residences", "Court", "Atrium", "Sky Suites", "Chambers", "Pavilion", "Enclave", "Promenade"],
  "Luxury Villa": ["Manor", "Estate", "Villas", "Sanctuary", "Retreat", "Palace", "Hacienda", "Courtyard", "Haven", "Domaine"],
  "Individual House": ["Manor", "Cottage", "Homestead", "Villa", "Lodge", "Abode", "Residence", "Mansion", "Grange", "House"],
  Penthouse: ["Sky Terraces", "Crown", "Pinnacle", "Apex", "Skyview", "Belvedere", "Summit", "Lofts", "Sky Suites", "Overlook"],
  Duplex: ["Duplexes", "Twin Terraces", "Mezzanine", "Cascades", "Pavilion", "Courtyard", "Enclave", "Living", "Vistas", "Suites"],
  "Builder Floor": ["Boutique Floors", "Living", "Residences", "Floor Suites", "Terraces", "Manor", "Enclave", "Chambers", "Promenade", "Court"]
};

// Ensure uniqueness across 1440 properties
const usedTitles = new Set();

function generateUniqueTitle(prop, index) {
  const pType = prop.propertyType || "Apartment";
  const locality = prop.locality.replace(/\s*\(.*?\)/g, '').trim(); // e.g. "ECR", "Poes Garden"
  const cityClean = prop.city.split('(')[0].trim();
  const suffixes = typologyTypes[pType] || typologyTypes.Apartment;

  // We have 1440 properties. Let's create layered patterns to generate 1440 completely distinct, elegant names
  const patternType = index % 8;
  const pfx1 = prefixes[(index * 7 + 3) % prefixes.length];
  const pfx2 = prefixes[(index * 13 + 11) % prefixes.length];
  const nat1 = natureThemes[(index * 11 + 5) % natureThemes.length];
  const nat2 = natureThemes[(index * 17 + 7) % natureThemes.length];
  const sfx1 = suffixes[(index * 3 + 2) % suffixes.length];
  const sfx2 = suffixes[(index * 5 + 4) % suffixes.length];

  let candidate = "";

  if (patternType === 0) {
    // "The Marina Grandeur at Poes Garden" or "The Windsor Manor"
    candidate = `${pfx1} ${nat1} ${sfx1}`;
  } else if (patternType === 1) {
    // "Coromandel Bay Vista, ECR"
    candidate = `${nat1} ${nat2} ${sfx1}`;
  } else if (patternType === 2) {
    // "Aura Presidential Crest at Locality"
    candidate = `${pfx1} ${pfx2} ${sfx1}`;
  } else if (patternType === 3) {
    // "Prestige Whispering Palms at Locality"
    candidate = `${pfx1} ${nat1} ${sfx2}`;
  } else if (patternType === 4) {
    // "Silvermist Sanctuary at Locality"
    candidate = `${pfx2} ${nat2} ${sfx2}`;
  } else if (patternType === 5) {
    // "The Locality Haven"
    candidate = `${pfx1} ${locality} ${sfx1}`;
  } else if (patternType === 6) {
    // "Locality Palms Residences"
    candidate = `${locality} ${nat1} ${sfx2}`;
  } else {
    // "Bespoke Windsor Estate at Locality"
    candidate = `${pfx1} ${nat2} ${sfx1}`;
  }

  // Deduplication check
  let finalTitle = candidate;
  let counter = 1;
  while (usedTitles.has(finalTitle)) {
    counter++;
    const altPfx = prefixes[(index + counter * 5) % prefixes.length];
    const altNat = natureThemes[(index + counter * 7) % natureThemes.length];
    const altSfx = suffixes[(index + counter * 3) % suffixes.length];
    finalTitle = `${altPfx} ${altNat} ${altSfx} of ${locality}`;
  }

  usedTitles.add(finalTitle);
  return finalTitle;
}

// Map each property with updated Title, Tagline, Description and 100% Visually Inspected Images
const typeList = [
  "Apartment",
  "Luxury Villa",
  "Individual House",
  "Penthouse",
  "Duplex",
  "Builder Floor"
];

const typeCounters = {
  "Apartment": 0,
  "Luxury Villa": 0,
  "Individual House": 0,
  "Penthouse": 0,
  "Duplex": 0,
  "Builder Floor": 0
};

const updatedProperties = initialProperties.map((p, idx) => {
  const pType = p.propertyType || "Apartment";
  const typeIdx = Math.max(0, typeList.indexOf(pType));
  const count = typeCounters[pType]++;

  const extList = verifiedCatalog.exteriors[pType] || verifiedCatalog.exteriors.Apartment;

  // Stagger indices so different properties showcase diverse room angles
  const exterior = extList[count % extList.length];
  const living = verifiedCatalog.livingRooms[(count + typeIdx * 2) % verifiedCatalog.livingRooms.length];
  const bedroom = verifiedCatalog.bedrooms[(count * 2 + typeIdx * 3) % verifiedCatalog.bedrooms.length];
  const kitchen = verifiedCatalog.kitchens[(count * 3 + typeIdx + 1) % verifiedCatalog.kitchens.length];
  const bathroom = verifiedCatalog.bathrooms[(count * 5 + typeIdx * 2 + 3) % verifiedCatalog.bathrooms.length];
  const balcony = verifiedCatalog.balconiesOrDining[(count * 7 + typeIdx * 4 + 2) % verifiedCatalog.balconiesOrDining.length];

  const images = [
    exterior,
    living,
    bedroom,
    kitchen,
    bathroom,
    balcony
  ];

  const title = generateUniqueTitle(p, idx);
  const tagline = `Exclusive ${p.bhk || 3} BHK ${p.propertyType || 'Residence'} at ${title}, ${p.locality}`;
  const description = `Welcome to ${title}, an exquisite ${p.propertyType} located in the prestigious enclave of ${p.locality}, ${p.city}. Designed with impeccable attention to architectural elegance, spacious living areas, and world-class amenities.`;

  return {
    ...p,
    title,
    tagline,
    description,
    images
  };
});

// Verification assertions
console.log('--- Verifying Properties Catalog Quality ---');
console.log(`Total properties: ${updatedProperties.length}`);
console.log(`Unique titles count: ${usedTitles.size}`);

if (usedTitles.size !== updatedProperties.length) {
  console.error(`ERROR: Unique titles mismatch! Expected ${updatedProperties.length}, got ${usedTitles.size}`);
  process.exit(1);
}

// Check every property has 6 unique images and strictly real estate URLs
let defectiveImagesFound = 0;
const bannedPatterns = [
  'photo-1568605117036-5fe5e7bab0b7', // car
  'photo-1560448204-e02f11c3d0e2', // forest
  'photo-1577495508048-b635879837f1', // forest moss
  'photo-1570168007204-dfb528c6958f', // Gateway of India monument
  'photo-1556911220-e15b29be8c8f', // woman cooking with lemons
  'photo-1599809275671-b5942cabc7a2', // pool placed in kitchen
  'photo-1560448204-603b3fc33ddc'  // living room placed in balcony
];

updatedProperties.forEach((p, idx) => {
  if (!p.images || p.images.length !== 6) {
    console.error(`Property ${p.id} does not have 6 images!`);
    process.exit(1);
  }
  const set = new Set(p.images);
  if (set.size !== 6) {
    console.error(`Property ${p.id} has duplicate image within gallery! (${set.size}/6)`);
    process.exit(1);
  }
  for (const img of p.images) {
    for (const b of bannedPatterns) {
      if (img.includes(b)) {
        console.error(`Property ${p.id} contains banned image ${b}!`);
        defectiveImagesFound++;
      }
    }
  }
});

if (defectiveImagesFound > 0) {
  console.error(`ERROR: ${defectiveImagesFound} banned image references detected! Aborting.`);
  process.exit(1);
}

console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
console.log('Sample updated properties:');
updatedProperties.slice(0, 5).forEach((p, i) => {
  console.log(`[${i + 1}] Title: "${p.title}" | Type: ${p.propertyType} | Locality: ${p.locality}`);
  console.log(`    Exterior: ${p.images[0]}`);
});

console.log('Writing updated propertiesData.js...');
const fileContent = `// BharatNivas Real Estate Marketplace — Complete Comprehensive Properties Catalog
// Generated with 100% Unique, Organic Real Estate Project Names
// Sequential verified high-res gallery: 1. Exterior, 2. Living Room, 3. Bedroom, 4. Kitchen, 5. Bathroom, 6. Balcony/Dining

export const initialProperties = ${JSON.stringify(updatedProperties, null, 2)};
`;

fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`Successfully updated ${updatedProperties.length} properties in ${targetPath}!`);
