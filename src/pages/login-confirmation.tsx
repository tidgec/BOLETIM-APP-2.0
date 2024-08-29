import 'chart.js/auto'

import { Pie } from 'react-chartjs-2'

export function LoginConfirmation() {
  const data = {
    labels: ['Notas Muito Boas'],
    datasets: [
      {
        data: [100],
        backgroundColor: ['#32CD32'],
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Confirmação de login
        </h2>

        <div className="mb-2 flex items-center justify-between  ">
          <div className="flex items-center"></div>
          <div className="flex-1 items-center py-10 text-center">
            <span className=" rounded bg-pmpa-blue-500 px-28 py-4 font-bold text-white">
              Gráfico de alunos
            </span>
          </div>
        </div>
        <div className=" rounded-lg bg-pmpa-blue-500 p-6">
          <h2 className="text-white">POLO CFAP:</h2>
          <div className="w-1/4">
            <Pie data={data} options={options} />
          </div>
        </div>
      </section>
    </div>
  )
}
