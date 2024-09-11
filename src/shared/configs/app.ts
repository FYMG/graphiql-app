const app = {
  locale: ['ru', 'en'] as const,
  defaultLocale: 'en' as const,
  SESSION_COOKIE_NAME: 'FIREBASE_SESSION' as const,
  curseLink: 'https://rs.school/courses/reactjs' as const,
  authors: [
    {
      name: 'fymg',
      link: 'https://github.com/fymg',
    },
    {
      name: 'woodo01',
      link: 'https://github.com/woodo01',
    },
    {
      name: 'sk85web',
      link: 'https://github.com/sk85web',
    },
  ] as const,
  mentors: [
    {
      name: 'exodie',
      link: 'https://github.com/exodie',
    },
    {
      name: 'valr.lipsk',
      link: 'https://github.com/valr0lipsk',
    },
  ] as const,
};

export default app;
