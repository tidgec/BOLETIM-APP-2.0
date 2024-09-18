import { Camera, Pencil } from 'lucide-react'
import { ChangeEvent } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { UpdateProfile } from '@/components/update-profile'
import { useProfile } from '@/hooks/use-profile'
import { useUpdateProfileAvatar } from '@/hooks/use-update-profile-avatar'

export function Profile() {
  const { user, isLoading: isLoadingProfile } = useProfile()

  const { mutateAsync: updateProfileAvatarFn } = useUpdateProfileAvatar()

  async function handleOnFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (!files) return

    const file = files[0]

    try {
      await updateProfileAvatarFn({
        file,
      })

      toast.success('Imagem de perfil atualizada!', {
        duration: 1000,
      })
    } catch (error) {
      console.error(error)
    }
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
                  name="profile"
                  accept="image/jpeg, image/png"
                />
              </label>
              {user?.avatarUrl ? (
                <img
                  src={user?.avatarUrl}
                  alt="Profile"
                  className="h-full w-full rounded-3xl object-cover"
                />
              ) : (
                ''
              )}
            </div>
            <p className="text-md mt-2 text-center font-medium md:text-lg">
              {user?.role}
            </p>
          </div>

          <div className="flex w-full flex-col md:w-2/3">
            <div className="w-full space-y-4 text-white">
              <div className="flex items-center justify-between">
                <div className="mt-4 w-full md:mt-0">
                  <p className="text-2xl font-bold md:text-4xl">
                    {user?.username.toUpperCase()}
                  </p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={'ghost'}
                      className="text-white hover:bg-pmpa-blue-400 hover:text-gray-300"
                    >
                      <Pencil size={25} />
                    </Button>
                  </DialogTrigger>

                  <UpdateProfile />
                </Dialog>
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
