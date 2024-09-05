import { useSearchParams } from 'react-router-dom'

import { ChartLoginMetrics } from '@/components/chart-login-metrics'
import { useGetLoginConfirmationMetrics } from '@/hooks/use-get-login-confirmation-metrics'

export function LoginConfirmation() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId') ?? ''

  const { loginConfirmationMetrics, isLoading } =
    useGetLoginConfirmationMetrics({
      courseId,
    })

  return (
    <div className="w-full px-4 py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Confirmação de login
        </h2>

        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center"></div>
          <div className="flex-1 items-center py-10 text-center">
            <p className="mx-auto w-full max-w-72 rounded bg-pmpa-blue-500 py-4 font-bold text-white">
              Gráfico de alunos
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            Array.isArray(loginConfirmationMetrics) &&
            loginConfirmationMetrics.map((metric) => (
              <div
                className="space-y-2 rounded-lg bg-pmpa-blue-500 p-4"
                key={metric.poleId}
              >
                <p className="font-medium text-white">POLO: {metric.pole}</p>
                <div className="mx-auto w-full max-w-96">
                  <ChartLoginMetrics
                    charts={[
                      {
                        status: 'confirmed',
                        size: metric.metrics.totalConfirmedSize ?? 0,
                        fill: 'var(--color-confirmed)',
                      },
                      {
                        status: 'not-confirmed',
                        size: metric.metrics.totalNotConfirmedSize ?? 0,
                        fill: 'var(--color-not-confirmed)',
                      },
                    ]}
                    chartMessage="Métricas de Login"
                  />
                </div>
              </div>
            ))}

          {!isLoading && !Array.isArray(loginConfirmationMetrics) && (
            <div
              className="space-y-2 rounded-lg bg-pmpa-blue-500 p-4"
              key={loginConfirmationMetrics?.poleId}
            >
              <p className="font-medium text-white">
                POLO: {loginConfirmationMetrics?.pole}
              </p>
              <div className="mx-auto w-96">
                <ChartLoginMetrics
                  charts={[
                    {
                      status: 'confirmed',
                      size:
                        loginConfirmationMetrics?.metrics.totalConfirmedSize ??
                        0,
                      fill: 'var(--color-confirmed)',
                    },
                    {
                      status: 'not-confirmed',
                      size:
                        loginConfirmationMetrics?.metrics
                          .totalNotConfirmedSize ?? 0,
                      fill: 'var(--color-not-confirmed)',
                    },
                  ]}
                  chartMessage="Métricas de Login"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
