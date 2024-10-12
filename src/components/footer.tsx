import LogoBoletim from '@/assets/dgec.png'

export function Footer() {
  return (
    <footer className="gap-2 bg-pmpa-blue-700 py-4 text-white">
      <div className="flex flex-col items-center gap-4 px-6 sm:flex-row">
        <img src={LogoBoletim} alt="" className="h-40 w-36 sm:h-28 sm:w-28" />
        <div>
          <span className="text-lg font-bold">Endereço:</span>
          <p className="w-full max-w-80 text-sm md:text-base">
            Rod. Augusto Montenegro, Km 9, n° 8401, Bairro Parque Guajará/Dist.
            de Icoaraci – Belém/PA. CEP: 66821-000.
          </p>
        </div>

        <div className="w-full max-w-80">
          <span className="text-lg font-bold">Contato:</span>
          <p className="text-sm md:text-base">ti.dgecpmpa@gmail.com</p>
        </div>
      </div>

      <div className="mt-4  flex flex-col items-center justify-center text-center md:mt-0">
        <p className="text-base font-bold md:text-xl">
          Desenvolvido Pela Subseção de Tecnologia Educacional.
        </p>
        <p className="text-base font-bold md:text-xl">
          Polícia Militar do Pará © 2024 | Todos os Direitos Reservados.
        </p>
      </div>
    </footer>
  )
}
