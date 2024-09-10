import { clsx } from 'clsx';

export interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx(className)}>
      <h1>Footer</h1>
    </footer>
  );
}

export default Footer;
