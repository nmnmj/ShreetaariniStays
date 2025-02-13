import { useQuery } from "@tanstack/react-query";
import RoomCard from "@/components/rooms/room-card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import type { Room } from "@shared/schema";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const { t } = useLanguage();
  const { data: rooms = [], isLoading } = useQuery<Room[]>({
    queryKey: ['/api/rooms']
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[70vh] bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609766418204-94aae0ecf4ec')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/80" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center text-center p-4 min-h-[70vh]"
        >
          <div className="max-w-4xl mx-auto">
            <motion.img
              src="/shreeback.png"
              alt="Shree Taarini Logo"
              className="h-32 md:h-40 mx-auto mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-orange-900 mb-4 font-devanagari"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p 
              className="text-xl text-orange-800 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a href="tel:8770068048">
                <Button size="lg" className="gap-2 bg-orange-600 hover:bg-orange-700 transition-colors">
                  <Phone className="h-5 w-5" />
                  {t('hero.bookNow')}
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Rooms Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2 
          className="text-3xl font-bold text-orange-900 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('rooms.title')}
        </motion.h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse bg-orange-100 rounded-lg h-[400px]" />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {rooms.map(room => (
              <motion.div key={room.id} variants={item}>
                <RoomCard room={room} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}