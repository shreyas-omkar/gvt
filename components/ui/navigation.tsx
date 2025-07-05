'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { 
  Star, 
  Globe, 
  Book, 
  Calendar, 
  User, 
  Menu, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
type SupaUser = Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user'];
export function Navigation() {
  const [user, setUser] = useState<SupaUser>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  const navigationItems = [
    { href: '/', label: 'Home', icon: Sparkles },
    { href: '/about', label: 'About', icon: User },
    { href: '/consultations', label: 'Consultations', icon: Calendar },
    { href: '/stotras', label: 'Stotras', icon: Book },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-slate-800">Gurukula Vaidhik Trust</div>
              <div className="text-xs text-slate-600">Ancient Wisdom • Modern Living</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive('/') && "bg-accent text-accent-foreground"
                    )}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-50 to-yellow-50 p-6 no-underline outline-none focus:shadow-md"
                            href="/consultations"
                          >
                            <Star className="h-6 w-6 text-orange-600" />
                            <div className="mb-2 mt-4 text-lg font-medium text-slate-800">
                              Book Consultation
                            </div>
                            <p className="text-sm leading-tight text-slate-600">
                              Schedule your personalized spiritual guidance session
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/consultations?type=astrology"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-orange-600" />
                            <div className="text-sm font-medium leading-none">Vedic Astrology</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Personal horoscope analysis and life guidance
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/consultations?type=vastu"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-blue-600" />
                            <div className="text-sm font-medium leading-none">Vastu Nirnaya</div>
                          </div>
                          <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 mb-1">
                            Gurukula Vaidhik Trust
                          </Badge>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Space energy alignment and prosperity enhancement
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/stotras" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive('/stotras') && "bg-accent text-accent-foreground"
                    )}>
                      Stotras
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive('/about') && "bg-accent text-accent-foreground"
                    )}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600" asChild>
                  <Link href="/consultations">Book Now</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Gurukula Vaidhik Trust</div>
                      <div className="text-xs text-slate-600">Ancient Wisdom • Modern Living</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            isActive(item.href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t pt-6 space-y-3">
                    {user ? (
                      <>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                            <User className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/auth" onClick={() => setIsOpen(false)}>
                            Sign In
                          </Link>
                        </Button>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600" asChild>
                          <Link href="/consultations" onClick={() => setIsOpen(false)}>
                            Book Consultation
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}