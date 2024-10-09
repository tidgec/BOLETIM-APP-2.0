import { LucideCircleUser, LucideList, LucideX } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { AdminMenu } from './admin-menu'
import { DevMenu } from './dev-menu'
import { ManagerMenu } from './manager-menu'
import { StudentMenu } from './student-menu'

interface MenuProps {
  role?: string
}

export function Menu({ role }: MenuProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)

  return (
    <>
      <aside
        data-size={isOpenSideBar}
        className="relative hidden w-full bg-pmpa-blue-700 p-4 text-white transition-all data-[size=false]:max-w-14 data-[size=true]:max-w-60 md:block"
      >
        <button
          className="mb-8 cursor-pointer rounded"
          onClick={() => setIsOpenSideBar(!isOpenSideBar)}
        >
          <LucideList size={25} />
        </button>

        <div className="fixed space-y-8">
          <nav>
            {role === 'dev' && <DevMenu isOpen={isOpenSideBar} />}
            {role === 'admin' && <AdminMenu isOpen={isOpenSideBar} />}
            {role === 'manager' && <ManagerMenu isOpen={isOpenSideBar} />}
            {role === 'student' && <StudentMenu isOpen={isOpenSideBar} />}
          </nav>
          <div className="border-y-2 py-4">
            <Link to={'/profile'} className="flex gap-4 text-sm tracking-wider">
              <LucideCircleUser size={20} />
              {isOpenSideBar && 'Perfil'}
            </Link>
          </div>
        </div>
      </aside>

      <button
        className="absolute left-2 top-2 md:hidden print:hidden"
        onClick={() => setIsOpenMenu(true)}
      >
        <LucideList size={25} />
      </button>

      {isOpenMenu && (
        <aside className="fixed inset-0 z-50 w-full space-y-8 bg-pmpa-blue-700 px-4 py-8 text-white md:static md:hidden md:max-w-60">
          <button
            className="absolute right-6 top-4"
            onClick={() => setIsOpenMenu(false)}
          >
            <LucideX size={20} />
          </button>

          <nav className="flex items-start justify-center md:block">
            {role === 'dev' && <DevMenu />}
            {role === 'admin' && <AdminMenu />}
            {role === 'manager' && <ManagerMenu />}
            {role === 'student' && <StudentMenu />}
          </nav>
          <div className="flex items-start border-y-2 py-4 md:block">
            <Link
              to={'/profile'}
              className="flex items-start  gap-4 text-lg tracking-wider md:text-sm"
            >
              <LucideCircleUser size={20} />
              Perfil
            </Link>
          </div>
        </aside>
      )}
    </>
  )
}
