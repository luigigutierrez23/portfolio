import { Types } from 'mongoose'
import { Category } from './category';
import { Skill } from './skill';

export interface Project {
    title: string;
    description: string;
    images?:Types.Array<string>;
    avatar?:string;
    status:boolean;
    date:string;
    categories: Types.Array<Category>;
    skills: Types.Array<Skill>;
    progress: number;
}