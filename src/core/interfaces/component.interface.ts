import { Route, VueRouter } from 'vue-router/types/router';
import { Store } from 'vuex';

export interface IComponent {
  $route: Route;
  $router: VueRouter;
  $store: Store<any>;
  $refs: {
    [key: string]: any;
  };
  $emit: (eventName: string, event: any) => void;
  $forceUpdate: () => void;
}
