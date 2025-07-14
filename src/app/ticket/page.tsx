// app/ticket/page.tsx
import React, { Suspense } from "react";
import MyTicket from "./MyTicket";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando página...</div>}>
      <MyTicket />
    </Suspense>
  );
}
