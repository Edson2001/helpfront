"use client";

import { useAtomValue } from "jotai";
import { FilePlus2 } from "lucide-react";
import { dateRangeAtom, ticketChartDataAtom } from "@/lib/atoms";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { DatePickerWithRange } from "./components/date-range-picker";
import MetricCard from "./components/metric-card";
import { Ticket } from "./types";

export interface TicketMetric {
  date: string; // formato: 'YYYY-MM-DD'
  type: "OPEN" | "IN_PROGRESS" | "CLOSED";
  count: number;
}

function calcularMediaPorStatus(
  tickets: Ticket[],
  status: "OPEN" | "IN_PROGRESS" | "CLOSED",
) {
  const filtrados = tickets.filter((t) => t.status === status);
  const dias = new Set(filtrados.map((t) => t.createdAt.split("T")[0]));
  return Math.round(filtrados.length / (dias.size || 1));
}

// Adicionando prop data
interface AverageTicketsCreatedProps {
  data?: Ticket[];
}

export default function AverageTicketsCreated({
  data,
}: AverageTicketsCreatedProps) {
  const tickets = data ?? [];
  const dateRange = useAtomValue(dateRangeAtom);
  const filteredTickets = tickets.filter((ticket) => {
    if (!dateRange?.from && !dateRange?.to) return true;
    const created = new Date(ticket.createdAt);
    if (dateRange?.from && created < dateRange.from) return false;
    if (dateRange?.to && created > dateRange.to) return false;
    return true;
  });
  const avgOpen = calcularMediaPorStatus(filteredTickets, "OPEN");
  const avgInProgress = calcularMediaPorStatus(filteredTickets, "IN_PROGRESS");
  const avgClosed = calcularMediaPorStatus(filteredTickets, "CLOSED");

  function ticketsToMetrics(tickets: Ticket[]): TicketMetric[] {
    const metricsMap = new Map<string, TicketMetric>();

    tickets.forEach((ticket) => {
      const date = ticket.createdAt.split("T")[0];
      const key = `${date}-${ticket.status}`;
      if (!metricsMap.has(key)) {
        metricsMap.set(key, {
          date,
          type: ticket.status as "OPEN" | "IN_PROGRESS" | "CLOSED",
          count: 1,
        });
      } else {
        metricsMap.get(key)!.count += 1;
      }
    });

    return Array.from(metricsMap.values());
  }

  const metrics = ticketsToMetrics(filteredTickets);

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle title="Média de Tickets Criados" icon={FilePlus2} />
        <DatePickerWithRange className="" />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Média de Tickets Abertos"
            value={avgOpen}
            color="#60C2FB"
          />
          <MetricCard
            title="Média de Tickets Em Progresso"
            value={avgInProgress}
            color="#FBBF24"
          />
          <MetricCard
            title="Média de Tickets Fechados"
            value={avgClosed}
            color="#3161F8"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart data={metrics} />
        </div>
      </div>
    </section>
  );
}
