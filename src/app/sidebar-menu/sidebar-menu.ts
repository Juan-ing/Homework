import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NTree } from '../n-tree';

@Component({
  imports: [CommonModule],
  selector: 'app-sidebar-menu',
  styleUrl: './sidebar-menu.css',
  templateUrl: './sidebar-menu.html',
})
export class SidebarMenu {
  @Input() tree = new NTree('Inicio');
}
