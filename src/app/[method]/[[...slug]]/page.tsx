'use client';

import { RestView } from '@rest/views/RestView';
import { useParams } from 'next/navigation';

export default function Rest() {
  const { method, slug } = useParams() as {
    method: string;
    slug: string[];
  };

  return (
    <main>
      <RestView method={method} slug={slug} />
    </main>
  );
}
