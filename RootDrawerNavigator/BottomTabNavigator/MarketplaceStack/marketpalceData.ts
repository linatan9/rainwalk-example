import GentlyBeastLogo from '@rainwalk/assets/images/GentleBeastLogo.svg';
import GentlyBeast from '@rainwalk/assets/images/GentlyBeast.svg';
import PetsTable from '@rainwalk/assets/images/Pets-table.svg';
import PetstableLogo from '@rainwalk/assets/images/PetstableLogo.svg';
import type { Events } from '@rainwalk/components/AnalyticProvider/events';
import type { FunctionComponent } from 'react';
import type { SvgProps } from 'react-native-svg';

export interface IMarketpalceItem {
  description: string;
  event: keyof Events;
  image: FunctionComponent<SvgProps>;
  link: string;
  logo?: FunctionComponent<SvgProps>;
  roleDescription: string;
  subtitle: string;
  title: string;
  type: PERKS_TYPE;
  username: string;
}
export enum PERKS_TYPE {
  PETS_TABLE = 0,
  GENTLY_BEAST = 1,
}
export const MARKETPLACE_ITEMS: IMarketpalceItem[] = [
  {
    type: PERKS_TYPE.PETS_TABLE,
    image: PetsTable,
    title: '60% off high-quality, fresh dog food with The Pets Table',
    logo: PetstableLogo,
    subtitle:
      "The Pets Table, brought to you by HelloFresh, offers healthy dog food options delivered right to your door. You get: 60% off your first box and free shipping, and 20% off your second box. It's a no brainer to try!",
    description: `"I've been on the hunt for quality fresh food because it is proven to support long, healthy, happy lives for our pets. And I don't have time to make fresh food for Kobi myself. The Pets Table is exactly what I was looking for — fresh pet food delivered to my door. Kobi absolutely loves it and eats every bite!"`,
    username: 'Christine',
    roleDescription: 'dog mom to Kobi and  product manager at Rainwalk',
    event: 'petsTableClaimDiscountPressed',
    link: 'https://www.thepetstable.com/plans-quiz?c=RW-G62LA&utm_source=rainwalk&utm_medium=cpa&utm_campaign=Rainwalk_CustomerPortal_60%FS20%&vs_campaign_id=2bab3414-bffd-493b-ae8e-d5be7f64e046&utm_content=act_partnerships_partnerships',
  },
  {
    type: PERKS_TYPE.GENTLY_BEAST,
    image: GentlyBeast,
    title: '1 month of free online dog training with Gentle Beast',
    logo: GentlyBeastLogo,
    subtitle:
      "The Gentle Beast app (available on iOS and MacOS) provides highly convenient, on-demand dog training and support from the world’s best experts — personalized to you and your pup's needs. Use their repository of helpful content or book a 1:1 virtual training session.",
    description: `"Toodles is a 5 year-old rescue pup with a few quirks. I love using the Gentle Beast content to refresh what I've learned in the past to address her impulse control and reactivity. In particular, I find myself regularly going back to the lessons on preventing jumping! I wish Gentle Beast was available when she was a puppy — the lessons are so convenient."`,
    username: 'Brittney',
    roleDescription: 'dog mom to Toodles and head of strategy at Rainwalk',
    event: 'gentlyBeatsClaimDiscountPressed',
    link: 'https://gentlebeast.app.link/rainwalk_technology',
  },
];
