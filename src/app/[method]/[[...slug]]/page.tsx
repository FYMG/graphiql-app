'use client';

import { RestView } from '@rest/views/RestView';
import { notFound, useParams } from 'next/navigation';
import { GRAPHQL } from '@shared/hooks/useUrlModifier';
import { GraphQLView } from '@graphql/views/GraphqlView';
import { Methods } from '@rest/constants';

export default function Rest() {
  const { method, slug } = useParams() as {
    method: string;
    slug: string[];
  };

  if (method === GRAPHQL) {
    return (
      <main>
        <GraphQLView />
      </main>
    );
  }

  if (!Object.values(Methods).includes(method)) return notFound();

  return (
    <main>
      <RestView method={method} slug={slug} />
    </main>
  );
}
