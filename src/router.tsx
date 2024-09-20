import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './pages/__errors/404'
import { AppLayout } from './pages/__layouts/app'
import { AuthLayout } from './pages/__layouts/auth'
import { ProtectedLayout } from './pages/__layouts/protected'
import { AcademicRecord } from './pages/academic-record'
import { AddAcademicRecord } from './pages/add-academic-record'
import { AddAdmins } from './pages/add-admins'
import { AddBehaviors } from './pages/add-behaviors'
import { AddBehaviorsBatch } from './pages/add-behaviors-batch'
import { AddCourses } from './pages/add-courses'
import { AddDiscipline } from './pages/add-discipline'
import { AddManagers } from './pages/add-managers'
import { AddNotes } from './pages/add-notes'
import { AddNotesBatch } from './pages/add-notes-batch'
import { AddStudentsBatch } from './pages/add-student-batch'
import { AddStudents } from './pages/add-students'
import { Admins } from './pages/admins'
import { AllCourses } from './pages/all-courses'
import { AverageBehaviorPolesRanking } from './pages/average-behavior-poles-ranking'
import { BehaviorBatchPage } from './pages/behavior-batch'
import { Behaviors } from './pages/behaviors'
import { BoletimCard } from './pages/boletim-card'
import { CourseDiscipline } from './pages/course-discipline'
import { CourseManagementInformation } from './pages/course-information'
import { CourseManagement } from './pages/course-management'
import { CoursePole } from './pages/course-pole'
import { Courses } from './pages/courses'
import { DataManagement } from './pages/data-management'
import { DeleteAdmins } from './pages/delete-admins'
import { DeleteCourses } from './pages/delete-courses'
import { DeleteManagers } from './pages/delete-managers'
import { DeleteStudents } from './pages/delete-students'
import { DownloadAcademicRecord } from './pages/download-academic-record'
import { Home } from './pages/home'
import { ListAdminsPage } from './pages/list-admins'
import { ListCourseDisciplinesPage } from './pages/list-course-disciplines'
import { ListCoursePolesPage } from './pages/list-course-poles'
import { ListCoursesPage } from './pages/list-courses'
import { ListManagersPage } from './pages/list-managers'
import { ListStudentsPage } from './pages/list-students'
import { LoginConfirmation } from './pages/login-confirmation'
import { Managers } from './pages/managers'
import { ManagersDisabled } from './pages/managers-disabled'
import { ManagersEnabled } from './pages/managers-enabled'
import { NoteBatchPage } from './pages/note-batch'
import { Notes } from './pages/notes'
import { OverallRanking } from './pages/overall-ranking'
import { PoleRanking } from './pages/pole-ranking'
import { PoleRankingWithoutBehavior } from './pages/pole-ranking-without-behavior'
import { PolesAverageRanking } from './pages/poles-average-ranking'
import { Profile } from './pages/profile'
import { Rankings } from './pages/rankings'
import { RemoveAcademicRecord } from './pages/remove-academic-record'
import { RemoveBehaviors } from './pages/remove-behaviors'
import { RemoveBehaviorsBatch } from './pages/remove-behaviors-batch'
import { RemoveNotes } from './pages/remove-notes'
import { RemoveNotesBatch } from './pages/remove-notes-batch'
import { Reports } from './pages/reports'
import { SearchNotes } from './pages/search-notes'
import { SignIn } from './pages/sign-in'
import { StudentAcademicRecord } from './pages/student/student-academic-record'
import { StudentDownloadAcademicRecord } from './pages/student/student-download-academic-record'
import { StudentHome } from './pages/student/student-home'
import { StudentBatchPage } from './pages/student-batch'
import { StudentConfirm } from './pages/student-confirm'
import { StudentInformation } from './pages/student-information'
import { Students } from './pages/students'
import { StudentsDisabled } from './pages/students-disabled'
import { StudentsEnabled } from './pages/students-enabled'
import { Summary } from './pages/summary'
import { UpdateAdmins } from './pages/update-admins'
import { UpdateBehavior } from './pages/update-behavior'
import { UpdateBehaviorsBatch } from './pages/update-behaviors-batch'
import { UpdateCourses } from './pages/update-courses'
import { UpdateManager } from './pages/update-managers'
import { UpdateNotes } from './pages/update-notes'
import { UpdateNotesBatch } from './pages/update-notes-batch'
import { UpdateStudent } from './pages/update-student'
import { UpdateStudentsBatch } from './pages/update-students-batch'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedLayout roles={['admin', 'dev', 'manager']}>
            <Home />
          </ProtectedLayout>
        ),
      },
      {
        path: '/student/home',
        element: (
          <ProtectedLayout roles={['student']}>
            <StudentHome />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/:id/boletim/courses',
        element: (
          <ProtectedLayout roles={['student']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/student/course-information',
        element: (
          <ProtectedLayout roles={['student']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/student/academic-record',
        element: (
          <ProtectedLayout roles={['student']}>
            <StudentAcademicRecord />
          </ProtectedLayout>
        ),
      },
      {
        path: '/student/academic-record/download',
        element: (
          <ProtectedLayout roles={['student']}>
            <StudentDownloadAcademicRecord />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <Notes />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/add/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/add',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCourseDisciplinesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/add/disciplines/:disciplineId',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <AddNotes />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/update/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/update',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCourseDisciplinesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/update/disciplines/:disciplineId',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <UpdateNotes />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/search/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/search',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <SearchNotes />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/remove/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/remove',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCourseDisciplinesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/remove/disciplines/:disciplineId',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <RemoveNotes />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/batch',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <NoteBatchPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/batch/add/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/batch/add',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <AddNotesBatch />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/batch/update/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/batch/update',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <UpdateNotesBatch />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/batch/remove/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/notes/batch/remove',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <RemoveNotesBatch />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <Behaviors />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/add/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/add',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <AddBehaviors />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/remove/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/remove',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <RemoveBehaviors />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/update/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/update',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <UpdateBehavior />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/batch',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <BehaviorBatchPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/batch/add/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/batch/add',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <AddBehaviorsBatch />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/batch/update/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/batch/update',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <UpdateBehaviorsBatch />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/batch/remove/courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/behaviors/batch/remove',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <RemoveBehaviorsBatch />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <Courses />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses/add',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <AddCourses />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses/update/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses/update',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <UpdateCourses />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses/delete',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <DeleteCourses />
          </ProtectedLayout>
        ),
      },
      // {
      //   path: '/courses/QTS',
      //   element: (
      //     <ProtectedLayout roles={['admin', 'dev']}>
      //       <AddQTSFile />
      //     </ProtectedLayout>
      //   ),
      // },
      {
        path: '/courses/management',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <CourseManagement />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses/management/all',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <AllCourses />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses/management/:id',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <CourseManagementInformation />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses/management/:id/disciplines',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <CourseDiscipline />
          </ProtectedLayout>
        ),
      },
      {
        path: '/courses/management/:id/poles',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <CoursePole />
          </ProtectedLayout>
        ),
      },
      // {
      //   path: '/import/documents',
      //   element: <ImportDocumentsFile />,
      // },
      {
        path: '/disciplines/add',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <AddDiscipline />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <Students />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/:id/boletim',
        element: (
          <ProtectedLayout roles={['student', 'manager', 'admin', 'dev']}>
            <BoletimCard />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/enable/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/enable',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <StudentsDisabled />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/update/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/update',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListStudentsPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/update/:id',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <UpdateStudent />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/add/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/add',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <AddStudents />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/batch',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <StudentBatchPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/batch/add/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/batch/add',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <AddStudentsBatch />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/batch/update/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/batch/update',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <UpdateStudentsBatch />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/disable/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/disable',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <StudentsEnabled />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/delete/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/students/delete',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <DeleteStudents />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <Managers />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/enable/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/enable',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ManagersDisabled />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/disable/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/disable',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ManagersEnabled />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/add/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/add',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <AddManagers />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/update/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/update',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListManagersPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/update/:id',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <UpdateManager />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/delete/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/managers/delete',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <DeleteManagers />
          </ProtectedLayout>
        ),
      },
      {
        path: '/academic-record',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <AcademicRecord />
          </ProtectedLayout>
        ),
      },
      {
        path: '/academic-record/add/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/academic-record/add',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <AddAcademicRecord />
          </ProtectedLayout>
        ),
      },
      {
        path: '/academic-record/remove',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <RemoveAcademicRecord />
          </ProtectedLayout>
        ),
      },
      {
        path: '/academic-record/download/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/academic-record/download',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <DownloadAcademicRecord />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <Rankings />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/overall/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/overall',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <OverallRanking />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/poles/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/poles',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursePolesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/poles/:id',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <PoleRanking />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/poles/no-behavior/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/poles/no-behavior',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursePolesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/poles/no-behavior/:id',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <PoleRankingWithoutBehavior />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/poles-average/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/poles-average',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <PolesAverageRanking />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/average-behavior-poles/list-courses',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/rankings/average-behavior-poles',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <AverageBehaviorPolesRanking />
          </ProtectedLayout>
        ),
      },
      {
        path: '/management',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <DataManagement />
          </ProtectedLayout>
        ),
      },
      {
        path: '/summary',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <Summary />
          </ProtectedLayout>
        ),
      },
      {
        path: '/management/login-confirmation/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/management/login-confirmation',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <LoginConfirmation />
          </ProtectedLayout>
        ),
      },
      {
        path: '/management/students/list-courses',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <ListCoursesPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/management/students',
        element: (
          <ProtectedLayout roles={['manager', 'admin', 'dev']}>
            <StudentInformation />
          </ProtectedLayout>
        ),
      },
      {
        path: '/admins',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <Admins />
          </ProtectedLayout>
        ),
      },
      {
        path: '/admins/add',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <AddAdmins />
          </ProtectedLayout>
        ),
      },
      {
        path: '/admins/update',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <ListAdminsPage />
          </ProtectedLayout>
        ),
      },
      {
        path: '/admins/update/:id',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <UpdateAdmins />
          </ProtectedLayout>
        ),
      },
      {
        path: '/admins/delete',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <DeleteAdmins />
          </ProtectedLayout>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedLayout roles={['student', 'manager', 'admin', 'dev']}>
            <Profile />
          </ProtectedLayout>
        ),
      },
      {
        path: '/reports',
        element: (
          <ProtectedLayout roles={['admin', 'dev']}>
            <Reports />
          </ProtectedLayout>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/students/confirm',
        element: <StudentConfirm />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
