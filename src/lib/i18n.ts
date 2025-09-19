export type Language = 'fa' | 'en';

export interface Translations {
  // Navigation & General
  welcome: string;
  login: string;
  register: string;
  logout: string;
  dashboard: string;
  characters: string;
  analytics: string;
  profile: string;
  settings: string;
  back: string;
  next: string;
  previous: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  add: string;
  search: string;
  filter: string;

  // Authentication
  email: string;
  password: string;
  fullName: string;
  loginTitle: string;
  registerTitle: string;
  loginDescription: string;

  // Character Management
  characterManagement: string;
  addNewCharacter: string;
  editCharacter: string;
  characterDetails: string;
  name: string;
  gender: string;
  male: string;
  female: string;
  birthDate: string;
  deathDate: string;
  fieldOfActivity: string;
  status: string;
  active: string;
  inactive: string;
  biography: string;
  works: string;
  likes: string;
  actions: string;
  viewDetails: string;

  // Fields of Activity
  poet: string;
  writer: string;
  astronomer: string;
  philosopher: string;
  mystic: string;
  historian: string;

  // File Upload
  textFiles: string;
  audioFiles: string;
  imageFiles: string;
  uploadFiles: string;
  dragFilesHere: string;
  maxFiles: string;
  maxSize: string;
  uploadSuccess: string;
  uploadError: string;

  // Dashboard & Analytics
  analyticalDashboard: string;
  totalCharacters: string;
  mostPopular: string;
  fieldsOfActivity: string;
  averageLikes: string;
  radarChart: string;
  barChart: string;
  distributionByField: string;
  distributionByBirthCentury: string;
  popularityRanking: string;

  // Messages
  noCharactersFound: string;
  characterAdded: string;
  characterUpdated: string;
  confirmDelete: string;

  // Centuries
  century10: string;
  century11: string;
  century12: string;
  century13: string;
  century14: string;
  unknown: string;
}

export const translations: Record<Language, Translations> = {
  fa: {
    // Navigation & General
    welcome: 'خوش آمدید',
    login: 'ورود',
    register: 'ثبت نام',
    logout: 'خروج',
    dashboard: 'داشبورد',
    characters: 'شخصیت‌ها',
    analytics: 'تحلیل‌ها',
    profile: 'پروفایل',
    settings: 'تنظیمات',
    back: 'بازگشت',
    next: 'بعدی',
    previous: 'قبلی',
    save: 'ذخیره',
    cancel: 'انصراف',
    edit: 'ویرایش',
    delete: 'حذف',
    add: 'افزودن',
    search: 'جستجو',
    filter: 'فیلتر',

    // Authentication
    email: 'ایمیل',
    password: 'رمز عبور',
    fullName: 'نام و نام خانوادگی',
    loginTitle: 'ورود به سامانه',
    registerTitle: 'ثبت نام در سامانه',
    loginDescription: 'برای دسترسی به سامانه مدیریت شخصیت‌های ایرانی وارد شوید',

    // Character Management
    characterManagement: 'مدیریت شخصیت‌ها',
    addNewCharacter: 'افزودن شخصیت جدید',
    editCharacter: 'ویرایش شخصیت',
    characterDetails: 'جزئیات شخصیت',
    name: 'نام',
    gender: 'جنسیت',
    male: 'مرد',
    female: 'زن',
    birthDate: 'تاریخ تولد',
    deathDate: 'تاریخ وفات',
    fieldOfActivity: 'حوزه فعالیت',
    status: 'وضعیت',
    active: 'فعال',
    inactive: 'غیرفعال',
    biography: 'بیوگرافی',
    works: 'آثار',
    likes: 'لایک‌ها',
    actions: 'عملیات',
    viewDetails: 'مشاهده جزئیات',

    // Fields of Activity
    poet: 'شاعر',
    writer: 'نویسنده',
    astronomer: 'منجم',
    philosopher: 'فیلسوف',
    mystic: 'عارف',
    historian: 'مورخ',

    // File Upload
    textFiles: 'فایل‌های متنی',
    audioFiles: 'فایل‌های صوتی',
    imageFiles: 'فایل‌های تصویری',
    uploadFiles: 'آپلود فایل‌ها',
    dragFilesHere: 'فایل‌ها را اینجا بکشید',
    maxFiles: 'حداکثر فایل',
    maxSize: 'حداکثر حجم',
    uploadSuccess: 'آپلود موفق',
    uploadError: 'خطا در آپلود',

    // Dashboard & Analytics
    analyticalDashboard: 'داشبورد تحلیلی',
    totalCharacters: 'کل شخصیت‌ها',
    mostPopular: 'محبوب‌ترین',
    fieldsOfActivity: 'حوزه‌های فعالیت',
    averageLikes: 'میانگین لایک',
    radarChart: 'نمودار راداری',
    barChart: 'نمودار میله‌ای',
    distributionByField: 'توزیع بر اساس حوزه فعالیت',
    distributionByBirthCentury: 'توزیع بر اساس قرن تولد',
    popularityRanking: 'رتبه‌بندی محبوبیت',

    // Messages
    noCharactersFound: 'هیچ شخصیتی یافت نشد',
    characterAdded: 'شخصیت جدید اضافه شد',
    characterUpdated: 'شخصیت ویرایش شد',
    confirmDelete: 'آیا از حذف این شخصیت اطمینان دارید؟',

    // Centuries
    century10: 'قرن ۱۰',
    century11: 'قرن ۱۱',
    century12: 'قرن ۱۲',
    century13: 'قرن ۱۳',
    century14: 'قرن ۱۴',
    unknown: 'نامشخص',
  },

  en: {
    // Navigation & General
    welcome: 'Welcome',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    characters: 'Characters',
    analytics: 'Analytics',
    profile: 'Profile',
    settings: 'Settings',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',

    // Authentication
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    loginTitle: 'Login to System',
    registerTitle: 'Register to System',
    loginDescription: 'Login to access the Persian Characters Management System',

    // Character Management
    characterManagement: 'Character Management',
    addNewCharacter: 'Add New Character',
    editCharacter: 'Edit Character',
    characterDetails: 'Character Details',
    name: 'Name',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    birthDate: 'Birth Date',
    deathDate: 'Death Date',
    fieldOfActivity: 'Field of Activity',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    biography: 'Biography',
    works: 'Works',
    likes: 'Likes',
    actions: 'Actions',
    viewDetails: 'View Details',

    // Fields of Activity
    poet: 'Poet',
    writer: 'Writer',
    astronomer: 'Astronomer',
    philosopher: 'Philosopher',
    mystic: 'Mystic',
    historian: 'Historian',

    // File Upload
    textFiles: 'Text Files',
    audioFiles: 'Audio Files',
    imageFiles: 'Image Files',
    uploadFiles: 'Upload Files',
    dragFilesHere: 'Drag files here',
    maxFiles: 'Max files',
    maxSize: 'Max size',
    uploadSuccess: 'Upload successful',
    uploadError: 'Upload error',

    // Dashboard & Analytics
    analyticalDashboard: 'Analytical Dashboard',
    totalCharacters: 'Total Characters',
    mostPopular: 'Most Popular',
    fieldsOfActivity: 'Fields of Activity',
    averageLikes: 'Average Likes',
    radarChart: 'Radar Chart',
    barChart: 'Bar Chart',
    distributionByField: 'Distribution by Field',
    distributionByBirthCentury: 'Distribution by Birth Century',
    popularityRanking: 'Popularity Ranking',

    // Messages
    noCharactersFound: 'No characters found',
    characterAdded: 'Character added successfully',
    characterUpdated: 'Character updated successfully',
    confirmDelete: 'Are you sure you want to delete this character?',

    // Centuries
    century10: '10th Century',
    century11: '11th Century',
    century12: '12th Century',
    century13: '13th Century',
    century14: '14th Century',
    unknown: 'Unknown',
  },
};

export const useTranslation = (language: Language) => {
  return {
    t: (key: keyof Translations): string => {
      return translations[language][key] || key;
    },
    language,
    isRTL: language === 'fa',
  };
};
