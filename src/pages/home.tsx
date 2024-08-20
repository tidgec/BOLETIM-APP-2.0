import { Link } from 'react-router-dom'
import CFOImage from '@/assets/cfo-img-curso.jpg'
import CASImage from '@/assets/cas-img-course.png'
import CGSImage from '@/assets/cgs-img-course.png'
import { LucideSearch } from 'lucide-react'
import { useProfile } from '@/hooks/use-profile'

const courses = [
  { id: 1, title: 'CFO - 2023', imageURL: CFOImage },
  { id: 2, title: 'CAS TURMA I - 2024', imageURL: CASImage },
  { id: 3, title: 'CGS TURMA II - 2023', imageURL: CGSImage },
]

export function Home() {
  const { user } = useProfile()

  const isStudent = user?.role === 'student'

  return (
    <div className="h-full w-full py-6">
      {isStudent && (
        <div className="mx-auto w-full max-w-[90rem]">
          <main>
            <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
              BEM-VINDO(A), {user.username}
            </h2>
            <div className="flex flex-wrap justify-center">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="m-10 w-80 bg-white py-1 shadow-md"
                >
                  <Link to={`/students/page`} className="block">
                    <div className="flex flex-col items-center">
                      <img
                        src={course.imageURL}
                        alt="Imagem do curso"
                        className="mb-4"
                      />
                      <h3 className="mb-2 text-xl">{course.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {!isStudent && (
        <div className="flex h-full items-center">
          <main className="flex flex-1 flex-col items-center justify-center space-y-4 px-2">
            <h1 className="text-center text-4xl font-bold text-blue-950">
              O que você deseja buscar?
            </h1>
            <span className="text-sm font-medium text-blue-950">
              Encontre os alunos pela pesquisa global
            </span>
            <div className="flex w-full max-w-3xl items-center gap-4 rounded-full bg-white px-6 py-2">
              <LucideSearch size={20} className="h-4 w-4 text-slate-600" />
              <input
                type="text"
                placeholder="Busque por nome ou cpf..."
                className="flex-1 bg-transparent py-2 hover:outline-2"
              />
              <button className="hidden"></button>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
