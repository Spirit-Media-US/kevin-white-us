#!/usr/bin/env node
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load env
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve('/home/deploy/bin/.env');
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
  projectId: 'kwhqwbb4',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Blog posts
const posts = [
  {
    _id: 'post-goodness',
    _type: 'blogPost',
    title: 'GOODNESS',
    slug: { _type: 'slug', current: 'goodness' },
    excerpt: 'Four daily affirmations centered on God\'s goodness. Discover what happens when you recognize His goodness consistently.',
    author: 'Kevin White',
    publishDate: '2025-03-19',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Kevin White shares four daily affirmations centered on God\'s goodness:', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: '1. God, you are GOOD\n2. You are GOOD to me\n3. You are GOOD at being God\n4. God is GOOD and does GOOD', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'As Steven Furtick says: "Perhaps you don\'t have a supply problem, you have a sight problem."', marks: ['em'] }], markDefs: [] },
      { _type: 'block', _key: 'b4', style: 'h2', children: [{ _type: 'span', _key: 's4', text: 'Seeing God\'s Goodness', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b5', style: 'normal', children: [{ _type: 'span', _key: 's5', text: 'Through Scripture — Psalms, Romans, Jeremiah — we see God\'s intentional plans for good outcomes in believers\' lives. To preserve awareness of goodness: search, remember, count, record, protect, proclaim, and share it.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-faithfulness',
    _type: 'blogPost',
    title: 'FAITHFULNESS',
    slug: { _type: 'slug', current: 'faithfulness' },
    excerpt: 'Three commitments to model God\'s faithfulness: praise, prayer, and sales as a spiritual calling.',
    author: 'Kevin White',
    publishDate: '2025-03-19',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Kevin White shares a message about God\'s faithfulness through three commitments:', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', _key: 's2', text: 'Praise', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Continuous praise should override negative emotions like worry, doubt, and fear. "I will praise the LORD at all times" (Psalms 34:1-2).', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b4', style: 'h2', children: [{ _type: 'span', _key: 's4', text: 'Prayer', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b5', style: 'normal', children: [{ _type: 'span', _key: 's5', text: 'Prayer is the "information technology system" for business success. Prayer up — company up. Prayer down — company down.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b6', style: 'h2', children: [{ _type: 'span', _key: 's6', text: 'Sales', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b7', style: 'normal', children: [{ _type: 'span', _key: 's7', text: 'Sales reframed as a spiritual calling. Sharing God\'s message and supporting organizations all require sales efforts.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-multiply',
    _type: 'blogPost',
    title: 'MULTIPLY',
    slug: { _type: 'slug', current: 'multiply' },
    excerpt: 'Exploring multiplication as a divine principle woven throughout biblical history, from creation to the Great Commission.',
    author: 'Kevin White',
    publishDate: '2025-03-10',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: '"Be fruitful and multiply. Fill the earth and govern it." (Genesis 1:27-30)', marks: ['em'] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'God embedded multiplication into creation itself. This divine principle is woven throughout biblical history.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b3', style: 'h2', children: [{ _type: 'span', _key: 's3', text: 'Abraham\'s Legacy', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b4', style: 'normal', children: [{ _type: 'span', _key: 's4', text: 'God promised Abraham his descendants would bless all families on earth, establishing multiplication as a spiritual inheritance.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b5', style: 'h2', children: [{ _type: 'span', _key: 's5', text: 'Jesus\'s Example', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b6', style: 'normal', children: [{ _type: 'span', _key: 's6', text: 'Jesus demonstrated multiplication through calling twelve disciples, performing miracles of abundance, and commissioning followers to spread the gospel.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-joy',
    _type: 'blogPost',
    title: 'JOY',
    slug: { _type: 'slug', current: 'joy' },
    excerpt: 'Three types of joy — emotional, positional, and spiritual. An unshakeable divine gift independent of circumstances.',
    author: 'Kevin White',
    publishDate: '2025-02-24',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Joy through a biblical lens — three distinct types: Emotional (immediate feeling), Positional (lasting character trait), and Spiritual (fruit of the Holy Spirit).', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', _key: 's2', text: 'God\'s Expectation', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'Serving God without joy displeases Him. Deuteronomy 28:47-48 warns against joyless service. Joy is an unshakeable divine gift independent of personal circumstances.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-rewarded',
    _type: 'blogPost',
    title: 'REWARDED',
    slug: { _type: 'slug', current: 'rewarded' },
    excerpt: 'God\'s rewards for faithful followers. If God says He will reward us for our faith, then God will reward us.',
    author: 'Kevin White',
    publishDate: '2025-02-18',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: '"If God says he will reward us for our faith then God will reward us!" Rewards ultimately belong to Jesus. Believers function as stewards who multiply kingdom impact.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', _key: 's2', text: 'Personal Testimony', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'At his high school awards ceremony, Kevin\'s name was called three times for scholarships totaling his first year\'s tuition — divine affirmation of his faith commitment.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-paths',
    _type: 'blogPost',
    title: 'PATHS',
    slug: { _type: 'slug', current: 'paths' },
    excerpt: 'Six standards for Spirit Media and God\'s guidance through established pathways. His guidance is His provision.',
    author: 'Kevin White',
    publishDate: '2025-02-10',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: '"He renews my strength. He guides me along right PATHS, bringing honor to his name." (Psalms 23:3, NLT)', marks: ['em'] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Six standards: Know God\'s Word, pray with Jesus\' authority, praise at all times, boast only on the Lord, pursue every sales lead, eliminate waste. God\'s guidance is God\'s provision.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-revelation',
    _type: 'blogPost',
    title: 'REVELATION',
    slug: { _type: 'slug', current: 'revelation' },
    excerpt: 'Understanding biblical revelation — what God reveals, how we receive it, and the ground rules for discernment.',
    author: 'Kevin White',
    publishDate: '2025-01-31',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'Kevin recalls childhood fear of the Book of Revelation, but after praying at 17 — "God if there is more to you than I realize, I want to know it" — his perspective transformed.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'God reveals identity, purpose, calling, strategy, freedom, and guidance through worship, scripture, prayer, dreams, and conversations. All revelation must align with Scripture.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-fight',
    _type: 'blogPost',
    title: 'FIGHT!',
    slug: { _type: 'slug', current: 'fight' },
    excerpt: 'Spiritual fighting in personal and professional contexts. The battle belongs to the Lord and has already been won.',
    author: 'Kevin White',
    publishDate: '2024-06-20',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: '"Fight the good fight for the true faith." (1 Timothy 6:12). Five principles: truth, righteousness, peace, faith, salvation. Three weapons: God\'s Word, prayer in the Spirit, persistence.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'Be a FIGHTER. Let God FIGHT through you. The battle belongs to the Lord. The battle has already been won!', marks: ['strong'] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-boasting',
    _type: 'blogPost',
    title: 'BOASTING',
    slug: { _type: 'slug', current: 'boasting' },
    excerpt: 'All possessions and accomplishments are divine gifts. Boast only in the Lord, not in personal achievement.',
    author: 'Kevin White',
    publishDate: '2024-06-20',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: '"What do you have that God hasn\'t GIVEN you?" (1 Corinthians 4:7). Nothing is owned outright — everything originates from God.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', _key: 's2', text: 'The Gideon Account', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', _key: 's3', text: 'God reduced Gideon\'s army from 32,000 to 300 to prevent Israel from attributing victory to military strength. God multiplies through subtraction.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-succeed',
    _type: 'blogPost',
    title: 'SUCCEED!',
    slug: { _type: 'slug', current: 'succeed' },
    excerpt: 'Help others succeed and you will succeed too. The welfare of the city determines your welfare.',
    author: 'Kevin White',
    publishDate: '2024-06-20',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: '"The welfare of the city will determine your welfare." (Jeremiah 29:7). Help others succeed and you will succeed too.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'At Spirit Media: loyalty, shared vision, honesty, and waste elimination. Client success enables company success enables employee success.', marks: [] }], markDefs: [] },
    ],
  },
  {
    _id: 'post-relationships',
    _type: 'blogPost',
    title: 'RELATIONSHIPS',
    slug: { _type: 'slug', current: 'relationships' },
    excerpt: 'Business success depends on strong relationships. The most beloved action in any relationship is to be heard.',
    author: 'Kevin White',
    publishDate: '2024-06-20',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: '"The Word became human and made his home among us." (John 1:14). God models relationship by becoming human.', marks: [] }], markDefs: [] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', _key: 's2', text: 'The most beloved action in any relationship is to be heard. Adopt the Golden Rule and become a "client in your own company."', marks: [] }], markDefs: [] },
    ],
  },
];

// Books
const books = [
  { _id: 'book-1', _type: 'book', title: 'Audacious Generosity', order: 1, description: 'If you desire to give more selflessly, exchanging pressure for genuine confidence and satisfaction, this is a read for you. Discover what happens when you open your hands to God and commit to using what He puts into those hands.' },
  { _id: 'book-2', _type: 'book', title: 'Get to the Point', order: 2, description: 'Distilled into one easy-to-read book are the most valuable lessons Kevin has learned to fully live in God\'s presence, hear His voice, and receive His provision.' },
  { _id: 'book-3', _type: 'book', title: 'What\'s Your Word?', order: 3, description: 'Words are more than characters uttered or written. They are vehicles that channel our aspirations and ambitions. When we listen to God speaking His word in our lives, the keys to the ignition are on.' },
  { _id: 'book-4', _type: 'book', title: 'Ultimate Book Marketing Guide', order: 4, description: 'Kevin shares his marketing formula for getting your book jumping off the shelves.' },
  { _id: 'book-5', _type: 'book', title: 'Only God Works', order: 5, description: 'In chasing a life of abundance, Kevin reveals why you should permit yourself to rely on God to provide.' },
  { _id: 'book-6', _type: 'book', title: 'Your Very Own Children\'s Book', order: 6, description: 'Spirit Media provides support and guidance to create Your Very Own Children\'s Book.' },
  { _id: 'book-7', _type: 'book', title: 'Gifts', order: 7, description: 'God has physical blessings and spiritual gifts waiting for you. Kevin reminds us God\'s love knows no bounds.' },
];

// Keynotes
const keynotes = [
  { _id: 'keynote-1', _type: 'keynote', title: 'Living Generous Lives', order: 1, description: 'We all want to be more generous, but many fear doing it. Learn about entering God-fueled relationships and experiencing unlimited giving.' },
  { _id: 'keynote-2', _type: 'keynote', title: 'Seeking the Kingdom', order: 2, description: 'Focus on pursuing God\'s presence, hearing His voice, and the six ways the Holy Spirit communicates with us.' },
  { _id: 'keynote-3', _type: 'keynote', title: 'A Christian in Entrepreneurship', order: 3, description: 'Explores ethical business practices and stewardship principles for the faith-driven entrepreneur.' },
  { _id: 'keynote-4', _type: 'keynote', title: 'God Works, You Don\'t', order: 4, description: 'Reframes work perspective within the Great Commission context. Learn to let God work through you.' },
  { _id: 'keynote-5', _type: 'keynote', title: 'Harness Your Vision', order: 5, description: 'Develops leadership innovation and creative problem-solving approaches grounded in faith.' },
  { _id: 'keynote-6', _type: 'keynote', title: 'The Startup Revolution', order: 6, description: 'Covers fundraising, business planning, team building, and adaptability for transformational leadership.' },
];

async function migrate() {
  const all = [...posts, ...books, ...keynotes];
  let created = 0;
  for (const doc of all) {
    try {
      await client.createOrReplace(doc);
      created++;
      process.stdout.write(`\r  ${created}/${all.length} documents`);
    } catch (e) {
      console.error(`\nFailed: ${doc._id}`, e.message);
    }
  }
  console.log(`\n✅ Migrated ${created} documents to Sanity`);
}

migrate();
