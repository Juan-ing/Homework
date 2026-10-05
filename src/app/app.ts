import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BinaryTree, Node } from './binary-tree';
import { TreeConsole } from './tree-console/tree-console';
import { TreeVisual } from './tree-visual/tree-visual';

@Component({
  imports: [RouterLink, RouterOutlet, TreeConsole, TreeVisual],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  tree = new BinaryTree();

  updateTree(root: Node | null): void {
    this.tree = new BinaryTree(root);
  }
}
