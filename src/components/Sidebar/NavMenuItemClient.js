/**
 * Nav Menu Item
 */
import React, { Fragment, Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';

class NavMenuItemClient extends Component {

   state = {
      subMenuOpen: ''
   }

	/**
   * On Toggle Collapse Menu
   */
   onToggleCollapseMenu(index) {
      if (this.state.subMenuOpen === '') {
         this.setState({
            subMenuOpen: index
         })
      }
      else if (this.state.subMenuOpen !== index) {
         this.setState({
            subMenuOpen: index
         })
      }
      else {
         this.setState({ subMenuOpen: '' });
      }
   }

   render() {
      const { menu, onClientToggleMenu } = this.props;
      const { subMenuOpen } = this.state;
      if (menu.child_routes != null) {
         return (
            <Fragment>
               <ListItem button component="li" onClick={onClientToggleMenu} className={`list-item ${classNames({ 'item-active': menu.open })}`}>
                  <ListItemIcon className="menu-icon">
                     <i className={menu.menu_icon}></i>
                  </ListItemIcon>
                  <span className="menu text-capitalize">
                     <span>{menu.menu_title}</span>
                  </span>
                  {menu.new_item && menu.new_item === true ?
                     <Chip label="new" className="new-item" color="secondary" />
                     :
                     ''
                  }
               </ListItem>
               <Collapse in={menu.open} timeout="auto" className="sub-menu">
                  <Fragment>
                     {menu.type_multi == null ?
                        <List className="list-unstyled py-0">
                           {menu.child_routes.map((subMenu, index) => {
                              return (
                                 <ListItem button component="li" key={index}>
                                    <NavLink to={subMenu.path} activeClassName="item-active" >
                                       <span className="menu">
                                          <span>{subMenu.menu_title}</span>
                                       </span>
                                       {subMenu.new_item && subMenu.new_item === true ?
                                          <Chip label="new" className="new-item" color="secondary" />
                                          :
                                          ''
                                       }
                                    </NavLink>
                                 </ListItem>

                              )
                           })}
                        </List>
                        :
                        <List className="list-unstyled py-0">
                           {menu.child_routes.map((subMenu, index) => {
                              return (
                                 <Fragment key={index}>
                                    <ListItem button component="li"
                                       onClick={() => this.onToggleCollapseMenu(index)}
                                       className={`list-item ${classNames({ 'item-active': subMenuOpen === index })}`}
                                    >
                                       <span className="menu">
                                          <span>{subMenu.menu_title}</span>
                                       </span>
                                    </ListItem>
                                    <Collapse in={subMenuOpen === index} timeout="auto">
                                       <List className="list-unstyled py-0">
                                          {subMenu.child_routes.map((nestedMenu, nestedKey) => (
                                             <ListItem button component="li" key={nestedKey}>
                                                <NavLink activeClassName="item-active" to={nestedMenu.path}>
                                                   <span className="menu pl-10 d-inline-block">
                                                      <span>{nestedMenu.menu_title}</span>
                                                   </span>
                                                </NavLink>
                                             </ListItem>
                                          ))}
                                       </List>
                                    </Collapse>
                                 </Fragment>
                              )
                           })}
                        </List>
                     }
                  </Fragment>
               </Collapse>
            </Fragment>
         )
      }
      return (
         <ListItem button component="li">
            <NavLink activeClassName="item-active" to={menu.path}>
               <ListItemIcon className="menu-icon">
                  <i className={menu.menu_icon}></i>
               </ListItemIcon>
               <span className="menu">
                <span>{menu.menu_title}</span>
               </span>
            </NavLink>
         </ListItem>
      );
   }
}

export default NavMenuItemClient;