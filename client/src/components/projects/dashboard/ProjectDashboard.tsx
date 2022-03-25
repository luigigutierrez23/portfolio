import { useEffect } from 'react';
import Loader from '../../../app/layout/Loader';
import { useStore } from '../../../app/stores/store';
import ProjectTable from './ProjectTable';

export default function ProjectDashboard() {
    const {
        projectStore: {
            loadProjects,
            loadingInitial,
            projectRegistry
        },
    } = useStore();

    useEffect(() => {
        if (projectRegistry.size <= 1) loadProjects();
    }, [projectRegistry.size, loadProjects]);
    
    return (
        <>
            {loadingInitial ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <ProjectTable />
                </>
            )}
        </>
    )
}
