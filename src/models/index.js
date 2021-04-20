// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Panel, DataSource } = initSchema(schema);

export {
  Panel,
  DataSource
};