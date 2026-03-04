const { image_search } = require('duckduckgo-images-api');
const fs = require('fs');

const cars = [
  'Ferrari Roma supercar high resolution',
  'Aston Martin DB11 high resolution',
  'Porsche 911 GT3 high resolution',
  'Lamborghini Huracan high resolution',
  'Bugatti Chiron high resolution',
  'McLaren 720S high resolution',
  'Jaguar E-Type classic car high resolution',
  'Bentley Continental GT high resolution',
  'Nissan 300ZX high resolution',
  'Rolls-Royce Spectre high resolution'
];

async function fetchImages() {
  const results = {};
  for (const car of cars) {
    console.log(`Fetching ${car}...`);
    try {
      const res = await image_search({ query: car, moderate: true, retries: 2, iterations: 1 });
      const images = res.slice(0, 5).map(r => r.image);
      results[car.split(' high')[0]] = images;
    } catch (e) {
      console.log(`Error on ${car}`);
    }
  }
  fs.writeFileSync('images.json', JSON.stringify(results, null, 2));
}

fetchImages();