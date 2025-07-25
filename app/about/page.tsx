'use client';

import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Globe, 
  Heart, 
  Users, 
  ArrowLeft,
  BookOpen,
  Award,
  Clock,
  Shield,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 lotus-shadow">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              About
              <span className="text-orange-600"> Gurukula Vaidhik Trust</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Preserving ancient Vedic wisdom for modern seekers, guiding souls on their journey 
              to harmony, prosperity, and spiritual enlightenment.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="lotus-shadow border-0 mb-12 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-slate-800">Our Sacred Mission</CardTitle>
              <CardDescription className="text-lg text-slate-600 leading-relaxed">
                To bridge the timeless wisdom of Vedic sciences with contemporary life, 
                offering authentic guidance that transforms lives and nurtures spiritual growth.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="mx-auto p-3 rounded-full bg-white shadow-md w-fit">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Authentic Knowledge</h3>
                  <p className="text-sm text-slate-600">Rooted in traditional Vedic scriptures and practices</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto p-3 rounded-full bg-white shadow-md w-fit">
                    <Heart className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Compassionate Guidance</h3>
                  <p className="text-sm text-slate-600">Every consultation delivered with genuine care and understanding</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto p-3 rounded-full bg-white shadow-md w-fit">
                    <Sparkles className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Transformative Results</h3>
                  <p className="text-sm text-slate-600">Practical solutions that create meaningful change in your life</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Astrology Service */}
            <Card className="lotus-shadow border-0">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 w-fit">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-800">Vedic Astrology</CardTitle>
                <CardDescription className="leading-relaxed">
                  Unlock the cosmic patterns influencing your life journey through 
                  authentic Vedic astrological analysis and guidance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Comprehensive birth chart analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Career and life path guidance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Relationship compatibility insights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Personalized spiritual remedies</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vastu Service */}
            <Card className="lotus-shadow border-0">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 w-fit">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-800">Vastu Nirnaya</CardTitle>
                <div className="text-center">
                  <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50 mb-3">
                    Vastu Nirnaya - Gurukula Vaidhik Trust
                  </Badge>
                </div>
                <CardDescription className="leading-relaxed">
                  Transform your living and working spaces with ancient Vastu Shastra 
                  principles for enhanced prosperity and positive energy flow.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Comprehensive space assessment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Energy flow optimization techniques</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Directional corrections and remedies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">Prosperity enhancement strategies</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Us */}
          <Card className="lotus-shadow border-0 mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-slate-800">Why Choose Gurukula Vaidhik Trust?</CardTitle>
              <CardDescription className="text-lg">
                Our commitment to authentic Vedic wisdom and compassionate service sets us apart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 w-fit">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">30+ Years Experience</h3>
                  <p className="text-slate-600 text-sm">Decades of dedicated practice in traditional Vedic sciences</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 w-fit">
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Authentic Guidance</h3>
                  <p className="text-slate-600 text-sm">Traditional methods backed by deep scriptural knowledge</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 w-fit">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Personal Approach</h3>
                  <p className="text-slate-600 text-sm">Every consultation tailored to your unique spiritual journey</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="mx-auto p-4 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 w-fit">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Proven Results</h3>
                  <p className="text-slate-600 text-sm">Thousands of satisfied seekers across the globe</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Approach */}
          <Card className="lotus-shadow border-0 mb-12 bg-gradient-to-br from-slate-50 to-blue-50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-slate-800">Our Sacred Approach</CardTitle>
              <CardDescription className="text-lg">
                How we blend ancient wisdom with modern understanding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-orange-600">1</div>
                  <h3 className="text-lg font-semibold text-slate-800">Deep Listening</h3>
                  <p className="text-slate-600 text-sm">
                    We begin every consultation by truly understanding your unique situation, 
                    challenges, and spiritual aspirations.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-orange-600">2</div>
                  <h3 className="text-lg font-semibold text-slate-800">Scriptural Analysis</h3>
                  <p className="text-slate-600 text-sm">
                    Using authentic Vedic methodologies, we analyze your birth chart or space 
                    according to time-tested principles.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-orange-600">3</div>
                  <h3 className="text-lg font-semibold text-slate-800">Practical Guidance</h3>
                  <p className="text-slate-600 text-sm">
                    We provide clear, actionable remedies and guidance that you can 
                    implement in your daily life for lasting transformation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 border-0 lotus-shadow">
              <CardContent className="py-12">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-800">
                    Ready to Begin Your Sacred Journey?
                  </h3>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Take the first step towards harmony, prosperity, and spiritual growth. 
                    Our experienced practitioners are here to guide you with authentic Vedic wisdom.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8" asChild>
                      <Link href="/consultations">
                        Schedule Your Consultation
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-8" asChild>
                      <Link href="/stotras">
                        Explore Spiritual Remedies
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}