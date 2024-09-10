import { Link } from 'react-router-dom'

import AverageBehavior from '@/assets/average-behavior-icon.png'
import AverageNotes from '@/assets/average-notes-icon.png'
import ClassificationByPole from '@/assets/classification-by-pole-icon.png'
import OverallRanking from '@/assets/overall-rating-icon.png'
import RankingNoBehavior from '@/assets/ranking-no-behavior.png'

export function Rankings() {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 py-10 text-center sm:text-left md:py-6">
      <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
        Classificações
      </h2>

      <div className="mx-auto my-6 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-4 py-2 md:grid-cols-2 md:justify-items-start lg:grid-cols-3">
        <Link
          to={'/rankings/overall/courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={OverallRanking}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Classificação geral</span>
        </Link>
        <Link
          to={'/rankings/poles/courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={ClassificationByPole}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">
            Classificação por polos
          </span>
        </Link>
        <Link
          to={'/rankings/note-poles/courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={RankingNoBehavior}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">
            Classificação - sem comportamento
          </span>
        </Link>
        <Link
          to={'/rankings/note-poles/courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={AverageNotes}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Média de notas - polos</span>
        </Link>
        <Link
          to={'/classification/the-classification-by-behavior'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={AverageBehavior}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">
            Média de comportamento - polos
          </span>
        </Link>
        {/* <Link
          to={'#'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={Second}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Dados - Segunda época</span>
        </Link> */}
      </div>
    </section>
  )
}
