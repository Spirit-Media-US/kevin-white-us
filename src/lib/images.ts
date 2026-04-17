// Site images hosted in Sanity CDN. Videos hosted in R2 (assets.spiritmediapublishing.com).

const S = 'https://cdn.sanity.io/images/kwhqwbb4/production';
const R2 = 'https://assets.spiritmediapublishing.com/kevin-white-us';

export const IMG = {
  logo: `${S}/2cdf7e71124bab063336a032e4f48cf6e7400160-1694x175.png`,
  kevin: `${S}/da61b15395eeea4696f53d987c5edd75cfceb28a-768x1024.png`,
  onStage: `${S}/175a185c0106c3bbd8f245e4cbbebb238cd376df-1024x711.jpg`,
  meeting1: `${S}/da1abc6d96fe7e640b3c9740b441489fc6058342-1024x683.jpg`,
  meeting2: `${S}/77a5d8c8fb519fcb38e1eb8e8f5b772a968b4013-1024x683.jpg`,
  npoBanner: `${S}/68aede7bb23f37fa65f0b673eb23ad5882ebb08f-1024x289.png`,
  kingsBook: `${S}/2a7eaa0bf2e8f1f4d1af87a3f65770f8afdb6f75-717x1024.jpg`,
  heroBg: `${S}/5751308142cca7852196a388c3d232a2cb5f5784-1200x700.jpg`,
  ytInstaBg: `${S}/d4e27107db3a661a83b73edce68d01dae465b9ef-2560x1440.jpg`,
  getToPointSample: `${S}/d7f28c49548b8b964950787519c5400b53a8bc9b-640x1024.jpg`,
  kevinCenter: `${S}/ef6d8bc7fb57ef31174c819af4ea3ed737a3f122-568x575.png`,
  familyPhoto: `${S}/e68f4c424f540c6d0806e3b9babd209f376e1e36-1000x1412.png`,
  podcastPhoto: `${S}/77fa3142d26c2a049256283207a60c64b654a401-553x553.png`,
  bookAG: `${S}/26f3095018e6a05b2fed604f7087e0d2fe643b1b-663x1024.jpg`,
  kevinHero: `${S}/9c3a37ae4276bb6f6abf634899d005a7dd1b0245-1980x2078.png`,
  phone: `${S}/1700c12e2a7412657914f0da5f4f2a02332ef18e-1028x902.png`,
  kwiGradient: `${S}/06946f8ab859ca9d6944c5f0c6d8d733f3ffee3a-2560x1344.jpg`,
} as const;

export const VIDEO = {
  entrepreneurLoop: `${R2}/entrepreneur-loop.mp4`,
  conferenceSpeakerLoop: `${R2}/conference-speaker-loop.mp4`,
  kwiSpeakerLoop: `${R2}/kwi-speaker-loop.mp4`,
  keynoteLivingGenerous: `${R2}/keynote-living-generous.mp4`,
  keynoteSeekingKingdom: `${R2}/keynote-seeking-kingdom.mp4`,
  keynoteChristianEntrepreneur: `${R2}/keynote-christian-entrepreneur.mp4`,
  keynoteGodWorks: `${R2}/keynote-god-works.mp4`,
  keynoteHarnessVision: `${R2}/keynote-harness-vision.mp4`,
  keynoteStartupRevolution: `${R2}/keynote-startup-revolution.mp4`,
} as const;
