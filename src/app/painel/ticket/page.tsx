"use client";

import { FileText, Ticket } from "lucide-react";
import { Check, Loader2 } from "lucide-react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
// Importar a biblioteca xlsx
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/stores/userStore";
import { useAssignTicket } from "../hooks/useAssignTicket";
import { useList } from "../hooks/useList";
import { useUpdateTicket } from "../hooks/useUpdateTicket";
import { useUpdateTicketStatus } from "../hooks/useUpdateTicketStatus";
import { useUsers } from "../users/hooks/getData";
import ModalCreateTicket from "./components/ModalCreateTicket";

// Importar a biblioteca react-hot-toast

const statusLabels: Record<string, string> = {
  OPEN: "ABERTO",
  IN_PROGRESS: "EM PROGRESSO",
  CLOSED: "FECHADO",
};

const priorityLabels: Record<string, string> = {
  LOW: "BAIXA",
  MEDIUM: "MÉDIA",
  HIGH: "ALTA",
  URGENT: "URGENTE",
};

const statusColors: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  CLOSED: "bg-green-100 text-green-800",
};

const priorityColors: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-red-100 text-red-800",
  URGENT: "bg-red-100 text-red-800",
};

export default function TicketPage() {
  const { data: tickets, isLoading, error } = useList();
  const useListUser = useUsers();
  //console.log(useListUser?.data, "useListUser")
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [ticketIdFilter, setTicketIdFilter] = useState<string>(""); // Novo estado para filtro por ID
  const [technicianSearch, setTechnicianSearch] = useState<string>(""); // Novo estado para pesquisa de técnicos
  const [technicianFilter, setTechnicianFilter] = useState<string>("ALL"); // Novo estado para filtro por técnico
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const { user, fetchUser } = useUserStore();
  const agents = useListUser?.data?.filter(
    (item: any) => item?.role == "AGENT",
  );

  const client = useQueryClient();
  const { mutate, isPending } = useAssignTicket();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateTicketStatus();

  const handleAssignUser = (userId: string, ticketId: string) => {
    if (!userId || !ticketId) {
      console.error("UserId or TicketId is missing");
      return;
    }

    mutate(
      { id: ticketId, assignedToId: userId },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["useList"] });
          toast.success("Técnico atribuído com sucesso!");
        },
        onError: (error) => {
          console.error("Failed to assign user:", error);
          toast.error("Erro ao atribuir técnico.");
        },
      },
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  // Estado local para simular atualização
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [localTickets, setLocalTickets] = useState<any[] | null>(null);

  const ticketList = localTickets ?? tickets ?? [];

  const technicians = agents ?? [];

  // Filtrar técnicos com base na pesquisa
  const filteredTechnicians = technicians.filter((tech) =>
    tech.name.toLowerCase().includes(technicianSearch.toLowerCase()),
  );

  const filteredTickets = ticketList
    .filter((t) => (statusFilter === "ALL" ? true : t.status === statusFilter))
    .filter((t) =>
      priorityFilter === "ALL" ? true : t.priority === priorityFilter,
    )
    .filter((t) =>
      search.trim() === ""
        ? true
        : t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description?.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((t) => {
      if (!dateFrom && !dateTo) return true;
      const created = new Date(t.createdAt);
      if (dateFrom && created < new Date(dateFrom)) return false;
      if (dateTo && created > new Date(dateTo + "T23:59:59")) return false;
      return true;
    })
    .filter(
      (
        t, // Novo filtro por ID
      ) =>
        ticketIdFilter.trim() === "" ? true : t.id.includes(ticketIdFilter),
    )
    .filter((t) =>
      technicianFilter === "ALL" ? true : t.assignedToId === technicianFilter,
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  // Função para simular update de status
  const handleStatusChange = (id: string, newStatus: string) => {
    updateStatus(
      { id, status: newStatus },
      {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["useList"] });
          toast.success("Estado do ticket atualizado com sucesso!");
        },
        onError: (error) => {
          console.error("Failed to update status:", error);
          toast.error("Erro ao atualizar estado do ticket.");
        },
      },
    );
  };

  // Função para simular atribuição de técnico
  async function handleAssignTechnician(id: string, technicianId: string) {
    setUpdatingId(id);
    setTimeout(() => {
      setLocalTickets((prev) =>
        (prev ?? ticketList).map((t) =>
          t.id === id
            ? {
                ...t,
                assignedTo: {
                  id: technicianId,
                  name: "Técnico " + technicianId,
                },
              }
            : t,
        ),
      );
      setUpdatingId(null);
    }, 800);
  }

  const handleExport = () => {
    const data = filteredTickets.map((ticket) => ({
      ID: ticket.id,
      Título: ticket.title,
      Status: statusLabels[ticket.status] ?? ticket.status,
      Prioridade: ticket.priority,
      "Criado em": new Date(ticket.createdAt).toLocaleString("pt-PT"),
      "Criado por": ticket.createdBy?.name ?? "-",
      Técnico: ticket.assignedTo?.name ?? "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
    XLSX.writeFile(workbook, "tickets.xlsx");
  };

  const handleEdit = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  if (isLoading)
    return (
      <section className="mx-auto px-12 py-4">
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="mx-auto px-12 py-4">
        <div className="mb-6 flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Tickets</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie e visualize todos os tickets do sistema.
            </p>
          </div>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar tickets</AlertTitle>
          <AlertDescription>
            Ocorreu um erro ao tentar carregar os tickets. Por favor, tente
            novamente mais tarde.
          </AlertDescription>
        </Alert>
        {/* <div className="mt-8 flex justify-center">
          <img
            src="/illustrations/error.svg"
            alt="Erro ao carregar"
            className="h-64 w-64"
          />
        </div> */}
      </section>
    );

  return (
    <section className="mx-auto px-12 py-4">
      <div className="mb-6 flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Tickets</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie e visualize todos os tickets do sistema.
          </p>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div>
          <label className="mr-2 text-sm font-medium">ID do Ticket:</label>
          <Input
            type="text"
            placeholder="Filtrar por ID..."
            value={ticketIdFilter}
            onChange={(e) => setTicketIdFilter(e.target.value)}
            className="w-36"
          />
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">Status:</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="OPEN">Aberto</SelectItem>
              <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
              <SelectItem value="CLOSED">Fechado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">Prioridade:</label>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas</SelectItem>
              <SelectItem value="LOW">Baixa</SelectItem>
              <SelectItem value="MEDIUM">Média</SelectItem>
              <SelectItem value="HIGH">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">Pesquisar</label>
          <Input
            type="text"
            placeholder="Pesquisar por título ou descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">De:</label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-36"
          />
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">Até:</label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-36"
          />
        </div>
        <div>
          <label className="mr-2 text-sm font-medium">Técnico:</label>
          <Select value={technicianFilter} onValueChange={setTechnicianFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              {technicians.map((tech) => (
                <SelectItem key={tech.id} value={tech.id}>
                  {tech.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="mr-2 text-sm font-medium">Exel</label>
          <Button onClick={handleExport} variant="outline">
            Exportar Dados
          </Button>
        </div>
        <div className="flex flex-col">
          <label className="mr-2 text-sm font-medium">
            <Ticket />
          </label>
          <Button onClick={() => setIsModalOpen(true)} variant="outline">
            Criar Ticket
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead> {/* Nova coluna para ID */}
              <TableHead className="w-1/4">Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Criado por</TableHead>
              <TableHead>Técnico</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="transition hover:bg-muted/50"
              >
                <TableCell>{ticket.id}</TableCell> {/* Exibir ID */}
                <TableCell className="font-medium">{ticket.title}</TableCell>
                <TableCell>
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${statusColors[ticket.status] ?? "bg-gray-100 text-gray-800"}`}
                  >
                    {statusLabels[ticket.status] ?? ticket.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${priorityColors[ticket.priority] ?? "bg-gray-100 text-gray-800"}`}
                  >
                    {priorityLabels[ticket.priority] ?? ticket.priority}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(ticket.createdAt).toLocaleString("pt-PT")}
                </TableCell>
                <TableCell>{ticket.createdBy?.name ?? "-"}</TableCell>
                <TableCell>
                  {user?.role == "ADMIN" ? (
                    <Select
                      value={ticket.assignedToId ?? ""} // Mostra o valor padrão (assignedToId) vindo do DB
                      onValueChange={(value) =>
                        handleAssignUser(value, ticket.id)
                      }
                      disabled={
                        user?.role == "ADMIN"
                          ? isPending || updatingId === ticket.id
                          : true
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Atribuir" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map((tech) => (
                          <SelectItem key={tech.id} value={tech.id}>
                            {tech.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span>{ticket?.assignedTo?.name}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user?.role == "CLIENT" ? (
                      <></>
                    ) : (
                      <Select
                        value={ticket.status}
                        onValueChange={(value) =>
                          handleStatusChange(ticket.id, value)
                        }
                        disabled={isUpdatingStatus || updatingId === ticket.id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OPEN">Aberto</SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            Em Progresso
                          </SelectItem>
                          <SelectItem value="CLOSED">Fechado</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    {updatingId === ticket.id && (
                      <Loader2 className="ml-2 inline h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    <Link
                      href={`/painel/ticket/${ticket.id}`}
                      passHref
                      legacyBehavior
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-2"
                        title="Visualizar ticket"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      title="Editar ticket"
                      onClick={() => handleEdit(ticket)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredTickets.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            Nenhum ticket encontrado.
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Itens por página:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            Anterior
          </Button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      </div>
      <ModalCreateTicket
        open={isModalOpen}
        handleChange={() => {
          setIsModalOpen(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
      />
    </section>
  );
}
