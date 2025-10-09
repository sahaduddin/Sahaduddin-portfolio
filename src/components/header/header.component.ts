import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isScrolled = input.required<boolean>();
  isMobileMenuOpen = input.required<boolean>();
  activeSection = input.required<string>();

  toggleMenu = output<void>();
  navigated = output<void>();
  hireMeClicked = output<void>();

  navLinks = [
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'About' },
    { path: 'skills', label: 'Skills' },
    { path: 'projects', label: 'Projects' },
    { path: 'contact', label: 'Contact' },
  ];

  scrollToSection(event: Event, path: string): void {
    event.preventDefault();
    const element = document.querySelector(`#${path}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.navigated.emit();
  }
}
