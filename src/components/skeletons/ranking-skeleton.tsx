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
