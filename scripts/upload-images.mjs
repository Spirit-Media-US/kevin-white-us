#!/usr/bin/env node
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const envPath = '/home/deploy/bin/.env';
try {
  const envFile = readFileSync(envPath, 'utf8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
} catch { console.error('Failed to load .env'); process.exit(1); }

const client = createClient({
  projectId: 'kwhqwbb4', dataset: 'production',
  token: process.env.SANITY_TOKEN, useCdn: false, apiVersion: '2024-01-01',
});

const imgDir = '/tmp/kevin-white-us-images';

// Map filenames to Sanity document updates
const bookImages = {
  'AG-2-640x1024.jpg': 'book-1',                              // Audacious Generosity
  'Book_Get-to-the-Point-min-640x1024.jpg': 'book-2',         // Get to the Point
  'Book_What_s-Your-Word-min-640x1024.jpg': 'book-3',         // What's Your Word
  'Book_Ultimate-Book-Marketing-Guide-min-640x1024.jpg': 'book-4', // Ultimate Book Marketing
  'only-god-works-1-640x1024.png': 'book-5',                  // Only God Works
  'YVOCB-2-640x1024.jpg': 'book-6',                           // Your Very Own Children's Book
  'GIFTS-2-640x1024.jpg': 'book-7',                           // Gifts
};

// Also upload: Front-Cover-Kings-of-the-King (8th book)
// Blog images: KWI-Blog-11-GOODNESS, KWI-Blog-10-FAITHFULNESS, KWI-Blog-9-MULTIPLY
// Site images: kevin-min, kevin-white-logo, NPO-Coaching-Banner, Unsplash_*

async function uploadImage(filename) {
  const filepath = resolve(imgDir, filename);
  const buffer = readFileSync(filepath);
  const ext = filename.split('.').pop();
  const type = ext === 'png' ? 'image/png' : 'image/jpeg';
  const asset = await client.assets.upload('image', buffer, { filename, contentType: type });
  return asset._id;
}

async function main() {
  // Upload book covers and patch book documents
  for (const [filename, docId] of Object.entries(bookImages)) {
    try {
      const assetId = await uploadImage(filename);
      await client.patch(docId).set({
        coverImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
      }).commit();
      console.log(`✅ ${filename} → ${docId}`);
    } catch (e) {
      console.error(`❌ ${filename}: ${e.message}`);
    }
  }

  // Upload blog images
  const blogImages = {
    'KWI-Blog-11-GOODNESS-1024x683.png': 'post-goodness',
    'KWI-Blog-10-FAITHFULNESS-1024x683.png': 'post-faithfulness',
    'KWI-Blog-9-MULTIPLY-1024x683.png': 'post-multiply',
  };
  for (const [filename, docId] of Object.entries(blogImages)) {
    try {
      const assetId = await uploadImage(filename);
      await client.patch(docId).set({
        heroImage: { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
      }).commit();
      console.log(`✅ ${filename} → ${docId}`);
    } catch (e) {
      console.error(`❌ ${filename}: ${e.message}`);
    }
  }

  // Upload remaining site images (just upload, no doc patching)
  const siteImages = [
    'kevin-min-768x1024.png',
    'kevin-white-logo.png',
    'NPO-Coaching-Banner-1024x289.png',
    'Unsplash_Corporate-Meeting-01-min-1024x683.jpg',
    'Unsplash_Corporate-Meeting-02-min-1024x683.jpg',
    'Unsplash_On-Stage-min-1024x711.jpg',
    'Front-Cover-Kings-of-the-King-3-scaled-1-717x1024.jpg',
  ];
  for (const filename of siteImages) {
    try {
      const assetId = await uploadImage(filename);
      console.log(`✅ ${filename} → ${assetId}`);
    } catch (e) {
      console.error(`❌ ${filename}: ${e.message}`);
    }
  }

  console.log('\nDone!');
}

main();
