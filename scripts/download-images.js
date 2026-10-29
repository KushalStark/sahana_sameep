import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Curated high-resolution royalty free wedding photos matching the storyboard aesthetic
const images = [
  {
    name: 'hero-mandap.jpg',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85',
    desc: 'Floral mandap arch with lanterns and candles'
  },
  {
    name: 'our-story.jpg',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    desc: 'Romantic couple at sunset'
  },
  {
    name: 'ceremony.jpg',
    url: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1000&q=85',
    desc: 'Traditional wedding ceremony setup'
  },
  {
    name: 'reception.jpg',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85',
    desc: 'Grand banquet celebration'
  },
  {
    name: 'venue.jpg',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
    desc: 'Royal palace / heritage pavilion'
  },
  {
    name: 'gallery-1.jpg',
    url: 'https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&w=1000&q=85',
    desc: 'Couple in golden hour light'
  },
  {
    name: 'gallery-2.jpg',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=85',
    desc: 'Hands entwined with rings'
  },
  {
    name: 'gallery-3.jpg',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=85',
    desc: 'Floral wedding arch'
  },
  {
    name: 'gallery-4.jpg',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85',
    desc: 'Couple candid laughter'
  },
  {
    name: 'gallery-5.jpg',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85',
    desc: 'Romantic portrait outdoors'
  },
  {
    name: 'gallery-6.jpg',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85',
    desc: 'Wedding details and rings'
  },
  {
    name: 'dresscode-ceremony.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    desc: 'Traditional Indian silk attire'
  },
  {
    name: 'dresscode-reception.jpg',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85',
    desc: 'Formal evening attire'
  },
  {
    name: 'og-wedding.jpg',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=630&q=85',
    desc: 'Social share preview'
  }
];

async function downloadImages() {
  console.log('Downloading curated wedding imagery...');
  for (const item of images) {
    const dest = path.join(imagesDir, item.name);
    try {
      console.log(`Fetching ${item.name} (${item.desc})...`);
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`✓ Saved ${item.name} (${Math.round(buffer.byteLength / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Failed ${item.name}: ${err.message}`);
    }
  }
  console.log('Finished downloading imagery!');
}

downloadImages();
