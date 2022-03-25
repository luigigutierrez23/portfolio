import { Category } from './categories';
import { Skill } from './skills';

export interface Project {
    uid: string;
    title: string;
    description: string;
    date: string;
    images: string;
    categories: Category[];
    skills: Skill[];
    status: boolean;
    avatar: string;
    progress: number;
}