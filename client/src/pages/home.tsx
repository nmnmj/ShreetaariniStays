import { useQuery } from "@tanstack/react-query";
import RoomCard from "@/components/rooms/room-card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import type { Room } from "@shared/schema";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { t } = useLanguage();
  const { data: rooms = [], isLoading } = useQuery<Room[]>({
    queryKey: ['/api/rooms']
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-br from-orange-100 to-orange-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609766418204-94aae0ecf4ec')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-orange-900 mb-4 font-devanagari">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-orange-800 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <a href="tel:8770068048">
              <Button size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                {t('hero.bookNow')}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-orange-900 mb-8 text-center">
          {t('rooms.title')}
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse bg-orange-100 rounded-lg h-[400px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}