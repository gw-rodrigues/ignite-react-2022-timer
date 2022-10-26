import { useContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CycleContext'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
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

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<TNewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitButtonDisabled = !task

  function handleCreateNewCycle(data: TNewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
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
