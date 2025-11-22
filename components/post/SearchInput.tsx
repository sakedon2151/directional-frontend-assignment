'use client';

import { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { ButtonGroup } from '../common/ButtonGroup';
import { Search } from 'lucide-react';
import { usePostFilterStore } from '@/hooks/usePostFilterStore';

export const SearchInput = () => {
  const search = usePostFilterStore((state) => state.search);
  const setSearch = usePostFilterStore((state) => state.setSearch);
  const [localSearch, setLocalSearch] = useState(search);

  const handleSearch = () => {
    setSearch(localSearch);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <ButtonGroup>
      <Input
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="제목 또는 본문 검색..."
      />
      <Button variant="outline" onClick={handleSearch}>
        <Search />
      </Button>
    </ButtonGroup>
  );
};
