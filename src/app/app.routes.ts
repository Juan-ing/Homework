import { Routes } from '@angular/router';
import { TreeConsole } from './tree-console/tree-console';
import { TreeVisual } from './tree-visual/tree-visual';

export const routes: Routes = [
	{ path: '', redirectTo: 'tree-console', pathMatch: 'full' },
	{ path: 'tree-console', component: TreeConsole },
	{ path: 'tree-visual', component: TreeVisual },
];
