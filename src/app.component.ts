import { Component, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { RevealDirective } from './directives/reveal.directive';
import { ResumeModalComponent } from './components/resume-modal/resume-modal.component';
import type { Project } from './models/project.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    RevealDirective,
    ResumeModalComponent,
  ],
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class AppComponent {
  isLoading = signal(true);
  isHeaderScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('home');
  showScrollTop = signal(false);

  isResumeModalOpen = signal(false);
  isProjectModalOpen = signal(false);
  selectedProject = signal<Project | null>(null);
  copiedUrl = signal<string | null>(null);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 1500);

    effect(() => {
      if (this.isMobileMenuOpen()) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  onWindowScroll(): void {
    const scrollY = window.scrollY;
    this.isHeaderScrolled.set(scrollY > 50);
    this.showScrollTop.set(scrollY > 300);
    this.updateActiveSection();
  }
  
  private updateActiveSection(): void {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';
    sections.forEach(section => {
      const element = section as HTMLElement;
      if (element.offsetTop <= window.scrollY + 100) {
        currentSection = element.id;
      }
    });
    this.activeSection.set(currentSection);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  handleNavigation(): void {
    this.isMobileMenuOpen.set(false);
  }
  
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openResumeModal(): void {
    this.isResumeModalOpen.set(true);
    this.isMobileMenuOpen.set(false);
  }

  closeResumeModal(): void {
    this.isResumeModalOpen.set(false);
  }

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
    this.isProjectModalOpen.set(true);
  }

  closeProjectModal(): void {
    this.isProjectModalOpen.set(false);
    this.copiedUrl.set(null);
  }
  
  copyProjectUrl(event: MouseEvent, url?: string): void {
    event.stopPropagation();
    if (!url || url === '#') return;

    navigator.clipboard.writeText(url).then(() => {
      this.copiedUrl.set(url);
      setTimeout(() => {
        if (this.copiedUrl() === url) {
          this.copiedUrl.set(null);
        }
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  }
}