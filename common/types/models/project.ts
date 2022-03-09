import { Types } from 'mongoose'

export interface Project {
    title: string;
    description: string;
    images?:Types.Array<string>;
    avatar?:string;
    status:boolean;
    date:string;
    category:string;
    progress: string;
}