import Image from 'next/image'
import playing from '../../public/playing.svg'
import shuffle from '../../public/shuffle.svg'
import playNext from '../../public/play-next.svg'
import playPrevious from '../../public/play-previous.svg'
import play from '../../public/play.svg'
import repeat from '../../public/repeat.svg'

export default function Player() {
  return (
    <div className="flex h-screen w-[26.5rem] flex-col items-center justify-between bg-pod-purple-500 px-16 py-12 text-white">
      <header className="flex items-center gap-4">
        <Image src={playing} alt="Tocando agora..." />
        <strong className="font-alt font-semibold">Tocando agora</strong>
      </header>

      <div className="flex h-80 w-full items-center  justify-center rounded-3xl border-[1.5px] border-dashed border-pod-purple-300 bg-gradient-to-tl from-transparent to-pod-purple-400/80 p-16 text-center">
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className="items-stretch opacity-50">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-block items-center">00:00</span>
          <div className="flex-1">
            <div className="h-1 w-full rounded-sm bg-pod-purple-300" />
          </div>
          <span className="inline-block items-center">00:00</span>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button className="bg-transparent text-[0]">
            <Image src={shuffle} alt="Embaralhar" />
          </button>
          <button className="bg-transparent text-[0]">
            <Image src={playPrevious} alt="Tocar anterior" />
          </button>
          <button className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pod-purple-400">
            <Image src={play} alt="Tocar" />
          </button>
          <button className="bg-transparent text-[0]">
            <Image src={playNext} alt="Tocar próxima" />
          </button>
          <button className="bg-transparent text-[0]">
            <Image src={repeat} alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
