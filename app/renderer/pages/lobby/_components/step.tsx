import { ReactNode } from 'react'

import { cn } from '@/_shared/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'

const stepVariants = cva(
  'flex flex-col p-4 w-80 rounded-md items-center justify-center',
  {
    variants: {
      variant: {
        selected: 'bg-gray-700 text-gray-100',
        notSelected: 'bg-gray-800 text-gray-500'
      }
    },
    defaultVariants: {
      variant: 'notSelected'
    }
  }
)

enum Step {
  Lobby = 'No Lobby',
  Matchmaking = 'Buscando partida',
  ReadyCheck = 'Partida pronta',
  ChampSelect = 'Seleção de Campeões',
  InProgress = 'Em partida',
  WaitingForStats = 'Aguardando stats',
  Error = 'Error',
  Unknown = 'Unknown'
}

const StepComponent = ({
  step,
  matcher,
  className,
  children
}: {
  step: keyof typeof Step
  matcher: string
  className?: string
  children: ReactNode
}) => {
  function setVariant(): 'selected' | 'notSelected' {
    if (matcher === step) {
      return 'selected'
    }
    return 'notSelected'
  }

  return (
    <AnimatePresence>
      <motion.li
        layout
        className={cn(
          stepVariants({
            variant: setVariant()
          }),
          className
        )}
      >
        <motion.h1
          initial={{ x: 50, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1, transition: { duration: 0.5 } }}
          className="text-lg"
        >
          {Step[step]}
        </motion.h1>
        {setVariant() === 'selected' && <>{children}</>}
      </motion.li>
    </AnimatePresence>
  )
}

export default StepComponent
