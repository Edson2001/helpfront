"use client";

import { Loader2 } from "lucide-react";
import {
  AlarmClock,
  Calendar,
  MessageCircle,
  Plus,
  Ticket,
  User,
  UserCircle,
  UserCog,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { TicketByChannels } from "@/components/chart-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services";
import { useUserStore } from "@/stores/userStore";

// Supondo que você tem um api.get

const statusLabels: Record<string, string> = {
  OPEN: "ABERTO",
  IN_PROGRESS: "EM PROGRESSO",
  CLOSED: "FECHADO",
};

const statusColors: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  CLOSED: "bg-green-100 text-green-800",
};

const priorityLabels: Record<string, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

const priorityColors: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-red-100 text-red-800",
};

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const currentUser = { id: "me", name: "Você" };
  const { user, error, fetchUser } = useUserStore();
  useEffect(() => {
    // Initialize Socket.IO connection
    const socketInstance = io("http://localhost:3006");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketInstance.on("newComment", (comment) => {
      console.log("New comment:", comment);
      setComments((prev) => [...prev, comment]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    async function fetchTicket() {
      setLoading(true);
      try {
        const res = await api.get(`/tickets/${id}`);
        setTicket(res.data);
        console.log(res, "***")
      } catch {
        setTicket(null);
      }
      setLoading(false);
    }
    fetchTicket();
  }, [id]);

  useEffect(() => {
    console.log(ticket, "ticketticket")
    if (ticket?.comments) setComments(ticket.comments);
  }, [ticket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  // Só agora os returns condicionais
  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );

  if (!ticket)
    return (
      <div className="py-12 text-center text-muted-foreground">
        Ticket não encontrado.
      </div>
    );

  function handleSendComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      createdAt: new Date().toISOString(),
      author: user?.id,
    };

    // Emit the new comment to the server
    socket.emit("addComment", {
      ticketId: id,
      content: newComment,
      authorId: user?.id,
    });

    // Update local state immediately (optional, can rely on WebSocket)
  //  setComments((prev) => [...prev, comment]);
    setNewComment("");
  }

  return (
    <section className="mx-auto max-w-6xl py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Coluna Esquerda: Cards */}
        <div className="min-w-0 flex-1 space-y-8">
          {/* Header com gradiente, sombra e chips modernos */}
          <div className="relative flex items-center gap-6 rounded-2xl border bg-gradient-to-br from-blue-100/60 to-white p-8 shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-200/60 shadow-inner">
              <Ticket className="h-10 w-10 text-blue-600 drop-shadow" />
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  Ticket #{ticket.id}
                </span>
              </div>
              <h1 className="mb-2 text-3xl font-bold leading-tight text-foreground">
                {ticket.title}
              </h1>
              <div className="mt-2 flex gap-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${statusColors[ticket.status]}`}
                >
                  {" "}
                  <AlarmClock className="h-4 w-4" />{" "}
                  {statusLabels[ticket.status] ?? ticket.status}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${priorityColors[ticket.priority]}`}
                >
                  {" "}
                  <MessageCircle className="h-4 w-4" />{" "}
                  {priorityLabels[ticket.priority] ?? ticket.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <Card className="rounded-2xl border p-0 shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 border-b pb-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg font-semibold">Descrição</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4">
              <p className="whitespace-pre-line text-base text-muted-foreground">
                {ticket.description}
              </p>
            </CardContent>
          </Card>

          {/* Detalhes */}
          <Card className="rounded-2xl border p-0 shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 border-b pb-2">
              <UserCog className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg font-semibold">Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-4">
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 divide-y divide-border text-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="flex flex-col gap-1 pb-4 sm:pb-0 sm:pr-8">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" /> Criado em:
                  </span>
                  <span className="font-medium">
                    {new Date(ticket.createdAt).toLocaleString("pt-PT")}
                  </span>
                </div>
                <div className="flex flex-col gap-1 pt-4 sm:pl-8 sm:pt-0">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <AlarmClock className="h-4 w-4" /> SLA:
                  </span>
                  <span className="font-medium">
                    {new Date(ticket.slaDeadline).toLocaleString("pt-PT")}
                  </span>
                </div>
                <div className="flex flex-col gap-1 pt-4 sm:pr-8 sm:pt-0">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" /> Criado por:
                  </span>
                  <span className="font-medium">
                    {ticket.createdBy?.name ?? "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 pt-4 sm:pl-8 sm:pt-0">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <UserCircle className="h-4 w-4" /> Técnico:
                  </span>
                  <span className="font-medium">
                    {ticket.assignedTo?.name ?? "-"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Coluna Direita: Chat */}
        <aside className="flex w-full flex-shrink-0 flex-col gap-8 lg:w-[400px]">
          <Card className="flex h-[420px] flex-col overflow-hidden rounded-2xl border bg-muted/50 shadow-md">
            <CardHeader className="flex flex-row items-center gap-2 border-b bg-background/80 pb-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg font-semibold">Chat</CardTitle>
            </CardHeader>
            <CardContent className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4">
              <div className="flex h-full flex-col gap-4">
                {comments.length > 0 ? (
                  comments.map((comment: any) => {
                    const isMe = comment.author?.id === currentUser.id;
                    return (
                      <div
                        key={comment.id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[75%] items-end gap-3 ${isMe ? "flex-row-reverse" : ""}`}
                        >
                          {/* Avatar */}
                          <div
                            className={`flex h-10 w-10 select-none items-center justify-center rounded-full border font-bold shadow-sm ${isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-primary"}`}
                          >
                            {comment.author?.name ? (
                              comment.author.name.charAt(0).toUpperCase()
                            ) : (
                              <User className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div
                              className={`rounded-2xl border px-5 py-3 text-base shadow-md transition-all ${isMe ? "ml-2 bg-blue-500 text-white" : "mr-2 bg-white text-foreground"}`}
                            >
                              {comment.content}
                            </div>
                            <div
                              className={`mt-1 text-xs ${isMe ? "text-right" : "text-left"} text-muted-foreground`}
                            >
                              {comment.author?.name ?? "Anônimo"} •{" "}
                              {new Date(comment.createdAt).toLocaleString(
                                "pt-PT",
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="mt-8 text-center text-muted-foreground">
                    Nenhuma mensagem.
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </CardContent>
            <form
              onSubmit={handleSendComment}
              className="flex gap-2 border-t bg-background/90 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              <input
                type="text"
                className="flex-1 rounded-full border bg-white px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Digite uma mensagem..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                autoComplete="off"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2 text-base font-semibold text-white shadow transition hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
                Enviar
              </button>
            </form>
          </Card>
        </aside>
      </div>
    </section>
  );
}
