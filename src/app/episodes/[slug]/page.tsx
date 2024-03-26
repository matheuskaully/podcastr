import { api } from '@/services/api'
import { convertDurationToTimeString } from '@/utils/covertDurationToTimeString'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cache } from 'react'
import Image from 'next/image'
import arrowLeft from '../../../../public/arrow-left.svg'
import play from '../../../../public/play.svg'
import Link from 'next/link'

interface Episode {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  durationAsString: string
  description: string

  file: {
    url: string
    type: string
    duration: number
  }
}

interface Data {
  data: Episode
}

export const revalidate = 60 * 60 * 24

export default async function Episode({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const getData = cache(async () => {
    const { data }: Data = await api.get(`/episodes/${slug}`)

    const episodes = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      description: data.description,
      url: data.file.url,
    }

    return episodes
  })

  const episode = await getData()

  return (
    <div className="mx-auto max-w-[45rem] px-8 py-12">
      <div className="relative">
        <Link href={'/'}>
          <button
            type="button"
            className="absolute left-0 top-[36.66%] z-[5] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-xl bg-pod-purple-500 text-[0] duration-200 hover:brightness-95"
          >
            <Image src={arrowLeft} alt="Voltar" />
          </button>
        </Link>
        <div className="h-[160px] object-cover">
          <Image
            width={700}
            height={160}
            src={episode.thumbnail}
            alt={episode.title}
            className="h-full rounded-2xl object-cover"
          />
        </div>
        <button
          type="button"
          className="absolute right-0 top-[36.66%] z-[5] flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-xl bg-pod-green-500 text-[0] duration-200 hover:brightness-95"
        >
          <Image src={play} alt="Tocar episódio" />
        </button>
      </div>

      <header className="mb-6 border-b border-pod-gray-100 pb-4">
        <h1 className="mb-6 mt-8 font-alt font-semibold text-pod-gray-800">
          {episode.title}
        </h1>
        <span className="inline-block text-sm">{episode.members}</span>
        <span className="relative ml-4 inline-block pl-4 text-sm before:absolute before:left-0 before:top-[50%] before:h-1 before:w-1 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-sm before:bg-[#ddd]">
          {episode.publishedAt}
        </span>
        <span className="relative ml-4 inline-block pl-4 text-sm before:absolute before:left-0 before:top-[50%] before:h-1 before:w-1 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-sm before:bg-[#ddd]">
          {episode.durationAsString}
        </span>
      </header>

      <div
        dangerouslySetInnerHTML={{ __html: episode.description }}
        className="mt-8 flex flex-col gap-6 leading-7"
      />
    </div>
  )
}
