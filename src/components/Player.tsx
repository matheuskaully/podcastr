'use client'

import Image from 'next/image'

import { useContext, useEffect, useRef, useState } from 'react'
import { Repeat, Shuffle } from 'lucide-react'
import { PlayerContext } from '@/contexts/PlayerContext'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import playing from '../../public/playing.svg'
import playNextImg from '../../public/play-next.svg'
import playPreviousImg from '../../public/play-previous.svg'
import playImg from '../../public/play.svg'
import pause from '../../public/pause.svg'
import { convertDurationToTimeString } from '@/utils/covertDurationToTimeString'

export default function Player() {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setIsPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isLooping,
    toogleLoop,
    isSuffling,
    toogleSuffle,
    clearPlayerState,
  } = useContext(PlayerContext)
  const episode = episodeList[currentEpisodeIndex]
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  function setupProgressListener() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0

      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setProgress(Math.floor(audioRef.current.currentTime))
        }
      })
    }
  }

  function handleSeek(amount: number | number[]) {
    if (audioRef.current?.currentTime) {
      if (typeof amount === 'number') {
        audioRef.current.currentTime = amount
        setProgress(amount)
      }
    }
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  return (
    <div className="flex h-screen w-[26.5rem] flex-col items-center justify-between bg-pod-purple-500 px-16 py-12 text-white">
      <header className="flex items-center gap-4">
        <Image src={playing} alt="Tocando agora..." />
        <strong className="font-alt font-semibold">Tocando agora</strong>
      </header>

      {episode ? (
        <div className="text-center">
          <div className="h-80 w-full">
            <Image
              src={episode.thumbnail}
              alt={episode.title}
              width={592}
              height={592}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
          <strong className="mt-8 block font-alt text-xl font-semibold">
            {episode.title}
          </strong>
          <span className="mt-4 block leading-6 opacity-60">
            {episode.members}
          </span>
        </div>
      ) : (
        <div className="flex h-80 w-full items-center  justify-center rounded-3xl border-[1.5px] border-dashed border-pod-purple-300 bg-gradient-to-tl from-transparent to-pod-purple-400/80 p-16 text-center">
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}
      <footer className={`items-stretch ${!episode ? 'opacity-50' : ''}`}>
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-block items-center">
            {convertDurationToTimeString(progress)}
          </span>
          <div className="flex-1">
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                styles={{
                  track: { backgroundColor: '#04d361' },
                  rail: { backgroundColor: '#9f75ff' },
                  handle: { backgroundColor: '#04d361', borderWidth: 4 },
                }}
              />
            ) : (
              <div className="h-1 w-full rounded-sm bg-pod-purple-300" />
            )}
          </div>
          <span className="inline-block items-center">
            {convertDurationToTimeString(episode?.duration ?? 0)}
          </span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            onEnded={handleEpisodeEnded}
            onLoadedMetadata={setupProgressListener}
            autoPlay
            onPlay={() => setIsPlayingState(true)}
            onPause={() => setIsPlayingState(false)}
          />
        )}

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={toogleSuffle}
            className="bg-transparent text-[0] disabled:opacity-50"
            disabled={!episode || episodeList.length === 1}
            title="Embaralhar"
          >
            <Shuffle
              size={24}
              className={`${isSuffling ? 'text-pod-green-500' : 'text-white'}`}
            />
          </button>
          <button
            onClick={playPrevious}
            className="bg-transparent text-[0] disabled:opacity-50"
            disabled={!episode || !hasPrevious}
            title="Tocar anterior"
          >
            <Image src={playPreviousImg} alt="Tocar anterior" />
          </button>
          <button
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-pod-purple-400 ${episode && 'duration-200 hover:brightness-95'}`}
            onClick={togglePlay}
            disabled={!episode}
            title={isPlaying ? 'Pausar' : 'Tocar'}
          >
            {isPlaying ? (
              <Image src={pause} alt="Pause" className="duration-300" />
            ) : (
              <Image src={playImg} alt="Tocar" className="duration-300" />
            )}
          </button>
          <button
            onClick={playNext}
            className="bg-transparent text-[0] disabled:opacity-50"
            disabled={!episode || !hasNext}
            title="Tocar próxima"
          >
            <Image src={playNextImg} alt="Tocar próxima" />
          </button>
          <button
            onClick={toogleLoop}
            className={`bg-transparent text-[0] disabled:opacity-50`}
            disabled={!episode}
            title="Repetir"
          >
            <Repeat
              size={24}
              className={`${isLooping ? 'text-pod-green-500' : 'text-white'}`}
            />
          </button>
        </div>
      </footer>
    </div>
  )
}
