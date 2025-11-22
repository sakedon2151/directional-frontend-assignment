'use client';

import { Button } from '../common/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../common/DropDownMenu';
import { usePostFilterStore } from '@/hooks/usePostFilterStore';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export const SortDropdown = () => {
  const sort = usePostFilterStore((state) => state.sort);
  const order = usePostFilterStore((state) => state.order);
  const setSort = usePostFilterStore((state) => state.setSort);
  const setOrder = usePostFilterStore((state) => state.setOrder);

  const sortOptions: Array<{ value: 'createdAt' | 'title'; label: string }> = [
    { value: 'createdAt', label: '작성일' },
    { value: 'title', label: '제목' },
  ];

  const orderOptions: Array<{ value: 'asc' | 'desc'; label: string; icon: React.ReactNode }> = [
    { value: 'asc', label: '오름차순', icon: <ArrowUp /> },
    { value: 'desc', label: '내림차순', icon: <ArrowDown /> },
  ];

  const handleSortChange = (value: string) => {
    setSort(value as 'createdAt' | 'title');
    if (!order) {
      setOrder('asc');
    }
  };

  const handleOrderChange = (value: string) => {
    setOrder(value as 'asc' | 'desc');
  };

  const getDisplayText = () => {
    if (!sort) return '정렬';
    const sortLabel = sortOptions.find((opt) => opt.value === sort)?.label || '';
    const orderLabel = order ? orderOptions.find((opt) => opt.value === order)?.label || '' : '';
    return `${sortLabel} ${orderLabel}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ArrowUpDown />
          {getDisplayText()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>정렬 기준</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort || ''} onValueChange={handleSortChange}>
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        {sort && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>정렬 순서</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={order || 'asc'} onValueChange={handleOrderChange}>
              {orderOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  <span className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
