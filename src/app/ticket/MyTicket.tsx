"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { useTicketByToken } from "./hooks/useTicketByToken";
import TicketDetailPage from "../painel/ticket/[id]/Viewer";

export default function MyTicket() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
   
  const { data: ticket, isLoading, error } = useTicketByToken(token || "");

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar o ticket.</div>;

  return <TicketDetailPage ticketId={(ticket as any)?.id || ""} userTicket={ticket} />;
}
