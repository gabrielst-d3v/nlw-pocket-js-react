import { Plus } from "lucide-react";
import { InOrbitIcon } from "./in-orbit-icon";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import type { GetSummaryResponse } from "../http/get-summary";
import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-br'
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR)

interface WeeklySummaryProps {
  summary: GetSummaryResponse['summary']
}

export function EmptyGoalCompletion({ summary } : WeeklySummaryProps) {
  const fromDate = dayjs().startOf('week').format('D[ de ]MMM')
  const toDate = dayjs().endOf('week').format('D[ de ]MMM')

  const completedPercentage = Math.round(
    (summary.completed * 100) / summary.total
  )

  return (
      <main className="max-w-[540px] py-10 px-5 mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <InOrbitIcon />
            <span className="text-lg font-semibold">
              {fromDate} - {toDate}
            </span>
          </div>

          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4" />
              Cadastrar meta
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex flex-col gap-3">
          <Progress value={summary.completed} max={summary.total}>
            <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
          </Progress>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>
              Você completou{' '}
              <span className="text-zinc-100">{summary.completed}</span> de{' '}
              <span className="text-zinc-100">{summary.total}</span> metas nessa
              semana.
            </span>
            <span>{completedPercentage}%</span>
          </div>
        </div>

        <Separator />

        <PendingGoals />

        <div className="space-y-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          <p className='text-sm text-zinc-400'>Você ainda não completou nenhuma meta essa semana.</p>
        </div>
      </main>
  )
}