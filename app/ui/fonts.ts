// /app/ui/fonts.ts
import { Inter, Lusitana } from 'next/font/google'; // أضف Lusitana هنا

export const inter = Inter({ subsets: ['latin'] });

// أضف هذا السطر لتصدير الخط الجديد
export const lusitana = Lusitana({ 
  weight: ['400', '700'], // خط Lusitana يحتاج تحديد الأوزان
  subsets: ['latin'], 
});