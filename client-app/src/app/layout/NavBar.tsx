import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

export default function NavBar(){
    return(
        <Menu inverted fixed='top'>
            <Menu.Item header>
                <img src='/assets/logo.png' alt='logo'style={{marginRight: '10px'}}/>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button positive content='Create Activity'/>
            </Menu.Item>
        </Menu>
    )
}