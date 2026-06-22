import { useState } from 'react';
import { Box, Select, MenuItem, Chip, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';
import type { PlatformUserType, OnboardingStep } from '../types';
import { useUserModel } from '../context/UserModelContext';

const SWITCHER_VISIBLE_KEY = 'payd-switcher-visible';

export const UserTypeSwitcher = () => {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(SWITCHER_VISIBLE_KEY) !== 'false';
    } catch {
      return true;
    }
  });

  const toggleVisible = () => {
    const next = !visible;
    setVisible(next);
    localStorage.setItem(SWITCHER_VISIBLE_KEY, String(next));
  };
  const {
    platformUserType,
    rewardsOnly,
    raasUser,
    onboardedAccount,
    onboardingStep,
    isBeneficialOwner,
    setPlatformUserType,
    setRewardsOnly,
    setRaasUser,
    setOnboardedAccount,
    setOnboardingStep,
    setIsBeneficialOwner,
  } = useUserModel();

  const handleTypeChange = (event: SelectChangeEvent<PlatformUserType>) => {
    setPlatformUserType(event.target.value as PlatformUserType);
  };

  const handleStepChange = (event: SelectChangeEvent<OnboardingStep>) => {
    setOnboardingStep(event.target.value as OnboardingStep);
  };

  const onboardingSteps: { value: OnboardingStep; label: string }[] = [
    { value: 'get-started', label: 'Get Started' },
    { value: 'business', label: 'Business' },
    { value: 'industry', label: 'Industry' },
    { value: 'products-and-services', label: 'Products & Services' },
    { value: 'website', label: 'Website' },
    { value: 'monthly-revenue', label: 'Monthly Revenue' },
    { value: 'beneficial-owners', label: 'Beneficial Owners' },
    { value: 'account-applicant', label: 'Account Applicant' },
    { value: 'invite-owner', label: 'Invite Owner' },
    { value: 'complete', label: 'Complete' },
  ];

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 1,
        ml: 1.5,
        pl: 1.5,
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
        height: 30,
      }}
    >
      <IconButton
        onClick={toggleVisible}
        size="small"
        sx={{
          width: 28,
          height: 28,
          color: '#3866b0',
          '&:hover': { bgcolor: 'rgba(56, 102, 176, 0.08)' },
        }}
      >
        {visible ? <Visibility sx={{ fontSize: 16 }} /> : <VisibilityOff sx={{ fontSize: 16 }} />}
      </IconButton>

      {!visible ? null : <>
      <Select<PlatformUserType>
        value={platformUserType}
        onChange={handleTypeChange}
        size="small"
        sx={{
          height: 30,
          minWidth: 140,
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: '#3866b0',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b7c9f0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b7c9f0',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3866b0',
          },
          '& .MuiSelect-select': {
            py: 0.5,
            px: 1.5,
          },
        }}
      >
        <MenuItem value="account owner" sx={{ fontSize: '0.75rem' }}>
          Account Owner
        </MenuItem>
        <MenuItem value="view only" sx={{ fontSize: '0.75rem' }}>
          View Only
        </MenuItem>
      </Select>

      <Chip
        label="Rewards"
        size="small"
        variant={rewardsOnly ? 'filled' : 'outlined'}
        onClick={() => setRewardsOnly(!rewardsOnly)}
        sx={{
          height: 30,
          borderRadius: '999px',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          cursor: 'pointer',
          borderColor: '#b7c9f0',
          color: rewardsOnly ? 'white' : '#3866b0',
          bgcolor: rewardsOnly ? '#3866b0' : 'white',
          '&:hover': {
            bgcolor: rewardsOnly ? '#2d5290' : 'rgba(56, 102, 176, 0.08)',
          },
        }}
      />

      <Chip
        label="RaaS"
        size="small"
        variant={raasUser ? 'filled' : 'outlined'}
        onClick={() => setRaasUser(!raasUser)}
        sx={{
          height: 30,
          borderRadius: '999px',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          cursor: 'pointer',
          borderColor: '#b7c9f0',
          color: raasUser ? 'white' : '#3866b0',
          bgcolor: raasUser ? '#3866b0' : 'white',
          '&:hover': {
            bgcolor: raasUser ? '#2d5290' : 'rgba(56, 102, 176, 0.08)',
          },
        }}
      />

      <Box sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.12)', height: 30, mx: 0.5 }} />

      <Chip
        label="Onboarded"
        size="small"
        variant={onboardedAccount ? 'filled' : 'outlined'}
        onClick={() => setOnboardedAccount(!onboardedAccount)}
        sx={{
          height: 30,
          borderRadius: '999px',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          cursor: 'pointer',
          borderColor: '#b7c9f0',
          color: onboardedAccount ? 'white' : '#3866b0',
          bgcolor: onboardedAccount ? '#3866b0' : 'white',
          '&:hover': {
            bgcolor: onboardedAccount ? '#2d5290' : 'rgba(56, 102, 176, 0.08)',
          },
        }}
      />

      <Select<OnboardingStep>
        value={onboardingStep}
        onChange={handleStepChange}
        size="small"
        disabled={onboardedAccount}
        sx={{
          height: 30,
          minWidth: 160,
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: onboardedAccount ? 'rgba(0, 0, 0, 0.38)' : '#3866b0',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b7c9f0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b7c9f0',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3866b0',
          },
          '& .MuiSelect-select': {
            py: 0.5,
            px: 1.5,
          },
        }}
      >
        {onboardingSteps.map((step) => (
          <MenuItem key={step.value} value={step.value} sx={{ fontSize: '0.75rem' }}>
            {step.label}
          </MenuItem>
        ))}
      </Select>

      <Chip
        label="Beneficial Owner"
        size="small"
        variant={isBeneficialOwner ? 'filled' : 'outlined'}
        onClick={() => setIsBeneficialOwner(!isBeneficialOwner)}
        sx={{
          height: 30,
          borderRadius: '999px',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          cursor: 'pointer',
          borderColor: '#b7c9f0',
          color: isBeneficialOwner ? 'white' : '#3866b0',
          bgcolor: isBeneficialOwner ? '#3866b0' : 'white',
          '&:hover': {
            bgcolor: isBeneficialOwner ? '#2d5290' : 'rgba(56, 102, 176, 0.08)',
          },
        }}
      />
      </>}
    </Box>
  );
};
