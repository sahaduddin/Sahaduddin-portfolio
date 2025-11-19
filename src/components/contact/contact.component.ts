import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RevealDirective } from '../../directives/reveal.directive';
import { ApiService } from '@/src/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  // FIX: Explicitly type FormBuilder to fix type inference for the `inject` function.
    private apiService = inject(ApiService);
  
  private fb: FormBuilder = inject(FormBuilder);

  // FIX: Explicitly type the sanitizer to resolve a potential type inference issue.
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  formStatus = signal<{ message: string; type: 'success' | 'error' | 'sending' } | null>(null);

  private contactMethods = [
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" /><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" /></svg>', title: 'Email', value: 'ibnp786ansari@gmail.com' },
    { icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" /></svg>', title: 'Phone', value: '+91 8587993678' },
{
  icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>`,
  title: 'Location',
  value: 'Basti, Uttar Pradesh, India'
}
  ];
  
  safeContactMethods: { title: string; value: string; safeIcon: SafeHtml; }[] = [];

  ngOnInit(): void {
    this.safeContactMethods = this.contactMethods.map(method => ({
      ...method,
      safeIcon: this.sanitizer.bypassSecurityTrustHtml(method.icon)
    }));
  }

//  async handleSubmit(): Promise<void> {
//   if (this.contactForm.invalid) {
//     this.contactForm.markAllAsTouched();
//     return;
//   }

//   this.formStatus.set({ message: 'Sending your message...', type: 'sending' });
//   if (this.contactForm.valid) {
//     const response = await this.apiService.sendMessage(this.contactForm.value);
    
//     if (response.success) {
//       this.formStatus.set({ message: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' });

//       this.contactForm.reset();
      
//       setTimeout(() => {
//         this.formStatus.set(null);
//       }, 5000);
//     } else {
//       // alert('Failed to send message. Please try again.');
//            this.formStatus.set({ message: 'Failed to send message. Please try again later.', type: 'error' });

//       setTimeout(() => {
//         this.formStatus.set(null);
//       }, 5000);
//     }
//   }

// }
async handleSubmit(): Promise<void> {
  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    return;
  }

  this.formStatus.set({ message: 'Sending your message...', type: 'sending' });

  // Web3Forms API endpoint
  const endpoint = 'https://api.web3forms.com/submit';

  // Form data prepare karen (Web3Forms required fields)
  const formData = {
    access_key: 'e498f8bc-6bfa-4ad9-a98b-5b1e32e44db3',
    name: this.contactForm.value.name,
    email: this.contactForm.value.email,
    subject: this.contactForm.value.subject,
    message: this.contactForm.value.message
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      this.formStatus.set({ message: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' });
      this.contactForm.reset();
      setTimeout(() => {
        this.formStatus.set(null);
      }, 5000);
    } else {
      this.formStatus.set({ message: 'Failed to send message. Please try again later.', type: 'error' });
      setTimeout(() => {
        this.formStatus.set(null);
      }, 5000);
    }
  } catch {
    this.formStatus.set({ message: 'Failed to send message. Please try again later.', type: 'error' });
    setTimeout(() => {
      this.formStatus.set(null);
    }, 5000);
  }
}

}