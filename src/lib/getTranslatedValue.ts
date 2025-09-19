import { useTranslations } from 'next-intl';

const TRANSLATION_KEY_MAP = {
  gender: 'characters',
  field: 'fields',
  status: 'characters',
} as const;

export function getTranslatedValue(
  t: ReturnType<typeof useTranslations>,
  type: keyof typeof TRANSLATION_KEY_MAP,
  value: string,
) {
  const keyPrefix = TRANSLATION_KEY_MAP[type];
  if (keyPrefix) {
    return t(`${keyPrefix}.${value.toLowerCase()}`);
  }
  return value;
}
