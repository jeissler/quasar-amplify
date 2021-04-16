import Amplify from 'aws-amplify';
import {
  applyPolyfills,
  defineCustomElements
} from '@aws-amplify/ui-components/loader';
import awsExports from '../aws-exports';

Amplify.configure(awsExports);
applyPolyfills().then(() => {
  defineCustomElements(window);
});
