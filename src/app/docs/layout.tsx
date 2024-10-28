import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptionDocs } from '@/app/layout.config';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  console.log("CACA")
  return (
    <DocsLayout tree={source.pageTree} {...baseOptionDocs}>
      {children}
    </DocsLayout>
  );
}
