import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { GraphEdge, GraphNode } from '../../models/graph';
import { Person } from '../../models/person';
import { GraphService } from '../../services/graph';

@Component({
  imports: [FormsModule],
  selector: 'app-graph-view',
  styleUrl: './graph-view.css',
  templateUrl: './graph-view.html',
})
export class GraphView implements AfterViewInit {
  @ViewChild('graphCanvas') private graphCanvas?: ElementRef<SVGSVGElement>;

  protected readonly graphService = inject(GraphService);
  protected readonly cities = this.graphService.cities;
  protected readonly people = this.graphService.people;
  protected readonly graphData = this.graphService.graphData;
  protected citySearch = '';
  protected personSearch = '';
  protected selectedCityId = this.graphService.cities()[0]?.id ?? '';
  private readonly platformId = inject(PLATFORM_ID);
  private viewReady = false;

  constructor() {
    effect(() => {
      const data = this.graphData();
      if (this.viewReady && isPlatformBrowser(this.platformId)) {
        this.renderGraph(data.nodes, data.edges);
      }
    });
  }

  get filteredCities() {
    const query = this.citySearch.trim().toLocaleLowerCase();
    return this.cities().filter((city) => city.name.toLocaleLowerCase().includes(query));
  }

  get filteredPeople(): Person[] {
    const query = this.personSearch.trim().toLocaleLowerCase();
    return this.people().filter((person) => person.name.toLocaleLowerCase().includes(query));
  }

  get residents(): Person[] {
    return this.selectedCityId ? this.graphService.peopleInCity(this.selectedCityId) : [];
  }

  get adjacencyList(): string[] {
    return this.graphService.getAdjacencyList();
  }

  get graphStructure(): string {
    return this.graphService.printGraph();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (isPlatformBrowser(this.platformId)) {
      const data = this.graphData();
      this.renderGraph(data.nodes, data.edges);
    }
  }

  protected cityName(cityId: string): string {
    return this.graphService.getCityName(cityId);
  }

  private renderGraph(nodes: GraphNode[], edges: GraphEdge[]): void {
    const svgElement = this.graphCanvas?.nativeElement;
    if (!svgElement) {
      return;
    }

    const width = 760;
    const height = 440;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(175, Math.max(70, nodes.length * 18));
    const positions = new Map(
      nodes.map((node, index) => {
        const angle = nodes.length > 1 ? (2 * Math.PI * index) / nodes.length - Math.PI / 2 : 0;
        return [
          node.id,
          {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          },
        ];
      }),
    );
    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    svg
      .append('g')
      .attr('class', 'edges')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('x1', (edge) => positions.get(edge.source)?.x ?? 0)
      .attr('y1', (edge) => positions.get(edge.source)?.y ?? 0)
      .attr('x2', (edge) => positions.get(edge.target)?.x ?? 0)
      .attr('y2', (edge) => positions.get(edge.target)?.y ?? 0)
      .attr('stroke', '#888')
      .attr('stroke-width', 2);

    const nodeGroups = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes)
      .join('g')
      .attr('transform', (node) => {
        const position = positions.get(node.id);
        return `translate(${position?.x ?? 0}, ${position?.y ?? 0})`;
      });

    nodeGroups
      .append('circle')
      .attr('r', 12)
      .attr('fill', (node) => (node.type === 'city' ? '#2878c7' : '#32965d'));

    nodeGroups
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 28)
      .attr('font-size', '13px')
      .text((node) => node.name);
  }
}
