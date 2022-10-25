import { useState } from 'react'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

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
    .min(5, 'O ciclo precisa ser no mínimo de 5 minutos.')
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
}

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<TNewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: TNewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitButtonDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Projeto 5" />
          </datalist>

          <label htmlFor="minutesAmount"></label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitButtonDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
