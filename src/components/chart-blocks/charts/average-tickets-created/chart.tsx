"use client";

import { useAtomValue } from "jotai";
import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";
import { ticketChartDataAtom } from "@/lib/atoms";
import type { TicketMetric } from "@/types/types";

const statusLabels = {
  OPEN: "ABERTO",
  IN_PROGRESS: "EM PROGRESSO",
  CLOSED: "FECHADO",
};

const generateSpec = (data: TicketMetric[]): IBarChartSpec => ({
  type: "bar",
  data: [
    {
      id: "barData",
      values: data,
    },
  ],
  xField: "date",
  yField: "count",
  seriesField: "type",
  padding: [10, 0, 10, 0],
  legends: {
    visible: false,
  },
  stack: false,
  tooltip: {
    trigger: ["click", "hover"],
  },
  bar: {
    state: {
      hover: {
        outerBorder: {
          distance: 2,
          lineWidth: 2,
        },
      },
    },
    style: {
      cornerRadius: [12, 12, 12, 12],
      zIndex: (datum) => {
        return datum.type === "resolved" ? 2 : 1;
      },
    },
  },
});

export default function Chart({ data }: { data: any[] }) {
  const spec = generateSpec(data);
  return <VChart spec={spec} />;
}
