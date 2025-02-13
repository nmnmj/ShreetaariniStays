import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-orange-100 border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-orange-800 font-devanagari">
              श्री तारिणी
            </a>
          </Link>
          
          <div className="flex items-center gap-4">
            <a href="tel:8770068048">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
            </a>
            <Link href="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
