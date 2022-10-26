import { createContext, ReactNode, useReducer, useState } from 'react'
import { cyclesReducer, EActionsTypes, ICycle } from '../reducers/cycles'

interface ICreateCycleData {
  task: string
  minutesAmount: number
}

interface ICyclesContextType {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: ICreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface ICycleContextProvider {
  children: ReactNode
}

/**
 * Contexto que vai ser usado para obter as variáveis e funções
 * const {...} = useContext(CyclesContext)
 */
export const CyclesContext = createContext({} as ICyclesContextType)

/**
 * O provider do contexto em vez usar <CycleContext.Provider> no componente.
 * Criamos aqui um método com <CycleContext.Provider> e adicionamos as variáveis e funções, para nao sair logica do contexto.
 * Usamos essa função a volta do componentes que vamos partilhar.
 * Então passamos os componentes que vao usar contexto como children.
 * <CycleContextProvider> -> função com context.provider
 *    <Router /> -> children (home/history/etc...)
 * </CycleContextProvider>
 */

export function CycleContextProvider({ children }: ICycleContextProvider) {
  /**
   *  useReducer ? -> é igual ao useState, mas é usado quando
   *  temos que fazer "ação" quando vamos alterar
   *  a informação da variável/state.
   *
   *                            param 1      param 2
   *  const [...] = useReducer( função , valor-inicial-state )
   *
   *  função -> recebe dos paramentos:
   *    - state = valor atual/tempo real do variável/state.
   *    - action = qual "ação" precisa ser feito para alterar o
   *      variável/state (adicionar, remover, alterar, etc...).
   *
   *                               param 1          param 2
   *  const [...] = useReducer( (state, action)=>{} , [])
   *
   *  Variável -> agora nao temos mais o setCycle, mais sim o
   *    "dispatch", dizemos que vamos disparar uma ação para
   *    alterar essa variável.
   *
   *  const [cycles, dispatch] = useReducer(...)
   *
   *  dispatch -> para usarmos o, se passarmos apenas um valor,
   *    dispacth(valor) nao conseguimos saber qual e a ação feita
   *    (add, alterar, remover, etc...), então precisamos ter
   *    formato objeto semelhante, podemos usar qualquer nomes para
   *    as chaves do objeto.
   *
   *    dispatch({
   *      type:"ADD_NEW_CYCLE",
   *      payload: {
   *        newCycle
   *      }
   *    })
   *
   */

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: EActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: { activeCycleId },
    })
  }

  function createNewCycle(data: ICreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: EActionsTypes.ADD_NEW_CYCLE,
      payload: { newCycle },
    })

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: EActionsTypes.INTERRUPT_CURRENT_CYCLE,
      payload: { activeCycleId },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
