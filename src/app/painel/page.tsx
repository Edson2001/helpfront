"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AverageTicketsCreated, Metrics } from "@/components/chart-blocks";
import Container from "@/components/container";
import { useUserStore } from "@/stores/userStore";
import { useList } from "./hooks/useList";

export default function Home() {
  const { data } = useList();

  const pathName = usePathname();

  const { user, fetchUser } = useUserStore();

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
      </div>
    </div>
  );
}
