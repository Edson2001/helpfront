"use client";

import {
  AverageTicketsCreated,
  Conversions,
  CustomerSatisfication,
  Metrics,
  TicketByChannels,
} from "@/components/chart-blocks";
import Container from "@/components/container";
import { useList } from "./hooks/useList";
import { useEffect } from "react";

/* [
    {
        "id": "2fb0e8ba-eecd-4d39-bc0b-9c1d8c60aec6",
        "title": "Podes me ajudar?",
        "description": "Tem um erro no sistema central",
        "status": "OPEN",
        "priority": "LOW",
        "slaDeadline": "2025-07-14T15:33:56.943Z",
        "createdAt": "2025-07-11T15:33:56.950Z",
        "updatedAt": "2025-07-11T15:33:56.950Z",
        "createdById": "e0208915-a2fc-40da-985c-9f5b051ccf01",
        "assignedToId": null
    },
    {
        "id": "4f6c7d23-ab10-43ab-87e5-ff5e957b997e",
        "title": "Podes me ajudar?",
        "description": "Tem um erro no sistema central",
        "status": "OPEN",
        "priority": "LOW",
        "slaDeadline": "2025-07-14T15:36:07.723Z",
        "createdAt": "2025-07-11T15:36:07.726Z",
        "updatedAt": "2025-07-11T15:36:07.726Z",
        "createdById": "e0208915-a2fc-40da-985c-9f5b051ccf01",
        "assignedToId": null
    },
    {
        "id": "e29dc606-5cd3-43cd-b815-2ada7b05ea16",
        "title": "Podes me ajudar?",
        "description": "Tem um erro no sistema central",
        "status": "OPEN",
        "priority": "LOW",
        "slaDeadline": "2025-07-14T15:36:45.508Z",
        "createdAt": "2025-07-11T15:36:45.509Z",
        "updatedAt": "2025-07-11T15:36:45.509Z",
        "createdById": "e0208915-a2fc-40da-985c-9f5b051ccf01",
        "assignedToId": null
    },
    {
        "id": "f00ac2d4-cc3d-4958-bd11-8a17144cffa3",
        "title": "Podes me ajudar?",
        "description": "Tem um erro no sistema central",
        "status": "OPEN",
        "priority": "LOW",
        "slaDeadline": "2025-07-14T15:39:56.520Z",
        "createdAt": "2025-07-11T15:39:56.524Z",
        "updatedAt": "2025-07-11T15:39:56.524Z",
        "createdById": "e0208915-a2fc-40da-985c-9f5b051ccf01",
        "assignedToId": null
    },
    {
        "id": "5e57d1be-793e-4e86-a541-9be63362fba3",
        "title": "Podes me ajudar?",
        "description": "Tem um erro no sistema central",
        "status": "CLOSED",
        "priority": "LOW",
        "slaDeadline": "2025-07-14T15:40:33.356Z",
        "createdAt": "2025-07-11T15:40:33.358Z",
        "updatedAt": "2025-07-11T16:03:17.278Z",
        "createdById": "e0208915-a2fc-40da-985c-9f5b051ccf01",
        "assignedToId": "e0208915-a2fc-40da-985c-9f5b051ccf01"
    }
] */
export default function Home() {
  const { data } = useList();
  console.log(data, "000000000000000");

  useEffect(()=>{
    console.log("**********")
    
    const msg = new SpeechSynthesisUtterance(
     // `Novo ticket recebido. Prioridade: Alta. Título: Me ajuda`
     "Veronica José Simão"
    );
    msg.lang = 'pt-PT'; // ou 'pt-BR' se preferir sotaque brasileiro
    speechSynthesis.speak(msg);
  },[])

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
