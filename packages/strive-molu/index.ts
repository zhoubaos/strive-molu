import installer from './default';
export * from '@strive-molu/components';
export * from '@strive-molu/constants';
export * from '@strive-molu/directives';
export * from '@strive-molu/utils';
export * from '@strive-molu/hooks';
export * from './make-installer';

export const install = installer.install;
export const version = installer.version;

export default installer;
