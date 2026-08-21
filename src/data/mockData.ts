export type Activity = 'Strength Training' | 'Cardio' | 'CrossFit' | 'Yoga' | 'HIIT' | 'Weight Loss';
export type Allergy = 'None' | 'Milk/Dairy' | 'Nuts' | 'Eggs' | 'Soy' | 'Gluten' | 'Other';
export type Goal = 'Muscle Gain' | 'Weight Loss' | 'Strength' | 'Fitness' | 'Endurance';
export type Equipment = 'None' | 'Dumbbells' | 'Resistance Bands' | 'Treadmill' | 'Full Home Gym' | 'Other';

export const ACTIVITIES: Activity[] = ['Strength Training', 'Cardio', 'CrossFit', 'Yoga', 'HIIT', 'Weight Loss'];
export const ALLERGIES: Allergy[] = ['None', 'Milk/Dairy', 'Nuts', 'Eggs', 'Soy', 'Gluten', 'Other'];
export const GOALS: Goal[] = ['Muscle Gain', 'Weight Loss', 'Strength', 'Fitness', 'Endurance'];
export const EQUIPMENT: Equipment[] = ['None', 'Dumbbells', 'Resistance Bands', 'Treadmill', 'Full Home Gym', 'Other'];

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  certifications: string[];
  bio: string;
  image: string;
  rating: number;
  clients: number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  duration: string;
  features: string[];
  services: string[];
  recommended: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  discount?: number;
  popular?: boolean;
  inStock: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  feedback: string;
  image: string;
  date: string;
}

export interface MealPlan {
  id: string;
  goal: string;
  title: string;
  description: string;
  meals: {
    type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
    items: string[];
  }[];
  image: string;
}

export interface AllergyAlternative {
  allergy: string;
  avoid: string[];
  alternatives: string[];
}

export interface HomeWorkout {
  id: string;
  name: string;
  type: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: string;
  equipment: string;
  duration: number;
  exercises: string[];
  image: string;
  calories: number;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  workouts: number;
  calories: number;
  streak: number;
  avatar: string;
  attendance: number;
  participation: number;
  consistency: number;
  consistentTopPerformer: boolean;
}

export const trainers: Trainer[] = [
  {
    id: 't1',
    name: 'Marcus Reid',
    specialization: 'Strength & Powerlifting',
    experience: '12 years',
    certifications: ['NSCA-CSCS', 'USAW Level 2', 'Precision Nutrition L1'],
    bio: 'Former national powerlifting champion turned coach. Marcus specializes in building raw strength through progressive overload and technique mastery. He has helped over 300 clients hit personal records they never thought possible.',
    image: 'https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.9,
    clients: 312,
  },
  {
    id: 't2',
    name: 'Elena Vasquez',
    specialization: 'HIIT & CrossFit',
    experience: '9 years',
    certifications: ['CrossFit L3', 'NASM-CPT', 'ACE Group Fitness'],
    bio: 'CrossFit Games regional competitor with a passion for high-intensity functional training. Elena brings energy and precision to every session, pushing clients beyond their perceived limits safely.',
    image: 'https://images.pexels.com/photos/13451904/pexels-photo-13451904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    clients: 245,
  },
  {
    id: 't3',
    name: 'David Chen',
    specialization: 'Nutrition & Body Recomposition',
    experience: '10 years',
    certifications: ['RD (Registered Dietitian)', 'Precision Nutrition L2', 'ISSN Certified'],
    bio: 'Registered dietitian and body recomposition specialist. David blends evidence-based nutrition science with practical coaching to help clients build sustainable habits that last a lifetime.',
    image: 'https://images.pexels.com/photos/17706040/pexels-photo-17706040.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 5.0,
    clients: 198,
  },
  {
    id: 't4',
    name: 'Aisha Johnson',
    specialization: 'Yoga & Mobility',
    experience: '8 years',
    certifications: ['RYT-500', 'FRC Mobility Specialist', 'NASM Corrective Exercise'],
    bio: '500-hour registered yoga teacher and mobility specialist. Aisha helps clients move better, recover faster, and build a resilient body through mindful movement and corrective exercise.',
    image: 'https://images.pexels.com/photos/21633393/pexels-photo-21633393.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.9,
    clients: 276,
  },
  {
    id: 't5',
    name: 'Tom Bradley',
    specialization: 'Weight Loss & Conditioning',
    experience: '15 years',
    certifications: ['ACE Certified', 'TRX Qualified', 'Kettlebell Specialist'],
    bio: 'With 15 years of experience, Tom has guided hundreds of clients through dramatic weight-loss transformations. His approach combines smart programming with accountability and motivation.',
    image: 'https://images.pexels.com/photos/10551491/pexels-photo-10551491.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    clients: 389,
  },
  {
    id: 't6',
    name: 'Sofia Martinez',
    specialization: 'Endurance & Cardio',
    experience: '7 years',
    certifications: ['NASM-CPT', 'RRCA Running Coach', 'USAT Triathlon Coach'],
    bio: 'Marathon runner and triathlon coach. Sofia designs cardio programs that build aerobic capacity, endurance, and mental toughness for athletes of all levels.',
    image: 'https://images.pexels.com/photos/30165254/pexels-photo-30165254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    clients: 167,
  },
];

export const facilities: Facility[] = [
  {
    id: 'f1',
    name: 'Strength Training Area',
    description: 'Olympic-grade racks, plates, and free weights across 4,000 sq ft of dedicated strength space.',
    image: 'https://images.pexels.com/photos/6389886/pexels-photo-6389886.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Dumbbell',
  },
  {
    id: 'f2',
    name: 'Cardio Zone',
    description: '30+ machines including treadmills, rowers, assault bikes, and ellipticals with personal screens.',
    image: 'https://images.pexels.com/photos/5327543/pexels-photo-5327543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'HeartPulse',
  },
  {
    id: 'f3',
    name: 'Functional Training Area',
    description: 'Open turf space with sleds, kettlebells, battle ropes, and plyo boxes for dynamic training.',
    image: 'https://images.pexels.com/photos/4753885/pexels-photo-4753885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Activity',
  },
  {
    id: 'f4',
    name: 'CrossFit Area',
    description: 'Dedicated CrossFit box with rig, bumper plates, climbing ropes, and competition-grade equipment.',
    image: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Flame',
  },
  {
    id: 'f5',
    name: 'Locker Rooms',
    description: 'Premium locker rooms with secure storage, fresh towels, and grooming stations.',
    image: 'https://images.pexels.com/photos/3931367/pexels-photo-3931367.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Lock',
  },
  {
    id: 'f6',
    name: 'Showers & Spa',
    description: 'Rainfall showers, sauna, and steam room for post-workout recovery and relaxation.',
    image: 'https://images.pexels.com/photos/3999606/pexels-photo-3999606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Droplets',
  },
  {
    id: 'f7',
    name: 'Personal Training Area',
    description: 'Private semi-enclosed PT stations for focused 1-on-1 coaching without distractions.',
    image: 'https://images.pexels.com/photos/6389893/pexels-photo-6389893.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'UserRound',
  },
  {
    id: 'f8',
    name: 'Nutrition Consultation Area',
    description: 'Dedicated space for nutrition coaching, body composition analysis, and meal planning sessions.',
    image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Apple',
  },
];

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 29,
    yearlyPrice: 290,
    duration: 'Monthly / Yearly',
    features: [
      'Full gym floor access',
      'Locker room access',
      '2 group classes per week',
      'Fitness assessment (monthly)',
      'Mobile app access',
    ],
    services: ['Gym Access', 'App Tracking', 'Group Classes (2/wk)'],
    recommended: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    monthlyPrice: 49,
    yearlyPrice: 490,
    duration: 'Monthly / Yearly',
    features: [
      'Everything in Basic',
      'Unlimited group classes',
      '1 personal training session / month',
      'Nutrition consultation (quarterly)',
      'Body composition analysis',
      'Guest passes (2 per month)',
    ],
    services: ['All Basic', 'Unlimited Classes', '1 PT Session/mo', 'Nutrition Consult'],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 89,
    yearlyPrice: 890,
    duration: 'Monthly / Yearly',
    features: [
      'Everything in Standard',
      '4 personal training sessions / month',
      'Weekly nutrition coaching',
      'Recovery zone access (sauna, steam)',
      'Priority class booking',
      'Unlimited guest passes',
      'Custom workout programming',
    ],
    services: ['All Standard', '4 PT Sessions/mo', 'Weekly Nutrition', 'Recovery Zone'],
    recommended: false,
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'FitSync Whey Protein Isolate',
    description: '27g protein per scoop. Ultra-clean, fast-absorbing whey isolate.',
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.8,
    reviews: 1243,
    category: 'Supplements',
    image: 'https://images.pexels.com/photos/13779103/pexels-photo-13779103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 23,
    popular: true,
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Protein Bars (12 Pack)',
    description: '20g protein, low sugar. Perfect on-the-go fuel.',
    price: 29.99,
    rating: 4.6,
    reviews: 856,
    category: 'Supplements',
    image: 'https://images.pexels.com/photos/13779116/pexels-photo-13779116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    popular: true,
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Creatine Monohydrate',
    description: '5g pure creatine per serving. Boost power and strength.',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviews: 2104,
    category: 'Supplements',
    image: 'https://images.pexels.com/photos/13787643/pexels-photo-13787643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 29,
    inStock: true,
  },
  {
    id: 'p4',
    name: 'FitSync Shaker Bottle',
    description: '700ml leak-proof shaker with mixing ball. BPA-free.',
    price: 12.99,
    rating: 4.5,
    reviews: 643,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/16412053/pexels-photo-16412053.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Pro Gym Gloves',
    description: 'Breathable, padded palms with wrist support. Size S-XL.',
    price: 19.99,
    originalPrice: 27.99,
    rating: 4.4,
    reviews: 421,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/6824816/pexels-photo-6824816.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 29,
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Resistance Bands Set',
    description: '5-level progressive resistance bands with door anchor.',
    price: 22.99,
    rating: 4.7,
    reviews: 987,
    category: 'Equipment',
    image: 'https://images.pexels.com/photos/28970127/pexels-photo-28970127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    popular: true,
    inStock: true,
  },
  {
    id: 'p7',
    name: 'Premium Yoga Mat',
    description: '6mm thick, non-slip, eco-friendly TPE. Includes carry strap.',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviews: 732,
    category: 'Equipment',
    image: 'https://images.pexels.com/photos/31470217/pexels-photo-31470217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 22,
    inStock: true,
  },
  {
    id: 'p8',
    name: 'FitSync Gym T-Shirt',
    description: 'Moisture-wicking, athletic fit. Available in 4 colors.',
    price: 27.99,
    rating: 4.6,
    reviews: 512,
    category: 'Apparel',
    image: 'https://images.pexels.com/photos/8436580/pexels-photo-8436580.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    inStock: true,
  },
  {
    id: 'p9',
    name: 'Gym Shorts',
    description: 'Lightweight 5-inch inseam with built-in liner. Black.',
    price: 24.99,
    rating: 4.5,
    reviews: 389,
    category: 'Apparel',
    image: 'https://images.pexels.com/photos/8436580/pexels-photo-8436580.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    inStock: true,
  },
  {
    id: 'p10',
    name: 'Insulated Water Bottle',
    description: '1L stainless steel, keeps cold 24hrs. Flip-top lid.',
    price: 18.99,
    originalPrice: 25.99,
    rating: 4.7,
    reviews: 1102,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/16412053/pexels-photo-16412053.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 27,
    popular: true,
    inStock: true,
  },
  {
    id: 'p11',
    name: 'Gym Accessories Bundle',
    description: 'Lifting straps, knee sleeves, and lifting belt combo.',
    price: 59.99,
    originalPrice: 84.99,
    rating: 4.6,
    reviews: 278,
    category: 'Equipment',
    image: 'https://images.pexels.com/photos/19025674/pexels-photo-19025674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 29,
    inStock: true,
  },
  {
    id: 'p12',
    name: 'Pre-Workout Formula',
    description: '200mg caffeine, beta-alanine, citrulline. 30 servings.',
    price: 39.99,
    rating: 4.5,
    reviews: 654,
    category: 'Supplements',
    image: 'https://images.pexels.com/photos/13779108/pexels-photo-13779108.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    inStock: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'r1',
    name: 'James Mitchell',
    role: 'Member since 2022',
    rating: 5,
    feedback: 'FitSync completely transformed my approach to fitness. The trainers are world-class and the facilities are spotless. I went from never lifting to deadlifting 405lbs in 8 months.',
    image: 'https://images.pexels.com/photos/20240046/pexels-photo-20240046.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2024-09-15',
  },
  {
    id: 'r2',
    name: 'Sarah Kim',
    role: 'Member since 2023',
    rating: 5,
    feedback: 'The nutrition coaching changed everything. I lost 30 pounds while actually eating more food than before. The meal plans are realistic and the allergy alternatives were a lifesaver.',
    image: 'https://images.pexels.com/photos/416747/pexels-photo-416747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2024-08-22',
  },
  {
    id: 'r3',
    name: 'Michael Torres',
    role: 'Member since 2021',
    rating: 5,
    feedback: 'I travel a lot for work and the Home Mode feature is incredible. I never miss a workout because I can follow my plan from any hotel room. Best gym decision I ever made.',
    image: 'https://images.pexels.com/photos/14085134/pexels-photo-14085134.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2024-10-01',
  },
  {
    id: 'r4',
    name: 'Priya Sharma',
    role: 'Member since 2023',
    rating: 4,
    feedback: 'The yoga and mobility classes with Aisha are amazing. I came in with chronic back pain and within 3 months I was pain-free and more flexible than I have been in years.',
    image: 'https://images.pexels.com/photos/4379292/pexels-photo-4379292.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2024-07-18',
  },
  {
    id: 'r5',
    name: 'Robert Chen',
    role: 'Member since 2020',
    rating: 5,
    feedback: 'The crowd indicator feature is a game-changer. I can check how busy the gym is before I even leave my house. No more waiting for equipment during peak hours.',
    image: 'https://images.pexels.com/photos/12600523/pexels-photo-12600523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2024-09-30',
  },
  {
    id: 'r6',
    name: 'Emily Davis',
    role: 'Member since 2024',
    rating: 5,
    feedback: 'As a beginner I was intimidated, but the onboarding process made me feel confident from day one. The First Week Plan Preview took all the guesswork out of getting started.',
    image: 'https://images.pexels.com/photos/38453215/pexels-photo-38453215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    date: '2024-10-10',
  },
];

export const mealPlans: MealPlan[] = [
  {
    id: 'm1',
    goal: 'Muscle Gain',
    title: 'Muscle Gain Meal Plan',
    description: 'High-protein, calorie-surplus plan designed to build lean muscle mass.',
    image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    meals: [
      { type: 'Breakfast', items: ['Greek yogurt with honey & granola', '3 scrambled eggs with spinach', '1 cup oatmeal with banana', 'Whole wheat toast with peanut butter'] },
      { type: 'Lunch', items: ['Grilled chicken breast (8oz)', 'Brown rice (1.5 cups)', 'Steamed broccoli with olive oil', 'Mixed green salad with avocado'] },
      { type: 'Dinner', items: ['Grilled salmon (8oz)', 'Sweet potato (large)', 'Roasted asparagus', 'Quinoa salad with chickpeas'] },
      { type: 'Snacks', items: ['Whey protein shake with banana', 'Handful of almonds & walnuts', 'Cottage cheese with pineapple', 'Protein bar'] },
    ],
  },
  {
    id: 'm2',
    goal: 'Weight Loss',
    title: 'Weight Loss Meal Plan',
    description: 'Calorie-controlled, high-fiber plan to support fat loss while preserving muscle.',
    image: 'https://images.pexels.com/photos/1591226/pexels-photo-1591226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    meals: [
      { type: 'Breakfast', items: ['Spinach & mushroom omelette (2 eggs)', 'Mixed berry bowl', 'Black coffee or green tea', '1 slice whole grain toast'] },
      { type: 'Lunch', items: ['Grilled chicken salad (6oz)', 'Mixed greens, cucumber, tomato', 'Balsamic vinaigrette (light)', '1/2 cup quinoa'] },
      { type: 'Dinner', items: ['Baked cod (6oz)', 'Steamed zucchini & bell peppers', 'Cauliflower rice', 'Side salad with lemon dressing'] },
      { type: 'Snacks', items: ['Apple slices with almond butter', 'Carrot & celery sticks with hummus', 'Green tea', 'Handful of blueberries'] },
    ],
  },
  {
    id: 'm3',
    goal: 'Fitness',
    title: 'Balanced Fitness Meal Plan',
    description: 'Balanced macros for overall fitness, energy, and performance.',
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    meals: [
      { type: 'Breakfast', items: ['Avocado toast with poached eggs', 'Fresh fruit smoothie bowl', 'Greek yogurt with chia seeds', 'Whole grain cereal with almond milk'] },
      { type: 'Lunch', items: ['Turkey & avocado wrap (whole wheat)', 'Side salad with mixed greens', 'Hummus with pita triangles', 'Fresh orange'] },
      { type: 'Dinner', items: ['Grilled chicken with quinoa', 'Roasted vegetable medley', 'Side of black beans', 'Mixed green salad'] },
      { type: 'Snacks', items: ['Trail mix with dried fruit', 'Rice cakes with peanut butter', 'Fresh vegetable juice', 'Handful of grapes'] },
    ],
  },
];

export const allergyAlternatives: AllergyAlternative[] = [
  {
    allergy: 'Milk/Dairy',
    avoid: ['Greek yogurt', 'Cottage cheese', 'Whey protein'],
    alternatives: ['Coconut yogurt', 'Almond milk protein shake', 'Plant-based protein (pea/rice)', 'Cashew-based cheese', 'Oat milk smoothie'],
  },
  {
    allergy: 'Nuts',
    avoid: ['Almond butter', 'Trail mix with nuts', 'Peanut butter'],
    alternatives: ['Sunflower seed butter', 'Pumpkin seeds', 'Roasted chickpeas', 'Hemp seeds', 'Coconut-based snacks'],
  },
  {
    allergy: 'Eggs',
    avoid: ['Scrambled eggs', 'Omelette', 'Poached eggs'],
    alternatives: ['Tofu scramble', 'Chia seed pudding', 'Banana-flax egg replacer', 'Chickpea flour omelette', 'Silken tofu smoothie'],
  },
  {
    allergy: 'Soy',
    avoid: ['Tofu', 'Edamame', 'Soy milk'],
    alternatives: ['Tempeh (if tolerated)', 'Pea protein', 'Coconut aminos instead of soy sauce', 'Hemp tofu', 'Lupini beans'],
  },
  {
    allergy: 'Gluten',
    avoid: ['Whole wheat toast', 'Cereal with wheat', 'Pita triangles'],
    alternatives: ['Gluten-free oats', 'Quinoa porridge', 'Rice cakes', 'Buckwheat pancakes', 'Brown rice wraps'],
  },
];

export const homeWorkouts: HomeWorkout[] = [
  {
    id: 'h1',
    name: 'Full Body Bodyweight Blast',
    type: 'No-Equipment',
    level: 'Beginner',
    goal: 'Fitness',
    equipment: 'None',
    duration: 20,
    calories: 180,
    exercises: ['Jumping jacks (45s)', 'Bodyweight squats x15', 'Push-ups x10', 'Plank hold 30s', 'Mountain climbers 30s', 'High knees 30s'],
    image: 'https://images.pexels.com/photos/23224739/pexels-photo-23224739.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'h2',
    name: 'HIIT Inferno',
    type: 'HIIT',
    level: 'Advanced',
    goal: 'Weight Loss',
    equipment: 'None',
    duration: 25,
    calories: 320,
    exercises: ['Burpees x12', 'Jump squats x15', 'Plank to push-up x10', 'Bicycle crunches x20', 'Jumping lunges x12 each', 'Rest 30s, repeat 4 rounds'],
    image: 'https://images.pexels.com/photos/8173423/pexels-photo-8173423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'h3',
    name: 'Dumbbell Strength Builder',
    type: 'Strength',
    level: 'Intermediate',
    goal: 'Muscle Gain',
    equipment: 'Dumbbells',
    duration: 40,
    calories: 250,
    exercises: ['Dumbbell goblet squats x12', 'DB bench press x10', 'DB rows x12 each', 'DB shoulder press x10', 'DB Romanian deadlift x12', 'DB bicep curls x12'],
    image: 'https://images.pexels.com/photos/4379292/pexels-photo-4379292.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'h4',
    name: 'Cardio Sweat Session',
    type: 'Cardio',
    level: 'Intermediate',
    goal: 'Weight Loss',
    equipment: 'None',
    duration: 30,
    calories: 290,
    exercises: ['Jump rope 60s', 'High knees 45s', 'Burpees x10', 'Mountain climbers 45s', 'Jumping jacks 60s', 'Rest 30s, repeat 5 rounds'],
    image: 'https://images.pexels.com/photos/7901503/pexels-photo-7901503.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'h5',
    name: 'Morning Mobility Flow',
    type: 'Mobility',
    level: 'Beginner',
    goal: 'Fitness',
    equipment: 'None',
    duration: 15,
    calories: 80,
    exercises: ['Cat-cow stretch x10', 'Downward dog hold 30s', 'World\'s greatest stretch x5 each', 'Hip circles x10 each', 'Child\'s pose hold 45s', 'Cobra stretch x8'],
    image: 'https://images.pexels.com/photos/8436580/pexels-photo-8436580.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'h6',
    name: 'Band Resistance Burn',
    type: 'Strength',
    level: 'Intermediate',
    goal: 'Strength',
    equipment: 'Resistance Bands',
    duration: 35,
    calories: 210,
    exercises: ['Band squats x15', 'Band chest press x12', 'Band rows x15', 'Band lateral raises x12', 'Band bicep curls x15', 'Band tricep extensions x12'],
    image: 'https://images.pexels.com/photos/28970127/pexels-photo-28970127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'h7',
    name: 'Core Crusher Express',
    type: 'No-Equipment',
    level: 'Beginner',
    goal: 'Fitness',
    equipment: 'None',
    duration: 12,
    calories: 100,
    exercises: ['Plank hold 45s', 'Bicycle crunches x20', 'Russian twists x20', 'Leg raises x12', 'Side plank 30s each', 'Dead bug x10 each'],
    image: 'https://images.pexels.com/photos/8173429/pexels-photo-8173429.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'h8',
    name: 'Treadmill Interval Burn',
    type: 'Cardio',
    level: 'Advanced',
    goal: 'Endurance',
    equipment: 'Treadmill',
    duration: 30,
    calories: 350,
    exercises: ['5 min warm-up walk', 'Sprint 60s / Walk 60s x8', 'Incline walk 3 min', 'Sprint 45s / Jog 45s x6', '5 min cool-down walk'],
    image: 'https://images.pexels.com/photos/5327543/pexels-photo-5327543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'h9',
    name: 'Beginner Full-Body Flow',
    type: 'No-Equipment',
    level: 'Beginner',
    goal: 'Muscle Gain',
    equipment: 'None',
    duration: 25,
    calories: 160,
    exercises: ['Wall push-ups x12', 'Chair squats x12', 'Glute bridges x15', 'Knee push-ups x8', 'Bird dog x10 each', 'Standing marches x20'],
    image: 'https://images.pexels.com/photos/10815903/pexels-photo-10815903.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { id: 'l1', rank: 1, name: 'Alex Rivera', workouts: 42, calories: 18400, streak: 28, avatar: 'AR', attendance: 95, participation: 88, consistency: 92, consistentTopPerformer: true },
  { id: 'l2', rank: 2, name: 'Sam Carter', workouts: 38, calories: 16200, streak: 21, avatar: 'SC', attendance: 88, participation: 82, consistency: 85, consistentTopPerformer: true },
  { id: 'l3', rank: 3, name: 'Jordan Lee', workouts: 35, calories: 15100, streak: 19, avatar: 'JL', attendance: 82, participation: 78, consistency: 80, consistentTopPerformer: true },
  { id: 'l4', rank: 4, name: 'Taylor Swift', workouts: 31, calories: 13800, streak: 15, avatar: 'TS', attendance: 75, participation: 70, consistency: 72, consistentTopPerformer: false },
  { id: 'l5', rank: 5, name: 'Morgan Bell', workouts: 28, calories: 12400, streak: 12, avatar: 'MB', attendance: 68, participation: 65, consistency: 60, consistentTopPerformer: false },
  { id: 'l6', rank: 6, name: 'Casey Stone', workouts: 25, calories: 11200, streak: 10, avatar: 'CS', attendance: 60, participation: 58, consistency: 50, consistentTopPerformer: false },
  { id: 'l7', rank: 7, name: 'Riley Park', workouts: 22, calories: 9800, streak: 8, avatar: 'RP', attendance: 55, participation: 50, consistency: 45, consistentTopPerformer: false },
  { id: 'l8', rank: 8, name: 'Drew Kelly', workouts: 19, calories: 8400, streak: 6, avatar: 'DK', attendance: 48, participation: 42, consistency: 38, consistentTopPerformer: false },
];

export const gymTimings = [
  { day: 'Monday - Friday', hours: '5:00 AM - 11:00 PM' },
  { day: 'Saturday', hours: '6:00 AM - 10:00 PM' },
  { day: 'Sunday', hours: '7:00 AM - 9:00 PM' },
  { day: 'Holidays', hours: '8:00 AM - 6:00 PM' },
];

export const productCategories = ['All', 'Supplements', 'Equipment', 'Accessories', 'Apparel'];
