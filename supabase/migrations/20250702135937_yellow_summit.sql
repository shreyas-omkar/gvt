/*
  # Insert sample stotras data

  1. Sample Data
    - Insert the stotras that are currently hardcoded in the frontend
    - This will populate the database with initial spiritual remedies
    - Categories include: Obstacle Removal, Wealth & Prosperity, Strength & Protection, etc.

  2. Data Structure
    - Each stotra includes title, description, content, category, symptoms, and benefits
    - Symptoms help users find relevant stotras based on their situation
    - Benefits describe what the stotra provides
*/

-- Insert sample stotras
INSERT INTO public.stotras (title, description, content, category, symptoms, benefits) VALUES
(
  'Ganesha Stotra',
  'Remove obstacles and bring prosperity to your endeavors',
  'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥

Vakratunda Mahakaya Suryakoti Samaprabha
Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada

Translation: O Lord Ganesha, with a curved trunk, large body, and the brilliance of million suns, please make all my endeavors free of obstacles.',
  'Obstacle Removal',
  ARRAY['Facing obstacles', 'Lack of success', 'New beginnings'],
  ARRAY['Removes obstacles', 'Brings prosperity', 'Enhances wisdom']
),
(
  'Lakshmi Stotra',
  'Invoke abundance, wealth, and prosperity in your life',
  'सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके।
शरण्ये त्र्यम्बके गौरि नारायणि नमोस्तुते॥

Sarvamangala Mangalye Shive Sarvartha Sadhike
Sharanye Tryambake Gauri Narayani Namostute

Translation: O auspicious one, O Shiva, O fulfiller of all desires, O protector, O three-eyed one, O fair one, O Narayani, I bow to you.',
  'Wealth & Prosperity',
  ARRAY['Financial difficulties', 'Lack of abundance', 'Career stagnation'],
  ARRAY['Attracts wealth', 'Brings prosperity', 'Enhances fortune']
),
(
  'Hanuman Chalisa',
  'Gain strength, courage, and protection from negative energies',
  'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।
बरनउं रघुबर बिमल जसु जो दायकु फल चारि॥

हनुमान जी की आरती और चालीसा का पाठ करने से मन में शक्ति और साहस का संचार होता है।',
  'Strength & Protection',
  ARRAY['Fear and anxiety', 'Lack of confidence', 'Negative influences'],
  ARRAY['Increases courage', 'Provides protection', 'Removes fear']
),
(
  'Saraswati Stotra',
  'Enhance knowledge, wisdom, and creative abilities',
  'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि।
विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥

Saraswati Namastubhyam Varade Kamarupini
Vidyarambham Karishyami Siddhirbhavatu Me Sada

Translation: O Goddess Saraswati, I bow to you who grants boons and fulfills desires. I am beginning my studies, may I always be blessed with success.',
  'Knowledge & Wisdom',
  ARRAY['Lack of focus', 'Learning difficulties', 'Creative blocks'],
  ARRAY['Enhances learning', 'Improves memory', 'Boosts creativity']
),
(
  'Shiva Stotra',
  'Find inner peace, spiritual growth, and liberation',
  'नमः शिवाय च शिवतराय च।
नमः शिवाय च शिवतमाय च॥

Namah Shivaya Cha Shivataraya Cha
Namah Shivaya Cha Shivatamaya Cha

Translation: Salutations to Shiva, to the most auspicious, salutations to Shiva, to the supremely auspicious.',
  'Spiritual Growth',
  ARRAY['Spiritual seeking', 'Inner turmoil', 'Seeking peace'],
  ARRAY['Spiritual elevation', 'Inner peace', 'Mental clarity']
),
(
  'Durga Stotra',
  'Overcome challenges and gain divine protection',
  'सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके।
शरण्ये त्र्यम्बके गौरि नारायणि नमोस्तुते॥

या देवी सर्वभूतेषु मातृरूपेण संस्थिता।
नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
  'Protection & Strength',
  ARRAY['Facing enemies', 'Need for protection', 'Overcoming difficulties'],
  ARRAY['Divine protection', 'Victory over enemies', 'Inner strength']
);