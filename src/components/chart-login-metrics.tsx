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
  confirmed: {
    label: 'Login confirmado:',
    color: 'hsl(var(--chart-1))',
  },
  'not-confirmed': {
    label: 'Login não confirmado:',
    color: 'hsl(var(--chart-6))',
  },
} satisfies ChartConfig

interface ChartProps {
  charts: {
    status: string
    size: number
    fill: string
  }[]
  chartMessage?: string
}

export function ChartLoginMetrics({ charts, chartMessage }: ChartProps) {
  return (
    <Card className="flex flex-col border-none bg-pmpa-blue-700">
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
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
        <div className="flex items-center gap-2 font-medium leading-none text-white">
          {chartMessage ?? 'Gráfico de notas dos usuários'}
        </div>
      </CardFooter>
    </Card>
  )
}
