import { api } from '@/services/api'
import { cache } from 'react'

interface Episodes {
  id: string
  title: string
  members: string
  published_at: Date
  thumbnail: string
  description: string

  file: {
    url: string
    type: string
    duration: number
  }
}

interface Data {
  data: Episodes[]
}

export const revalidate = 60 * 60 * 8

export default async function Home() {
  const getData = cache(async () => {
    const { data }: Data = await api.get('episodes', {
      params: { _limit: 12, _sort: 'published_at', _order: '' },
    })

    return data
  })

  const data = await getData()

  return (
    <div>
      <h1>Player</h1>
      <p>{JSON.stringify(data[0].file.duration)}</p>
    </div>
  )
}
