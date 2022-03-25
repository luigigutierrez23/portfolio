import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ProjectStore from "./projectStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  commonStore: CommonStore;
  projectStore: ProjectStore;
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  projectStore: new ProjectStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
