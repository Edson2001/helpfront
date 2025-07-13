"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FilePlus,
  GripVerticalIcon,
  Pencil,
  PlusIcon,
} from "lucide-react";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
// Importar o Switch do ShadCN UI
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";

// Adicionar o useState

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  enable: boolean; // Adicionar o campo enable
}

export function UserTable({
  data,
  handleEdit,
  handleCreate,
}: {
  data: User[];
  handleEdit: (data: User) => void;
  handleCreate: () => void;
}) {
  const { mutate: updateUserStatus } = useUpdateUserStatus();
  const client = useQueryClient();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null); // Estado para controlar qual usuário está sendo atualizado

  const handleToggleEnable = (user: User) => {
    setUpdatingUserId(user.id); // Definir o ID do usuário que está sendo atualizado
    updateUserStatus(
      { id: user.id, enable: !user.enable },
      {
        onSuccess: () => {
          toast.success("Estado do usuário atualizado com sucesso!");
          client.invalidateQueries({ queryKey: ["users"] });
          setUpdatingUserId(null); // Limpar o estado após a atualização
        },
        onError: (error) => {
          toast.error("Erro ao atualizar estado do usuário:");
          console.error("Erro ao atualizar estado do usuário:", error);
          setUpdatingUserId(null); // Limpar o estado em caso de erro
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Input placeholder="Filtrar por nome..." className="max-w-sm" />
          <Button onClick={handleCreate} variant="outline" size="sm">
            <PlusIcon />
            <span className="hidden lg:inline">Cadastrar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Acesso</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {updatingUserId === user.id ? (
                    <span>Atualizando...</span> // Exibir mensagem de atualização
                  ) : (
                    <Switch
                      checked={user.enable}
                      onCheckedChange={() => handleToggleEnable(user)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(user)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {data.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page 1 of 1
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                disabled
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button variant="outline" className="size-8" size="icon" disabled>
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button variant="outline" className="size-8" size="icon" disabled>
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                disabled
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
