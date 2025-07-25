'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Star, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkUserAndSync = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session fetch error:", error);
        return;
      }

      if (session?.user) {
        try {
          await fetch('/api/auth', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });
        } catch (err) {
          console.error('❌ Failed to sync user with backend:', err);
        }

        router.push('/dashboard');
      }
    };

    checkUserAndSync();
  }, [router]);


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone) {
      toast.error('Please enter both email and phone number');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: { phone },
        },
      });

      if (error) throw error;

      setMessage('Check your email for the magic link to sign in!');
      toast.success('Magic link sent to your email!');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="spiritual-gradient min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>

            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 lotus-shadow">
                <Star className="h-12 w-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access your spiritual journey dashboard
            </p>
          </div>

          <Card className="lotus-shadow border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl text-slate-800">Sacred Sign In</CardTitle>
              <CardDescription className="text-slate-600">
                Enter your details to receive a secure magic link
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {message && (
                  <Alert className="border-green-200 bg-green-50">
                    <Mail className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {message}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2 px-4 rounded-md font-medium transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Magic Link...
                    </div>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Magic Link
                    </>
                  )}
                </Button>
                <div className="my-6">
                  <Button
                    type="button"
                    onClick={async () => {
                      await supabase.auth.signInWithOAuth({
                        provider: 'google',
                        options: {
                          redirectTo: `${window.location.origin}/auth`, // After login
                        },
                      });
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md shadow-sm transition-all duration-200"
                  >
                    <FcGoogle size={20} />
                    <span className="font-medium">Continue with Google</span>
                  </Button>
                </div>

              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  No account needed - we'll create one for you automatically
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">🔒</div>
              <div className="text-sm text-slate-700 mt-1">Secure & Private</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">⚡</div>
              <div className="text-sm text-slate-700 mt-1">Instant Access</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
