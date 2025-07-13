"use client"
import { useSearchParams } from "next/navigation";
import React from "react";
import TicketDetailPage from "../painel/ticket/[id]/page";
import { useTicketByToken } from "./hooks/useTicketByToken";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
   
  const { data: ticket, isLoading, error } = useTicketByToken(token || "");

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar o ticket.</div>;

  return <TicketDetailPage ticketId={(ticket as any)?.id || ""} userTicket={ticket} />;
}
