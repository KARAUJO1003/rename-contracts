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
import {
  Check,
  Copy,
  SortAsc,
  SortDesc,
  Trash,
  ChevronsUpDown,
  InfoIcon,
} from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ModeToggle } from './_components/toggle-theme'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoDisableInput } from './_components/info-disabled-input'

import { cn } from '@/lib/utils'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { descriptions } from './_components/input-command'
import Link from 'next/link'

interface RenamedProps {
  quadra: number | null
  lote: number | null
  documentName: string | null
  venda: number | null
  empresa: number | null
  obra: string | null
  suffix: number | null
}

export default function Home() {
  const [quadra, setQuadra] = useState<number | undefined>(undefined)
  const [lote, setLote] = useState<number | undefined>(undefined)
  const [documentName, setDocumentName] = useState<string | ''>('')
  const [venda, setVenda] = useState<number | undefined>(undefined)
  const [empresa, setEmpresa] = useState<number>(328)
  const [obra, setObra] = useState<string | ''>('CDRVA')
  const [suffix, setSuffix] = useState<number>(1)

  const [quadraDisabled, setQuadraDisabled] = useState<boolean>(false)
  const [loteDisabled, setLoteDisabled] = useState<boolean>(false)
  const [documentNameDisabled, setDocumentNameDisabled] =
    useState<boolean>(false)
  const [vendaDisabled, setVendaDisabled] = useState<boolean>(false)
  const [empresaDisabled, setEmpresaDisabled] = useState<boolean>(true)
  const [obraDisabled, setObraDisabled] = useState<boolean>(true)
  const [suffixDisabled, setSuffixDisabled] = useState<boolean>(true)

  const [newFileName, setNewFileName] = useState<RenamedProps[]>([])
  const [copiedItemIndex, setCopiedItemIndex] = useState<number | null>(null)
  const [formattedResults, setFormattedResults] = useState<string[]>([])
  const [ascendingOrder, setAscendingOrder] = useState(false)
  const [open, setOpen] = useState(false)

  const sortedDescriptions = descriptions.sort((a, b) => a.localeCompare(b))

  const loteInputRef = useRef<HTMLInputElement>(null)
  const vendaInputRef = useRef<HTMLInputElement>(null)

  const handleRenameFileName = () => {
    if (!quadra || !lote || !venda || !documentName || !empresa || !obra) {
      toast.error('Preencha todos os campos obrigatórios.')
      return
    }

    const isDuplicate = newFileName.some(
      (item) =>
        item.quadra === quadra &&
        item.lote === lote &&
        item.documentName === documentName &&
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
      { quadra, lote, documentName, venda, empresa, obra, suffix },
      ...newFileName,
    ])
    if (loteInputRef.current) {
      loteInputRef.current.focus()
    }
    setSuffix(1)
  }

  useEffect(() => {
    // Função para formatar os resultados
    const formatResults = () => {
      return newFileName.map((item) => {
        return `QD_${String(item.quadra).padStart(2, '0')}_LT_${String(
          item.lote,
        ).padStart(2, '0')}_${item.documentName}_${item.empresa}_${item.obra}_${
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
    }, 10000)
  }

  const handleQuadraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.slice(0, 2) // Limita a entrada a 2 caracteres
    setQuadra(Number(inputValue))
    setVenda(undefined)
    setNewFileName([])
    setDocumentName('')
  }

  const handleLoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.slice(0, 2) // Limita a entrada a 2 caracteres
    setLote(Number(inputValue))
    setVenda(undefined)
    setNewFileName([])
    setDocumentName('')
  }
  const toggleSortOrder = () => {
    setAscendingOrder((prevOrder) => !prevOrder)
  }

  // Função para classificar os resultados com base na ordem atual
  const sortedResults = formattedResults.sort((a, b) => {
    return ascendingOrder ? a.localeCompare(b) : b.localeCompare(a)
  })

  const handleDocumentNameSelect = (currentValue: string) => {
    setDocumentName(currentValue === documentName ? '' : currentValue)
    setOpen(false)

    // Define o foco no próximo campo de entrada (Empresa)
    if (vendaInputRef.current) {
      vendaInputRef.current.focus()
      vendaInputRef.current.select()
    }
  }

  return (
    <main className=" max-w-xl mx-auto space-y-5 max-sm:px-4">
      <Card className="w-full mt-10">
        <ModeToggle />
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl">Nomes de Arquivos</CardTitle>
            <TooltipProvider>
              <Tooltip defaultOpen delayDuration={2}>
                <TooltipTrigger className="flex items-center gap-1 text-emerald-600">
                  <InfoIcon size={16} />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100/90 backdrop-blur-md border dark:bg-background/90 text-gray-800 dark:text-gray-200 max-w-96 p-5 max-sm:mx-2">
                  <CardTitle className="text-lg">
                    Utilize teclas de atalho para obter mais agilidade.
                  </CardTitle>
                  <ol className="ml-5">
                    <br />
                    <li className="list-decimal">
                      Pressione a tecla{' '}
                      <strong className="text-emerald-600">TAB</strong> para{' '}
                      <span className=" text-emerald-600">avançar</span> para o
                      próximo campo.
                    </li>
                    <br />
                    <li className="list-decimal">
                      Pressione as teclas{' '}
                      <strong className="text-emerald-600">Shift + TAB</strong>{' '}
                      para <span className=" text-emerald-600">voltar</span>{' '}
                      para o campo anterior.
                    </li>
                    <br />
                    <li className="list-decimal">
                      Pressione as teclas{' '}
                      <strong className="text-emerald-600">Ctrl + A</strong>{' '}
                      para selecionar todo o texto do campo selecionado.
                    </li>
                    <br />
                    <li className="list-decimal">
                      Dê um{' '}
                      <strong className="text-emerald-600">duplo clique</strong>{' '}
                      sobre a label de qualquer input, dessa forma poderá{' '}
                      <strong className="text-emerald-600">
                        habilitar ou desabilitar
                      </strong>{' '}
                      a edição do campo.
                    </li>
                    <br />
                  </ol>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Adicione as informações solicitadas abaixo e copie o resultado para
            área de transferência. Caso esteja sentindo falta de alguma opção
            você pode enviar sua sugestão clicando {''}
            <span>
              <Link
                className="text-emerald-600 font-bold"
                target="_blank"
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=3NRXPhbwQEWzuNZntcuVEjHHR9RYLHxCk8pBCNJ0YtNUQkpNNjM2SDNMR1JVVTY4M0FSMkM3SEVUSi4u"
              >
                <span>aqui</span>
              </Link>
            </span>
            .
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 ">
          <div className="grid grid-cols-2 items-center gap-2 justify-between w-full ">
            <div className="col-span-1 space-y-1">
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

            <div className="col-span-1 space-y-1">
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
              onDoubleClick={() =>
                setDocumentNameDisabled(!documentNameDisabled)
              }
              className="flex items-center gap-2"
              htmlFor="documentName"
            >
              <span className="text-xs text-red-500 mr-2">*</span>Nome do
              arquivo
              <InfoDisableInput />
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  // onFocus={() => setOpen(true)}
                  onDoubleClick={() =>
                    setDocumentNameDisabled(!documentNameDisabled)
                  }
                  disabled={documentNameDisabled}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-slate-500"
                >
                  {documentName
                    ? sortedDescriptions.find(
                        (description) => description === documentName,
                      )
                    : 'Busque um nome relacionado...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="w-full">
                  <CommandInput
                    id="documentName"
                    placeholder="Busque um nome relacionado..."
                  />
                  <CommandEmpty className="text-xs p-5 mx-auto">
                    Nenhuma descrição encontrada.{' '}
                  </CommandEmpty>
                  <CommandList>
                    <CommandGroup heading="Digite o nome ou utilize as setas ↑ ou ↓ para selecionar uma opção.">
                      {sortedDescriptions.map((description) => (
                        <CommandItem
                          key={description}
                          value={description}
                          onSelect={(currentValue) =>
                            handleDocumentNameSelect(currentValue)
                          }
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              documentName === description
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {description}
                          <CommandShortcut>Enter</CommandShortcut>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 items-center gap-2 justify-between w-full ">
            <div className="col-span-1 space-y-1">
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

            <div className="col-span-1 space-y-1">
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

          <div className="grid grid-cols-2 items-center gap-2 justify-between w-full ">
            <div className="col-span-1 space-y-1">
              <Label
                onDoubleClick={() => setVendaDisabled(!vendaDisabled)}
                className="flex items-center gap-2"
                htmlFor="venda"
              >
                <span className="text-xs text-red-500 mr-2">*</span>Venda
                <InfoDisableInput />
              </Label>
              <Input
                ref={vendaInputRef}
                disabled={vendaDisabled}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameFileName()}
                onChange={(e) => {
                  setVenda(Number(e.target.value))
                  setNewFileName([])
                }}
                value={venda !== undefined ? venda : ''}
                id="venda"
                type="number"
                min={1}
                placeholder="-----"
                required
              />
            </div>

            <div className="col-span-1 space-y-1">
              <Label
                onDoubleClick={() => setSuffixDisabled(!suffixDisabled)}
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
            className="w-full bg-emerald-700 hover:bg-emerald-600 dark:text-primary uppercase mb-3 py-5"
          >
            confirmar
          </Button>
        </CardFooter>
      </Card>

      {formattedResults.length === 0 && (
        <Card className="p-4 px-6 w-full  flex flex-col items-center justify-center  space-x-3 ">
          <CardDescription className="text-xs text-muted-foreground uppercase max-w-96 select-none">
            Você ainda não possui nenhum resultado.
          </CardDescription>
        </Card>
      )}

      {formattedResults.length > 0 && (
        <div className="w-full flex justify-between items-center ">
          <Button
            onClick={() => setNewFileName([])}
            variant="outline"
            className="hover:text-red-400"
          >
            <Trash size={14} className="mr-2" />
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
                  className="hover:text-emerald-600 transition-all"
                >
                  {ascendingOrder ? (
                    <SortDesc size={16} />
                  ) : (
                    <SortAsc size={16} />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-100 border dark:bg-background text-gray-800 dark:text-gray-200">
                Ordenar por ordem alfabética
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <ScrollArea className="w-full ">
        <div className="max-h-60 space-y-3 ">
          {sortedResults.map((result, index) => (
            <Card
              className="p-4 px-6 w-full  flex items-center justify-between   space-x-3"
              key={index}
            >
              <ScrollArea className="w-full py-2">
                <CardDescription className="text-sm text-slate-600 dark:text-slate-300 font-bold uppercase max-w-96 select-none">
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
                      <Button
                        className="hover:text-emerald-600 transition-all"
                        variant="outline"
                        size="icon"
                      >
                        {copiedItemIndex === index ? ( // Verifica se este é o item clicado
                          <Check className="text-emerald-600" size={12} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="text-xs backdrop-blur-md border dark:bg-background bg-slate-100 text-primary"
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
