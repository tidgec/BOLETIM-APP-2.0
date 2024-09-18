import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { UpdateProfileForm } from './update-profile-form'

export function UpdateProfile() {
  return (
    <DialogContent className="h-[38rem] w-full max-w-3xl overflow-auto bg-pmpa-blue-700 p-0 text-white">
      <DialogHeader className="h-20 bg-pmpa-blue-900 px-4 py-8">
        <DialogTitle>Atualizar perfil</DialogTitle>
      </DialogHeader>

      <UpdateProfileForm />
    </DialogContent>
  )
}
