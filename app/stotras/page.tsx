'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Search, Book, ArrowLeft, Sparkles, Heart, Star, Sun, Moon, Bot as Lotus } from 'lucide-react';
import Link from 'next/link';

interface Stotra {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  symptoms: string[];
  benefits: string[];
  created_at: string;
}

const categories = [
  'All Categories',
  'Obstacle Removal',
  'Wealth & Prosperity', 
  'Strength & Protection',
  'Knowledge & Wisdom',
  'Spiritual Growth',
  'Protection & Strength'
];

export default function StotrasPage() {
  const [stotras, setStotras] = useState<Stotra[]>([]);
  const [filteredStotras, setFilteredStotras] = useState<Stotra[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [expandedStotra, setExpandedStotra] = useState<string | null>(null);
  const [availableSymptoms, setAvailableSymptoms] = useState<string[]>([]);

  useEffect(() => {
    fetchStotras();
  }, []);

  const fetchStotras = async () => {
    try {
      const { data, error } = await supabase
        .from('stotras')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStotras(data || []);
      setFilteredStotras(data || []);

      // Extract unique symptoms for the filter dropdown
      const allSymptoms = (data || []).flatMap(stotra => stotra.symptoms);
      const uniqueSymptoms = Array.from(new Set(allSymptoms)).sort();
      setAvailableSymptoms(uniqueSymptoms);
    } catch (error: any) {
      toast.error('Failed to load stotras');
      console.error('Error fetching stotras:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = stotras;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(stotra =>
        stotra.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stotra.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stotra.symptoms.some(symptom => 
          symptom.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(stotra => stotra.category === selectedCategory);
    }

    // Filter by symptom
    if (selectedSymptom) {
      filtered = filtered.filter(stotra =>
        stotra.symptoms.includes(selectedSymptom)
      );
    }

    setFilteredStotras(filtered);
  }, [searchTerm, selectedCategory, selectedSymptom, stotras]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Obstacle Removal': return <Star className="h-4 w-4" />;
      case 'Wealth & Prosperity': return <Sun className="h-4 w-4" />;
      case 'Strength & Protection': return <Sparkles className="h-4 w-4" />;
      case 'Knowledge & Wisdom': return <Book className="h-4 w-4" />;
      case 'Spiritual Growth': return <Lotus className="h-4 w-4" />;
      case 'Protection & Strength': return <Moon className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Obstacle Removal': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Wealth & Prosperity': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Strength & Protection': return 'bg-red-100 text-red-800 border-red-200';
      case 'Knowledge & Wisdom': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Spiritual Growth': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Protection & Strength': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-muted-foreground">Loading sacred stotras...</p>
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
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 lotus-shadow">
              <Book className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Sacred Stotras &
            <span className="text-purple-600"> Mantras</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover personalized spiritual remedies based on your life's challenges. 
            Find the perfect stotra or mantra to align your energy and manifest positive change.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <Card className="lotus-shadow border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800 flex items-center">
                <Search className="h-5 w-5 mr-2 text-purple-600" />
                Find Your Perfect Remedy
              </CardTitle>
              <CardDescription>
                Search by name, describe your situation, or browse by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search stotras, mantras, or describe your situation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">What are you experiencing?</label>
                  <Select value={selectedSymptom} onValueChange={setSelectedSymptom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your situation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Situations</SelectItem>
                      {availableSymptoms.map((symptom) => (
                        <SelectItem key={symptom} value={symptom}>
                          {symptom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters */}
              {(searchTerm || selectedCategory !== 'All Categories' || selectedSymptom) && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 hover:text-purple-600"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedCategory !== 'All Categories' && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('All Categories')}
                        className="ml-2 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedSymptom && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Situation: {selectedSymptom}
                      <button
                        onClick={() => setSelectedSymptom('')}
                        className="ml-2 hover:text-green-600"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto">
          {filteredStotras.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">No stotras found</h3>
                  <p className="text-slate-600">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All Categories');
                      setSelectedSymptom('');
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStotras.map((stotra) => (
                <Card key={stotra.id} className="group hover:shadow-2xl transition-all duration-300 border-0 lotus-shadow">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-slate-800 group-hover:text-purple-700 transition-colors">
                          {stotra.title}
                        </CardTitle>
                        <CardDescription className="mt-2 leading-relaxed">
                          {stotra.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex-shrink-0 ml-4">
                        {getCategoryIcon(stotra.category)}
                      </div>
                    </div>
                    
                    <Badge className={`w-fit text-xs ${getCategoryColor(stotra.category)}`}>
                      {stotra.category}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Symptoms */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Helps with:</h4>
                      <div className="flex flex-wrap gap-1">
                        {stotra.symptoms.slice(0, 3).map((symptom, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-slate-50 text-slate-600">
                            {symptom}
                          </Badge>
                        ))}
                        {stotra.symptoms.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">
                            +{stotra.symptoms.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-1">
                        {stotra.benefits.slice(0, 3).map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Expand/Collapse Content */}
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedStotra(
                          expandedStotra === stotra.id ? null : stotra.id
                        )}
                        className="w-full"
                      >
                        {expandedStotra === stotra.id ? 'Hide Text' : 'View Full Text'}
                      </Button>
                    </div>

                    {/* Expanded Content */}
                    {expandedStotra === stotra.id && (
                      <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border animate-fade-in">
                        <h4 className="font-medium text-slate-800 mb-3">Sacred Text:</h4>
                        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-mono">
                          {stotra.content}
                        </div>
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-xs text-yellow-800">
                            <strong>Practice Guide:</strong> Recite this stotra with devotion, preferably during morning or evening prayers. 
                            Light a diya or incense for enhanced spiritual energy.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-0 lotus-shadow">
            <CardContent className="py-12">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-slate-800">
                  Need Personalized Guidance?
                </h3>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Our experienced practitioners can recommend specific stotras and mantras 
                  tailored to your unique spiritual needs and life circumstances.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8" asChild>
                    <Link href="/consultations">
                      Book Spiritual Consultation
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8" asChild>
                    <Link href="/about">
                      Learn More About Our Approach
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}