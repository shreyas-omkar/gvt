/*
  # Create stotras table for spiritual remedies

  1. New Tables
    - `stotras`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `content` (text, required - the actual stotra/mantra text)
      - `category` (text, required)
      - `symptoms` (text array, for matching user needs)
      - `benefits` (text array, what this stotra provides)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `stotras` table
    - Add policy for public read access (anyone can view stotras)
    - Add policy for admin write access (only admins can manage stotras)

  3. Indexes
    - Index on category for filtering
    - Full-text search index on title and description
    - GIN index on symptoms array for efficient array searches
*/

-- Create stotras table
CREATE TABLE IF NOT EXISTS public.stotras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  symptoms text[] DEFAULT '{}',
  benefits text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stotras ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS stotras_category_idx ON public.stotras(category);
CREATE INDEX IF NOT EXISTS stotras_symptoms_idx ON public.stotras USING GIN(symptoms);
CREATE INDEX IF NOT EXISTS stotras_benefits_idx ON public.stotras USING GIN(benefits);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS stotras_search_idx ON public.stotras 
USING GIN(to_tsvector('english', title || ' ' || description || ' ' || array_to_string(symptoms, ' ')));

-- Policies for stotras table
CREATE POLICY "Anyone can view stotras"
  ON public.stotras
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage stotras"
  ON public.stotras
  FOR ALL
  TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());

-- Function to handle stotra updates
CREATE OR REPLACE FUNCTION public.handle_stotra_update()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS stotras_updated_at ON public.stotras;
CREATE TRIGGER stotras_updated_at
  BEFORE UPDATE ON public.stotras
  FOR EACH ROW EXECUTE FUNCTION public.handle_stotra_update();