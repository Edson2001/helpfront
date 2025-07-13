import Container from "@/components/container";
//import { metrics } from "@/data/metrics";
import MetricCard from "./components/metric-card";

export default function Metrics({ data }: { data: any }) {
  const totalTickets = data?.length ?? 0;
  const unsolvedTickets =
    data?.filter((ticket: any) => ticket.status !== "CLOSED").length ?? 0;
  const resolvedTickets =
    data?.filter((ticket: any) => ticket.status === "CLOSED").length ?? 0;
  const inProgressTickets =
    data?.filter((ticket: any) => ticket.status === "IN_PROGRESS").length ?? 0;

   
  const metrics = [
    {
      title: "Tickets Criados",
      value: totalTickets,
    },
    {
      title: "Tickets Não Resolvidos",
      value: unsolvedTickets,
    },
    {
      title: "Tickets Resolvidos",
      value: resolvedTickets,
    },
    {
      title: "Tickets em Progresso",
      value: inProgressTickets,
    }
  ];

  return (
    <Container className="grid grid-cols-1 gap-y-6 border-b border-border py-4 phone:grid-cols-2 laptop:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </Container>
  );
}

