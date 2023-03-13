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
}

export const useCommandStore = defineStore('command', () => {
  const history = ref<CommandHistory>(new CommandHistory())

  function execute(command: Command) {
    console.log('Command Store: Executing command', command)
    command.execute()
    history.value.push(command)
  }

  function undo() {
    const command = history.value.pop()
    command.undo()
  }

  const canUndo = computed(() => history.value.length > 0)

  return {
    execute,
    undo,
    canUndo,
  }
})
