import installer from './default';
export * from '@strive-molu/components';
export * from '@strive-molu/utils';
export * from './make-installer';

export const install = installer.install;
export const version = installer.version;

export default installer;
