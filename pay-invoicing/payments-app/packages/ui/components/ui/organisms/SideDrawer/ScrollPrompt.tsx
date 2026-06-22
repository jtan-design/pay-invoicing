import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ScrollPromptContainer } from './styles';

interface ScrollPromptProps {
  hidden: boolean;
}

export const ScrollPrompt: React.FC<ScrollPromptProps> = ({ hidden }) => (
  <ScrollPromptContainer hidden={hidden}>
    <KeyboardArrowDownIcon />
  </ScrollPromptContainer>
);