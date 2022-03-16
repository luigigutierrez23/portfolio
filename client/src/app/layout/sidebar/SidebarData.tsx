import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { SideBarItem } from '../../models/sidebar';

export const SideBarData: SideBarItem[] = [
    {
        title:'Overview',
        path:'/overview',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title:'Users',
                path:'/overview/users',
                icon: <IoIcons.IoIosPaper />,
            }
        ]
    },
    {
        title:'Projects',
        path:'/projects',
        icon: <IoIcons.IoIosPaper />,
    },
    {
        title:'General',
        path:'/general',
        icon: <FaIcons.FaCartPlus />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title:'Config',
                path:'/general/config',
                icon: <IoIcons.IoIosPaper />,
            }
        ]
    },
    {
        title:'Support',
        path:'/support',
        icon: <IoIcons.IoMdHelpCircle />,
    },
]
