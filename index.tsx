import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

// The import path for AppComponent must be a relative path.
// Path aliases like '@/' are not configured in this environment.
import { AppComponent } from './src/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
  ],
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.