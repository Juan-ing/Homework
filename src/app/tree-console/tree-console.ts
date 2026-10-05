import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BinaryTree, Node } from '../binary-tree';

@Component({
  imports: [FormsModule],
  selector: 'app-tree-console',
  styleUrl: './tree-console.css',
  templateUrl: './tree-console.html',
})
export class TreeConsole {
  @Input() tree = new BinaryTree();
  @Output() treeChanged = new EventEmitter<Node | null>();

  insertValue = 0;
  searchValue = 0;
  message = '';

  insert(): void {
    if (!Number.isFinite(this.insertValue)) {
      this.message = 'Ingrese un número válido.';
      return;
    }

    this.tree.insert(this.insertValue);
    this.message = `Valor ${this.insertValue} insertado.`;
    this.treeChanged.emit(this.tree.root);
  }

  showPreOrder(): void {
    console.log('Pre-order:', this.tree.preOrder(this.tree.root));
  }

  showInOrder(): void {
    console.log('In-order:', this.tree.inOrder(this.tree.root));
  }

  showPostOrder(): void {
    console.log('Post-order:', this.tree.postOrder(this.tree.root));
  }

  search(): void {
    this.message = this.tree.contains(this.searchValue)
      ? `Valor ${this.searchValue} encontrado.`
      : `Valor ${this.searchValue} no está en el árbol.`;
  }
}
