/**
 * true로 바꾸면 public/images/documents/ 에 넣은 이미지를 사용합니다.
 * 파일 이름·위치·크기는 public/images/documents/README.md 참고.
 */
const USE_LOCAL_IMAGES = false;

const LOCAL_BASE = '/images/documents/';
const EXT = '.jpg';

const LOCAL_FILES = {
  tradeHero: 'trade-hero',
  tradeStep1: 'trade-step-1',
  tradeStep2: 'trade-step-2',
  tradeStep3: 'trade-step-3',
  tradeStep4: 'trade-step-4',
  tradeStep5: 'trade-step-5',
  tradeStep6: 'trade-step-6',
  marketHero: 'market-hero',
  marketYiwu: 'market-yiwu',
  marketYiwu2: 'market-yiwu-2',
  marketYiwu3: 'market-yiwu-3',
  marketGuide: 'market-guide',
  oemHero: 'oem-hero',
  oemFactory: 'oem-factory',
  oemPackaging: 'oem-packaging',
  oemMold: 'oem-mold',
  denote1: 'denote-1',
  denote2: 'denote-2',
  denote3: 'denote-3',
  denote4: 'denote-4',
  denote5: 'denote-5',
  denote6: 'denote-6',
  inventoryHero: 'inventory-hero',
  inventoryStep1: 'inventory-step-1',
  inventoryStep2: 'inventory-step-2',
  inventoryStep3: 'inventory-step-3',
  inventoryStep4: 'inventory-step-4',
  inventoryStep5: 'inventory-step-5',
  inventoryStep6: 'inventory-step-6',
  inventoryStep7: 'inventory-step-7',
  inventoryStep8: 'inventory-step-8',
  inventoryStep9: 'inventory-step-9',
} as const;

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

const FALLBACK = {
  tradeHero: u('1586528116311-ad8dd3c8310d', 1200),
  tradeStep1: u('1553419040-6e47aa774b48', 600),
  tradeStep2: u('1557804506-669a67965ba3', 600),
  tradeStep3: u('1551288049-bebda4e38f71', 600),
  tradeStep4: u('1565793298595-6a879b1d9492', 600),
  tradeStep5: u('1578575437130-527eed3abbec', 600),
  tradeStep6: u('1605745341112-85968b19335b', 600),
  marketHero: u('1605745341112-85968b19335b', 1200),
  marketYiwu: u('1616401784845-180882ba9ba8', 800),
  marketYiwu2: u('1558618666-fcd25c85cd64', 600),
  marketYiwu3: u('1586528116311-ad8dd3c8310d', 600),
  marketGuide: u('1557804506-669a67965ba3', 800),
  oemHero: u('1578575437130-527eed3abbec', 1200),
  oemFactory: u('1565793298595-6a879b1d9492', 800),
  oemPackaging: u('1586528116311-ad8dd3c8310d', 800),
  oemMold: u('1551288049-bebda4e38f71', 800),
  denote1: u('1558618666-fcd25c85cd64', 500),
  denote2: u('1586528116311-ad8dd3c8310d', 500),
  denote3: u('1551288049-bebda4e38f71', 500),
  denote4: u('1605745341112-85968b19335b', 500),
  denote5: u('1578575437130-527eed3abbec', 500),
  denote6: u('1616401784845-180882ba9ba8', 500),
  inventoryHero: u('1586528116311-ad8dd3c8310d', 1200),
  inventoryStep1: u('1553419040-6e47aa774b48', 400),
  inventoryStep2: u('1605745341112-85968b19335b', 400),
  inventoryStep3: u('1586528116311-ad8dd3c8310d', 400),
  inventoryStep4: u('1578575437130-527eed3abbec', 400),
  inventoryStep5: u('1616401784845-180882ba9ba8', 400),
  inventoryStep6: u('1565793298595-6a879b1d9492', 400),
  inventoryStep7: u('1551288049-bebda4e38f71', 400),
  inventoryStep8: u('1557804506-669a67965ba3', 400),
  inventoryStep9: u('1558618666-fcd25c85cd64', 400),
} as const;

export const DOC_IMAGES: Record<keyof typeof LOCAL_FILES, string> = USE_LOCAL_IMAGES
  ? Object.fromEntries(
      (Object.keys(LOCAL_FILES) as (keyof typeof LOCAL_FILES)[]).map((k) => [
        k,
        LOCAL_BASE + LOCAL_FILES[k] + EXT,
      ])
    ) as Record<keyof typeof LOCAL_FILES, string>
  : FALLBACK;
