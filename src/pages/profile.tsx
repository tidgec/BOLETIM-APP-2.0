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
import { useProfile } from '@/hooks/use-profile'

export function Profile() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const { user } = useProfile()

  function handleOnFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (!files) {
      return null
    }

    const fileURL = URL.createObjectURL(files[0])
    setProfileImage(fileURL)
  }

  return (
    <div className="flex h-full w-full items-center justify-center gap-10">
      <article className="flex w-full max-w-4xl gap-8 rounded bg-pmpa-blue-500 px-8 py-4">
        <div className="my-auto space-y-1 text-white">
          <div className="group relative  flex h-52 w-52 items-center justify-center overflow-hidden rounded-3xl bg-pmpa-blue-800">
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
            {profileImage && (
              <img
                src={profileImage}
                alt=""
                className="h-full w-full rounded-3xl object-cover"
              />
            )}
            {!profileImage && <span className="text-7xl font-medium">RS</span>}
          </div>
          <p className="text-center text-lg font-medium">{user?.role}</p>
        </div>

        <div className="flex h-80 w-full flex-col justify-between">
          <div className="w-full space-y-4 text-white">
            <div className="flex w-full flex-col gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="ml-auto">
                    <Pencil size={25} />
                  </button>
                </DialogTrigger>

                <DialogContent className="h-[38rem] w-full max-w-3xl overflow-auto bg-pmpa-blue-700 p-0 text-white">
                  <DialogHeader className="h-20 bg-pmpa-blue-900 px-4 py-8">
                    <DialogTitle>Atualizar perfil</DialogTitle>
                  </DialogHeader>

                  <form className="relative flex flex-col items-center space-y-2">
                    <div className="w-full flex-1 space-y-4 px-6">
                      <div className="flex flex-col gap-1">
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
                      <div className="flex flex-col gap-1">
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
                      <div className="flex flex-col gap-1">
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
                      {/* <div className="flex flex-col gap-1">
                        <label htmlFor="military-id" className="text-sm">
                          RG Militar:
                        </label>
                        <input
                          type="text"
                          id="military-id"
                          placeholder="29328932"
                          className="rounded px-4 py-3 text-black"
                        />
                      </div> */}
                      {/* <div className="flex flex-col gap-1">
                        <label htmlFor="father-name" className="text-sm">
                          Nome do pai:
                        </label>
                        <input
                          type="text"
                          id="father-name"
                          placeholder="João Doe"
                          className="rounded px-4 py-3 text-black"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="mother-name" className="text-sm">
                          Nome da mãe:
                        </label>
                        <input
                          type="text"
                          id="mother-name"
                          placeholder="Joana Doe"
                          className="rounded px-4 py-3 text-black"
                        />
                      </div> */}
                      <div className="flex flex-col gap-1">
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

              <div className="w-full">
                <p className="text-4xl font-bold">
                  {user?.username.toUpperCase()}
                </p>
              </div>
            </div>

            <ul className="h-32 space-y-2 overflow-auto ">
              <li>Email: {user?.email}</li>
              <li>CPF: {user?.cpf}</li>
              <li>RG: {user?.civilId}</li>
              <li>Data de nascimento: {String(user?.birthday)}</li>
            </ul>
          </div>

          <div className="my-auto flex w-full gap-10">
            <div className="space-y-1 text-white">
              <span className="text-lg font-medium">Cursos:</span>
              <ul className="ml-0 space-y-1">
                {user?.courses?.map((course, index) => (
                  <li key={index}>{'course'}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1 text-white">
              <span className="ml-20 text-lg font-medium">Polos:</span>
              <ul className="ml-20 space-y-1">
                {user?.poles?.map((pole, index) => (
                  <li key={index}>{'pole'}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
