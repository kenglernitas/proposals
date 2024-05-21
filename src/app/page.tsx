import { Status, Entry } from '@/components/Entries';
import { Header } from '@/components/Header';
import { PageContainer, PageIntro, PageTitle } from '@/components/UI';
import { reader } from '@/lib/reader';
import { number } from '@/lib/util';
import keystatic from '@/../keystatic.config';

const statuses = keystatic.collections.kleips.schema.status.options;

export default async function Home() {
  const entries = await reader.collections.kleips.all();
  entries.sort((a, b) => (a.entry.id || 0) - (b.entry.id || 0));
  const byStatus = statuses.map((status) => {
    const matches = entries.filter((i) => i?.entry.status === status.value);
    return matches.length ? { status, entries: matches } : null;
  });

  return (
    <PageContainer>
      <Header currentPage="KLEIPs" className="mb-16" />
      <PageTitle>KLEP Improvement Proposals</PageTitle>
      <PageIntro>
      KLEIPs are the primary mechanism for suggesting new features, collecting community input, documenting design decisions for changes to the Keng Lernitas Ekosistem, and making adjustments to system parameters, including the guvernanz of tokens $2192 and $ZORKSEES across Optimism, Base, and Solana.
      </PageIntro>

      {byStatus.map((i) => {
        if (!i) return null;
        const { status, entries } = i;
        return (
          <div key={status.value} className="my-5">
            <Status status={status} count={entries.length} />
            <ul>
              {entries.map((e) => (
                <Entry
                  key={e.slug}
                  data={e}
                  path="/kleips/"
                  id={`KLEIP-${number(e.entry.id!)}`}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </PageContainer>
  );
}
