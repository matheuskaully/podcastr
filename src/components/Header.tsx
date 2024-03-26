import Image from 'next/image'
import logo from '../../public/logo.svg'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export default function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return (
    <header className="flex h-[6.5rem] items-center border-b border-pod-gray-100 bg-white px-16 py-8">
      <Image src={logo} alt="Podcastr" />
      <p className="ml-8 border-l border-pod-gray-100 py-1 pl-8">
        O melhor para você ouvir, sempre
      </p>
      <span className="ml-auto capitalize">{currentDate}</span>
    </header>
  )
}
