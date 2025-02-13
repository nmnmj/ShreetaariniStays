import { useQuery } from "@tanstack/react-query";
import RoomCard from "@/components/rooms/room-card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail } from "lucide-react";
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
              <a href="tel:8770032703">
                <Button size="lg" className="gap-2 bg-orange-600 hover:bg-orange-700 transition-colors">
                  <Phone className="h-5 w-5" />
                  {t('hero.bookNow')}
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Owner Info Section */}
      <div className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-orange-900">Meet Your Host</h2>
              <p className="text-lg text-orange-800">
                Welcome to Shree Taarini Home Stay. I'm Divyanshu Jay, your host, dedicated to providing you with a comfortable and spiritual stay experience near the sacred Mahakal Temple.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-700">
                  <Phone className="h-5 w-5" />
                  <a href="tel:8770032703">+91 8770032703</a>
                </div>
                <div className="flex items-center gap-2 text-orange-700">
                  <Mail className="h-5 w-5" />
                  <a href="mailto:shreetaarini@gmail.com">shreetaarini@gmail.com</a>
                </div>
                <div className="flex items-center gap-2 text-orange-700">
                  <MapPin className="h-5 w-5" />
                  <span>167, Manchaman Ganesh Colony, Ujjain (M.P.)</span>
                </div>
              </div>
            </div>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/mahakalcardpng.png" 
                alt="Business Card"
                className="w-full rounded-lg shadow-xl transform transition-transform hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Beauty Parlour Section */}
      <div className="bg-gradient-to-b from-white to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="order-2 md:order-1 relative rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/beautyparlour.jpeg" 
                alt="Blossom Beauty Parlour"
                className="w-full rounded-lg shadow-xl transform transition-transform hover:scale-105"
              />
            </motion.div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-orange-900">Blossom Beauty Parlour</h2>
              <p className="text-lg text-orange-800">
                Enhance your stay with our on-premise beauty services at Blossom Beauty Parlour. 
                Experience professional beauty treatments and pampering sessions during your spiritual journey.
              </p>
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                Book Appointment
              </Button>
            </div>
          </motion.div>
        </div>
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