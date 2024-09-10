import { clsx } from 'clsx';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { app } from '@shared/configs';

export interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  const t = useTranslations('shared');

  return (
    <footer className={clsx('bg-white dark:bg-gray-900', className)} data-testid="footer">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a target="_blank" href={app.curseLink} className="flex items-center gap-2">
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
                {app.authors.map((author) => (
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
                {app.mentors.map((author) => (
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
