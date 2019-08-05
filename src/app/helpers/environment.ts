import NodeProcess = __WebpackModuleApi.NodeProcess;

export enum ENV {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development'
}

function isProduction(process: NodeProcess) {
  return envFromprocess(process) === ENV.PRODUCTION;
}

function isDevelopment(process: NodeProcess) {
  return envFromprocess(process) === ENV.DEVELOPMENT;
}

function envFromprocess(process: NodeProcess) {
 return process && process.env && process.env.NODE_ENV;
}

export const environment = {
  isDevelopment,
  isProduction,
};
