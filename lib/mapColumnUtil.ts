const columnLabelMap: Record<string, string> = {
  category: '카테고리',
  title: '제목',
  tags: '태그',
  createdAt: '작성일',
};

export const getColumnLabel = (columnId: string): string => {
  return columnLabelMap[columnId] || columnId;
};
