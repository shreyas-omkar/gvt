import Link from 'next/link';
import { Star, Mail, Phone, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Gurukula Vaidhik Trust</h3>
                <p className="text-sm text-slate-300">Vedic Wisdom & Guidance</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connecting ancient Vedic wisdom with modern life through authentic astrological guidance, 
              Vastu consultations, and spiritual remedies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-slate-300 hover:text-orange-400 transition-colors text-sm">
                Home
              </Link>
              <Link href="/consultations" className="text-slate-300 hover:text-orange-400 transition-colors text-sm">
                Book Consultation
              </Link>
              <Link href="/stotras" className="text-slate-300 hover:text-orange-400 transition-colors text-sm">
                Stotras & Mantras
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-orange-400 transition-colors text-sm">
                About Us
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Our Services</h4>
            <div className="flex flex-col space-y-2">
              <span className="text-slate-300 text-sm">Vedic Astrology Consultation</span>
              <span className="text-slate-300 text-sm">Vastu Nirnaya Guidance</span>
              <span className="text-slate-300 text-sm">Spiritual Remedies</span>
              <span className="text-slate-300 text-sm">Mantra & Stotra Recommendations</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-slate-300">contact@gurukulavaidhiktrust.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-slate-300">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Traditional Vedic Center<br />
                  Sacred Knowledge Hub<br />
                  India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vastu Nirnaya Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="text-center space-y-2">
            <h4 className="text-xl font-semibold text-orange-400">Vastu Nirnaya</h4>
            <p className="text-slate-300 text-sm">
              <strong>Vastu Nirnaya - Gurukula Vaidhik Trust</strong> - Your trusted partner for authentic Vastu Shastra consultations
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2024 Gurukula Vaidhik Trust. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-slate-400 text-sm">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by</span>
              <Link 
                href="#" 
                className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
              >
                Pixelated Logics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}