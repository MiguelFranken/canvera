import { defineStore } from 'pinia'

export interface Command {
  execute(): void
  undo(): void
}

class CommandHistory {
  private history: Command[] = []

  public push(command: Command) {
    this.history.push(command)
  }

  public pop(): Command {
    if (this.history.length === 0)
      throw new Error('No commands in history')
    return this.history.pop() as Command
  }

  public get length(): number {
    return this.history.length
  }

  public reset() {
    this.history = []
  }
}

export const useCommandStore = defineStore('command', () => {
  const history = ref<CommandHistory>(new CommandHistory())
  const undoedCommands = ref<CommandHistory>(new CommandHistory())

  function execute(command: Command) {
    command.execute()
    history.value.push(command)
    undoedCommands.value.reset()
  }

  function undo() {
    const command = history.value.pop()
    command.undo()
    undoedCommands.value.push(command)
  }

  function redo() {
    const command = undoedCommands.value.pop()!
    command.execute()
    history.value.push(command)
  }

  const canUndo = computed(() => history.value.length > 0)
  const canRedo = computed(() => undoedCommands.value.length > 0)

  return {
    execute,
    undo,
    canUndo,

    canRedo,
    redo,
  }
})
