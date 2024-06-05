import { withInstall } from '@strive-molu/utils';
import DynamicForm from './src/dynamic-form.vue';

export * from './src/form-item';
export const SmDynamicForm = withInstall(DynamicForm);
export default SmDynamicForm;

export type { DynamicFormInstance } from './src/instance';
