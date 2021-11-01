import { setupWorker } from 'msw'
import { getHandlers } from './getHandlers'
import { postHandlers } from './postHandlers'
import { putHandlers } from './putHandlers'
import { deleteHandlers } from './deleteHandlers'

export const worker = setupWorker(
  ...getHandlers,
  ...postHandlers,
  ...putHandlers,
  ...deleteHandlers,
)
