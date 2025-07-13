"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  AverageTicketsCreated,
  Conversions,
  CustomerSatisfication,
  Metrics,
  TicketByChannels,
} from "@/components/chart-blocks";
import Container from "@/components/container";
import { useUserStore } from "@/stores/userStore";
import { useList } from "./hooks/useList";

export default function Home() {
  const { data } = useList();

  const pathName = usePathname();

  const { user, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [pathName, user, fetchUser]);

  return (
    <div>
      <Metrics data={data ?? []} />
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="w-full py-4 laptop:col-span-3">
          <AverageTicketsCreated data={data ?? []} />
        </Container>
        {/* <Container className="py-4 laptop:col-span-1">
          <Conversions />
        </Container> */}
      </div>
      {/* <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-2 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-1">
          <TicketByChannels />
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <CustomerSatisfication />
        </Container>
      </div> */}
    </div>
  );
}
