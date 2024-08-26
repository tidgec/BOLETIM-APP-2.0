import { Link } from 'react-router-dom'

interface CourseProps {
  course: {
    id: string
    name: string
    imageUrl: string
  }
}

export function Course({ course }: CourseProps) {
  const currentUrl = window.location.href.replace('/courses', '')

  return (
    <Link to={`${currentUrl}?courseId=${course.id}`} className="block">
      <div className="flex flex-col items-center">
        <img src={course.imageUrl} alt="Imagem do curso" className="mb-4" />
        <h3 className="mb-2  text-xl">{course.name}</h3>
      </div>
    </Link>
  )
}
