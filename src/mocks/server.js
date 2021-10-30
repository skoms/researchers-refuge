import { setupServer } from 'msw/node';
import { getHandlers } from './getHandlers'
import { postHandlers } from './postHandlers'
import { putHandlers } from './putHandlers'
import { deleteHandlers } from './deleteHandlers'

export const server = setupServer(
  ...getHandlers, 
  ...postHandlers, 
  ...putHandlers, 
  ...deleteHandlers
);