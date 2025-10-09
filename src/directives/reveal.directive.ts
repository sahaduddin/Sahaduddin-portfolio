import { Directive, ElementRef, inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = this.elementRef.nativeElement;
      element.classList.add('opacity-0', 'transform', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.classList.remove('opacity-0', 'translate-y-10');
            element.classList.add('opacity-100', 'translate-y-0');
            this.observer?.unobserve(element);
          }
        });
      }, { threshold: 0.1 });

      this.observer.observe(element);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
