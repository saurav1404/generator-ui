/* istanbul ignore file */
import * as React from 'react';
import { Route, RouteProps } from 'react-router';

export enum Routes {
  HOMEPAGE = '/'
}

export type LazyRouteProps = RouteProps & {
  fallback: NonNullable<React.ReactNode> | null;
};

export function LazyRoute(props: LazyRouteProps) {
  const { component, fallback, ...restProps } = props;
  // tslint:disable-next-line:variable-name
  const Component = component as React.ComponentClass<RouteProps>;
  const lazyComponent = (lazyComponentProps: any) => (
      <React.Suspense fallback={fallback}>
        <Component {...lazyComponentProps} />
      </React.Suspense>
  );
  return <Route {...restProps} component={lazyComponent} />;
}



