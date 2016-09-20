import { FSConstants } from "../sigma-ui-frameseven";
export declare class FSPage {
    element: Element;
    dataPage: string;
    constants: typeof FSConstants;
    framework7: any;
    constructor(element: Element);
    unbind(): void;
    detached(): void;
    attached(): void;
}
export declare class FSPopup {
    element: Element;
    dataPage: string;
    constants: typeof FSConstants;
    framework7: any;
    constructor(element: Element);
    unbind(): void;
    detached(): void;
    attached(): void;
    close(): void;
}
export declare class FSNavBar {
    navTitle: string;
}
export declare class FSNavTool {
    element: Element;
    iconClass: string;
    dataClass: string;
    menuPanel: string;
    constructor(element: Element);
    __fireClick(): any;
}
export declare class FSPageContent {
}
export declare class FSToolbar {
}
export declare class FSRow {
}
export declare class FSColumn {
    element: Element;
    constructor(element: Element);
}
