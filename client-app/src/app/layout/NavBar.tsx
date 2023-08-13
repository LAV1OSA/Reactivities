import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

export interface Props {
    openForm : () => void
}

export default function NavBar({openForm} : Props){
    return(
        <Menu inverted fixed='top'>
            <Menu.Item header>
                <img src='/assets/logo.png' alt='logo'style={{marginRight: '10px'}}/>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button onClick={openForm} positive content='Create Activity'/>
            </Menu.Item>
        </Menu>
    )
}