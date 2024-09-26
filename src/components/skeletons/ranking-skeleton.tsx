import { Skeleton } from '../ui/skeleton'

export function RankingSkeleton() {
  return (
    <tr>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-10" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-10" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-10" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-10" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-4 py-2 text-sm text-slate-700">
        <Skeleton className="h-4 w-24" />
      </td>
    </tr>
  )
}

export function RankingResponsiveSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 border-2 border-slate-300 py-2">
      <Skeleton className="h-5 w-40 bg-slate-300" />
      <Skeleton className="h-5 w-20 bg-slate-300" />
      <Skeleton className="h-5 w-20 bg-slate-300" />
      <Skeleton className="h-5 w-24 bg-slate-300" />
      <Skeleton className="h-5 w-60 bg-slate-300" />
      <Skeleton className="h-5 w-28 bg-slate-300" />
      <Skeleton className="h-5 w-32 bg-slate-300" />
      <Skeleton className="h-5 w-60 bg-slate-300" />
      <Skeleton className="h-5 w-28 bg-slate-300" />
      <Skeleton className="h-5 w-36 bg-slate-300" />
    </div>
  )
}
