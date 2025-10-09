import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import type { Skill } from '../../models/skill.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { ApiService } from '../../services/api.service';

interface SkillWithSafeIcon extends Skill {
  safeIcon: SafeHtml;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private apiService = inject(ApiService);
  // FIX: Explicitly type the sanitizer to resolve a potential type inference issue.
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  private rawSkills = toSignal(this.apiService.getSkills(), { initialValue: [] });

  skills = computed<SkillWithSafeIcon[]>(() => {
    return this.rawSkills().map(skill => ({
      ...skill,
      safeIcon: this.sanitizer.bypassSecurityTrustHtml(skill.icon)
    }));
  });
}
