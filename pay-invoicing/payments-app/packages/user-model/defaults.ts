import type { User, UserSwitchableProps } from './types';

export const STORAGE_KEY = 'payd-user-model';

export const DEFAULT_SWITCHABLE: UserSwitchableProps = {
  platformUserType: 'account owner',
  rewardsOnly: false,
  raasUser: false,
  onboardedAccount: true,
  onboardingStep: 'complete',
  isBeneficialOwner: false,
};

export function createDefaultUser(overrides?: Partial<UserSwitchableProps>): User {
  const switchable = { ...DEFAULT_SWITCHABLE, ...overrides };

  return {
    id: 'usr_proto_001',
    firstName: 'Alex',
    lastName: 'Designer',
    email: 'alex@payd.com',
    platformUserType: switchable.platformUserType,
    rewardsOnly: switchable.rewardsOnly,
    raasUser: switchable.raasUser,
    onboardedAccount: switchable.onboardedAccount,
    onboardingStep: switchable.onboardingStep,
    isBeneficialOwner: switchable.isBeneficialOwner,
    meta: {
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    },
    accounts: [
      {
        id: 'acc_001',
        name: 'Main Business Account',
        accountNumber: '12345678',
        sortCode: '01-02-03',
        balance: 24500.0,
        currency: 'GBP',
      },
    ],
  };
}
