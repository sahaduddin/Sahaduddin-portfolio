import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  viewResumeClicked = output<void>();
  
  scrollToContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
