import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Wifi, Wind } from "lucide-react";
import type { Room } from "@shared/schema";

interface RoomCardProps {
  room: Room;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export default function RoomCard({ room, onEdit, onDelete, isAdmin = false }: RoomCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-video relative">
        <img 
          src={room.images[0]} 
          alt={room.name}
          className="object-cover w-full h-full"
        />
        {!room.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg">Not Available</Badge>
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{room.name}</span>
          <span className="text-orange-600">₹{room.price}/night</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{room.description}</p>
        
        <div className="flex gap-2 mb-4">
          {room.amenities.includes('AC') && (
            <Badge variant="secondary"><Wind className="h-4 w-4 mr-1" /> AC</Badge>
          )}
          {room.amenities.includes('WiFi') && (
            <Badge variant="secondary"><Wifi className="h-4 w-4 mr-1" /> WiFi</Badge>
          )}
        </div>
        
        {isAdmin ? (
          <div className="flex gap-2">
            <Button onClick={onEdit} variant="outline" className="flex-1">Edit</Button>
            <Button onClick={onDelete} variant="destructive" className="flex-1">Delete</Button>
          </div>
        ) : (
          <a href="tel:8770068048">
            <Button className="w-full gap-2">
              <Phone className="h-4 w-4" />
              Book Now
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
