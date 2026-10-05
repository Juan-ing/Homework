import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { hierarchy, select, tree } from 'd3';
import type { HierarchyPointNode } from 'd3';
import { BinaryTree, Node } from '../binary-tree';

@Component({
  imports: [],
  selector: 'app-tree-visual',
  styleUrl: './tree-visual.css',
  templateUrl: './tree-visual.html',
})
export class TreeVisual implements AfterViewInit, OnChanges {
  @Input() treeData = new BinaryTree();
  @ViewChild('treeSvg') svg!: ElementRef<SVGSVGElement>;

  private readonly width = 800;
  private readonly height = 420;

  ngAfterViewInit(): void {
    this.drawTree();
  }

  ngOnChanges(): void {
    if (this.svg) {
      this.drawTree();
    }
  }

  private drawTree(): void {
    const svg = select(this.svg.nativeElement);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${this.width} ${this.height}`);

    if (this.treeData.root === null) {
      return;
    }

    const root = hierarchy(this.treeData.root, (node: Node) =>
      [node.left, node.right].filter((child): child is Node => child !== null),
    );
    const positionedRoot = tree<Node>().size([this.width - 80, this.height - 80])(root);
    const drawing = svg.append('g').attr('transform', 'translate(40, 40)');

    drawing
      .selectAll('line')
      .data(positionedRoot.links())
      .join('line')
      .attr('x1', (link) => link.source.x)
      .attr('y1', (link) => link.source.y)
      .attr('x2', (link) => link.target.x)
      .attr('y2', (link) => link.target.y)
      .attr('stroke', 'black');

    const nodes = drawing
      .selectAll<SVGGElement, HierarchyPointNode<Node>>('g.tree-node')
      .data(positionedRoot.descendants())
      .join('g')
      .attr('class', 'tree-node')
      .attr('transform', (node) => `translate(${node.x}, ${node.y})`);

    nodes.append('circle').attr('r', 16);
    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .text((node) => node.data.value);
  }
}
