import { Pie, PieChart, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  excellent: {
    label: 'Excelente',
    color: 'hsl(var(--chart-1))',
  },
  'very-good': {
    label: 'Muito boa',
    color: 'hsl(var(--chart-2))',
  },
  good: {
    label: 'Boa',
    color: 'hsl(var(--chart-3))',
  },
  regular: {
    label: 'Regular',
    color: 'hsl(var(--chart-4))',
  },
  insufficient: {
    label: 'Insuficiente',
    color: 'hsl(var(--chart-5))',
  },
  'no-income': {
    label: 'Sem renda',
    color: 'hsl(var(--chart-6))',
  },
} satisfies ChartConfig

interface ChartProps {
  charts: {
    status: string
    size: number
    fill: string
  }[]
}

export function Chart({ charts }: ChartProps) {
  return (
    <Card className="flex w-full max-w-72 flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={charts}
              dataKey="size"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Gráfico de notas dos usuários
        </div>
      </CardFooter>
    </Card>
  )
}
