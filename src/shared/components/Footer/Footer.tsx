import { clsx } from 'clsx';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export interface FooterProps {
  className?: string;
}

const authors = [
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
];

const mentors = [
  {
    name: 'exodie',
    link: 'https://github.com/exodie',
  },
  {
    name: 'valr.lipsk',
    link: 'https://github.com/valr0lipsk',
  },
];

function Footer({ className }: FooterProps) {
  const t = useTranslations('shared');

  return (
    <footer className={clsx('bg-white dark:bg-gray-900', className)}>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a
              target="_blank"
              href="https://rs.school/courses/reactjs"
              className="flex items-center gap-2"
            >
              <Image
                width={50}
                height={50}
                src="/rss-logo.png"
                alt={t('footer-logo-alt')}
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                {t('course-name')}
              </span>
            </a>
          </div>
          <div>
            <div>
              <h2>
                {t('authors')}:
                {authors.map((author) => (
                  <a
                    target="_blank"
                    key={author.name}
                    href={author.link}
                    className="ml-2 text-gray-500 dark:text-gray-300"
                  >
                    {author.name}
                  </a>
                ))}
              </h2>
            </div>
            <div>
              <h2>
                {t('mentors')}:
                {mentors.map((author) => (
                  <a
                    target="_blank"
                    key={author.name}
                    href={author.link}
                    className="ml-2 text-gray-500 dark:text-gray-300"
                  >
                    {author.name}
                  </a>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
