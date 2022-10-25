import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any)

export function NewCycle() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  return (
    <div>
      NewCycle: {activeCycle}
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      >
        alterar
      </button>
    </div>
  )
}

export function Countdown() {
  const { activeCycle } = useContext(CyclesContext)

  return <div>Countdown: {activeCycle}</div>
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycle />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  )
}
