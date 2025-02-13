import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import RoomCard from "@/components/rooms/room-card";
import RoomForm from "@/components/rooms/room-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Room, InsertRoom } from "@shared/schema";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);

  const { data: rooms = [], isLoading } = useQuery<Room[]>({
    queryKey: ['/api/rooms'],
    enabled: !!token
  });

  const login = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/login", { username, password });
      const data = await res.json();
      return data.token;
    },
    onSuccess: (token) => {
      localStorage.setItem("token", token);
      setToken(token);
      toast({ title: "Logged in successfully" });
    },
    onError: () => {
      toast({ 
        title: "Login failed", 
        description: "Invalid credentials",
        variant: "destructive"
      });
    }
  });

  const addRoom = useMutation({
    mutationFn: async (room: InsertRoom) => {
      const res = await apiRequest("POST", "/api/rooms", room);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/rooms'] });
      setIsAddingRoom(false);
      toast({ title: "Room added successfully" });
    }
  });

  const updateRoom = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: InsertRoom }) => {
      const res = await apiRequest("PUT", `/api/rooms/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/rooms'] });
      setEditingRoom(null);
      toast({ title: "Room updated successfully" });
    }
  });

  const deleteRoom = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/rooms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/rooms'] });
      toast({ title: "Room deleted successfully" });
    }
  });

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md space-y-4 p-4">
          <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
          <Input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button 
            className="w-full" 
            onClick={() => login.mutate()}
            disabled={login.isPending}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Room Management</h1>
        <div className="space-x-4">
          <Button onClick={() => setIsAddingRoom(true)}>Add Room</Button>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
              setLocation("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse bg-orange-100 rounded-lg h-[400px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <RoomCard 
              key={room.id}
              room={room}
              isAdmin
              onEdit={() => setEditingRoom(room)}
              onDelete={() => {
                if (confirm("Are you sure you want to delete this room?")) {
                  deleteRoom.mutate(room.id);
                }
              }}
            />
          ))}
        </div>
      )}

      <Dialog open={isAddingRoom} onOpenChange={setIsAddingRoom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
          </DialogHeader>
          <RoomForm onSubmit={data => addRoom.mutate(data)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingRoom} onOpenChange={() => setEditingRoom(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
          </DialogHeader>
          {editingRoom && (
            <RoomForm 
              initialData={editingRoom}
              onSubmit={data => updateRoom.mutate({ id: editingRoom.id, data })}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
