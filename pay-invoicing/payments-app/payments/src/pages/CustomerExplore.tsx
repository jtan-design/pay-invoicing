import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { ArrowForwardRounded, PersonRounded, Menu as MenuIcon } from '@mui/icons-material';
import { SideNav } from '../components/SideNav';
import { FutureStateToggle } from '../components/FutureStateToggle';
import { CustomerExploreA } from './CustomerExploreA';
import { CustomerExploreB } from './CustomerExploreB';
import { CustomerExploreC } from './CustomerExploreC';
import { CustomerExploreD } from './CustomerExploreD';

const EXPLORE_TABS = [
  { label: 'A — Current', hypothesis: 'Baseline — existing payee add pattern adapted for invoicing' },
  { label: 'B — Inline add', hypothesis: 'Removing the separate step saves 40s per invoice' },
  { label: 'C — Table first', hypothesis: 'Seeing the list first reduces first-invoice anxiety' },
  { label: 'D — Type-led', hypothesis: 'Type-first reduces perceived field count' },
];

const ExploreTabBar = ({
  activeTab,
  onTabChange,
}: {
  activeTab: number;
  onTabChange: (t: number) => void;
}) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 44,
      bgcolor: '#1E1E3F',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'stretch',
      px: 2,
      gap: 0,
      userSelect: 'none',
    }}
  >
    {EXPLORE_TABS.map((tab, i) => (
      <Box
        key={i}
        component="button"
        onClick={() => onTabChange(i)}
        sx={{
          background: 'none',
          border: 'none',
          borderBottom: `3px solid ${activeTab === i ? '#1A56DB' : 'transparent'}`,
          cursor: 'pointer',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          fontSize: 13,
          fontWeight: activeTab === i ? 600 : 400,
          color: activeTab === i ? 'white' : '#8B96A8',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          '&:hover': { color: activeTab === i ? 'white' : '#C4CAD4' },
        }}
      >
        {tab.label}
      </Box>
    ))}

    <Box sx={{ flex: 1 }} />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1, overflow: 'hidden' }}>
      <Typography sx={{ fontSize: 12, color: '#6B7280', fontStyle: 'italic', flexShrink: 0 }}>
        Hypothesis:&nbsp;
      </Typography>
      <Typography
        noWrap
        sx={{ fontSize: 12, color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {EXPLORE_TABS[activeTab].hypothesis}
      </Typography>
    </Box>
  </Box>
);

const ExploreHeader = () => (
  <Box
    component="header"
    sx={{
      height: 66,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      px: 1.5,
      bgcolor: 'white',
      borderBottom: '1px solid rgba(0,0,0,0.12)',
      zIndex: 50,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton sx={{ width: 40, height: 40, p: 1 }}>
        <MenuIcon sx={{ height: 24, width: 24 }} />
      </IconButton>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            bgcolor: '#3866b0',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 800, lineHeight: 1 }}>P</Typography>
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#283e48', letterSpacing: '-0.2px' }}>
          pay.com.au
        </Typography>
      </Box>
    </Box>

    <Box sx={{ flex: 1 }} />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Button
        variant="outlined"
        size="small"
        endIcon={<ArrowForwardRounded sx={{ width: 14, height: 14 }} />}
        sx={{
          height: 30,
          borderRadius: 999,
          borderColor: '#b7c9f0',
          textTransform: 'none',
          color: '#3866b0',
          fontWeight: 700,
          fontSize: 12,
          px: 1.5,
          '&:hover': { borderColor: '#3866b0', bgcolor: 'rgba(56,102,176,0.04)' },
        }}
      >
        Rewards
      </Button>
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          border: '1px solid #b7c9f0',
          bgcolor: '#eef2fc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <PersonRounded sx={{ fontSize: 17, color: '#3866b0' }} />
      </Box>
    </Box>
  </Box>
);

export const CustomerExplore = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [futureState, setFutureState] = useState<'current' | 'future'>('current');

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fcfcfc',
        overflow: 'hidden',
      }}
    >
      <ExploreTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Spacer matching fixed tab bar height */}
      <Box sx={{ height: 44, flexShrink: 0 }} />

      <ExploreHeader />

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <SideNav />

        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* All 4 tabs mounted — display:none preserves state on switch */}
          <Box sx={{ display: activeTab === 0 ? 'flex' : 'none', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
            <CustomerExploreA futureState={futureState} />
          </Box>
          <Box sx={{ display: activeTab === 1 ? 'flex' : 'none', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
            <CustomerExploreB />
          </Box>
          <Box sx={{ display: activeTab === 2 ? 'flex' : 'none', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
            <CustomerExploreC />
          </Box>
          <Box sx={{ display: activeTab === 3 ? 'flex' : 'none', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
            <CustomerExploreD />
          </Box>
        </Box>
      </Box>

      <FutureStateToggle state={futureState} onChange={setFutureState} />
    </Box>
  );
};
