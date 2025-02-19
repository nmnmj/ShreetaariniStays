import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-orange-100 border-t border-orange-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">
              {t('footer.contact')}
            </h3>
            <div className="space-y-2">
              <a href="tel:8770032703" className="flex items-center gap-2 text-orange-700 hover:text-orange-900 transition-colors">
                <Phone className="h-4 w-4" />
                +91 8770032703
              </a>
              <a href="mailto:shreetaarini@gmail.com" className="flex items-center gap-2 text-orange-700 hover:text-orange-900 transition-colors">
                <Mail className="h-4 w-4" />
                shreetaarini@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">
              {t('footer.location')}
            </h3>
            <a 
              href="https://maps.app.goo.gl/rmAjpd6Yr3j5DKGu7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-start gap-2 text-orange-700 hover:text-orange-900 transition-colors"
            >
              <MapPin className="h-4 w-4 mt-1" />
              <p>167, Manchaman Ganesh Colony<br />Ujjain, Madhya Pradesh</p>
            </a>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">
              {t('footer.about')}
            </h3>
            <p className="text-orange-700">
              {t('footer.aboutText')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}