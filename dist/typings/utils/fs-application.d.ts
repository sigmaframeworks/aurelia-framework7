import { Router } from "aurelia-router";
export declare class FSApplication {
    router: Router;
    private __logger;
    IsHttpInUse: boolean;
    IsAuthenticated: boolean;
    constructor(router: Router);
    activeView: any;
    loadPage(view: any, params?: any): void;
    showPopup(view: any, model?: any): void;
    closePopup(dp: any): void;
    showMainView(view: any): void;
    showLoginView(view: any): void;
    mainViewBack(url: any, animate?: boolean): void;
    removeSplash(): void;
    switchDir(dir: any): void;
    /** App Constants **/
    private __username;
    private __userGroup;
    private __userGroupLabel;
    private __authUser;
    private __authToken;
    Username: any;
    UserGroup: any;
    UserGroupLabel: any;
    AuthUser: any;
    AuthToken: any;
    /** Session State **/
    session(key: any, value?: any): any;
    clearSession(): void;
    /** Persistent State **/
    persist(key: any, value?: any): any;
    /** Logger **/
    info(tag: any, msg: any, ...rest: any[]): void;
    warn(tag: any, msg: any, ...rest: any[]): void;
    debug(tag: any, msg: any, ...rest: any[]): void;
    error(tag: any, msg: any, ...rest: any[]): void;
    /** Toast **/
    private __overlayContainer;
    toast(config: any): void;
    toastSuccess(config: any): void;
    toastError(config: any): void;
    showIndicator(): void;
    hideIndicator(): void;
}
