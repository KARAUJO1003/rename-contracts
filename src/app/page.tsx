'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Check, Copy, SortAsc, SortDesc, Trash } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ModeToggle } from './_components/toggle-theme'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoDisableInput } from './_components/info-disabled-input'

interface RenamedProps {
  quadra: number | null
  lote: number | null
  titulo: string | null
  venda: number | null
  empresa: number | null
  obra: string | null
  suffix: number | null
}

export default function Home() {
  const [quadra, setQuadra] = useState<number | undefined>(undefined)
  const [lote, setLote] = useState<number | undefined>(undefined)
  const [titulo, setTitulo] = useState<string | ''>('')
  const [venda, setVenda] = useState<number | undefined>(undefined)
  const [empresa, setEmpresa] = useState<number>(328)
  const [obra, setObra] = useState<string | ''>('CDRVA')
  const [suffix, setSuffix] = useState<number>(1)

  const [quadraDisabled, setQuadraDisabled] = useState<boolean>(false)
  const [loteDisabled, setLoteDisabled] = useState<boolean>(false)
  const [tituloDisabled, setTituloDisabled] = useState<boolean>(false)
  const [vendaDisabled, setVendaDisabled] = useState<boolean>(false)
  const [empresaDisabled, setEmpresaDisabled] = useState<boolean>(true)
  const [obraDisabled, setObraDisabled] = useState<boolean>(true)
  const [suffixDisabled, setSuffixDisabled] = useState<boolean>(true)

  const [newFileName, setNewFileName] = useState<RenamedProps[]>([])
  const [copiedItemIndex, setCopiedItemIndex] = useState<number | null>(null)
  const [formattedResults, setFormattedResults] = useState<string[]>([])
  const [ascendingOrder, setAscendingOrder] = useState(false)

  const loteInputRef = useRef<HTMLInputElement>(null)

  const handleRenameFileName = () => {
    if (!quadra || !lote || !venda || !titulo || !empresa || !obra) {
      toast.error('Preencha todos os campos obrigatórios.')
      return
    }

    const isDuplicate = newFileName.some(
      (item) =>
        item.quadra === quadra &&
        item.lote === lote &&
        item.titulo === titulo &&
        item.venda === venda &&
        item.empresa === empresa &&
        item.obra === obra &&
        item.suffix === suffix,
    )

    if (isDuplicate) {
      toast.error('Já existe um registro com essas informações.')
      return
    }

    setNewFileName([
      { quadra, lote, titulo, venda, empresa, obra, suffix },
      ...newFileName,
    ])
    if (loteInputRef.current) {
      loteInputRef.current.focus()
    }
  }

  useEffect(() => {
    // Função para formatar os resultados
    const formatResults = () => {
      return newFileName.map((item) => {
        return `QD_${String(item.quadra).padStart(2, '0')}_LT_${String(
          item.lote,
        ).padStart(2, '0')}_${item.titulo}_${item.empresa}_${item.obra}_${
          item.venda
        }_(${item.suffix})`
      })
    }

    // Atualiza o estado com os resultados formatados
    setFormattedResults(formatResults())
  }, [newFileName])

  function handleCopyToClipboard(text: string, index: number) {
    toast.success(text)
    navigator.clipboard.writeText(text)

    setCopiedItemIndex(index)
    setTimeout(() => {
      setCopiedItemIndex(null)
    }, 20000)
  }

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\w\s]/gi, '').toUpperCase() // Remove caracteres especiais
    setTitulo(inputValue.toUpperCase()) // Converte para maiúsculas e atualiza o estado
  }

  const handleQuadraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.slice(0, 2) // Limita a entrada a 2 caracteres
    setQuadra(Number(inputValue))
  }

  const handleLoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.slice(0, 2) // Limita a entrada a 2 caracteres
    setLote(Number(inputValue))
  }
  const toggleSortOrder = () => {
    setAscendingOrder((prevOrder) => !prevOrder)
  }

  // Função para classificar os resultados com base na ordem atual
  const sortedResults = formattedResults.sort((a, b) => {
    return ascendingOrder ? a.localeCompare(b) : b.localeCompare(a)
  })

  return (
    <main className="min-h-screen max-w-lg mx-auto py-5 space-y-5 max-sm:px-4">
      <Card className="w-full ">
        <ModeToggle />
        <CardHeader>
          <CardTitle className="text-2xl">Nomes de Arquivos</CardTitle>
          <CardDescription>
            Adicione as informações solicitadas abaixo e copie o resultado para
            área de transferência.
          </CardDescription>
          {/* <ComboboxDemo /> */}
        </CardHeader>

        <CardContent className="grid gap-4 ">
          <div className="flex sm:items-center gap-5 ">
            <div className="grid gap-2">
              <Label
                className="flex items-center gap-2"
                onDoubleClick={() => setQuadraDisabled(!quadraDisabled)}
                htmlFor="qd"
              >
                <span className="text-xs text-red-500 mr-2">*</span>Quadra
                <InfoDisableInput />
              </Label>
              <Input
                disabled={quadraDisabled}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameFileName()}
                onChange={handleQuadraChange}
                value={quadra !== undefined ? quadra : ''}
                id="qd"
                type="number"
                min={1}
                placeholder="--"
                maxLength={2}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                onDoubleClick={() => setLoteDisabled(!loteDisabled)}
                className="flex items-center gap-2"
                htmlFor="lt"
              >
                <span className="text-xs text-red-500 mr-2">*</span>Lote
                <InfoDisableInput />
              </Label>
              <Input
                disabled={loteDisabled}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameFileName()}
                onChange={handleLoteChange}
                value={lote !== undefined ? lote : ''}
                id="lt"
                type="number"
                min={1}
                placeholder="--"
                maxLength={2}
                ref={loteInputRef}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label
              onDoubleClick={() => setTituloDisabled(!tituloDisabled)}
              className="flex items-center gap-2"
              htmlFor="titulo"
            >
              <span className="text-xs text-red-500 mr-2">*</span>Nome do
              arquivo
              <InfoDisableInput />
            </Label>
            <Input
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault() // Impede a inserção da barra de espaço no input
                  setTitulo((prevTitulo) => {
                    // Substitui o espaço por "_"
                    return prevTitulo ? prevTitulo.trim() + '_' : '_'
                  })
                }
                if (e.key === 'Enter') {
                  handleRenameFileName()
                }
              }}
              disabled={tituloDisabled}
              onChange={handleTituloChange}
              value={titulo as string}
              id="titulo"
              type="text"
              required
            />
          </div>

          <div className="flex sm:items-center gap-5 ">
            <div className="grid gap-2">
              <Label
                onDoubleClick={() => setEmpresaDisabled(!empresaDisabled)}
                className="flex items-center gap-2"
                htmlFor="empresa"
              >
                <span className="text-xs text-red-500 mr-2">*</span>Empresa
                <InfoDisableInput />
              </Label>
              <Input
                disabled={empresaDisabled}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameFileName()}
                onChange={(e) => setEmpresa(Number(e.target.value))}
                value={empresa !== undefined ? empresa : ''}
                id="empresa"
                type="number"
                min={1}
                placeholder="-----"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                onDoubleClick={() => setObraDisabled(!obraDisabled)}
                className="flex items-center gap-2"
                htmlFor="obra"
              >
                <span className="text-xs text-red-500 mr-2">*</span>Obra
                <InfoDisableInput />
              </Label>
              <Input
                disabled={obraDisabled}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameFileName()}
                onChange={(e) => setObra(e.target.value.toUpperCase())}
                value={obra !== undefined ? obra : ''}
                id="obra"
                type="text"
                required
              />
            </div>
          </div>
          <div className="flex sm:items-center gap-5 ">
            <div className="grid gap-2">
              <Label
                onDoubleClick={() => setVendaDisabled(!vendaDisabled)}
                className="flex items-center gap-2"
                htmlFor="venda"
              >
                <span className="text-xs text-red-500 mr-2">*</span>Venda
                <InfoDisableInput />
              </Label>
              <Input
                disabled={vendaDisabled}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameFileName()}
                onChange={(e) => setVenda(Number(e.target.value))}
                value={venda !== undefined ? venda : ''}
                id="venda"
                type="number"
                min={1}
                placeholder="-----"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                onDoubleClick={() => setSuffixDisabled(!setSuffixDisabled)}
                className="flex items-center gap-2"
                htmlFor="suffix"
              >
                Sufixo
                <InfoDisableInput />
              </Label>
              <Input
                disabled={suffixDisabled}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameFileName()}
                onChange={(e) => setSuffix(Number(e.target.value))}
                value={suffix !== undefined ? suffix : ''}
                id="suffix"
                type="number"
                min={1}
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

      {formattedResults.length === 0 && (
        <Card className="p-4 px-6 w-full  flex items-center justify-center shadow-none  space-x-3 ">
          <CardDescription className="text-xs text-muted-foreground uppercase max-w-80 select-none">
            Você ainda não possui nenhum resultado.
          </CardDescription>
        </Card>
      )}

      {formattedResults.length > 0 && (
        <div className="w-full flex justify-between items-center ">
          <Button onClick={() => setNewFileName([])} variant="outline">
            <Trash size={12} className="mr-3" />
            Limpar tudo
          </Button>
          <TooltipProvider>
            <Tooltip delayDuration={2}>
              <TooltipTrigger asChild>
                <Button
                  disabled={formattedResults.length <= 1}
                  size="icon"
                  variant="outline"
                  onClick={toggleSortOrder}
                >
                  {ascendingOrder ? (
                    <SortDesc size={18} />
                  ) : (
                    <SortAsc size={18} />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-100 border dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                Ordenar por ordem alfabética
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <ScrollArea className="w-full ">
        <div className="max-h-80 space-y-3 ">
          {sortedResults.map((result, index) => (
            <Card
              className="p-4 px-6 w-full  flex items-center justify-between shadow-none  space-x-3"
              key={index}
            >
              <ScrollArea className="w-full py-2">
                <CardDescription className="text-xs text-muted-foreground font-medium uppercase max-w-80 select-none">
                  {result}
                </CardDescription>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <Button
                size={'icon'}
                variant={'outline'}
                onClick={() => handleCopyToClipboard(result, index)}
              >
                <TooltipProvider>
                  <Tooltip delayDuration={2}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        {copiedItemIndex === index ? ( // Verifica se este é o item clicado
                          <Check className="text-emerald-600" size={12} />
                        ) : (
                          <Copy size={12} />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="text-xs backdrop-blur-md border dark:bg-slate-900 bg-slate-100 text-primary"
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
  )
}
