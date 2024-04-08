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
import { SyntheticEvent, useState } from "react";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "./_components/toggle-theme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RenamedProps {
  quadra: number | null;
  lote: number | null;
  titulo: string | null;
  venda: number | null;
  id: number | null;
}

export default function Home() {
  const [quadra, setQuadra] = useState<number | null>(null);
  const [lote, setLote] = useState<number | null>(null);
  const [titulo, setTitulo] = useState<string | null>(null);
  const [venda, setVenda] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(1);
  const [newFileName, setNewFileName] = useState<RenamedProps[]>([]);
  const [resultFormated, setResultFormated] = useState();
  const [showCopyIcon, setShowCopyIcon] = useState(false);

  function handleRenameFileName() {
    if (quadra !== null && lote !== null && venda !== null && titulo !== null) {
      // Verificar se já existe um registro com as mesmas informações
      const isDuplicate = newFileName.some(
        (item) =>
          item.quadra === quadra &&
          item.lote === lote &&
          item.titulo === titulo &&
          item.venda === venda &&
          item.id === id
      );
  
      if (isDuplicate) {
        toast.error("Já existe um registro com essas informações.");
      } else {
        setNewFileName([{ quadra, lote, titulo, venda, id }, ...newFileName]);
      }
    } else {
      toast.error("Preencha todos os campos obrigatórios.");
    }
  }

  function handleCopyToClipboard(text: string) {
    toast.success(text);
    navigator.clipboard.writeText(text);

    setShowCopyIcon(true);

    setTimeout(() => {
      setShowCopyIcon(false);
    }, 2000);
  }
  const handleTituloChange = (e: any) => {
    const inputValue = e.target.value.replace(/[^\w\s]/gi, ""); // Remove caracteres especiais
    setTitulo(inputValue.toUpperCase()); // Converte para maiúsculas e atualiza o estado
  };

  const handleQuadraChange = (e: any) => {
    const inputValue = e.target.value.slice(0, 2); // Limita a entrada a 2 caracteres
    setQuadra(Number(inputValue));
  };

  const handleLoteChange = (e: any) => {
    const inputValue = e.target.value.slice(0, 2); // Limita a entrada a 2 caracteres
    setLote(Number(inputValue));
  };

  return (
    <main className="min-h-screen max-w-lg mx-auto py-5 space-y-5 max-sm:px-4">
      <Card className="w-full ">
        <ModeToggle />
        <CardHeader>
          <CardTitle className="text-2xl">Renomeie Contratos</CardTitle>
          <CardDescription>
            Adicione as informações solicitadas abaixo e copie o resultado para
            área de trabalho.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 ">
          <div className="flex sm:items-center gap-5 max-sm:flex-col">
            <div className="grid gap-2">
              <Label htmlFor="qd">
                {" "}
                <span className="text-xs text-red-500 mr-2">*</span>Quadra
              </Label>
              <Input
                onKeyDown={(e) => e.key === "Enter" && handleRenameFileName()}
                onChange={handleQuadraChange}
                value={quadra as number}
                id="qd"
                type="number"
                placeholder="--"
                maxLength={2}
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
                onChange={handleLoteChange}
                value={lote as number}
                id="lt"
                type="number"
                placeholder="--"
                maxLength={2}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="titulo">
              <span className="text-xs text-red-500 mr-2">*</span>Nome do
              arquivo
            </Label>
            <Input
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault(); // Impede a inserção da barra de espaço no input
                  setTitulo((prevTitulo) => {
                    // Substitui o espaço por "_"
                    return prevTitulo ? prevTitulo.trim() + "_" : "_";
                  });
                }
                if (e.key === "Enter") {
                  handleRenameFileName();
                }
              }}
              onChange={handleTituloChange}
              value={titulo as string}
              id="titulo"
              type="text"
              required
            />
          </div>
          <div className="flex sm:items-center gap-5 max-sm:flex-col">
            <div className="grid gap-2">
              <Label htmlFor="venda">
                {" "}
                <span className="text-xs text-red-500 mr-2">*</span>Venda
              </Label>
              <Input
                onKeyDown={(e) => e.key === "Enter" && handleRenameFileName()}
                onChange={(e) => setVenda(Number(e.target.value))}
                value={venda as number}
                id="venda"
                type="number"
                placeholder="-----"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="id">Indice</Label>
              <Input
                onKeyDown={(e) => e.key === "Enter" && handleRenameFileName()}
                onChange={(e) => setId(Number(e.target.value))}
                value={id as number}
                id="id"
                type="number"
                placeholder="Digite o número da ordem do documento..."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col  gap-5">
          <Button
            onClick={handleRenameFileName}
            className="w-full dark:bg-emerald-600 dark:text-primary "
          >
            Gerar
          </Button>
        </CardFooter>
      </Card>

      <ScrollArea className="w-full">
        <div className="max-h-80 space-y-3 mr-5">
          {newFileName.length > 0 && <div>Resultado</div>}

          {newFileName.map((item, index) => (
            <Card
              className="p-4 px-6 w-full flex items-center justify-between shadow-none  space-x-3"
              key={index}
            >
              <CardDescription className="text-xs text-primary uppercase">
                {`QD_${String(item.quadra).padStart(2, "0")}_LT_${String(
                  item.lote
                ).padStart(2, "0")}_${item.titulo}_328_CDRVA_${item.venda}_(${
                  item.id
                })`}
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
                      <Button variant="outline" size="icon">
                        {showCopyIcon ? (
                          <Check className="text-emerald-600" size={12} />
                        ) : (
                          <Copy size={12} />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="text-xs backdrop-blur-md border dark:bg-slate-900 text-primary"
                    >
                      <p>Copiar resultado para área de transferência.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </main>
  );
}
