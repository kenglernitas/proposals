import { notFound } from 'next/navigation';
import { ID, Properties, Renderer } from '@/components/Document';
import { Header } from '@/components/Header';
import { Back, PageContainer, PageTitle } from '@/components/UI';
import { reader } from '@/lib/reader';
import { getStatusColors, number } from '@/lib/util';
import keystatic from '@/../keystatic.config';

type Params = {
  slug: string;
};

const schema = keystatic.collections.kleips.schema;
const fields = Object.keys(schema);

export async function generateStaticParams(): Promise<Params[]> {
  const topics = await reader.collections.kleips.all();
  return topics.map((kleip) => ({
    slug: kleip.slug,
  }));
}

export default async function Page({ params }: { params: Params }) {
  const kleip = await reader.collections.kleips.read(params.slug, {
    resolveLinkedFiles: true,
  });

  if (!kleip) return notFound();
  const colors = getStatusColors(kleip.status);

  return (
    <PageContainer>
      <Header currentPage="KLEIPs" />
      <div className="my-8 flex border-t border-slate-800">
        <Back href="/">Back to all KLEIPs</Back>
      </div>
      <ID status={kleip.status}>KLEIP-{number(kleip.id!)}</ID>
      <PageTitle>{kleip.title}</PageTitle>
      <Properties fields={fields} data={kleip} />
      <Renderer document={kleip.content} />
    </PageContainer>
  );
}
