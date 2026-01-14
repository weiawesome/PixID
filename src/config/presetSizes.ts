import type { PresetSize } from '../types';

export const SOCIAL_MEDIA_PRESETS: PresetSize[] = [
  {
    id: 'twitter',
    category: 'social',
    name: 'Twitter/X',
    nameKey: 'presets.social.twitter',
    width: 400,
    height: 400,
    aspectRatio: 1,
    descriptionKey: 'presets.social.twitter_desc'
  },
  {
    id: 'facebook',
    category: 'social',
    name: 'Facebook',
    nameKey: 'presets.social.facebook',
    width: 720,
    height: 720,
    aspectRatio: 1,
    descriptionKey: 'presets.social.facebook_desc'
  },
  {
    id: 'instagram',
    category: 'social',
    name: 'Instagram',
    nameKey: 'presets.social.instagram',
    width: 320,
    height: 320,
    aspectRatio: 1,
    descriptionKey: 'presets.social.instagram_desc'
  },
  {
    id: 'linkedin',
    category: 'social',
    name: 'LinkedIn',
    nameKey: 'presets.social.linkedin',
    width: 400,
    height: 400,
    aspectRatio: 1,
    descriptionKey: 'presets.social.linkedin_desc'
  },
  {
    id: 'youtube',
    category: 'social',
    name: 'YouTube',
    nameKey: 'presets.social.youtube',
    width: 800,
    height: 800,
    aspectRatio: 1,
    descriptionKey: 'presets.social.youtube_desc'
  },
  {
    id: 'tiktok',
    category: 'social',
    name: 'TikTok',
    nameKey: 'presets.social.tiktok',
    width: 200,
    height: 200,
    aspectRatio: 1,
    descriptionKey: 'presets.social.tiktok_desc'
  },
  {
    id: 'discord',
    category: 'social',
    name: 'Discord',
    nameKey: 'presets.social.discord',
    width: 128,
    height: 128,
    aspectRatio: 1,
    descriptionKey: 'presets.social.discord_desc'
  }
];

export const ID_PHOTO_PRESETS: PresetSize[] = [
  {
    id: 'china_1inch',
    category: 'id-photo',
    name: 'China 1-inch',
    nameKey: 'presets.id.china_1inch',
    width: 295,
    height: 413,
    aspectRatio: 295 / 413,
    descriptionKey: 'presets.id.china_1inch_desc',
    dpi: 300 // 25mm x 35mm at 300 DPI
  },
  {
    id: 'china_2inch',
    category: 'id-photo',
    name: 'China 2-inch',
    nameKey: 'presets.id.china_2inch',
    width: 413,
    height: 626,
    aspectRatio: 413 / 626,
    descriptionKey: 'presets.id.china_2inch_desc',
    dpi: 300 // 35mm x 53mm at 300 DPI
  },
  {
    id: 'china_small_1inch',
    category: 'id-photo',
    name: 'China Small 1-inch',
    nameKey: 'presets.id.china_small_1inch',
    width: 260,
    height: 378,
    aspectRatio: 260 / 378,
    descriptionKey: 'presets.id.china_small_1inch_desc',
    dpi: 300 // 22mm x 32mm at 300 DPI
  },
  {
    id: 'passport_usa',
    category: 'id-photo',
    name: 'US Passport',
    nameKey: 'presets.id.passport_usa',
    width: 600,
    height: 600,
    aspectRatio: 1,
    descriptionKey: 'presets.id.passport_usa_desc',
    dpi: 300 // 2x2 inches at 300 DPI
  },
  {
    id: 'passport_international',
    category: 'id-photo',
    name: 'International Passport',
    nameKey: 'presets.id.passport_international',
    width: 354,
    height: 472,
    aspectRatio: 354 / 472,
    descriptionKey: 'presets.id.passport_international_desc',
    dpi: 300 // 35mm x 45mm at 300 DPI
  },
  {
    id: 'visa_usa',
    category: 'id-photo',
    name: 'US Visa',
    nameKey: 'presets.id.visa_usa',
    width: 600,
    height: 600,
    aspectRatio: 1,
    descriptionKey: 'presets.id.visa_usa_desc',
    dpi: 300 // 2x2 inches at 300 DPI
  },
  {
    id: 'drivers_license',
    category: 'id-photo',
    name: 'Drivers License',
    nameKey: 'presets.id.drivers_license',
    width: 354,
    height: 472,
    aspectRatio: 354 / 472,
    descriptionKey: 'presets.id.drivers_license_desc',
    dpi: 300 // 35mm x 45mm at 300 DPI
  },
  {
    id: 'id_card_china',
    category: 'id-photo',
    name: 'China ID Card',
    nameKey: 'presets.id.id_card_china',
    width: 358,
    height: 441,
    aspectRatio: 358 / 441,
    descriptionKey: 'presets.id.id_card_china_desc',
    dpi: 350 // 26mm x 32mm at 350 DPI
  },
  {
    id: 'resume_photo',
    category: 'id-photo',
    name: 'Resume Photo',
    nameKey: 'presets.id.resume_photo',
    width: 413,
    height: 531,
    aspectRatio: 413 / 531,
    descriptionKey: 'presets.id.resume_photo_desc',
    dpi: 300 // 35mm x 45mm at 300 DPI
  }
];

export const ALL_PRESETS = [...SOCIAL_MEDIA_PRESETS, ...ID_PHOTO_PRESETS];
