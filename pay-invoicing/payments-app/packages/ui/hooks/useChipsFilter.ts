import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useChipsFilter = <T extends string>(initialKey: T) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedChipFromUrl = searchParams.get('chipKey');
  const [selectedChip, setSelectedChip] = useState<string | null>(
    selectedChipFromUrl || initialKey
  );

  useEffect(() => {
    if (!selectedChipFromUrl && initialKey) {
      setSearchParams({ chipKey: initialKey });
    } else if (selectedChipFromUrl && selectedChip !== selectedChipFromUrl) {
      setSelectedChip(selectedChipFromUrl);
    }
  }, [initialKey, selectedChipFromUrl]);

  const handleChipSelect = (key: T) => {
    setSelectedChip(key);
    setSearchParams({ chipKey: key });
  };

  return { selectedChip, handleChipSelect };
};
