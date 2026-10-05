import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NTree } from '../n-tree';

@Component({
  imports: [FormsModule],
  selector: 'app-menu-console',
  styleUrl: './menu-console.css',
  templateUrl: './menu-console.html',
})
export class MenuConsole {
  @Input() tree = new NTree('Inicio');
  @Output() treeChange = new EventEmitter<NTree>();

  parentValue = '';
  newValue = '';
  searchValue = '';
  message = '';

  insertNode(): void {
    const parent = this.parentValue.trim();
    const value = this.newValue.trim();
    if (!parent || !value) {
      this.message = 'Ingresa el padre y el valor del nuevo nodo.';
      return;
    }
    if (!this.tree.insert(parent, value)) {
      this.message = `No existe el nodo padre "${parent}".`;
      return;
    }
    this.message = `Nodo "${value}" agregado.`;
    this.newValue = '';
    this.treeChange.emit(this.tree);
  }

  showDfs(): void {
    console.log('Recorrido DFS:', this.tree.dfs().map((node) => node.value));
  }

  showBfs(): void {
    console.log('Recorrido BFS:', this.tree.bfs().map((node) => node.value));
  }

  searchNode(): void {
    const value = this.searchValue.trim();
    this.message = this.tree.find(value)
      ? `Nodo encontrado: "${value}".`
      : `El nodo "${value}" no existe.`;
  }
}
