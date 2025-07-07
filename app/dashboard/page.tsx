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
  Plus,
  CreditCard,
  Hash
} from 'lucide-react';
import Link from 'next/link';
import {
  getStatusBadge,
  getConsultationIcon,
  getConsultationTypeText
} from '@/lib/consultations';

interface Consultation {
  id: string;
  fullname?: string;
  email?: string;
  phone?: string;
  contact?: string;
  address?: string;
  consultation_type: 'astrology' | 'vastu';
  date?: string;
  time?: string;
  message?: string;
  detailed_message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at?: string;
  user_id: string;
  has_paid: boolean;
}

type SupaUser = Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user'];

export default function DashboardPage() {
  const [user, setUser] = useState<SupaUser>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserAndFetch = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        const { data: sessionData } = await supabase.auth.getSession();

        if (userError || !user || !sessionData?.session?.access_token) {
          router.push('/auth');
          return;
        }

        setUser(user);

        const res = await fetch(`/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`
          }
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to load consultations: ${errorText}`);
        }

        const data = await res.json();
        const processedConsultations = (data || []).map((consultation: any) => ({
          ...consultation,
          name: consultation.name || consultation.client_name || consultation.user_name || '',
          email: consultation.email || consultation.client_email || consultation.user_email || '',
          phone: consultation.phone || consultation.contact || consultation.phone_number || '',
          message: consultation.message || consultation.detailed_message || consultation.query || '',
        }));

        setConsultations(processedConsultations);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        toast.error('Failed to load consultations');
      } finally {
        setLoading(false);
      }
    };

    checkUserAndFetch();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!user) return;

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;

    if (!token) {
      toast.error('Not authenticated');
      return;
    }

    try {
      const res = await fetch('/api/dashboard', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || 'Failed to delete consultation');
        return;
      }

      toast.success('Consultation deleted');
      setConsultations((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while deleting');
    }
  };

  // Helper function to safely format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };

  // Helper function to safely format datetime
  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy • hh:mm a');
    } catch (error) {
      console.error('DateTime formatting error:', error);
      return dateString;
    }
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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <p className="text-red-600">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
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
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(consultation.status)}
                            {consultation.has_paid && (
                              <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50">
                                <CreditCard className="h-3 w-3 mr-1" />
                                Paid
                              </Badge>
                            )}
                            {consultation.status === 'pending' && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(consultation.id)}
                                className="mt-2"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Consultation ID */}
                        <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
                          <Hash className="h-3 w-3" />
                          <span>ID: {consultation.id}</span>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                          <h4 className="text-sm font-semibold text-slate-800 mb-2">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            {consultation.fullname && (
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-orange-600" />
                                <span className="text-slate-700 font-medium">{consultation.fullname}</span>
                              </div>
                            )}
                            {consultation.email && (
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-orange-600" />
                                <span className="text-slate-700">{consultation.email}</span>
                              </div>
                            )}
                            {consultation.phone && (
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-orange-600" />
                                <span className="text-slate-700">{consultation.phone}</span>
                              </div>
                            )}
                            {consultation.address && (
                              <div className="flex items-start space-x-2">
                                <Globe className="h-4 w-4 text-orange-600 mt-0.5" />
                                <span className="text-slate-700">{consultation.address}</span>
                              </div>
                            )}
                            {!consultation.fullname && !consultation.email && !consultation.phone && !consultation.address && (
                              <p className="text-slate-500 text-xs">Contact information not available</p>
                            )}
                          </div>
                        </div>

                        {/* Scheduled Date & Time */}
                        {(consultation.date || consultation.time) && (
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">Scheduled Session</span>
                            </div>
                            <div className="text-sm text-blue-700">
                              {consultation.date && (
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(consultation.date)}</span>
                                </div>
                              )}
                              {consultation.time && (
                                <div className="flex items-center space-x-2 mt-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{consultation.time}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Message/Query */}
                        {consultation.message && (
                          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-100">
                            <div className="flex items-start space-x-2">
                              <MessageSquare className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-slate-700 mb-1">Your Query:</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{consultation.message}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Payment Status */}
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-slate-600" />
                            <span className="text-sm font-medium text-slate-700">Payment Status</span>
                          </div>
                          <Badge variant={consultation.has_paid ? "default" : "secondary"} className={consultation.has_paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {consultation.has_paid ? "Paid" : "Pending"}
                          </Badge>
                        </div>

                        {/* Booking Information */}
                        <div className="pt-3 border-t border-slate-200">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Booked on {formatDateTime(consultation.created_at)}</span>
                            {consultation.updated_at && consultation.updated_at !== consultation.created_at && (
                              <span>Updated {formatDateTime(consultation.updated_at)}</span>
                            )}
                          </div>
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