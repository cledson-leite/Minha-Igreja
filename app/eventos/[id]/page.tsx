import { EventDetailTemplate } from '@/components/templates/EventDetailTemplate';

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  return <EventDetailTemplate id={id} />;
}
