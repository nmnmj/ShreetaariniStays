import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Languages } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/">
            <a className="flex items-center gap-2">
              <motion.img 
                src="/shreeback.png"
                alt="Shree Taarini Logo"
                className="h-12 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-2xl font-bold text-orange-800 font-devanagari">
                {t('site.name')}
              </span>
            </a>
          </Link>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="gap-2 hover:bg-orange-200/50 transition-colors"
              >
                <Languages className="h-4 w-4" />
                {language === 'en' ? 'हिंदी' : 'English'}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <a href="tel:8770032703">
                <Button variant="outline" className="gap-2 hover:bg-orange-200/50 transition-colors">
                  <Phone className="h-4 w-4" />
                  {t('nav.callNow')}
                </Button>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/admin">
                <Button variant="ghost" className="hover:bg-orange-200/50 transition-colors">
                  {t('nav.admin')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}