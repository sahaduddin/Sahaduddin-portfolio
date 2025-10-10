import { Component, ChangeDetectionStrategy, signal, effect, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import type { Project } from './models/project.model';

// Component Imports
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResumeModalComponent } from './components/resume-modal/resume-modal.component';

@Component({
  selector: 'app-root',
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
    ResumeModalComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class AppComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  isLoading = signal(true);
  isHeaderScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('home');
  showScrollTop = signal(false);

  isResumeModalOpen = signal(false);
  isProjectModalOpen = signal(false);
  selectedProject = signal<Project | null>(null);
  copiedUrl = signal<string | null>(null);

  private sectionObserver: IntersectionObserver | null = null;
  
  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (this.isResumeModalOpen() || this.isProjectModalOpen() || this.isMobileMenuOpen()) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.isLoading.set(false), 1500);
      this.onWindowScroll(); // Initial check for scroll position
      this.setupSectionObserver();
    } else {
      this.isLoading.set(false);
    }
  }

  ngOnDestroy(): void {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }
  }

  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY;
      this.isHeaderScrolled.set(scrollY > 50);
      this.showScrollTop.set(scrollY > 400);
    }
  }
  
  private setupSectionObserver(): void {
    // A short delay ensures that the sections are rendered before we try to observe them.
    setTimeout(() => {
      const sections = Array.from(document.querySelectorAll('main section[id]'));
      if (sections.length > 0) {
        const options = {
          rootMargin: '-40% 0px -60% 0px',
        };

        this.sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.activeSection.set(entry.target.id);
            }
          });
        }, options);

        sections.forEach(section => this.sectionObserver!.observe(section));
      }
    }, 100);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  handleNavigation(): void {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
    }
  }

  openResumeModal(): void {
    this.handleNavigation();
    this.isResumeModalOpen.set(true);
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
  }
  
  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  copyProjectUrl(event: Event, url: string): void {
    event.stopPropagation();
    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.copiedUrl.set(url);
        setTimeout(() => this.copiedUrl.set(null), 2000);
      });
    }
  }
}