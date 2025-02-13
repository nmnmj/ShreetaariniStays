import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Wifi, Wind } from "lucide-react";
import type { Room } from "@shared/schema";
import { motion } from "framer-motion";

interface RoomCardProps {
  room: Room;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export default function RoomCard({ room, onEdit, onDelete, isAdmin = false }: RoomCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-b from-orange-50 to-white">
        <div className="aspect-video relative overflow-hidden">
          <motion.img 
            src={room.images[0]} 
            alt={room.name}
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          {!room.isAvailable && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">Not Available</Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="text-orange-900">{room.name}</span>
            <span className="text-orange-600">₹{room.price}/night</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-4">{room.description}</p>

          <div className="flex gap-2 mb-4">
            {room.amenities.includes('AC') && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                <Wind className="h-4 w-4 mr-1" /> AC
              </Badge>
            )}
            {room.amenities.includes('WiFi') && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                <Wifi className="h-4 w-4 mr-1" /> WiFi
              </Badge>
            )}
          </div>

          {isAdmin ? (
            <div className="flex gap-2">
              <Button onClick={onEdit} variant="outline" className="flex-1 hover:bg-orange-100">Edit</Button>
              <Button onClick={onDelete} variant="destructive" className="flex-1">Delete</Button>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }}>
              <a href="tel:8770068048">
                <Button className="w-full gap-2 bg-orange-600 hover:bg-orange-700 transition-colors">
                  <Phone className="h-4 w-4" />
                  Book Now
                </Button>
              </a>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}