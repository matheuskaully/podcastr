'use client'

import Image from 'next/image'
import playImg from '../../public/play.svg'
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
      className="absolute right-0 top-[35.5%] z-[5] flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-xl bg-pod-green-500 text-[0] duration-200 hover:brightness-95"
    >
      <Image src={playImg} alt="Tocar episódio" className="h-6 w-6" />
    </button>
  )
}
