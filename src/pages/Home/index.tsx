import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

/**
 * FORMS Controlled | Uncontrolled
 *
 * Controlled -> manter em tempo real o estado ou informação, sempre que o usuário escreve no input.
 * Ex:
 * - const [task, setTask] = useState("")
 * - <input onChange={(e)=>{setTask(e.target.value)}} />
 *
 *
 * Uncontrolled -> buscamos, pegamos a informação do input somente quando precisamos dela.
 * Ex:
 *  function handleSubmit(event){ event.target.value ...}
 *  <form onSubmit={handleSubmit}>...</form>
 */

/**
 *  React-Hook-Form
 *
 * #Register ? -> method/function que recebe parâmetro e retorna vários métodos para aquele elemento.
 *
 * function register(name:string){
 *  return {
 *    onChange:()=>void
 *    onClick:()=>void
 *    onFocus:()=>void
 *  }
 * }
 * podemos ver todas propriedades: register("name").->
 *
 *
 * #handleSubmit ? method/function que recebe outra função, retorna "data" com os valores dos inputs.
 *
 * function handleNewForm(data){ ... }
 * function handleSubmit(handleNewForm){
 *  data = {...}
 *  return data
 * }
 *
 *
 * #Watch ? -> mostra em tempo real o valor do input
 *
 * const task = watch("task")
 * console.log(task)
 */

/**
 * Vamos criar um Schema para usar Zod, para aplicar no resolver do hook-form para fazer as validações.
 */
// zod.object({}) -> significa que vamos validar um objeto " {task:..., minutesAmount: ...} " -> podem ser outros zod.array({})

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser no mínimo de 5 minutos.')
    .max(60, 'O ciclo precisa ser no máximo de 60 minutos.'),
})

/**
 * Podemos usar interface, esta certo, mais podemos buscar e usar dos tipos criado dentro do zod.object({})
 */
// interface INewCycleFormData {
//   task: string
//   minutesAmount: number
// }

/**
 * no zod.infer -> quando inferimos "sendo função typescript" retorna os tipos da variável, MAS como typescript nao sabe tratar/funcionar com  uma variável, temos usar o "typeof"
 */
type TNewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface ICyclesContextType {
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as ICyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const newCycleForm = useForm<TNewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleCreateNewCycle(data: TNewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitButtonDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitButtonDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
