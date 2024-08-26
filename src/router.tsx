import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/__layouts/app'
import { AuthLayout } from './pages/__layouts/auth'
import { SignIn } from './pages/sign-in'
import { Notes } from './pages/notes'
import { Behaviors } from './pages/behaviors'
import { Students } from './pages/students'
import { Admins } from './pages/admins'
import { Managers } from './pages/managers'
import { DataManagement } from './pages/data-management'
import { AcademicRecord } from './pages/academic-record'
import { Profile } from './pages/profile'
import { NotFound } from './pages/__errors/404'
import { Courses } from './pages/courses'
import { AddStudents } from './pages/add-students'
import { AddManagers } from './pages/add-managers'
import { AddAdmins } from './pages/add-admins'
import { UpdateManagers } from './pages/update-managers'
import { UpdateAdmins } from './pages/update-admins'
import { UpdateCourses } from './pages/update-courses'
import { DeleteCourses } from './pages/delete-courses'
import { Reports } from './pages/reports'
import { AddCourses } from './pages/add-courses'
import { Classification } from './pages/classification'
import { AddStudentsBatch } from './pages/add-student-batch'
import { AddNotesBatch } from './pages/add-notes-batch'
import { AddBehaviorsBatch } from './pages/add-behaviors-batch'
import { SearchDisableHistory } from './pages/search-disable-history'
import { SearchActiveHistory } from './pages/search-active-history'
import { SearchDownloadHistory } from './pages/search-download-history'
import { ListStudentsDisabledPage } from './pages/list-students-disabled'
import { ListStudentsEnabledPage } from './pages/list-students-enabled'
import { ListManagersDisabledPage } from './pages/list-managers-disabled'
import { UpdateBehavior } from './pages/update-behavior'
import { Subjects } from './pages/subjects'
import { AddNotes } from './pages/add-notes'
import { AddBehaviors } from './pages/add-behaviors'
import { LoginConfirmation } from './pages/login-confirmation'
import { StudentInformation } from './pages/student-information'
import { StudentAcademicRecord } from './pages/student/student-academic-record'
import { CoursesAcademicRecord } from './pages/student/courses-academic-record'
import { CourseManagement } from './pages/course-management'
import { Disciplines } from './pages/disciplines'
import { AllCourses } from './pages/all-courses'
import { AddDiscipline } from './pages/add-discipline'
import { SearchNotes } from './pages/search-notes'
import { SelectCourseToDisableHistory } from './pages/ways/select-course-to-disable-history'
import { SelectCourseToDownloadHistory } from './pages/ways/select-course-to-download-history'
import { SelectCourseToAddBehaviors } from './pages/ways/select-course-to-add-behaviors'
import { SelectCourseToBatchBehaviors } from './pages/ways/select-course-to-batch-behaviors'
import { SelectCourseToActiveHistory } from './pages/ways/select-course-to-active-history'
import { SelectCourseToDisableStudent } from './pages/ways/select-course-to-disable-student'
import { SelectCourseToLoginManagement } from './pages/ways/select-course-to-login-management'
import { SelectCourseToUpdateBehaviors } from './pages/ways/select-course-to-update-behaviors'
import { SelectCourseToRemoveBehaviors } from './pages/ways/select-course-to-remove-behaviors'
import { GeneralClassification } from './pages/general-classification'
import { SelectCourseToGeneralClassification } from './pages/ways/select-course-to-general-classification'
import { BehaviorRemove } from './pages/behavior-remove'
import { ClassificationPole } from './pages/classification-poles'
import { ClassificationByPole } from './pages/classification-by-pole'
import { AverageScoresForPoles } from './pages/average-scores-for-poles'
import { SelectCourseTheClassificationByPole } from './pages/ways/select-course-the-classification-by-pole'
import { StudentPage } from './pages/student/student-page'
import { ImportKtsFile } from './pages/import-kts-file'
import { ImportDocumentsFile } from './pages/import-documents-file'
import { CourseInformation } from './pages/student/course-information'
import { Home } from './pages/home'
import ReportCard from './pages/student/report-card'
import { ListCoursesPage } from './pages/list-courses'
import { ListManagersEnabledPage } from './pages/list-managers-enabled'
import { ListCourseDisciplinesPage } from './pages/list-course-disciplines'
import { RemoveNotes } from './pages/remove-notes'
import { UpdateNotes } from './pages/update-notes'
import { SearchManagerToUpdateInfo } from './pages/search-for-update-to-update-info'
import { ListStudentsPage } from './pages/list-students'
import { UpdateStudent } from './pages/update-student'
import { DeleteStudent } from './pages/delete-student'

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
        path: '/subjects',
        element: <Subjects />,
      },
      {
        path: '/behaviors',
        element: <Behaviors />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/import/kts',
        element: <ImportKtsFile />,
      },
      {
        path: '/student/report-card',
        element: <ReportCard />,
      },
      {
        path: '/import/documents',
        element: <ImportDocumentsFile />,
      },
      {
        path: '/notes/add',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/add/courses/:courseId',
        element: <ListCourseDisciplinesPage />,
      },
      {
        path: '/notes/add/courses/:courseId/disciplines/:disciplineId',
        element: <AddNotes />,
      },
      {
        path: '/behaviors/add',
        element: <AddBehaviors />,
      },
      {
        path: '/behaviors/add/courses/:courseId',
        element: <AddBehaviors />,
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
        path: '/student-page/course-information',
        element: <CourseInformation />,
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
        path: '/student/academic-record',
        element: <StudentAcademicRecord />,
      },
      {
        path: '/students/enable',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/enable/courses/:courseId',
        element: <ListStudentsDisabledPage />,
      },
      {
        path: '/students/courses-search-disable',
        element: <SelectCourseToDisableStudent />,
      },
      {
        path: '/students/update',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/update/courses/:courseId',
        element: <ListStudentsPage />,
      },
      {
        path: '/students/update/:id',
        element: <UpdateStudent />,
      },
      {
        path: '/managers/enable',
        element: <ListCoursesPage />,
      },
      {
        path: '/managers/enable/courses/:courseId',
        element: <ListManagersDisabledPage />,
      },
      {
        path: '/managers/disable',
        element: <ListCoursesPage />,
      },
      {
        path: '/managers/disable/courses/:courseId',
        element: <ListManagersEnabledPage />,
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
        path: '/classification/the-classification-by-pole ',
        element: <SelectCourseTheClassificationByPole />,
      },
      {
        path: '/behaviors/courses-search-add-bahavior',
        element: <SelectCourseToAddBehaviors />,
      },
      {
        path: '/classification/courses-search-general-classification',
        element: <SelectCourseToGeneralClassification />,
      },
      {
        path: '/behaviors/courses-search-batch-bahavior',
        element: <SelectCourseToBatchBehaviors />,
      },
      {
        path: '/behaviors/courses-search-update-bahavior',
        element: <SelectCourseToUpdateBehaviors />,
      },
      {
        path: '/behaviors/courses-search-remove-bahavior',
        element: <SelectCourseToRemoveBehaviors />,
      },
      {
        path: '/academic-record/courses-search-login-management',
        element: <SelectCourseToLoginManagement />,
      },
      {
        path: '/classification/classification-poles',
        element: <ClassificationPole />,
      },
      {
        path: '/classification/classification-by-pole',
        element: <ClassificationByPole />,
      },
      {
        path: '/classification/average-scores-for-poles',
        element: <AverageScoresForPoles />,
      },
      {
        path: '/student/academic-record/courses',
        element: <CoursesAcademicRecord />,
      },
      {
        path: '/management/login-confirmation',
        element: <LoginConfirmation />,
      },
      {
        path: '/behaviors/behaviors-remove',
        element: <BehaviorRemove />,
      },
      {
        path: '/management/student-info',
        element: <StudentInformation />,
      },
      {
        path: '/management',
        element: <DataManagement />,
      },
      {
        path: '/academic-record',
        element: <AcademicRecord />,
      },
      {
        path: '/admins',
        element: <Admins />,
      },
      {
        path: '/managers',
        element: <Managers />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/students',
        element: <Students />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/classification',
        element: <Classification />,
      },
      {
        path: '/students/page',
        element: <StudentPage />,
      },
      {
        path: '/students/add',
        element: <AddStudents />,
      },
      {
        path: '/classification/general-classification',
        element: <GeneralClassification />,
      },
      {
        path: '/behavior/update',
        element: <UpdateBehavior />,
      },
      {
        path: '/students/batch',
        element: <AddStudentsBatch />,
      },
      {
        path: '/students/disable',
        element: <ListCoursesPage />,
      },
      {
        path: '/students/disable/courses/:courseId',
        element: <ListStudentsEnabledPage />,
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
        path: '/notes/search/',
        element: <SearchNotes />,
      },
      {
        path: '/notes/update',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/update/courses/:courseId',
        element: <ListCourseDisciplinesPage />,
      },
      {
        path: '/notes/update/courses/:courseId/disciplines/:disciplineId',
        element: <UpdateNotes />,
      },
      {
        path: '/notes/remove',
        element: <ListCoursesPage />,
      },
      {
        path: '/notes/remove/courses/:courseId',
        element: <ListCourseDisciplinesPage />,
      },
      {
        path: '/notes/remove/courses/:courseId/disciplines/:disciplineId',
        element: <RemoveNotes />,
      },
      {
        path: '/notes/remove/student/:studentId/',
        element: <DeleteStudent />,
      },
      {
        path: '/notes/remove/admin/:adminId/',
        element: <DeleteStudent />,
      },
      {
        path: '/notes/remove/manager/:managertId/',
        element: <DeleteStudent />,
      },
      {
        path: '/managers/add',
        element: <AddManagers />,
      },
      {
        path: '/notes/batch',
        element: <AddNotesBatch />,
      },
      {
        path: '/behaviors/batch',
        element: <AddBehaviorsBatch />,
      },
      {
        path: '/managers/update',
        element: <ListCoursesPage />,
      },
      {
        path: '/managers/update/info',
        element: <SearchManagerToUpdateInfo />,
      },
      {
        path: '/managers/update/courses/:courseId',
        element: <UpdateManagers />,
      },
      {
        path: '/admins/add',
        element: <AddAdmins />,
      },
      {
        path: '/admins/update',
        element: <UpdateAdmins />,
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
