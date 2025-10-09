import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeModalComponent {
  close = output<void>();
}
