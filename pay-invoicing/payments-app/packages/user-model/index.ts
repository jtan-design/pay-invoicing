// Types
export type { User, UserMeta, PayAccount, PlatformUserType, OnboardingStep, UserSwitchableProps, Maybe, Scalars } from './types';

// Defaults
export { createDefaultUser, DEFAULT_SWITCHABLE } from './defaults';

// Context + hook
export { UserModelProvider, useUserModel } from './context/UserModelContext';

// Components
export { UserTypeSwitcher } from './components/UserTypeSwitcher';
