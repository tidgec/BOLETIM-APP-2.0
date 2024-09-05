import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './pages/__errors/404'
import { AppLayout } from './pages/__layouts/app'
import { AuthLayout } from './pages/__layouts/auth'
import { AcademicRecord } from './pages/academic-record'
import { AddAdmins } from './pages/add-admins'
import { AddBehaviors } from './pages/add-behaviors'
import { AddBehaviorsBatch } from './pages/add-behaviors-batch'
import { AddCourses } from './pages/add-courses'
import { AddDiscipline } from './pages/add-discipline'
import { AddManagers } from './pages/add-managers'
import { AddNotes } from './pages/add-notes'
import { AddNotesBatch } from './pages/add-notes-batch'
import { AddQTSFile } from './pages/add-qts-file'
import { AddStudentsBatch } from './pages/add-student-batch'
import { AddStudents } from './pages/add-students'
import { Admins } from './pages/admins'
import { AllCourses } from './pages/all-courses'
import { AverageBehavior } from './pages/average-behavior'
import { AveragePole } from './pages/average-pole'
import { BehaviorBatchPage } from './pages/behavior-batch'
import { BehaviorRemove } from './pages/behavior-remove'
import { Behaviors } from './pages/behaviors'
import { BoletimCard } from './pages/boletim-card'
import { CourseManagement } from './pages/course-management'
import { Courses } from './pages/courses'
import { DataManagement } from './pages/data-management'
import { DeleteAdmin } from './pages/delete-admin'
import { DeleteAdmins } from './pages/delete-admins'
import { DeleteCourses } from './pages/delete-courses'
import { DeleteManagers } from './pages/delete-managers'
import { DeleteStudent } from './pages/delete-student'
import { DeleteStudents } from './pages/delete-students'
import { Disciplines } from './pages/disciplines'
import { Home } from './pages/home'
import { ImportDocumentsFile } from './pages/import-documents-file'
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
import { PoleNotesRanking } from './pages/pole-notes-ranking'
import { PoleRanking } from './pages/pole-ranking'
import { Profile } from './pages/profile'
import { Rankings } from './pages/rankings'
import { RemoveNotes } from './pages/remove-notes'
import { RemoveNotesBatch } from './pages/remove-notes-batch'
import { Reports } from './pages/reports'
import { SearchActiveHistory } from './pages/search-active-history'
import { SearchDisableHistory } from './pages/search-disable-history'
import { SearchDownloadHistory } from './pages/search-download-history'
import { SearchNotes } from './pages/search-notes'
import { SignIn } from './pages/sign-in'
import { CourseInformation } from './pages/student/course-information'
import { CoursesAcademicRecord } from './pages/student/courses-academic-record'
import { StudentAcademicRecord } from './pages/student/student-academic-record'
import { StudentPage } from './pages/student/student-page'
import { StudentBatchPage } from './pages/student-batch'
import { StudentInformation } from './pages/student-information'
import { Students } from './pages/students'
import { StudentsDisabled } from './pages/students-disabled'
import { StudentsEnabled } from './pages/students-enabled'
import { Subjects } from './pages/subjects'
import { UpdateAdmins } from './pages/update-admins'
import { UpdateBehavior } from './pages/update-behavior'
import { UpdateBehaviorsBatch } from './pages/update-behaviors-batch'
import { UpdateCourses } from './pages/update-courses'
import { UpdateManager } from './pages/update-managers'
import { UpdateNotes } from './pages/update-notes'
import { UpdateNotesBatch } from './pages/update-notes-batch'
import { UpdateStudent } from './pages/update-student'
import { UpdateStudentsBatch } from './pages/update-students-batch'
import { SelectCourseToActiveHistory } from './pages/ways/select-course-to-active-history'
import { SelectCourseToDisableHistory } from './pages/ways/select-course-to-disable-history'
import { SelectCourseToDownloadHistory } from './pages/ways/select-course-to-download-history'
import { SelectCourseToLoginManagement } from './pages/ways/select-course-to-login-management'
import { SelectCourseToRemoveBehaviors } from './pages/ways/select-course-to-remove-behaviors'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/notes',
        element: <Notes />,
      },
      {
        path: '/notes/add/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/add',
        element: <ListCourseDisciplinesPage />,
      },
      {
        path: '/notes/add/disciplines/:disciplineId',
        element: <AddNotes />,
      },
      {
        path: '/notes/update/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/update',
        element: <ListCourseDisciplinesPage />,
      },
      {
        path: '/notes/update/disciplines/:disciplineId',
        element: <UpdateNotes />,
      },
      {
        path: '/notes/search/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/search',
        element: <SearchNotes />,
      },
      {
        path: '/notes/update/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/update',
        element: <ListCourseDisciplinesPage />,
      },
      {
        path: '/notes/update/disciplines/:disciplineId',
        element: <UpdateNotes />,
      },
      {
        path: '/notes/remove/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/remove',
        element: <ListCourseDisciplinesPage />,
      },
      {
        path: '/notes/remove/disciplines/:disciplineId',
        element: <RemoveNotes />,
      },
      {
        path: '/notes/batch',
        element: <NoteBatchPage />,
      },
      {
        path: '/notes/batch/add/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/batch/add',
        element: <AddNotesBatch />,
      },
      {
        path: '/notes/batch/update/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/batch/update',
        element: <UpdateNotesBatch />,
      },
      {
        path: '/notes/batch/remove/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/batch/remove',
        element: <RemoveNotesBatch />,
      },
      {
        path: '/notes/remove/admin/:adminId/',
        element: <DeleteAdmin />,
      },
      {
        path: '/notes/remove/manager/:managertId/',
        element: <DeleteStudent />,
      },
      {
        path: '/subjects',
        element: <Subjects />,
      },
      {
        path: '/behaviors',
        element: <Behaviors />,
      },
      {
        path: '/behaviors/add/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/behaviors/add',
        element: <AddBehaviors />,
      },
      {
        path: '/behaviors/courses-search-remove-bahavior',
        element: <SelectCourseToRemoveBehaviors />,
      },
      {
        path: '/behaviors/behaviors-remove',
        element: <BehaviorRemove />,
      },
      {
        path: '/behaviors/update/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/behaviors/update',
        element: <UpdateBehavior />,
      },
      {
        path: '/behaviors/batch',
        element: <BehaviorBatchPage />,
      },
      {
        path: '/behaviors/batch/add/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/behaviors/batch/add',
        element: <AddBehaviorsBatch />,
      },
      {
        path: '/behaviors/batch/update/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/behaviors/batch/update',
        element: <UpdateBehaviorsBatch />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/courses/QTS',
        element: <AddQTSFile />,
      },
      {
        path: '/courses/management',
        element: <CourseManagement />,
      },
      {
        path: '/courses/all',
        element: <AllCourses />,
      },
      {
        path: '/courses/management/disciplines',
        element: <Disciplines />,
      },
      {
        path: '/disciplines/add',
        element: <AddDiscipline />,
      },
      {
        path: '/disciplines/add/courses/:courseId',
        element: <ListCoursesPage />,
      },
      {
        path: '/courses/add',
        element: <AddCourses />,
      },
      {
        path: '/courses/update',
        element: <UpdateCourses />,
      },
      {
        path: '/courses/delete',
        element: <DeleteCourses />,
      },
      {
        path: '/students',
        element: <Students />,
      },
      {
        path: '/students/:id/boletim',
        element: <BoletimCard />,
      },
      {
        path: '/student-page/course-information',
        element: <CourseInformation />,
      },
      {
        path: '/student/academic-record',
        element: <StudentAcademicRecord />,
      },
      {
        path: '/students/enable/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/enable',
        element: <StudentsDisabled />,
      },
      {
        path: '/students/update/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/update',
        element: <ListStudentsPage />,
      },
      {
        path: '/students/update/:id',
        element: <UpdateStudent />,
      },
      {
        path: '/student/academic-record/courses',
        element: <CoursesAcademicRecord />,
      },
      {
        path: '/management/student-info',
        element: <StudentInformation />,
      },
      {
        path: '/students/page',
        element: <StudentPage />,
      },
      {
        path: '/students/add/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/add',
        element: <AddStudents />,
      },
      {
        path: '/students/batch',
        element: <StudentBatchPage />,
      },
      {
        path: '/students/batch/add/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/batch/add',
        element: <AddStudentsBatch />,
      },
      {
        path: '/students/batch/update/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/batch/update',
        element: <UpdateStudentsBatch />,
      },
      {
        path: '/students/disable/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/disable',
        element: <StudentsEnabled />,
      },
      {
        path: '/students/delete/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/delete',
        element: <DeleteStudents />,
      },
      {
        path: '/import/documents',
        element: <ImportDocumentsFile />,
      },
      {
        path: '/managers',
        element: <Managers />,
      },
      {
        path: '/managers/enable/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/managers/enable',
        element: <ManagersDisabled />,
      },
      {
        path: '/managers/disable/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/managers/disable',
        element: <ManagersEnabled />,
      },
      {
        path: '/managers/add/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/managers/add',
        element: <AddManagers />,
      },
      {
        path: '/managers/update/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/managers/update',
        element: <ListManagersPage />,
      },
      {
        path: '/managers/update/:id',
        element: <UpdateManager />,
      },
      {
        path: '/managers/delete/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/managers/delete',
        element: <DeleteManagers />,
      },
      {
        path: '/academic-record/courses-search-active',
        element: <SelectCourseToActiveHistory />,
      },
      {
        path: '/academic-record/courses-search-disable',
        element: <SelectCourseToDisableHistory />,
      },
      {
        path: '/academic-record/courses-search-download',
        element: <SelectCourseToDownloadHistory />,
      },
      {
        path: '/academic-record/courses-search-login-management',
        element: <SelectCourseToLoginManagement />,
      },
      {
        path: '/academic-record',
        element: <AcademicRecord />,
      },
      {
        path: '/academic-record/active-search',
        element: <SearchActiveHistory />,
      },
      {
        path: '/academic-record/disable-search',
        element: <SearchDisableHistory />,
      },
      {
        path: '/academic-record/download-search',
        element: <SearchDownloadHistory />,
      },
      {
        path: '/classification/average-pole',
        element: <AveragePole />,
      },
      {
        path: '/rankings/note-poles/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/rankings/note-poles',
        element: <ListCoursePolesPage />,
      },
      {
        path: '/rankings/note-poles/:id',
        element: <PoleNotesRanking />,
      },
      {
        path: '/classification/average-behavior',
        element: <AverageBehavior />,
      },
      {
        path: '/rankings/poles/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/rankings/behavior/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/rankings/poles',
        element: <ListCoursePolesPage />,
      },
      {
        path: '/rankings/poles/:id',
        element: <PoleRanking />,
      },
      {
        path: '/rankings',
        element: <Rankings />,
      },
      {
        path: '/rankings/overall/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/rankings/overall',
        element: <OverallRanking />,
      },
      {
        path: '/management/login-confirmation',
        element: <LoginConfirmation />,
      },
      {
        path: '/management',
        element: <DataManagement />,
      },
      {
        path: '/admins',
        element: <Admins />,
      },
      {
        path: '/admins/add',
        element: <AddAdmins />,
      },
      {
        path: '/admins/update',
        element: <ListAdminsPage />,
      },
      {
        path: '/admins/update/:id',
        element: <UpdateAdmins />,
      },
      {
        path: '/admins/delete/courses',
        element: <ListCoursesPage />,
      },
      {
        path: '/admins/delete',
        element: <DeleteAdmins />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/reports',
        element: <Reports />,
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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
