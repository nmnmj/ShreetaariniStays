import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRoomSchema } from "@shared/schema";
import type { InsertRoom, Room } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RoomFormProps {
  onSubmit: (data: InsertRoom) => void;
  initialData?: Room;
}

export default function RoomForm({ onSubmit, initialData }: RoomFormProps) {
  const form = useForm<InsertRoom>({
    resolver: zodResolver(insertRoomSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: "",
      amenities: [],
      images: [],
      isAvailable: true
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per Night (₹)</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? value.toString() : "");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <div className="space-y-2">
                {['AC', 'WiFi'].map(amenity => (
                  <FormField
                    key={amenity}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(amenity)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              const updated = checked
                                ? [...current, amenity]
                                : current.filter(a => a !== amenity);
                              field.onChange(updated);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">{amenity}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URLs (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value?.join('\n')}
                  onChange={e => field.onChange(e.target.value.split('\n'))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!mt-0">Available for Booking</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? 'Update Room' : 'Add Room'}
        </Button>
      </form>
    </Form>
  );
}