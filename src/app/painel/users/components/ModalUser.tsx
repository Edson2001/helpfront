import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useCreateOrUpdateUser } from "../hooks/createUser";

export default function ModalUser({
  open,
  handleChange,
  user,
}: {
  open: boolean;
  handleChange: () => void;
  user?: any;
}) {
  const { mutate, isPending } = useCreateOrUpdateUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user?.role || "CLIENT");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPassword(""); // Resetar a senha para evitar preenchimento automático
      setRole(user.role || "CLIENT");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      id: user?.id,
      data: {
        name,
        email,
        password,
        role,
      },
    };

    mutate(formData, {
      onSuccess: () => {
        handleChange();
      },
    });
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={handleChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user ? "Atualizar Usuário" : "Criar Usuário"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogDescription>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4"
              placeholder="Nome"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
              placeholder="Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              placeholder="Senha"
              type="password"
            />
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Selecione uma role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Cliente</SelectItem>
                <SelectItem value="AGENT">Agente</SelectItem>
                <SelectItem value="ADMIN">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </DialogDescription>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
