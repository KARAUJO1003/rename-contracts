"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "./_components/toggle-theme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RenamedProps {
  quadra: number;
  lote: number;
  titulo: string;
  venda: number;
  id: number;
}

export default function Home() {
  const [quadra, setQuadra] = useState(3);
  const [lote, setLote] = useState(69);
  const [titulo, setTitulo] = useState("CONTRATO");
  const [venda, setVenda] = useState(0);
  const [id, setId] = useState(1);
  const [newFileName, setNewFileName] = useState<RenamedProps[]>([]);

  function handleRenameFileName() {
    setNewFileName([{ quadra, lote, titulo, venda, id }, ...newFileName]);
  }

  function handleCopyToClipboard(text: string) {
    toast.success(text);
    navigator.clipboard.writeText(text);
  }
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24">
      <Card className="w-full max-w-md relative">
        <ModeToggle />
        <CardHeader>
          <CardTitle className="text-2xl">Renomeie Contratos</CardTitle>
          <CardDescription>
            Adicione as informações solicitadas abaixo e copie o resultado para
            área de trabalho.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 ">
          <div className="grid gap-2">
            <Label htmlFor="qd">
              {" "}
              <span className="text-xs text-red-500 mr-2">*</span>Quadra
            </Label>
            <Input
              onKeyDown={(e) => e.key === "Enter" && handleRenameFileName()}
              onChange={(e) => setQuadra(Number(e.target.value))}
              value={quadra}
              id="qd"
              type="number"
              placeholder="**"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lt">
              {" "}
              <span className="text-xs text-red-500 mr-2">*</span>Lote
            </Label>
            <Input
              onKeyDown={(e) => e.key === "Enter" && handleRenameFileName()}
              onChange={(e) => setLote(Number(e.target.value))}
              value={lote}
              id="lt"
              type="number"
              placeholder="**"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="titulo">
              {" "}
              <span className="text-xs text-red-500 mr-2">*</span>Nome do
              arquivo
            </Label>
            <Input
              onKeyDown={(e) => e.key === "Enter" && handleRenameFileName()}
              onChange={(e) => setTitulo(e.target.value)}
              value={titulo}
              id="titulo"
              type="text"
              placeholder="Digite o nome do arquivo..."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="venda">
              {" "}
              <span className="text-xs text-red-500 mr-2">*</span>Venda
            </Label>
            <Input
              onKeyDown={(e) => e.key === "Enter" && handleRenameFileName()}
              onChange={(e) => setVenda(Number(e.target.value))}
              value={venda}
              id="venda"
              type="number"
              placeholder="Digite o número da venda..."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="id">Indice</Label>
            <Input
              onKeyDown={(e) => e.key === "Enter" && handleRenameFileName()}
              onChange={(e) => setId(Number(e.target.value))}
              value={id}
              id="id"
              type="number"
              placeholder="Digite o número da ordem do documento..."
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col  gap-5">
          <Button
            onClick={handleRenameFileName}
            className="w-full dark:bg-blue-600 dark:text-primary"
          >
            Gerar
          </Button>
          <ScrollArea className="px-4">
            <div className="max-h-40 space-y-3">
              {newFileName.map((item, index) => (
                <Card
                  className="p-3 w-full flex items-center justify-between shadow-none  space-x-3"
                  key={index}
                >
                  <CardDescription>
                    {`QD_${String(item.quadra).padStart(2, "0")}_LT_${String(
                      item.lote
                    ).padStart(2, "0")}_${item.titulo}_328_CDRVA_${
                      item.venda
                    }_(${item.id})`}
                  </CardDescription>

                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() =>
                      handleCopyToClipboard(
                        `QD_${String(item.quadra).padStart(2, "0")}_LT_${String(
                          item.lote
                        ).padStart(2, "0")}_${item.titulo}_328_CDRVA_${
                          item.venda
                        }_(${item.id})`
                      )
                    }
                  >
                    <TooltipProvider>
                      <Tooltip delayDuration={2}>
                        <TooltipTrigger asChild>
                          <Button variant="outline"><Copy size={12} /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copiar resultado para área de transferência.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                  </Button>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardFooter>
      </Card>
    </main>
  );
}
