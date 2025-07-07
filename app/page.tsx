'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { 
  Star, 
  Calendar, 
  Book, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Shield, 
  Heart,
  Users,
  CheckCircle,
  Globe
} from 'lucide-react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative hero-pattern spiritual-gradient py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 om-pattern opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="flex justify-center mb-6">
              <Image
                    src="/logo.svg"
                    alt="Gurukula Vaidhik Trust Logo"
                    width={50}
                    height={50}
                    className="h-24 w-24"
                  />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent">
                Ancient Wisdom
              </span>
              <br />
              <span className="text-slate-800">for Modern Living</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Experience authentic Vedic guidance through our expert astrological consultations, 
              Vastu Shastra solutions, and time-tested spiritual remedies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-6 text-lg" asChild>
                <Link href="/consultations">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-6 text-lg" asChild>
                <Link href="/stotras">
                  <Book className="mr-2 h-5 w-5" />
                  Explore Stotras
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-orange-600">100k+</div>
                <div className="text-slate-600">Consultations</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-orange-600">30+</div>
                <div className="text-slate-600">Years Experience</div>
              </div> 
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-orange-600">98%</div>
                <div className="text-slate-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 animate-slide-up">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 px-4 py-2">
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              Discover Your Path to
              <span className="text-orange-600"> Harmony</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Each service is crafted with deep reverence for Vedic traditions, 
              offering you personalized guidance for life's journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Astrology Service */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 lotus-shadow bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 w-fit group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-800">Vedic Astrology</CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  Unlock the cosmic patterns influencing your life journey through authentic Vedic astrological analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Birth Chart Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Career & Life Path Guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Relationship Compatibility</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Spiritual Remedies</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/consultations?type=astrology">
                    Book Astrology Session
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Vastu Service */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 lotus-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 w-fit group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-800">Vastu Nirnaya</CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  Transform your living and working spaces with ancient Vastu Shastra principles for enhanced prosperity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                    Vastu Nirnaya - Gurukula Vaidhik Trust
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Home & Office Assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Energy Flow Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Directional Corrections</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Prosperity Enhancement</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600" asChild>
                  <Link href="/consultations?type=vastu">
                    Book Vastu Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Spiritual Remedies */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 lotus-shadow bg-gradient-to-br from-purple-50 to-pink-50 md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 w-fit group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-800">Spiritual Remedies</CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  Discover personalized mantras, stotras, and spiritual practices to align your energy and find inner peace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Personalized Mantra Selection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Sacred Stotra Recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Meditation Practices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-slate-700">Energy Healing Guidance</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-purple-500 hover:bg-purple-600" asChild>
                  <Link href="/stotras">
                    Explore Remedies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 spiritual-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="bg-white/80 text-orange-800 px-4 py-2">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              Trusted by Seekers
              <span className="text-orange-600"> Worldwide</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 group">
              <div className="mx-auto p-4 rounded-full bg-white shadow-lg w-fit group-hover:shadow-xl transition-shadow">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">30+ Years Experience</h3>
              <p className="text-slate-600">Decades of dedicated practice in Vedic sciences</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="mx-auto p-4 rounded-full bg-white shadow-lg w-fit group-hover:shadow-xl transition-shadow">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Authentic Guidance</h3>
              <p className="text-slate-600">Traditional methods backed by scriptural knowledge</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="mx-auto p-4 rounded-full bg-white shadow-lg w-fit group-hover:shadow-xl transition-shadow">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Personal Approach</h3>
              <p className="text-slate-600">Every consultation tailored to your unique journey</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="mx-auto p-4 rounded-full bg-white shadow-lg w-fit group-hover:shadow-xl transition-shadow">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Compassionate Care</h3>
              <p className="text-slate-600">Guidance offered with genuine concern and love</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Begin Your Sacred Journey
              <span className="text-orange-400"> Today</span>
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              Take the first step towards harmony, prosperity, and spiritual growth. 
              Our experienced practitioners are here to guide you with authentic Vedic wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-6 text-lg" asChild>
                <Link href="/consultations">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-6 text-lg" asChild>
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}