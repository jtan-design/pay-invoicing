import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { SideDrawerModalContentContainer } from './styles';
import type { SxProps, Theme } from '@mui/material';
import { ScrollPrompt } from './ScrollPrompt';

export interface SideDrawerModalContentProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}
export const SideDrawerModalContent = ({
  children,
  sx,
}: SideDrawerModalContentProps) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isScrollable, setIsScrollable] = useState<boolean | undefined>(
    undefined
  );

  const showScrollPrompt = isScrollable && !scrolled;

  const handleEnter = useCallback(() => {
    if (isScrollable !== undefined || !scrollableRef.current) return;

    const scrollHandler = (event: Event) => {
      const element = event.target as HTMLDivElement;
      if (element.scrollTop === 0) return;

      setScrolled(true);
      scrollableRef.current?.removeEventListener('scroll', scrollHandler);
    };

    const element = scrollableRef.current;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    const hasScroll = scrollHeight > clientHeight;

    setIsScrollable(hasScroll);

    if (!hasScroll) return;

    element.addEventListener('scroll', scrollHandler);
  }, [scrollableRef.current, isScrollable]);

  return (
    <SideDrawerModalContentContainer
      ref={scrollableRef}
      onTransitionEnd={handleEnter}
      sx={sx}
    >
      {children}
      <ScrollPrompt hidden={!showScrollPrompt} />
    </SideDrawerModalContentContainer>
  );
};