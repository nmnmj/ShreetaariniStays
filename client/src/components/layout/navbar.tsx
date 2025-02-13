import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Languages } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-orange-100 border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-orange-800 font-devanagari">
              {t('site.name')}
            </a>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>

            <a href="tel:8770068048">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                {t('nav.callNow')}
              </Button>
            </a>

            <Link href="/admin">
              <Button variant="ghost">{t('nav.admin')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}