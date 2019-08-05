import { assert } from 'chai';
import { ENV, environment } from './environment';

describe('Environment helper', () => {
  it('Should recognize development mode', () => {
    const process = {
      env: {
        NODE_ENV: ENV.DEVELOPMENT
      }
    };
    assert.isTrue(environment.isDevelopment(process as any));
    assert.isFalse(environment.isProduction(process as any));
  });

  it('Should recognize production mode', () => {
    const process = {
      env: {
        NODE_ENV: ENV.PRODUCTION
      }
    };
    assert.isTrue(environment.isProduction(process as any));
    assert.isFalse(environment.isDevelopment(process as any));
  });
});
