'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Clock,
  Star,
  Globe,
  ArrowLeft,
  CheckCircle,
  User as UserIcon,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ✅ Correct Supabase user type inferred from actual response
type SupaUser = Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user'];

export default function ConsultationsPage() {
  const [user, setUser] = useState<SupaUser>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultation_type: '',
    preferred_time: '',
    message: ''
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const consultationType = searchParams.get('type');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM'
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!data?.user) {
        router.push('/auth');
        return;
      }

      setUser(data.user);
      setFormData(prev => ({
        ...prev,
        email: data.user.email || ''
      }));
    };

    checkUser();

    if (consultationType && (consultationType === 'astrology' || consultationType === 'vastu')) {
      setFormData(prev => ({
        ...prev,
        consultation_type: consultationType
      }));
    }
  }, [router, consultationType]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in to book a consultation');
      return;
    }

    if (!date) {
      toast.error('Please select a consultation date');
      return;
    }

    if (!formData.name || !formData.phone || !formData.consultation_type || !formData.preferred_time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('consultations')
        .insert({
          user_id: user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          consultation_type: formData.consultation_type as 'astrology' | 'vastu',
          preferred_date: format(date, 'yyyy-MM-dd'),
          preferred_time: formData.preferred_time,
          message: formData.message,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Consultation booked successfully! We will contact you soon.');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while booking consultation');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
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
                <CalendarIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Book Your Sacred
              <span className="text-orange-600"> Consultation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Schedule a personalized session with our experienced practitioners for guidance on your spiritual journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Consultation Form */}
            <div className="lg:col-span-2">
              <Card className="lotus-shadow border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">Consultation Details</CardTitle>
                  <CardDescription>
                    Please provide your information and consultation preferences
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2 text-orange-600" />
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-orange-600" />
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            disabled
                            className="bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-orange-600" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Consultation Preferences */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                        Consultation Preferences
                      </h3>
                      
                      <div className="space-y-2">
                        <Label>Consultation Type *</Label>
                        <Select 
                          value={formData.consultation_type} 
                          onValueChange={(value) => handleInputChange('consultation_type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select consultation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="astrology">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-2 text-orange-600" />
                                Vedic Astrology Consultation
                              </div>
                            </SelectItem>
                            <SelectItem value="vastu">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-2 text-blue-600" />
                                Vastu Nirnaya Consultation
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Preferred Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) => 
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label>Preferred Time *</Label>
                          <Select 
                            value={formData.preferred_time} 
                            onValueChange={(value) => handleInputChange('preferred_time', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-orange-600" />
                                    {time}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-orange-600" />
                          Additional Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Share any specific questions or concerns you'd like to discuss..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 text-lg font-medium"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Booking Consultation...
                        </div>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Book Consultation
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Consultation Types */}
              <Card className="lotus-shadow border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">Our Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50">
                      <Star className="h-5 w-5 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-slate-800">Vedic Astrology</h4>
                        <p className="text-sm text-slate-600">Personal horoscope analysis and life guidance</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50">
                      <Globe className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-slate-800">Vastu Nirnaya</h4>
                        <p className="text-sm text-slate-600">Space energy alignment and prosperity enhancement</p>
                        <Badge variant="outline" className="mt-1 text-xs border-blue-300 text-blue-700">
                          Gurukula Vaidhik Trust
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Process */}
              <Card className="lotus-shadow border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">What to Expect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-medium mt-1">1</div>
                      <div>
                        <h4 className="font-medium text-slate-800">Book Your Session</h4>
                        <p className="text-sm text-slate-600">Choose your preferred date and time</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-medium mt-1">2</div>
                      <div>
                        <h4 className="font-medium text-slate-800">Confirmation Call</h4>
                        <p className="text-sm text-slate-600">We'll contact you to confirm details</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-medium mt-1">3</div>
                      <div>
                        <h4 className="font-medium text-slate-800">Consultation Session</h4>
                        <p className="text-sm text-slate-600">Receive personalized guidance and remedies</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="lotus-shadow border-0 bg-gradient-to-br from-slate-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-slate-700">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-slate-700">contact@gurukulavaidhiktrust.com</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-3">
                    Our team is available Monday to Saturday, 9 AM to 8 PM IST
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}