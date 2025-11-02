export interface EmailJsConfig {
  serviceID: string;
  templateID: string;
  publicKey: string;
}

export interface Environment {
  production: boolean;
  apiUrl: string;
  emailjs: EmailJsConfig;
}
