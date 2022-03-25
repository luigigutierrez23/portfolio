import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';


export default function ProjectTable() {
    const { projectStore: { projectsByDate } } = useStore();

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projectsByDate.map((project, index) => (
                        <tr key={project.uid}>
                            <td>{index + 1}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{project.date}</td>
                            <td>
                                <Link
                                    className='btn btn-warning ms-2'
                                    role='button'
                                    to={`/projects/${project.uid}`}
                                >
                                    <MdIcons.MdEdit />
                                </Link>

                                <Button className='btn btn-danger ms-2'> <AiIcons.AiFillDelete />  </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
