import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/stores/userStore";
import { useCreateTicket } from "../../hooks/useCreateTicket";
import { useUpdateTicket } from "../../hooks/useUpdateTicket";

export default function ModalCreateTicket({
  open,
  handleChange,
  ticket,
}: {
  open: boolean;
  handleChange: () => void;
  ticket?: any;
}) {
  const { mutate: create, isPending: isCreating } = useCreateTicket();
  const { mutate: update, isPending: isUpdating } = useUpdateTicket();
  const { user } = useUserStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setPriority(ticket.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("");
    }
  }, [ticket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticket) {
      update(
        { id: ticket.id, title, description, priority },
        {
          onSuccess: () => {
            handleChange();
          },
        },
      );
    } else {
      create(
        { title, description, priority, createdById: user?.id },
        {
          onSuccess: () => {
            handleChange();
          },
        },
      );
    }
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={handleChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ticket ? "Editar Ticket" : "Criar Ticket"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogDescription>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4"
              placeholder="Título"
              required
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4"
              placeholder="Descrição"
              required
            />
            <Select value={priority} onValueChange={setPriority} required>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Baixa</SelectItem>
                <SelectItem value="MEDIUM">Média</SelectItem>
                <SelectItem value="HIGH">Alta</SelectItem>
                <SelectItem value="URGENT">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </DialogDescription>
          <Button type="submit" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating
              ? "Salvando..."
              : ticket
                ? "Atualizar"
                : "Criar Ticket"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
