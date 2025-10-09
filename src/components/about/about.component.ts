import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  stats = [
    { value: '4+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Completed' },
    { value: '15+', label: 'Happy Clients' },
  ];
}
