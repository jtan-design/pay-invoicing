export type Maybe<T> = T | null | undefined;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type PlatformUserType = 'account owner' | 'view only';

export type OnboardingStep =
  | 'get-started'
  | 'business'
  | 'industry'
  | 'products-and-services'
  | 'website'
  | 'monthly-revenue'
  | 'beneficial-owners'
  | 'account-applicant'
  | 'invite-owner'
  | 'complete';

export interface UserMeta {
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  lastLoginAt: Maybe<Scalars['DateTime']>;
}

export interface PayAccount {
  id: Scalars['ID'];
  name: Scalars['String'];
  accountNumber: Scalars['String'];
  sortCode: Scalars['String'];
  balance: Scalars['Float'];
  currency: Scalars['String'];
}

export interface User {
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  platformUserType: PlatformUserType;
  rewardsOnly: Scalars['Boolean'];
  raasUser: Scalars['Boolean'];
  onboardedAccount: Scalars['Boolean'];
  onboardingStep: OnboardingStep;
  isBeneficialOwner: Scalars['Boolean'];
  meta: UserMeta;
  accounts: PayAccount[];
}

export interface UserSwitchableProps {
  platformUserType: PlatformUserType;
  rewardsOnly: boolean;
  raasUser: boolean;
  onboardedAccount: boolean;
  onboardingStep: OnboardingStep;
  isBeneficialOwner: boolean;
}
