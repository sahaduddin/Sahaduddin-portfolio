import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Skill } from '../../models/skill.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private apiService = inject(ApiService);
  skills = toSignal(this.apiService.getSkills(), { initialValue: [] });
}
