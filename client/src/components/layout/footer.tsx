import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orange-100 border-t border-orange-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a href="tel:8770068048" className="flex items-center gap-2 text-orange-700">
                <Phone className="h-4 w-4" />
                +91 8770068048
              </a>
              <div className="flex items-center gap-2 text-orange-700">
                <Mail className="h-4 w-4" />
                info@shreetaarini.com
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">Location</h3>
            <div className="flex items-start gap-2 text-orange-700">
              <MapPin className="h-4 w-4 mt-1" />
              <p>Near Mahakal Temple<br />Ujjain, Madhya Pradesh</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">About Us</h3>
            <p className="text-orange-700">
              Experience divine hospitality at Shree Taarini Home Stay, located near the sacred Mahakal Temple.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
