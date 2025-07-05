/*
  # Create consultations table

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `consultation_type` (enum: 'astrology' or 'vastu')
      - `preferred_date` (date, required)
      - `preferred_time` (text, required)
      - `message` (text, optional)
      - `status` (enum: 'pending', 'confirmed', 'completed', 'cancelled')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `consultations` table
    - Add policy for users to view their own consultations
    - Add policy for users to insert their own consultations
    - Add policy for admins to access all consultations

  3. Indexes
    - Index on user_id for faster queries
    - Index on status for admin filtering
    - Index on consultation_type for filtering
*/

-- Create consultation_type enum
CREATE TYPE consultation_type AS ENUM ('astrology', 'vastu');

-- Create consultation_status enum
CREATE TYPE consultation_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create consultations table
CREATE TABLE IF NOT EXISTS public.consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  consultation_type consultation_type NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text,
  status consultation_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS consultations_user_id_idx ON public.consultations(user_id);
CREATE INDEX IF NOT EXISTS consultations_status_idx ON public.consultations(status);
CREATE INDEX IF NOT EXISTS consultations_type_idx ON public.consultations(consultation_type);
CREATE INDEX IF NOT EXISTS consultations_date_idx ON public.consultations(preferred_date);

-- Policies for consultations table
CREATE POLICY "Users can view their own consultations"
  ON public.consultations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consultations"
  ON public.consultations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consultations"
  ON public.consultations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can access all consultations"
  ON public.consultations
  FOR ALL
  TO authenticated
  USING (is_admin_user());

-- Function to handle consultation updates
CREATE OR REPLACE FUNCTION public.handle_consultation_update()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS consultations_updated_at ON public.consultations;
CREATE TRIGGER consultations_updated_at
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.handle_consultation_update();