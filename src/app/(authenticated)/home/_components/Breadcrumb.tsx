import { AppBreadcrumb } from '@/components/shared/bread-crumb';

export function BreadcrumbDemo() {
  return (
    <AppBreadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/docs/components' },
        { label: 'Components', href: '/docs/components' },
        { label: 'Breadcrumb' },
      ]}
    />
  );
}
