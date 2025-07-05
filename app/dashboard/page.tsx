'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  Star, 
  Globe, 
  User, 
  Mail, 
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import Link from 'next/link';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  consultation_type: 'astrology' | 'vastu';
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
        return;
      }
      setUser(user);
      await fetchConsultations(user.id);
    };
    checkUser();
  }, [router]);

  const fetchConsultations = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConsultations(data || []);
    } catch (error: any) {
      toast.error('Failed to load consultations');
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'confirmed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" />Confirmed</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getConsultationIcon = (type: string) => {
    return type === 'astrology' ? 
      <Star className="h-4 w-4 text-orange-600" /> : 
      <Globe className="h-4 w-4 text-blue-600" />;
  };

  const getConsultationTypeText = (type: string) => {
    return type === 'astrology' ? 'Vedic Astrology' : 'Vastu Nirnaya';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 lotus-shadow">
                <User className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Your Sacred
              <span className="text-orange-600"> Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Welcome back! Track your consultations and continue your spiritual growth.
            </p>
          </div>

          <Tabs defaultValue="consultations" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto">
              <TabsTrigger value="consultations" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                My Consultations
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            {/* Consultations Tab */}
            <TabsContent value="consultations" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Your Consultations</h2>
                  <p className="text-slate-600">Manage and track your spiritual guidance sessions</p>
                </div>
                <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600" asChild>
                  <Link href="/consultations">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New Consultation
                  </Link>
                </Button>
              </div>

              {consultations.length === 0 ? (
                <Card className="text-center py-12 lotus-shadow border-0">
                  <CardContent>
                    <div className="space-y-6">
                      <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-10 w-10 text-orange-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-slate-800">No consultations yet</h3>
                        <p className="text-slate-600 max-w-md mx-auto">
                          Start your spiritual journey by booking your first consultation with our experienced practitioners.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600" asChild>
                          <Link href="/consultations?type=astrology">
                            <Star className="h-4 w-4 mr-2" />
                            Book Astrology Session
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50" asChild>
                          <Link href="/consultations?type=vastu">
                            <Globe className="h-4 w-4 mr-2" />
                            Book Vastu Consultation
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {consultations.map((consultation) => (
                    <Card key={consultation.id} className="lotus-shadow border-0 hover:shadow-xl transition-shadow">
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100">
                              {getConsultationIcon(consultation.consultation_type)}
                            </div>
                            <div>
                              <CardTitle className="text-lg text-slate-800">
                                {getConsultationTypeText(consultation.consultation_type)}
                              </CardTitle>
                              <CardDescription className="text-sm">
                                {consultation.consultation_type === 'vastu' && (
                                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 mt-1">
                                    Vastu Nirnaya - Gurukula Vaidhik Trust
                                  </Badge>
                                )}
                              </CardDescription>
                            </div>
                          </div>
                          {getStatusBadge(consultation.status)}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-orange-600" />
                            <span className="text-slate-700">
                              {format(new Date(consultation.preferred_date), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-orange-600" />
                            <span className="text-slate-700">{consultation.preferred_time}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-orange-600" />
                            <span className="text-slate-700">{consultation.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-orange-600" />
                            <span className="text-slate-700">{consultation.phone}</span>
                          </div>
                        </div>

                        {consultation.message && (
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <MessageSquare className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-slate-700 mb-1">Your Message:</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{consultation.message}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 border-t border-slate-100">
                          <p className="text-xs text-slate-500">
                            Booked on {format(new Date(consultation.created_at), 'MMM dd, yyyy • hh:mm a')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="lotus-shadow border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">Profile Information</CardTitle>
                  <CardDescription>
                    Your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                      <Mail className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Email Address</p>
                        <p className="text-slate-600">{user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Member Since</p>
                        <p className="text-slate-600">
                          {user?.created_at ? format(new Date(user.created_at), 'MMMM yyyy') : 'Recently joined'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                      <Star className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Total Consultations</p>
                        <p className="text-slate-600">{consultations.length} sessions</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start h-auto p-4" asChild>
                        <Link href="/consultations">
                          <div className="text-left">
                            <div className="flex items-center space-x-2 mb-1">
                              <Plus className="h-4 w-4" />
                              <span className="font-medium">Book New Session</span>
                            </div>
                            <p className="text-sm text-slate-600">Schedule another consultation</p>
                          </div>
                        </Link>
                      </Button>
                      
                      <Button variant="outline" className="justify-start h-auto p-4" asChild>
                        <Link href="/stotras">
                          <div className="text-left">
                            <div className="flex items-center space-x-2 mb-1">
                              <MessageSquare className="h-4 w-4" />
                              <span className="font-medium">Explore Stotras</span>
                            </div>
                            <p className="text-sm text-slate-600">Find spiritual remedies</p>
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}