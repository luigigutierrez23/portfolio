import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../api/agent";
import { UserFormValues, UserLogin } from "../models/users";
import { store } from "./store";

export default class UserStore {
  user: UserLogin | null = null;
  refreshTokenTimeout: any;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Auth.login(creds);
      store.commonStore.setToken(user.token);
    //   this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
      history.push('/home');
    } catch (error: any) {
      toast.error(error.response.data.msg);
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
  };

//   getUser = async () => {
//     try {
//     //   const user = await agent.Account.current();
//       runInAction(() => (this.user = user));
//       this.startRefreshTokenTimer(user);
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   refreshToken = async () => {
//     this.stopRefreshTokenTimer();
//     try {
//       const user = await agent.Account.refreshToken();
//       runInAction(() => {
//         this.user = user;
//       });
//       store.commonStore.setToken(user.token);
//       this.startRefreshTokenTimer(user);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   private startRefreshTokenTimer(user: User) {
//     const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
//     const expires = new Date(jwtToken.exp * 1000);
//     const timeout = expires.getTime() - Date.now() - 60 * 1000;
//     this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
//   }

//   private stopRefreshTokenTimer() {
//     clearTimeout(this.refreshTokenTimeout);
//   }


//   setImage = (image: string) => {
//     if (this.user) this.user.image = image;
//   };

//   setDisplayName = (name: string) => {
//     if (this.user) this.user.displayName = name;
//   };
}
