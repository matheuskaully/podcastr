'use client'

import Image from 'next/image'
import playGreen from '../../public/play-green.svg'
import { useContext } from 'react'
import { PlayerContext } from '@/contexts/PlayerContext'

interface EpisodeListProps {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: number
  durationAsString: string
  url: string
}

interface episodeList {
  episodeList: EpisodeListProps[]
  index: number
}

export default function PlayListButton({ episodeList, index }: episodeList) {
  const { playList } = useContext(PlayerContext)

  console.log(episodeList)
  console.log(index)
  return (
    <button
      onClick={() => playList(episodeList, index + 2)}
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-pod-gray-100 bg-white text-[0] duration-200 hover:brightness-95"
    >
      <Image src={playGreen} alt="Tocar episódio" className="h-5 w-5" />
    </button>
  )
}
