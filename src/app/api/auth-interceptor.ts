import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

/**
 * AuthInterceptor - Har bir HTTP so'roviga token qo'shish uchun javobgar.
 * * Bu interseptor yondashuvi:
 * 1. PLATFORM_ID yordamida brauzer muhitini aniqlaydi (SSR muammosini hal qilish).
 * 2. Faqat brauzerda localStorage'dan 'access_token'ni oladi.
 * 3. Agar token mavjud bo'lsa, 'Authorization: Bearer <token>' sarlavhasini qo'shadi.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Standalone yondashuvi: PLATFORM_ID ni inject yordamida olish
  private platformId = inject(PLATFORM_ID);

  // Brauzer muhitida ekanligini tekshirish
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {}

  /**
   * LocalStorage'dan tokenni xavfsiz olish funksiyasi
   */
  private getAuthToken(): string | null {
    if (this.isBrowser) {
      // ✅ Faqat brauzerda localStorage mavjud bo'ladi
      return localStorage.getItem('access_token');
    }
    return null;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // 1. Tokenni olish
    const authToken = this.getAuthToken();

    // 2. Agar token mavjud bo'lsa
    if (authToken) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}` // Tokenni Header'ga qo'shish
        }
      });

      return next.handle(cloned);
    }

    // 3. Token bo'lmasa, asl so'rovni o'zgarishsiz yuborish
    return next.handle(request);
  }
}
