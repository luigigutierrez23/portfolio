export interface SideBarItem {
    title: string;
    path: string;
    icon: any;
    iconClosed? :any;
    iconOpened? :any;
    subNav?: SideBarItem[];
}