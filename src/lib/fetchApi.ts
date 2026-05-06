// lib/api/client.ts
import { signOut } from "next-auth/react";
import { toast } from "sonner";
export const AUTH_TOKEN_KEY = 'access_token';
export const LANGUAGE_KEY = 'language';


export interface Result<T = unknown> {
    msg: string;
    code: number;
    data: T;
    [key: string]: any;
}

class ApiClient {
    private baseURL: string;
  
    constructor(baseURL?: string) {
      if (process.env.NODE_ENV === 'production') {
        this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || '';
      } else {
        this.baseURL = '/backend';
      }
    }
  
    private getLanguage(): string {
      if (typeof window === 'undefined') {
        return 'en';
      }
      const language = localStorage.getItem('language') || 
                      document.documentElement.lang || 
                      'en';
      return language;
    }
  
    private getAuthToken(): string | null {
      if (typeof window === 'undefined') {
        return null;
      }
      return localStorage.getItem(AUTH_TOKEN_KEY) || 
             null;
    }
  
    private getHeaders(customHeaders?: HeadersInit): HeadersInit {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept-Language': this.getLanguage(),
        ...customHeaders,
      };
  
      const authToken = this.getAuthToken();
      if (authToken) {
        // @ts-ignore
        headers['Authorization'] = `${authToken}`;
      }
  
      return headers;
    }
  
    private async request<T>(
      url: string,
      options: RequestInit = {}
    ): Promise<Result<T>> {
      const config: RequestInit = {
        headers: this.getHeaders(options.headers),
        ...options,
      };
  
      const response = await fetch(`${this.baseURL}${url}`, config);
  
      if (!response.ok) {
        const errorResult: Result<null> = {
            msg: `HTTP error! status: ${response.status}`,
            code: response.status,
            data: null,
          };
          throw errorResult;
      }
      const result: Result<T> = await response.json();

      if (result.code === 401) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        signOut({redirect: false}).then(() => {
            window.location.href = "/signin";
        })
      } else if(result.code !== 0 && result.msg) {
        toast.error(result.msg,{
          duration: 2000
        })
      }
  
      return result;
    }
  
    async get<T = unknown>(url: string, options?: RequestInit): Promise<Result<T>> {
      return this.request<T>(url, {
        method: 'GET',
        ...options,
      });
    }
  
    async post<T = unknown>(url: string, data?: any, options?: RequestInit): Promise<Result<T>> {
      return this.request<T>(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });
    }
  
    async delete<T = unknown>(url: string, options?: RequestInit): Promise<Result<T>> {
      return this.request<T>(url, {
        method: 'DELETE',
        ...options,
      });
    }
  
    setLanguage(language: string): void {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
      }
    }
  
    setAuthToken(token: string): void {
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }
    }
  
    clearAuthToken(): void {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    }
  }
  
  export const apiClient = new ApiClient();