import type { Character } from './types';

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'حافظ شیرازی',
    gender: 'مرد',
    birthDate: '۱۳۲۵',
    deathDate: '۱۳۹۰',
    fieldOfActivity: 'شاعر',
    status: 'فعال',
    biography:
      'خواجه شمس‌الدین محمد حافظ شیرازی، معروف به حافظ، شاعر بزرگ قرن هشتم هجری و از مفاخر ادب فارسی است.',
    works: ['دیوان حافظ', 'غزلیات'],
    likes: 245,
    avatar: '/placeholder-m0wag.png',
    textResources: ['دیوان-حافظ.pdf', 'تفسیر-غزلیات.pdf'],
    audioResources: ['غزل-حافظ-1.mp3'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'فردوسی',
    gender: 'مرد',
    birthDate: '۹۴۰',
    deathDate: '۱۰۲۰',
    fieldOfActivity: 'شاعر',
    status: 'فعال',
    biography: 'ابوالقاسم فردوسی توسی، شاعر بزرگ ایرانی و سراینده شاهنامه، حماسه ملی ایران.',
    works: ['شاهنامه'],
    likes: 189,
    avatar: '/placeholder-quc81.png',
    textResources: ['شاهنامه-فردوسی.pdf'],
    audioResources: [],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z',
  },
  {
    id: '3',
    name: 'عمر خیام',
    gender: 'مرد',
    birthDate: '۱۰۴۸',
    deathDate: '۱۱۳۱',
    fieldOfActivity: 'منجم',
    status: 'فعال',
    biography:
      'غیاث‌الدین ابوالفتح عمر بن ابراهیم خیام نیشابوری، ریاضی‌دان، منجم، فیلسوف و شاعر ایرانی.',
    works: ['رباعیات خیام', 'رساله در جبر و مقابله'],
    likes: 156,
    avatar: '/placeholder-77lhd.png',
    textResources: ['رباعیات-خیام.pdf', 'ریاضیات-خیام.pdf'],
    audioResources: ['رباعی-خیام.mp3'],
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-12T11:00:00Z',
  },
  {
    id: '4',
    name: 'مولانا جلال‌الدین رومی',
    gender: 'مرد',
    birthDate: '۱۲۰۷',
    deathDate: '۱۲۷۳',
    fieldOfActivity: 'عارف',
    status: 'فعال',
    biography: 'جلال‌الدین محمد بلخی معروف به مولوی، عارف و شاعر بزرگ قرن هفتم هجری.',
    works: ['مثنوی معنوی', 'دیوان شمس', 'فیه ما فیه'],
    likes: 298,
    avatar: '/rumi-persian-sufi-poet.jpg',
    textResources: ['مثنوی-مولوی.pdf', 'دیوان-شمس.pdf'],
    audioResources: ['مثنوی-صوتی.mp3'],
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-08T14:00:00Z',
  },
  {
    id: '5',
    name: 'سعدی شیرازی',
    gender: 'مرد',
    birthDate: '۱۲۱۰',
    deathDate: '۱۲۹۱',
    fieldOfActivity: 'شاعر',
    status: 'فعال',
    biography:
      'مصلح‌الدین بن عبدالله شیرازی معروف به سعدی، از بزرگترین شاعران و نویسندگان ادب فارسی.',
    works: ['گلستان', 'بوستان', 'دیوان سعدی'],
    likes: 167,
    avatar: '/saadi-persian-poet.jpg',
    textResources: ['گلستان-سعدی.pdf', 'بوستان-سعدی.pdf'],
    audioResources: [],
    createdAt: '2024-01-14T16:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z',
  },
  {
    id: '6',
    name: 'ابن سینا',
    gender: 'مرد',
    birthDate: '۹۸۰',
    deathDate: '۱۰۳۷',
    fieldOfActivity: 'فیلسوف',
    status: 'فعال',
    biography: 'ابوعلی حسین بن عبدالله بن سینا، فیلسوف، پزشک و دانشمند بزرگ ایرانی.',
    works: ['قانون در طب', 'الشفاء', 'الاشارات والتنبیهات'],
    likes: 134,
    avatar: '/avicenna-persian-philosopher.jpg',
    textResources: ['قانون-ابن-سینا.pdf'],
    audioResources: [],
    createdAt: '2024-01-11T13:00:00Z',
    updatedAt: '2024-01-11T13:00:00Z',
  },
];

export const getCharactersByField = (field: string) => {
  return mockCharacters.filter((char) => char.fieldOfActivity === field);
};

export const getCharactersByStatus = (status: 'فعال' | 'غیرفعال') => {
  return mockCharacters.filter((char) => char.status === status);
};

export const getCharacterById = (id: string) => {
  return mockCharacters.find((char) => char.id === id);
};
