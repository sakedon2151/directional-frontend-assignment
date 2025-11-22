export const FORBIDDEN_WORDS = ['캄보디아', '프놈펜', '불법체류', '텔레그램'];

export const checkForbiddenWords = (text: string): string | null => {
  const foundWord = FORBIDDEN_WORDS.find((word) => text.includes(word));
  return foundWord ? `금칙어("${foundWord}")가 포함되어 있습니다.` : null;
};

export const validateForbiddenWords = (val: string): boolean => {
  return !checkForbiddenWords(val);
};
