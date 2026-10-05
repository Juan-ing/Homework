import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuConsole } from './menu-console/menu-console';
import { NTree } from './n-tree';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

@Component({
  imports: [MenuConsole, RouterLink, RouterOutlet, SidebarMenu],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  tree = new NTree('Inicio');

  constructor() {
    this.tree.insert('Inicio', 'Productos');
    this.tree.insert('Inicio', 'Servicios');
    this.tree.insert('Productos', 'Libros');
    this.tree.insert('Productos', 'Cursos');
    this.tree.insert('Servicios', 'Asesorías');
  }

  updateTree(tree: NTree): void {
    this.tree = tree;
  }
}
