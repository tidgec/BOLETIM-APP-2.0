import { Camera, Pencil } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useProfile } from '@/hooks/use-profile'

export function Profile() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const { user, isLoading: isLoadingProfile } = useProfile()

  function handleOnFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (!files) {
      return null
    }

    const fileURL = URL.createObjectURL(files[0])
    setProfileImage(fileURL)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-4 md:px-8">
      {isLoadingProfile && (
        <Skeleton className="h-80 w-full max-w-4xl bg-slate-300" />
      )}
      {!isLoadingProfile && (
        <article className="flex w-full max-w-4xl flex-col gap-8 rounded bg-pmpa-blue-500 p-4 md:flex-row md:p-8">
          <div className="flex w-full flex-col items-center text-white md:w-1/3">
            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl bg-pmpa-blue-800 md:h-52 md:w-52">
              <label
                htmlFor="file"
                className="absolute inset-0 flex w-full cursor-pointer items-center justify-center opacity-0 group-hover:bg-black/20 group-hover:opacity-100"
              >
                <Camera className="h-6 w-6" />
                <input
                  type="file"
                  onChange={handleOnFileSelected}
                  className="hidden"
                  id="file"
                  accept="image/jpeg,image/png"
                />
              </label>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full rounded-3xl object-cover"
                />
              ) : (
                <span className="text-4xl font-medium md:text-7xl">RS</span>
              )}
            </div>
            <p className="text-md mt-2 text-center font-medium md:text-lg">
              {user?.role}
            </p>
          </div>

          <div className="flex w-full flex-col md:w-2/3">
            <div className="w-full space-y-4 text-white">
              <div className="flex items-center justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-white hover:text-gray-300">
                      <Pencil size={25} />
                    </button>
                  </DialogTrigger>

                  <DialogContent className="h-[38rem] w-full max-w-3xl overflow-auto bg-pmpa-blue-700 p-0 text-white">
                    <DialogHeader className="h-20 bg-pmpa-blue-900 px-4 py-8">
                      <DialogTitle>Atualizar perfil</DialogTitle>
                    </DialogHeader>

                    <form className="relative flex flex-col items-center space-y-4 px-6 py-4">
                      <div className="w-full space-y-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-sm">
                            Nome Completo:
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className="rounded px-4 py-3 text-black"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-sm">
                            E-mail:
                          </label>
                          <input
                            type="email"
                            id="email"
                            placeholder="john@example.com"
                            className="rounded px-4 py-3 text-black"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="password" className="text-sm">
                            Senha:
                          </label>
                          <input
                            type="password"
                            id="password"
                            placeholder="********"
                            className="rounded px-4 py-3 text-black"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="birthday" className="text-sm">
                            Data de nascimento:
                          </label>
                          <input
                            type="text"
                            id="birthday"
                            placeholder="20/12/2022"
                            className="rounded px-4 py-3 text-black"
                          />
                        </div>
                      </div>

                      <DialogFooter className="sticky bottom-0 left-0 w-full bg-pmpa-blue-900 px-8 py-4">
                        <button
                          type="submit"
                          className="rounded px-4 py-2 hover:bg-pmpa-blue-500"
                        >
                          Atualizar
                        </button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="mt-4 w-full md:mt-0">
                  <p className="text-2xl font-bold md:text-4xl">
                    {user?.username.toUpperCase()}
                  </p>
                </div>
              </div>

              <ul className="space-y-2">
                <li>Email: {user?.email}</li>
                <li>CPF: {user?.cpf}</li>
                <li>RG: {user?.civilId}</li>
                <li>Data de nascimento: {String(user?.birthday)}</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row">
              {user?.courses?.length ? (
                <div className="space-y-1 text-white">
                  <span className="text-lg font-medium">Cursos:</span>
                  <ul className="space-y-1">
                    {user?.courses?.map((course) => (
                      <li key={course.id}>{course.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                ''
              )}

              {user?.poles?.length ? (
                <div className="space-y-1 text-white">
                  <span className="text-lg font-medium">Polos:</span>
                  <ul className="space-y-1">
                    {user?.poles?.map((pole) => (
                      <li key={pole.id}>{pole.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}
