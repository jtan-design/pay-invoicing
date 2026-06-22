import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { User, PlatformUserType, OnboardingStep, UserSwitchableProps } from '../types';
import { STORAGE_KEY, DEFAULT_SWITCHABLE, createDefaultUser } from '../defaults';

interface UserModelContextType {
  user: User;
  platformUserType: PlatformUserType;
  rewardsOnly: boolean;
  raasUser: boolean;
  onboardedAccount: boolean;
  onboardingStep: OnboardingStep;
  isBeneficialOwner: boolean;
  setPlatformUserType: (type: PlatformUserType) => void;
  setRewardsOnly: (value: boolean) => void;
  setRaasUser: (value: boolean) => void;
  setOnboardedAccount: (value: boolean) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  setIsBeneficialOwner: (value: boolean) => void;
  isAccountOwner: boolean;
  isViewOnly: boolean;
  isOnboarded: boolean;
}

const UserModelContext = createContext<UserModelContextType | undefined>(undefined);

function loadSwitchable(): UserSwitchableProps {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UserSwitchableProps>;
      return { ...DEFAULT_SWITCHABLE, ...parsed };
    }
  } catch {
    // ignore corrupt storage
  }
  return { ...DEFAULT_SWITCHABLE };
}

function saveSwitchable(props: UserSwitchableProps): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(props));
}

export const UserModelProvider = ({ children }: { children: ReactNode }) => {
  const [switchable, setSwitchable] = useState<UserSwitchableProps>(loadSwitchable);

  useEffect(() => {
    saveSwitchable(switchable);
  }, [switchable]);

  const setPlatformUserType = useCallback((type: PlatformUserType) => {
    setSwitchable(prev => ({ ...prev, platformUserType: type }));
  }, []);

  const setRewardsOnly = useCallback((value: boolean) => {
    setSwitchable(prev => ({ ...prev, rewardsOnly: value }));
  }, []);

  const setRaasUser = useCallback((value: boolean) => {
    setSwitchable(prev => ({ ...prev, raasUser: value }));
  }, []);

  const setOnboardedAccount = useCallback((value: boolean) => {
    setSwitchable(prev => ({ ...prev, onboardedAccount: value }));
  }, []);

  const setOnboardingStep = useCallback((step: OnboardingStep) => {
    setSwitchable(prev => ({ ...prev, onboardingStep: step }));
  }, []);

  const setIsBeneficialOwner = useCallback((value: boolean) => {
    setSwitchable(prev => ({ ...prev, isBeneficialOwner: value }));
  }, []);

  const user = useMemo(() => createDefaultUser(switchable), [switchable]);

  const value = useMemo<UserModelContextType>(() => ({
    user,
    platformUserType: switchable.platformUserType,
    rewardsOnly: switchable.rewardsOnly,
    raasUser: switchable.raasUser,
    onboardedAccount: switchable.onboardedAccount,
    onboardingStep: switchable.onboardingStep,
    isBeneficialOwner: switchable.isBeneficialOwner,
    setPlatformUserType,
    setRewardsOnly,
    setRaasUser,
    setOnboardedAccount,
    setOnboardingStep,
    setIsBeneficialOwner,
    isAccountOwner: switchable.platformUserType === 'account owner',
    isViewOnly: switchable.platformUserType === 'view only',
    isOnboarded: switchable.onboardedAccount,
  }), [user, switchable, setPlatformUserType, setRewardsOnly, setRaasUser, setOnboardedAccount, setOnboardingStep, setIsBeneficialOwner]);

  return (
    <UserModelContext.Provider value={value}>
      {children}
    </UserModelContext.Provider>
  );
};

export const useUserModel = (): UserModelContextType => {
  const context = useContext(UserModelContext);
  if (context === undefined) {
    throw new Error('useUserModel must be used within a UserModelProvider');
  }
  return context;
};
