import { Routes } from '@angular/router';
import { MenuConsole } from './menu-console/menu-console';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

export const routes: Routes = [
	{ path: 'menu-console', component: MenuConsole },
	{ path: 'sidebar-menu', component: SidebarMenu },
];
