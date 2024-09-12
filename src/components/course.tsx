interface CourseProps {
  course: {
    id: string
    name: string
    imageUrl: string
  }
}

export function Course({ course }: CourseProps) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2 pb-2 text-center">
      <img
        src={course.imageUrl}
        alt="Imagem do curso"
        className="w-full object-cover"
      />
      <h3 className="text-xl">{course.name}</h3>
    </div>
  )
}
