import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Project } from '../../models/project.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  viewProject = output<Project>();
  private apiService = inject(ApiService);
  
  projects = toSignal(this.apiService.getProjects(), { initialValue: [] });
}
