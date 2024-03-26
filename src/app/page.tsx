import { api } from '@/services/api'
import { cache } from 'react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '@/utils/covertDurationToTimeString'
import playGreen from '../../public/play-green.svg'
import Link from 'next/link'
import Image from 'next/image'

interface Episodes {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  durationAsString: string

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

    const episodes = data.map((episode: Episodes) => {
      return {
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        members: episode.members,
        publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
          locale: ptBR,
        }),
        duration: Number(episode.file.duration),
        durationAsString: convertDurationToTimeString(
          Number(episode.file.duration),
        ),
        url: episode.file.url,
      }
    })

    const latestEpisodes = episodes.slice(0, 2)
    const allEpisodes = episodes.slice(2, episodes.length)

    return { latestEpisodes, allEpisodes }
  })

  const { latestEpisodes, allEpisodes } = await getData()

  return (
    <div className="h-[calc(100vh-6.5rem)] overflow-y-scroll px-16">
      <section>
        <h2 className="mb-6 mt-12 font-alt font-semibold text-pod-gray-800">
          Últimos lançamentos
        </h2>

        <ul className="grid grid-cols-2 gap-6">
          {latestEpisodes.map((episode) => {
            return (
              <li
                key={episode.id}
                className="relative flex items-center rounded-3xl border border-pod-gray-100 bg-white p-5"
              >
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                  className="h-24 w-24 rounded-2xl"
                />

                <div className="ml-4 flex-1">
                  <Link
                    href={'/'}
                    className="block font-alt font-semibold text-pod-gray-800 hover:underline"
                  >
                    {episode.title}
                  </Link>
                  <p className="mt-2 max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                    {episode.members}
                  </p>
                  <span className="relative mt-2 inline-block text-sm before:absolute before:-right-2 before:top-[50%] before:h-1 before:w-1 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-sm before:bg-[#ddd]">
                    {episode.publishedAt}
                  </span>
                  <span className="relative  inline-block pl-2 text-sm ">
                    {episode.durationAsString}
                  </span>
                </div>

                <button
                  type="button"
                  className="absolute bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-[0.675rem] border border-pod-gray-100 bg-white text-[0] duration-200 hover:brightness-95"
                >
                  <Image
                    src={playGreen}
                    alt="Tocar episódio"
                    className="h-6 w-6"
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="pb-8">
        <h2 className="pb-4 pt-10 font-alt font-semibold text-pod-gray-800">
          Todos episódios
        </h2>

        <table cellSpacing={0} className="w-full">
          <thead>
            <tr className="text-left font-alt text-xs font-medium uppercase text-pod-gray-200">
              <th className="border-b border-pod-gray-100 px-1 py-3"></th>
              <th className="border-b border-pod-gray-100 px-1 py-3">
                Podcast
              </th>
              <th className="border-b border-pod-gray-100 px-1 py-3">
                Integrantes
              </th>
              <th className="border-b border-pod-gray-100 px-1 py-3">Data</th>
              <th className="border-b border-pod-gray-100 px-1 py-3">
                Duração
              </th>
              <th className="border-b border-pod-gray-100 px-1 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => (
              <tr
                key={episode.id}
                className="h-16 border-b border-pod-gray-100 text-sm"
              >
                <td className="w-24 px-2">
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                    className="w-3/4 rounded-lg "
                  />
                </td>
                <td className="w-[40%]">
                  <Link
                    href={`/episodes/${episode.id}`}
                    className="font-alt text-base font-semibold text-pod-gray-800 hover:underline"
                  >
                    {episode.title}
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td className="w-24">{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-pod-gray-100 bg-white text-[0] duration-200 hover:brightness-95"
                  >
                    <Image
                      src={playGreen}
                      alt="Tocar episódio"
                      className="h-5 w-5"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
