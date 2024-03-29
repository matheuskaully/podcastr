'use client'

import Image from 'next/image'
import playGreen from '../../public/play-green.svg'
import { useContext } from 'react'
import { PlayerContext } from '@/contexts/PlayerContext'

interface Episode {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

export default function PlayButton(episode: Episode) {
  const { play } = useContext(PlayerContext)

  return (
    <button
      type="button"
      onClick={() => play(episode)}
      className="absolute bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-[0.675rem] border border-pod-gray-100 bg-white text-[0] duration-200 hover:brightness-95"
    >
      <Image src={playGreen} alt="Tocar episódio" className="h-6 w-6" />
    </button>
  )
}
