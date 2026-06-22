import cn from 'classnames';

import { ErrorButton } from '../../src/components/ErrorButton/ErrorButton';
import { Layout } from '../../src/components/Layout/Layout';
import { DetailsPanel } from '../../src/features/DetailsPanel/DetailsPanel';
import { Pagination } from '../../src/features/Pagination/Pagination';
import { Results } from '../../src/features/Results/Results';
import { Search } from '../../src/features/Search/Search';
import { redirect } from '../../src/i18n/routing';
import { getCharacterDetails, getCharacters } from '../../src/services/api';
import styles from '../../src/styles/MainPage.module.css';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ query?: string; page?: string; details?: string }>;
};

export default async function MainPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { query = '', page = '1', details } = await searchParams;

  const { items, pages } = await getCharacters(query, page);

  async function handleSearch(formData: FormData) {
    'use server';
    const q = formData.get('query') as string;
    const searchParams = new URLSearchParams();
    if (q) searchParams.set('query', q);
    searchParams.set('page', '1');
    redirect({
      href: `/?${searchParams.toString()}`,
      locale,
    });
  }

  let detailsItem = null;
  if (details) {
    try {
      detailsItem = await getCharacterDetails(details);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.errorButtonContainer}>
          <ErrorButton />
        </div>
        <section className={styles.searchSection}>
          <form action={handleSearch}>
            <Search defaultValue={query} />
          </form>
        </section>

        <section
          className={cn(
            styles.resultsSection,
            details && styles.resultsSectionWithDetails
          )}
        >
          <Results items={items} />
          {details && (
            <aside className={styles.detailsAside}>
              <DetailsPanel item={detailsItem || undefined} />
            </aside>
          )}
        </section>

        {pages > 1 && (
          <Pagination
            currentPage={parseInt(page)}
            totalPages={pages}
            baseUrl="/"
            query={query}
          />
        )}
      </div>
    </Layout>
  );
}
