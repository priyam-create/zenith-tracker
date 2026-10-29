/**
 * Zenith Life & Wellness OS - Production Standalone Engine
 * Zero external dependencies. Self-contained runtime.
 */
(function() {
  'use strict';

  // --- 1. Knowledge Bases & Demo State ---
  /**
 * Zenith Life & Wellness OS - Initial Sample Data & Knowledge Bases
 */

const MOTIVATIONAL_THOUGHTS = [
  {
    id: 1,
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
    category: "Resilience",
    context: "Turn friction into fuel. Obstacles are not detours; they are the path."
  },
  {
    id: 2,
    quote: "We do not rise to the level of our goals. We fall to the level of our systems.",
    author: "James Clear",
    category: "Discipline",
    context: "Focus on the atomic routine today. The outcome will follow the architecture."
  },
  {
    id: 3,
    quote: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    category: "Purpose",
    context: "Clarify your core conviction. Everything else is just logistics."
  },
  {
    id: 4,
    quote: "Between stimulus and response there is a space. In that space is our power to choose our response.",
    author: "Viktor E. Frankl",
    category: "Mindfulness",
    context: "Pause before reacting. Your freedom lives in that microsecond."
  },
  {
    id: 5,
    quote: "No man is free who is not master of himself.",
    author: "Epictetus",
    category: "Mastery",
    context: "True autonomy is self-governance in small, repetitive moments."
  },
  {
    id: 6,
    quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: "Clarity",
    context: "Separate what you command from what you merely witness."
  },
  {
    id: 7,
    quote: "Simplicity is the prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
    category: "Focus",
    context: "Strip away the trivial noise. Deep work thrives in uncluttered environments."
  },
  {
    id: 8,
    quote: "It is not that we have a short time to live, but that we waste a lot of it.",
    author: "Seneca",
    category: "Time",
    context: "Time is the only irreversible currency. Spend it deliberately."
  },
  {
    id: 9,
    quote: "Do not pray for an easy life, pray for the strength to endure a difficult one.",
    author: "Bruce Lee",
    category: "Strength",
    context: "Endurance transforms resistance into unshakeable character."
  },
  {
    id: 10,
    quote: "The soul becomes dyed with the color of its thoughts.",
    author: "Marcus Aurelius",
    category: "Mindset",
    context: "Audit your internal narrative. It builds the lens through which you live."
  },
  {
    id: 11,
    quote: "Discipline equals freedom.",
    author: "Jocko Willink",
    category: "Discipline",
    context: "Rigorous consistency in fundamentals liberates your highest potential."
  },
  {
    id: 12,
    quote: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.",
    author: "John C. Maxwell",
    category: "Consistency",
    context: "Compound interest governs biology, intellect, and habit alike."
  },
  {
    id: 13,
    quote: "Until you make the unconscious conscious, it will direct your life and you will call it fate.",
    author: "Carl Jung",
    category: "Awareness",
    context: "Investigate your automatic impulses. Clarity dissolves fatalism."
  },
  {
    id: 14,
    quote: "First say to yourself what you would be; and then do what you have to do.",
    author: "Epictetus",
    category: "Identity",
    context: "Let identity guide behavior. Cast a vote for your future self."
  },
  {
    id: 15,
    quote: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
    category: "Growth",
    context: "Errors are data points in the calibration of excellence."
  },
  {
    id: 16,
    quote: "Action may not always bring happiness, but there is no happiness without action.",
    author: "William James",
    category: "Action",
    context: "Motion breaks inertia. Begin before you feel completely ready."
  },
  {
    id: 17,
    quote: "Waste no more time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius",
    category: "Integrity",
    context: "Theory without execution is vanity. Let actions speak."
  },
  {
    id: 18,
    quote: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.",
    author: "Alexander Graham Bell",
    category: "Focus",
    context: "Singular intensity cuts through resistance like a laser."
  },
  {
    id: 19,
    quote: "To know what you know and that you do not know what you do not know, that is true knowledge.",
    author: "Confucius",
    category: "Wisdom",
    context: "Intellectual humility is the foundation of genuine mastery."
  },
  {
    id: 20,
    quote: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    category: "Calm",
    context: "Dismantle hypothetical catastrophes. Anchor your mind in this moment."
  }
];

const FOOD_DATABASE = [
  {
    id: 'food_1',
    name: 'Avocado Toast with Poached Egg',
    category: 'Breakfast',
    portion: '1 slice (180g)',
    calories: 340,
    protein: 14,
    carbs: 28,
    fat: 20,
    fiber: 7,
    sodium: 380,
    icon: '🥑'
  },
  {
    id: 'food_2',
    name: 'Greek Yogurt with Blueberries & Honey',
    category: 'Breakfast',
    portion: '1 bowl (220g)',
    calories: 220,
    protein: 18,
    carbs: 26,
    fat: 4,
    fiber: 3,
    sodium: 65,
    icon: '🥣'
  },
  {
    id: 'food_3',
    name: 'Steel Cut Oatmeal with Chia & Walnuts',
    category: 'Breakfast',
    portion: '1 medium bowl (250g)',
    calories: 310,
    protein: 10,
    carbs: 45,
    fat: 11,
    fiber: 8,
    sodium: 20,
    icon: '🌾'
  },
  {
    id: 'food_4',
    name: 'Grilled Chicken Quinoa & Kale Bowl',
    category: 'Lunch',
    portion: '1 bowl (350g)',
    calories: 520,
    protein: 42,
    carbs: 48,
    fat: 16,
    fiber: 6,
    sodium: 490,
    icon: '🥗'
  },
  {
    id: 'food_5',
    name: 'Wild Atlantic Salmon with Roasted Asparagus',
    category: 'Dinner',
    portion: '1 fillet + sides (320g)',
    calories: 460,
    protein: 38,
    carbs: 8,
    fat: 30,
    fiber: 4,
    sodium: 390,
    icon: '🐟'
  },
  {
    id: 'food_6',
    name: 'Tofu Veggie Stir-Fry with Brown Rice',
    category: 'Dinner',
    portion: '1 plate (380g)',
    calories: 430,
    protein: 22,
    carbs: 56,
    fat: 14,
    fiber: 7,
    sodium: 540,
    icon: '🍲'
  },
  {
    id: 'food_7',
    name: 'Whey Protein Isolate Shake (Almond Milk)',
    category: 'Snack',
    portion: '1 shake (350ml)',
    calories: 190,
    protein: 28,
    carbs: 6,
    fat: 3,
    fiber: 1,
    sodium: 180,
    icon: '🥤'
  },
  {
    id: 'food_8',
    name: 'Apple Slices with Natural Peanut Butter',
    category: 'Snack',
    portion: '1 apple + 2 tbsp (160g)',
    calories: 260,
    protein: 7,
    carbs: 30,
    fat: 15,
    fiber: 5,
    sodium: 110,
    icon: '🍎'
  },
  {
    id: 'food_9',
    name: 'Mediterranean Hummus & Warm Pita',
    category: 'Snack',
    portion: '4 tbsp + 1 pita (140g)',
    calories: 280,
    protein: 9,
    carbs: 38,
    fat: 10,
    fiber: 5,
    sodium: 410,
    icon: '🫓'
  },
  {
    id: 'food_10',
    name: 'Black Bean & Sweet Potato Burrito Bowl',
    category: 'Lunch',
    portion: '1 bowl (400g)',
    calories: 490,
    protein: 18,
    carbs: 78,
    fat: 12,
    fiber: 14,
    sodium: 460,
    icon: '🍠'
  },
  {
    id: 'food_11',
    name: 'Espresso with Steamed Oat Milk',
    category: 'Breakfast',
    portion: '1 cup (240ml)',
    calories: 110,
    protein: 3,
    carbs: 16,
    fat: 4,
    fiber: 1,
    sodium: 90,
    icon: '☕'
  },
  {
    id: 'food_12',
    name: 'Mixed Roasted Almonds & Walnuts',
    category: 'Snack',
    portion: '1 handful (30g)',
    calories: 185,
    protein: 5,
    carbs: 5,
    fat: 17,
    fiber: 3,
    sodium: 45,
    icon: '🥜'
  }
];

const PHOTO_SAMPLE_PRESETS = [
  {
    id: 'photo_preset_1',
    label: 'Mediterranean Grain & Chicken Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    detectedFood: 'Mediterranean Grilled Chicken, Quinoa & Greens',
    confidence: 88,
    portion: '1 bowl (approx 360g)',
    estimatedCalories: 510,
    protein: 39,
    carbs: 46,
    fat: 18,
    fiber: 7,
    sodium: 440,
    notes: 'Detected ingredients: chicken breast (40%), cooked quinoa (30%), mixed field greens, cherry tomatoes, light olive oil dressing.'
  },
  {
    id: 'photo_preset_2',
    label: 'Sourdough Avocado & Poached Egg',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    detectedFood: 'Avocado Toast with 2 Poached Eggs',
    confidence: 92,
    portion: '1 serving (approx 210g)',
    estimatedCalories: 380,
    protein: 18,
    carbs: 29,
    fat: 22,
    fiber: 8,
    sodium: 410,
    notes: 'Detected items: whole grain sourdough bread, mashed Hass avocado, poached cage-free eggs, chili flakes, microgreens.'
  },
  {
    id: 'photo_preset_3',
    label: 'Berry Protein Smoothie Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&auto=format&fit=crop&q=80',
    detectedFood: 'Acai & Mixed Berry Protein Bowl with Granola',
    confidence: 84,
    portion: '1 bowl (approx 300g)',
    estimatedCalories: 390,
    protein: 21,
    carbs: 58,
    fat: 9,
    fiber: 9,
    sodium: 120,
    notes: 'Detected items: blended frozen berries, protein powder base, pumpkin seeds, hemp hearts, artisan granola topping.'
  },
  {
    id: 'photo_preset_4',
    label: 'Pan-Seared Salmon with Green Beans',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    detectedFood: 'Pan-Seared Salmon Fillet with Steamed Haricots Verts',
    confidence: 90,
    portion: '1 fillet + vegetables (approx 310g)',
    estimatedCalories: 440,
    protein: 36,
    carbs: 9,
    fat: 28,
    fiber: 4,
    sodium: 360,
    notes: 'Detected items: salmon steak, sautéed green beans with minced garlic, lemon wedge, olive oil glaze.'
  }
];

function getInitialDemoState() {
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate previous dates for rich streak history
  const getPastDate = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  return {
    user: {
      id: 'usr_alex_chen',
      name: 'Alex Chen',
      email: 'alex.chen@university.edu',
      role: 'Computer Science & Bioengineering Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinedDate: '2025-09-01'
    },
    settings: {
      theme: 'sage', // 'sage' | 'obsidian' | 'light' | 'ocean'
      soundEnabled: true,
      dailyCalorieGoal: 2150,
      dailyProteinGoal: 135,
      dailyCarbsGoal: 220,
      dailyFatGoal: 65,
      dailyFiberGoal: 32,
      dailySodiumMax: 2200,
      dailyWaterGoal: 2500, // ml
      dashboardWidgets: {
        habits: true,
        nutrition: true,
        academics: true,
        dues: true,
        water: true
      }
    },
    habits: [
      {
        id: 'hab_1',
        name: 'Morning Mindfulness & Breathwork',
        category: 'Mind & Body',
        icon: '🧘',
        targetTime: '07:30 AM',
        frequency: 'Everyday',
        currentStreak: 14,
        bestStreak: 28,
        history: {
          [today]: true,
          [getPastDate(1)]: true,
          [getPastDate(2)]: true,
          [getPastDate(3)]: true,
          [getPastDate(4)]: true,
          [getPastDate(5)]: true,
          [getPastDate(6)]: true,
          [getPastDate(7)]: true,
          [getPastDate(8)]: true,
          [getPastDate(9)]: true,
          [getPastDate(10)]: true,
          [getPastDate(11)]: true,
          [getPastDate(12)]: true,
          [getPastDate(13)]: true
        }
      },
      {
        id: 'hab_2',
        name: 'Deep Work: Algorithms & Problem Solving',
        category: 'Academics',
        icon: '💻',
        targetTime: '09:00 AM',
        frequency: 'Weekdays',
        currentStreak: 9,
        bestStreak: 18,
        history: {
          [today]: true,
          [getPastDate(1)]: true,
          [getPastDate(2)]: true,
          [getPastDate(3)]: true,
          [getPastDate(4)]: true,
          [getPastDate(7)]: true,
          [getPastDate(8)]: true
        }
      },
      {
        id: 'hab_3',
        name: 'Hydration Target (2.5L Clean Water)',
        category: 'Fitness',
        icon: '💧',
        targetTime: 'All Day',
        frequency: 'Everyday',
        currentStreak: 6,
        bestStreak: 21,
        history: {
          [today]: false,
          [getPastDate(1)]: true,
          [getPastDate(2)]: true,
          [getPastDate(3)]: true,
          [getPastDate(4)]: true,
          [getPastDate(5)]: true,
          [getPastDate(6)]: true
        }
      },
      {
        id: 'hab_4',
        name: 'Read 20 Pages (Non-Fiction / Research)',
        category: 'Productivity',
        icon: '📖',
        targetTime: '09:30 PM',
        frequency: 'Everyday',
        currentStreak: 12,
        bestStreak: 15,
        history: {
          [today]: true,
          [getPastDate(1)]: true,
          [getPastDate(2)]: true,
          [getPastDate(3)]: true,
          [getPastDate(4)]: true,
          [getPastDate(5)]: true
        }
      },
      {
        id: 'hab_5',
        name: 'Strength Training / Movement',
        category: 'Fitness',
        icon: '🏋️',
        targetTime: '05:30 PM',
        frequency: '4x / week',
        currentStreak: 3,
        bestStreak: 11,
        history: {
          [today]: false,
          [getPastDate(1)]: true,
          [getPastDate(2)]: true,
          [getPastDate(3)]: true
        }
      },
      {
        id: 'hab_6',
        name: 'Digital Wind-down (No screens after 10:30 PM)',
        category: 'Mind & Body',
        icon: '🌙',
        targetTime: '10:30 PM',
        frequency: 'Everyday',
        currentStreak: 5,
        bestStreak: 14,
        history: {
          [today]: false,
          [getPastDate(1)]: true,
          [getPastDate(2)]: true,
          [getPastDate(3)]: true,
          [getPastDate(4)]: true
        }
      }
    ],
    nutrition: {
      waterMl: 1750,
      logs: [
        {
          id: 'meal_1',
          mealType: 'Breakfast',
          name: 'Avocado Toast with Poached Egg',
          portion: '1 slice (180g)',
          calories: 340,
          protein: 14,
          carbs: 28,
          fat: 20,
          fiber: 7,
          sodium: 380,
          isEstimate: false,
          confidence: null,
          time: '08:15 AM'
        },
        {
          id: 'meal_2',
          mealType: 'Breakfast',
          name: 'Espresso with Steamed Oat Milk',
          portion: '1 cup (240ml)',
          calories: 110,
          protein: 3,
          carbs: 16,
          fat: 4,
          fiber: 1,
          sodium: 90,
          isEstimate: false,
          confidence: null,
          time: '08:30 AM'
        },
        {
          id: 'meal_3',
          mealType: 'Lunch',
          name: 'Grilled Chicken Quinoa & Kale Bowl',
          portion: '1 bowl (350g)',
          calories: 520,
          protein: 42,
          carbs: 48,
          fat: 16,
          fiber: 6,
          sodium: 490,
          isEstimate: true,
          confidence: 88,
          source: 'Photo Estimate',
          time: '01:10 PM'
        },
        {
          id: 'meal_4',
          mealType: 'Snack',
          name: 'Whey Protein Isolate Shake',
          portion: '1 shake (350ml)',
          calories: 190,
          protein: 28,
          carbs: 6,
          fat: 3,
          fiber: 1,
          sodium: 180,
          isEstimate: false,
          confidence: null,
          time: '04:45 PM'
        }
      ]
    },
    academics: {
      courses: [
        {
          id: 'crs_1',
          code: 'CS 341',
          name: 'Algorithms & Data Structures II',
          professor: 'Dr. Evelyn Morales',
          credits: 4,
          currentGrade: 'A',
          gradePercentage: 94.5,
          color: '#34d399',
          schedule: 'Mon, Wed 10:00 - 11:30 AM',
          location: 'Turing Hall 204'
        },
        {
          id: 'crs_2',
          code: 'BIOE 420',
          name: 'Computational Genomics & Modeling',
          professor: 'Prof. David Vance',
          credits: 4,
          currentGrade: 'A-',
          gradePercentage: 91.2,
          color: '#38bdf8',
          schedule: 'Tue, Thu 01:00 - 02:30 PM',
          location: 'BioMed Science Complex 110'
        },
        {
          id: 'crs_3',
          code: 'MATH 310',
          name: 'Applied Linear Algebra & Optimization',
          professor: 'Dr. Rajesh Patel',
          credits: 3,
          currentGrade: 'B+',
          gradePercentage: 88.0,
          color: '#a78bfa',
          schedule: 'Mon, Wed, Fri 09:00 - 09:50 AM',
          location: 'Euler Hall 102'
        },
        {
          id: 'crs_4',
          code: 'NEURO 201',
          name: 'Foundations of Cognitive Neuroscience',
          professor: 'Dr. Sarah Sterling',
          credits: 3,
          currentGrade: 'A',
          gradePercentage: 95.8,
          color: '#fb7185',
          schedule: 'Tue, Thu 10:30 - 11:50 AM',
          location: 'Kandel Pavilion 301'
        }
      ],
      deadlines: [
        {
          id: 'dl_1',
          courseCode: 'CS 341',
          title: 'Dynamic Programming & Graph Flow Problem Set',
          dueDate: getPastDate(-2), // 2 days from now
          type: 'Assignment',
          priority: 'High',
          completed: false,
          weight: '10% of grade'
        },
        {
          id: 'dl_2',
          courseCode: 'BIOE 420',
          title: 'Genome Assembly Pipeline Python Project',
          dueDate: getPastDate(-5), // 5 days from now
          type: 'Project',
          priority: 'High',
          completed: false,
          weight: '20% of grade'
        },
        {
          id: 'dl_3',
          courseCode: 'MATH 310',
          title: 'Eigenvalues & SVD Quiz Preparation',
          dueDate: getPastDate(-7), // 7 days from now
          type: 'Exam',
          priority: 'Medium',
          completed: false,
          weight: '15% of grade'
        },
        {
          id: 'dl_4',
          courseCode: 'NEURO 201',
          title: 'Literature Review on Working Memory Constraints',
          dueDate: getPastDate(-10),
          type: 'Paper',
          priority: 'Medium',
          completed: false,
          weight: '12% of grade'
        }
      ],
      todos: [
        {
          id: 'td_1',
          title: 'Review lecture slides on Dijkstra & Bellman-Ford',
          course: 'CS 341',
          dueDate: today,
          completed: true
        },
        {
          id: 'td_2',
          title: 'Set up Nextflow environment for Genomics assignment',
          course: 'BIOE 420',
          dueDate: getPastDate(-1),
          completed: false
        },
        {
          id: 'td_3',
          title: 'Complete WebAssign practice set 6 on Orthogonal Projections',
          course: 'MATH 310',
          dueDate: getPastDate(-2),
          completed: false
        },
        {
          id: 'td_4',
          title: 'Schedule office hours with TA regarding project benchmark',
          course: 'CS 341',
          dueDate: getPastDate(-3),
          completed: false
        }
      ],
      dues: [
        {
          id: 'due_1',
          title: 'Fall Semester Lab Materials & Consumables Fee',
          category: 'Lab Deposit',
          amount: 150.00,
          currency: '$',
          dueDate: getPastDate(-12),
          status: 'Pending',
          institution: 'Department of Bioengineering',
          notes: 'Invoice #BE-2026-904'
        },
        {
          id: 'due_2',
          title: 'ACM Student Chapter Annual Membership',
          category: 'Union & Guilds',
          amount: 35.00,
          currency: '$',
          dueDate: getPastDate(-18),
          status: 'Pending',
          institution: 'Student Association',
          notes: 'Access to research seminars and workshops'
        },
        {
          id: 'due_3',
          title: 'Semester Tuition Installment 2/2',
          category: 'Tuition',
          amount: 2850.00,
          currency: '$',
          dueDate: getPastDate(15),
          status: 'Paid',
          institution: 'University Bursar Office',
          notes: 'Confirmation #TX-8849120 - Cleared'
        },
        {
          id: 'due_4',
          title: 'Digital Textbook Access: Modern Graph Theory',
          category: 'Textbooks',
          amount: 68.50,
          currency: '$',
          dueDate: getPastDate(30),
          status: 'Paid',
          institution: 'University Bookstore',
          notes: 'VitalSource e-Reader pass'
        }
      ],
      notes: [
        {
          id: 'note_1',
          title: 'Dynamic Programming Patterns: Memoization vs Tabulation',
          courseCode: 'CS 341',
          folder: 'Lecture Notes',
          tags: ['Algorithms', 'DP', 'Complexity'],
          date: getPastDate(2),
          content: `### Core Principle of Dynamic Programming
1. **Optimal Substructure**: An optimal solution to any problem contains optimal solutions to sub-problems.
2. **Overlapping Subproblems**: The recursive space repeats evaluations of identical states (contrasting Divide & Conquer which partitions into non-overlapping domains).

#### Memoization (Top-Down)
- Start with recursive call tree.
- Maintain hash map or lookup table of \`memo[state]\`.
- Time: $O(N \\times M)$, Space: $O(N \\times M) + O(\\text{stack depth})$.

#### Tabulation (Bottom-Up)
- Build 2D/1D table iteratively starting from base cases.
- Often allows space optimization (rolling row technique: space becomes $O(M)$).`,
          attachment: {
            name: 'cs341_dp_recurrence_relations.pdf',
            type: 'pdf',
            size: '1.4 MB',
            previewUrl: null
          }
        },
        {
          id: 'note_2',
          title: 'Next-Generation Sequencing (NGS) Alignment Pipelines',
          courseCode: 'BIOE 420',
          folder: 'Study Guides',
          tags: ['Genomics', 'Bioinformatics', 'Python'],
          date: getPastDate(4),
          content: `### NGS Analysis Pipeline Stages:
1. **Raw FASTQ Processing**: Phred quality score filtering (\`FastQC\`, \`Trimmomatic\`).
2. **Burrows-Wheeler Transform**: Align short reads against reference GRCh38 using \`BWA-MEM\` or \`Bowtie2\`.
3. **BAM/SAM Management**: Coordinate sorting, deduplication (\`Picard MarkDuplicates\`), index creation (\`samtools index\`).
4. **Variant Calling**: Bayesian likelihood scoring of SNVs and indels (\`GATK HaplotypeCaller\`).`,
          attachment: {
            name: 'bwa_alignment_flowchart.png',
            type: 'image',
            size: '840 KB',
            previewUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80'
          }
        },
        {
          id: 'note_3',
          title: 'Singular Value Decomposition (SVD) Geometric Intuition',
          courseCode: 'MATH 310',
          folder: 'Cheatsheets',
          tags: ['Math', 'LinearAlgebra', 'DataScience'],
          date: getPastDate(6),
          content: `Every matrix $A \\in \\mathbb{R}^{m \\times n}$ can be factored as:
$$A = U \\Sigma V^T$$

- $U$: $m \\times m$ orthogonal matrix (eigenvectors of $A A^T$).
- $\\Sigma$: $m \\times n$ diagonal matrix of singular values $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0$.
- $V^T$: $n \\times n$ orthogonal matrix (eigenvectors of $A^T A$).

**Application**: Low-rank matrix approximations (Eckart-Young Theorem) for image compression and latent semantic analysis.`,
          attachment: {
            name: 'svd_geometric_mapping.pdf',
            type: 'pdf',
            size: '2.1 MB',
            previewUrl: null
          }
        }
      ]
    }
  };
}


  // --- 2. Acoustic Synthesizer ---
  /**
 * Zenith Life & Wellness OS - Web Audio Sound Synthesizer
 * Provides crisp, gentle acoustic feedback using the native Web Audio API
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(val) {
    this.enabled = Boolean(val);
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Dual resonant chord: E5 (659Hz) and B5 (987Hz) with gentle fade
      [659.25, 987.77].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.7);
      });
    } catch (e) {
      console.warn('Audio feedback failed gracefully:', e);
    }
  }

  playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      // Ignore
    }
  }

  playWaterSip() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.linearRampToValueAtTime(780, now + 0.06);
      osc.frequency.linearRampToValueAtTime(440, now + 0.14);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {
      // Ignore
    }
  }
}

const sound = new SoundSynthesizer();


  // --- 3. Philosophical Reflections Engine ---
  /**
 * Zenith Life & Wellness OS - Motivational Thoughts Engine
 * Delivers memorable, intense, thought-provoking philosophical reflections
 */



class QuotesEngine {
  constructor() {
    this.thoughts = MOTIVATIONAL_THOUGHTS;
    this.currentIndex = 0;
    this.historyIndices = [];
    this.init();
  }

  init() {
    // Pick an initial memorable quote
    const savedIdx = parseInt(sessionStorage.getItem('zenith_last_quote_idx'), 10);
    if (!isNaN(savedIdx) && savedIdx >= 0 && savedIdx < this.thoughts.length) {
      this.currentIndex = savedIdx;
    } else {
      this.currentIndex = Math.floor(Math.random() * this.thoughts.length);
      sessionStorage.setItem('zenith_last_quote_idx', this.currentIndex);
    }
    this.historyIndices.push(this.currentIndex);
  }

  getCurrent() {
    return this.thoughts[this.currentIndex] || this.thoughts[0];
  }

  nextThought() {
    if (this.thoughts.length <= 1) return this.getCurrent();

    let candidate = Math.floor(Math.random() * this.thoughts.length);
    // Avoid repeating last 4 quotes if pool allows
    let attempts = 0;
    while (this.historyIndices.slice(-4).includes(candidate) && attempts < 15) {
      candidate = Math.floor(Math.random() * this.thoughts.length);
      attempts++;
    }

    this.currentIndex = candidate;
    this.historyIndices.push(candidate);
    if (this.historyIndices.length > 20) {
      this.historyIndices.shift();
    }
    sessionStorage.setItem('zenith_last_quote_idx', this.currentIndex);
    return this.getCurrent();
  }

  onHabitCheckIn() {
    return this.nextThought();
  }
}

const quotesEngine = new QuotesEngine();


  // --- 4. User Storage & Auth Manager ---
  /**
 * Zenith Life & Wellness OS - Storage & Multi-user Authentication Manager
 */



const USERS_KEY = 'zenith_registered_users';
const ACTIVE_USER_ID_KEY = 'zenith_active_user_id';
const DATA_PREFIX = 'zenith_data_';

class StorageManager {
  constructor() {
    this.activeUserId = null;
    this.currentUser = null;
    this.state = null;
    this.listeners = new Set();
    this.init();
  }

  init() {
    this.ensureDefaultUsers();
    const savedActiveId = localStorage.getItem(ACTIVE_USER_ID_KEY);
    const users = this.getUsers();

    if (savedActiveId && users.find(u => u.id === savedActiveId)) {
      this.activeUserId = savedActiveId;
    } else if (users.length > 0) {
      this.activeUserId = users[0].id;
      localStorage.setItem(ACTIVE_USER_ID_KEY, this.activeUserId);
    }

    this.currentUser = users.find(u => u.id === this.activeUserId) || null;
    this.loadActiveUserState();
  }

  ensureDefaultUsers() {
    const rawUsers = localStorage.getItem(USERS_KEY);
    if (!rawUsers) {
      const demoUser = {
        id: 'usr_alex_chen',
        name: 'Alex Chen',
        email: 'alex.chen@university.edu',
        passwordHash: 'demo123', // Demo password
        role: 'Computer Science & Bioengineering Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        joinedDate: '2025-09-01'
      };
      localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
      
      // Ensure initial demo state exists for Alex
      const demoDataKey = DATA_PREFIX + demoUser.id;
      if (!localStorage.getItem(demoDataKey)) {
        localStorage.setItem(demoDataKey, JSON.stringify(getInitialDemoState()));
      }
    }
  }

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  loadActiveUserState() {
    if (!this.activeUserId) {
      this.state = getInitialDemoState();
      return;
    }

    const dataKey = DATA_PREFIX + this.activeUserId;
    const raw = localStorage.getItem(dataKey);
    if (raw) {
      try {
        this.state = JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse state for user:', this.activeUserId, e);
        this.state = getInitialDemoState();
      }
    } else {
      this.state = getInitialDemoState();
      this.state.user = { ...this.currentUser };
      this.saveState();
    }
  }

  saveState() {
    if (!this.activeUserId || !this.state) return;
    try {
      const dataKey = DATA_PREFIX + this.activeUserId;
      localStorage.setItem(dataKey, JSON.stringify(this.state));
      this.notifyListeners();
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    }
  }

  // --- Auth Methods ---
  login(email, password) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, message: 'Account not found. Please sign up or try Demo account.' };
    }

    if (user.passwordHash !== password) {
      return { success: false, message: 'Invalid password. Please check your credentials.' };
    }

    this.activeUserId = user.id;
    this.currentUser = user;
    localStorage.setItem(ACTIVE_USER_ID_KEY, user.id);
    this.loadActiveUserState();
    this.notifyListeners();
    return { success: true, user };
  }

  signUp(name, email, password) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newId = 'usr_' + Date.now();
    const newUser = {
      id: newId,
      name: name.trim() || 'New Explorer',
      email: cleanEmail,
      passwordHash: password,
      role: 'Lifelong Learner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    this.saveUsers(users);

    // Initialize fresh personalized state
    const initialState = getInitialDemoState();
    initialState.user = { ...newUser };
    
    // Customize habits for a fresh start while leaving sample templates
    initialState.nutrition.logs = [];
    initialState.nutrition.waterMl = 500;

    localStorage.setItem(DATA_PREFIX + newId, JSON.stringify(initialState));

    this.activeUserId = newId;
    this.currentUser = newUser;
    localStorage.setItem(ACTIVE_USER_ID_KEY, newId);
    this.loadActiveUserState();
    this.notifyListeners();

    return { success: true, user: newUser };
  }

  loginDemo() {
    const users = this.getUsers();
    const demoUser = users.find(u => u.id === 'usr_alex_chen') || users[0];
    if (demoUser) {
      this.activeUserId = demoUser.id;
      this.currentUser = demoUser;
      localStorage.setItem(ACTIVE_USER_ID_KEY, demoUser.id);
      this.loadActiveUserState();
      this.notifyListeners();
      return { success: true, user: demoUser };
    }
    return { success: false, message: 'Demo account unavailable.' };
  }

  logout() {
    this.activeUserId = null;
    this.currentUser = null;
    localStorage.removeItem(ACTIVE_USER_ID_KEY);
    this.loadActiveUserState();
    this.notifyListeners();
  }

  resetCurrentUserData() {
    if (!this.activeUserId) return;
    const fresh = getInitialDemoState();
    if (this.currentUser) {
      fresh.user = { ...this.currentUser };
    }
    this.state = fresh;
    this.saveState();
  }

  exportDataJson() {
    if (!this.state) return;
    const blob = new Blob([JSON.stringify(this.state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenith_backup_${this.currentUser ? this.currentUser.name.replace(/\s+/g, '_') : 'user'}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importDataJson(jsonText) {
    try {
      const imported = JSON.parse(jsonText);
      if (!imported.habits || !imported.nutrition || !imported.academics) {
        throw new Error('Invalid schema: Missing essential trackers.');
      }
      this.state = imported;
      this.saveState();
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message || 'Malformed JSON file.' };
    }
  }
}

const storage = new StorageManager();


  // --- 5. Habit Tracker ---
  /**
 * Zenith Life & Wellness OS - Habit Tracker Controller
 */





class HabitTracker {
  constructor(app) {
    this.app = app;
    this.selectedCategory = 'All';
    this.currentDate = new Date().toISOString().split('T')[0];
  }

  getHabits() {
    return storage.state.habits || [];
  }

  getFilteredHabits() {
    const habits = this.getHabits();
    if (this.selectedCategory === 'All') return habits;
    return habits.filter(h => h.category === this.selectedCategory);
  }

  getHabitCategories() {
    const habits = this.getHabits();
    const cats = new Set(['All']);
    habits.forEach(h => {
      if (h.category) cats.add(h.category);
    });
    return Array.from(cats);
  }

  toggleCheckIn(habitId, date = this.currentDate) {
    const habit = this.getHabits().find(h => h.id === habitId);
    if (!habit) return false;

    if (!habit.history) habit.history = {};
    const wasChecked = Boolean(habit.history[date]);
    const newState = !wasChecked;
    habit.history[date] = newState;

    // Recalculate streak
    this.recalculateStreaks(habit);

    storage.saveState();

    if (newState) {
      sound.playChime();
      this.triggerConfetti();
      // Rotate motivational thought on completion
      const newThought = quotesEngine.onHabitCheckIn();
      this.app.renderMotivationalBanner(newThought, true);
      this.app.showToast(`Completed: ${habit.name}! 🔥 ${habit.currentStreak} day streak`, 'success');
    } else {
      sound.playPop();
    }

    this.render();
    this.app.renderOverview();
    return true;
  }

  recalculateStreaks(habit) {
    const today = new Date();
    let currentStreak = 0;
    let checkDate = new Date(today);

    // If today is checked, start streak count.
    // If today is not checked yet, check if yesterday was checked (streak is still alive today).
    const todayStr = checkDate.toISOString().split('T')[0];
    if (habit.history[todayStr]) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Traverse backward continuously
    while (true) {
      const dStr = checkDate.toISOString().split('T')[0];
      if (habit.history[dStr]) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    habit.currentStreak = currentStreak;
    if (currentStreak > (habit.bestStreak || 0)) {
      habit.bestStreak = currentStreak;
    }
  }

  createHabit(habitData) {
    const newHabit = {
      id: 'hab_' + Date.now(),
      name: habitData.name.trim(),
      category: habitData.category || 'Productivity',
      icon: habitData.icon || '⭐',
      targetTime: habitData.targetTime || 'Anytime',
      frequency: habitData.frequency || 'Everyday',
      currentStreak: 0,
      bestStreak: 0,
      history: {}
    };

    if (habitData.checkedToday) {
      newHabit.history[this.currentDate] = true;
      newHabit.currentStreak = 1;
      newHabit.bestStreak = 1;
    }

    storage.state.habits.push(newHabit);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Habit "${newHabit.name}" created!`, 'success');
    return newHabit;
  }

  updateHabit(habitId, updatedData) {
    const habits = this.getHabits();
    const index = habits.findIndex(h => h.id === habitId);
    if (index === -1) return false;

    habits[index] = {
      ...habits[index],
      name: updatedData.name.trim(),
      category: updatedData.category || habits[index].category,
      icon: updatedData.icon || habits[index].icon,
      targetTime: updatedData.targetTime || habits[index].targetTime,
      frequency: updatedData.frequency || habits[index].frequency
    };

    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast('Habit updated successfully.', 'success');
    return true;
  }

  deleteHabit(habitId) {
    const habits = this.getHabits();
    const habit = habits.find(h => h.id === habitId);
    storage.state.habits = habits.filter(h => h.id !== habitId);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Removed habit: ${habit ? habit.name : ''}`, 'info');
  }

  getPastDates(daysCount = 7) {
    const list = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      list.push({
        dateStr: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        isToday: i === 0
      });
    }
    return list;
  }

  calculateStats() {
    const habits = this.getHabits();
    if (habits.length === 0) {
      return { total: 0, completedToday: 0, percentage: 0, totalStreaks: 0, bestStreak: 0 };
    }

    const todayStr = this.currentDate;
    let completedToday = 0;
    let totalStreaks = 0;
    let bestStreak = 0;

    habits.forEach(h => {
      if (h.history && h.history[todayStr]) completedToday++;
      totalStreaks += h.currentStreak || 0;
      if ((h.bestStreak || 0) > bestStreak) bestStreak = h.bestStreak;
    });

    const percentage = Math.round((completedToday / habits.length) * 100);

    return {
      total: habits.length,
      completedToday,
      percentage,
      totalStreaks,
      bestStreak
    };
  }

  triggerConfetti() {
    const container = document.getElementById('confetti-canvas-container');
    if (!container) return;

    // Fast particle burst
    for (let i = 0; i < 28; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      const colors = ['#34d399', '#38bdf8', '#fbbf24', '#f43f5e', '#a78bfa', '#10b981'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${50 + (Math.random() - 0.5) * 60}%`;
      particle.style.top = `${40 + (Math.random() - 0.5) * 30}%`;
      particle.style.setProperty('--dx', `${(Math.random() - 0.5) * 260}px`);
      particle.style.setProperty('--dy', `${(Math.random() - 0.5) * 260 - 80}px`);
      particle.style.setProperty('--dr', `${(Math.random() - 0.5) * 720}deg`);
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }

  render() {
    const container = document.getElementById('habits-view-content');
    if (!container) return;

    const habits = this.getFilteredHabits();
    const categories = this.getHabitCategories();
    const past7Days = this.getPastDates(7);
    const stats = this.calculateStats();

    let html = `
      <!-- Stats & Summary Row -->
      <div class="stats-grid">
        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Today's Completion</span>
            <span class="stat-icon">🎯</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${stats.percentage}%</div>
            <div class="stat-sub">${stats.completedToday} of ${stats.total} habits finished</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill progress-emerald" style="width: ${stats.percentage}%;"></div>
          </div>
        </div>

        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Active Streaks</span>
            <span class="stat-icon">🔥</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${stats.totalStreaks} <span class="stat-unit">days</span></div>
            <div class="stat-sub">Combined active momentum</div>
          </div>
          <div class="stat-badge badge-streak">All systems active</div>
        </div>

        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Personal Record</span>
            <span class="stat-icon">🏆</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${stats.bestStreak} <span class="stat-unit">days</span></div>
            <div class="stat-sub">Longest continuous consistency</div>
          </div>
          <div class="stat-badge badge-gold">Benchmark</div>
        </div>
      </div>

      <!-- Category Filter Pills and Add Action -->
      <div class="section-actions-bar">
        <div class="filter-pills" id="habit-category-pills">
          ${categories.map(cat => `
            <button class="pill-btn ${this.selectedCategory === cat ? 'active' : ''}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>
        <button class="btn btn-primary btn-sm" id="btn-open-create-habit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Habit
        </button>
      </div>

      <!-- Quick 7-Day Calendar Strip Header -->
      <div class="habits-list-container glass-panel">
        <div class="habits-table-header">
          <div class="col-habit-info">Habit & Frequency</div>
          <div class="col-habit-days">
            ${past7Days.map(d => `
              <div class="day-header-cell ${d.isToday ? 'today-cell' : ''}">
                <span class="day-lbl">${d.dayName}</span>
                <span class="day-num">${d.dayNumber}</span>
              </div>
            `).join('')}
          </div>
          <div class="col-habit-streak">Streak</div>
          <div class="col-habit-actions"></div>
        </div>

        <!-- Habits List Body -->
        <div class="habits-list-body">
    `;

    if (habits.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-icon">🌱</div>
          <h3>No habits in this category</h3>
          <p>Create your first habit to build atomic momentum daily.</p>
          <button class="btn btn-secondary btn-sm" id="btn-empty-create-habit">Create Habit</button>
        </div>
      `;
    } else {
      habits.forEach(habit => {
        const isTodayDone = Boolean(habit.history && habit.history[this.currentDate]);
        html += `
          <div class="habit-row ${isTodayDone ? 'row-completed' : ''}" data-id="${habit.id}">
            <div class="col-habit-info">
              <button class="habit-quick-check-btn ${isTodayDone ? 'checked' : ''}" data-id="${habit.id}" aria-label="Toggle ${habit.name}">
                <span class="habit-icon">${habit.icon}</span>
                <span class="check-indicator">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
              </button>
              <div class="habit-details">
                <span class="habit-name">${habit.name}</span>
                <div class="habit-meta">
                  <span class="habit-badge">${habit.category}</span>
                  <span class="habit-time">🕒 ${habit.targetTime}</span>
                  <span class="habit-freq">${habit.frequency}</span>
                </div>
              </div>
            </div>

            <!-- 7-Day Check-in Dots -->
            <div class="col-habit-days">
              ${past7Days.map(d => {
                const checked = Boolean(habit.history && habit.history[d.dateStr]);
                return `
                  <button class="day-dot-btn ${checked ? 'dot-active' : ''} ${d.isToday ? 'dot-today' : ''}"
                          data-id="${habit.id}" data-date="${d.dateStr}"
                          title="${habit.name} on ${d.dateStr}: ${checked ? 'Completed' : 'Missed'}">
                    ${checked ? '✓' : ''}
                  </button>
                `;
              }).join('')}
            </div>

            <div class="col-habit-streak">
              <div class="streak-badge ${habit.currentStreak > 0 ? 'streak-active' : 'streak-dormant'}">
                <span class="flame-icon">🔥</span>
                <span class="streak-num">${habit.currentStreak || 0}</span>
              </div>
              <span class="streak-best" title="Best streak">Best: ${habit.bestStreak || 0}d</span>
            </div>

            <div class="col-habit-actions">
              <button class="btn-icon btn-edit-habit" data-id="${habit.id}" title="Edit habit">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-icon btn-delete-habit" data-id="${habit.id}" title="Delete habit">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `;
      });
    }

    html += `
        </div>
      </div>

      <!-- Monthly Mini-Heatmap Consistency Grid -->
      <div class="heatmap-panel glass-panel">
        <div class="heatmap-header">
          <div>
            <h4 class="heatmap-title">30-Day Consistency Matrix</h4>
            <p class="heatmap-desc">Visual density of atomic routine execution</p>
          </div>
          <div class="heatmap-legend">
            <span>Less</span>
            <span class="legend-box level-0"></span>
            <span class="legend-box level-1"></span>
            <span class="legend-box level-2"></span>
            <span class="legend-box level-3"></span>
            <span class="legend-box level-4"></span>
            <span>More</span>
          </div>
        </div>
        <div class="heatmap-grid" id="habit-heatmap-grid">
          ${this.renderHeatmapBoxes(habits)}
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  renderHeatmapBoxes(habits) {
    let boxes = '';
    const totalHabits = Math.max(1, habits.length);
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];
      
      let doneCount = 0;
      habits.forEach(h => {
        if (h.history && h.history[dStr]) doneCount++;
      });

      const ratio = doneCount / totalHabits;
      let level = 0;
      if (doneCount > 0 && ratio <= 0.25) level = 1;
      else if (ratio > 0.25 && ratio <= 0.5) level = 2;
      else if (ratio > 0.5 && ratio <= 0.8) level = 3;
      else if (ratio > 0.8) level = 4;

      boxes += `
        <div class="heatmap-cell level-${level}" title="${dStr}: ${doneCount}/${totalHabits} habits (${Math.round(ratio * 100)}%)"></div>
      `;
    }
    return boxes;
  }

  attachEventListeners() {
    const container = document.getElementById('habits-view-content');
    if (!container) return;

    // Filter pills
    container.querySelectorAll('#habit-category-pills .pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.selectedCategory = e.currentTarget.dataset.cat;
        this.render();
      });
    });

    // Quick 1-tap check-in buttons
    container.querySelectorAll('.habit-quick-check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.toggleCheckIn(id, this.currentDate);
      });
    });

    // 7-day dot clicks
    container.querySelectorAll('.day-dot-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const date = e.currentTarget.dataset.date;
        this.toggleCheckIn(id, date);
      });
    });

    // Create buttons
    const btnCreate = container.querySelector('#btn-open-create-habit');
    if (btnCreate) {
      btnCreate.addEventListener('click', () => this.app.openHabitModal());
    }
    const btnEmptyCreate = container.querySelector('#btn-empty-create-habit');
    if (btnEmptyCreate) {
      btnEmptyCreate.addEventListener('click', () => this.app.openHabitModal());
    }

    // Edit button
    container.querySelectorAll('.btn-edit-habit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const habit = this.getHabits().find(h => h.id === id);
        if (habit) this.app.openHabitModal(habit);
      });
    });

    // Delete button
    container.querySelectorAll('.btn-delete-habit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Are you sure you want to remove this habit?')) {
          this.deleteHabit(id);
        }
      });
    });
  }
}


  // --- 6. Food, Calorie & Nutrition Tracker ---
  /**
 * Zenith Life & Wellness OS - Food, Calorie & Nutrition Tracker
 */





class NutritionTracker {
  constructor(app) {
    this.app = app;
    this.activeMealFilter = 'All';
  }

  getLogs() {
    return (storage.state.nutrition && storage.state.nutrition.logs) || [];
  }

  getWater() {
    return (storage.state.nutrition && storage.state.nutrition.waterMl) || 0;
  }

  getGoals() {
    return {
      calories: storage.state.settings.dailyCalorieGoal || 2150,
      protein: storage.state.settings.dailyProteinGoal || 135,
      carbs: storage.state.settings.dailyCarbsGoal || 220,
      fat: storage.state.settings.dailyFatGoal || 65,
      fiber: storage.state.settings.dailyFiberGoal || 32,
      sodium: storage.state.settings.dailySodiumMax || 2200,
      water: storage.state.settings.dailyWaterGoal || 2500
    };
  }

  calculateTotals() {
    const logs = this.getLogs();
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sodium: 0
    };

    logs.forEach(item => {
      totals.calories += Number(item.calories || 0);
      totals.protein += Number(item.protein || 0);
      totals.carbs += Number(item.carbs || 0);
      totals.fat += Number(item.fat || 0);
      totals.fiber += Number(item.fiber || 0);
      totals.sodium += Number(item.sodium || 0);
    });

    return totals;
  }

  addFoodLog(entry) {
    const newLog = {
      id: 'meal_' + Date.now(),
      mealType: entry.mealType || 'Breakfast',
      name: entry.name.trim(),
      portion: entry.portion || '1 serving',
      calories: Math.round(Number(entry.calories) || 0),
      protein: Math.round(Number(entry.protein) || 0),
      carbs: Math.round(Number(entry.carbs) || 0),
      fat: Math.round(Number(entry.fat) || 0),
      fiber: Math.round(Number(entry.fiber) || 0),
      sodium: Math.round(Number(entry.sodium) || 0),
      isEstimate: Boolean(entry.isEstimate),
      confidence: entry.confidence ? Math.round(entry.confidence) : null,
      source: entry.source || 'Manual',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    if (!storage.state.nutrition.logs) {
      storage.state.nutrition.logs = [];
    }

    storage.state.nutrition.logs.push(newLog);
    storage.saveState();
    sound.playPop();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Logged "${newLog.name}" (${newLog.calories} kcal)`, 'success');
    return newLog;
  }

  removeFoodLog(logId) {
    const logs = this.getLogs();
    const item = logs.find(l => l.id === logId);
    storage.state.nutrition.logs = logs.filter(l => l.id !== logId);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Removed ${item ? item.name : 'item'}`, 'info');
  }

  updateWater(deltaMl) {
    let current = this.getWater();
    if (deltaMl === 'reset') {
      current = 0;
    } else {
      current = Math.max(0, current + deltaMl);
    }
    storage.state.nutrition.waterMl = current;
    storage.saveState();
    sound.playWaterSip();
    this.renderWaterSection();
    this.app.renderOverview();
  }

  render() {
    const container = document.getElementById('nutrition-view-content');
    if (!container) return;

    const totals = this.calculateTotals();
    const goals = this.getGoals();
    const remainingCalories = goals.calories - totals.calories;
    const calPercentage = Math.min(100, Math.round((totals.calories / goals.calories) * 100));

    const proteinPct = Math.min(100, Math.round((totals.protein / goals.protein) * 100));
    const carbsPct = Math.min(100, Math.round((totals.carbs / goals.carbs) * 100));
    const fatPct = Math.min(100, Math.round((totals.fat / goals.fat) * 100));
    const fiberPct = Math.min(100, Math.round((totals.fiber / goals.fiber) * 100));
    const sodiumPct = Math.min(100, Math.round((totals.sodium / goals.sodium) * 100));

    const logs = this.getLogs();

    let html = `
      <!-- Mobile Quick Action Banner -->
      <div class="nutrition-quick-bar glass-panel">
        <div class="quick-bar-left">
          <span class="quick-badge">Quick Log</span>
          <span class="quick-hint">Choose logging method:</span>
        </div>
        <div class="quick-bar-buttons">
          <button class="btn btn-primary btn-sm" id="btn-quick-search-food">
            🔍 Search Food
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-quick-photo-food">
            📷 Photo Scan (Est.)
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-quick-manual-food">
            ✍️ Custom Entry
          </button>
        </div>
      </div>

      <!-- Macro and Calorie Progress Dashboard -->
      <div class="nutrition-overview-grid">
        <!-- Calorie Ring Card -->
        <div class="calorie-summary-card glass-panel">
          <div class="calorie-card-header">
            <h3>Daily Energy Balance</h3>
            <span class="card-tag">Goal: ${goals.calories} kcal</span>
          </div>

          <div class="calorie-ring-wrapper">
            <svg class="calorie-svg-ring" viewBox="0 0 160 160">
              <circle class="ring-bg" cx="80" cy="80" r="68"></circle>
              <circle class="ring-fg" cx="80" cy="80" r="68"
                      stroke-dasharray="427.25"
                      stroke-dashoffset="${427.25 - (427.25 * calPercentage) / 100}"></circle>
            </svg>
            <div class="calorie-ring-center">
              <span class="ring-number">${totals.calories}</span>
              <span class="ring-label">Consumed (kcal)</span>
              <span class="ring-remaining ${remainingCalories < 0 ? 'text-danger' : ''}">
                ${remainingCalories >= 0 ? `${remainingCalories} remaining` : `${Math.abs(remainingCalories)} over goal`}
              </span>
            </div>
          </div>

          <div class="calorie-footer-stats">
            <div class="cal-mini-stat">
              <span class="mini-lbl">Base Goal</span>
              <span class="mini-val">${goals.calories}</span>
            </div>
            <div class="cal-mini-stat">
              <span class="mini-lbl">Logged</span>
              <span class="mini-val text-emerald">${totals.calories}</span>
            </div>
            <div class="cal-mini-stat">
              <span class="mini-lbl">Progress</span>
              <span class="mini-val">${calPercentage}%</span>
            </div>
          </div>
        </div>

        <!-- Macronutrients & Micronutrients Breakdown -->
        <div class="macros-summary-card glass-panel">
          <div class="macros-header">
            <h3>Macronutrients</h3>
            <span class="card-tag">Target Ratios</span>
          </div>

          <div class="macro-bars-list">
            <!-- Protein -->
            <div class="macro-bar-item">
              <div class="macro-bar-info">
                <span class="macro-name text-protein">🥩 Protein</span>
                <span class="macro-stat"><strong>${totals.protein}g</strong> / ${goals.protein}g (${proteinPct}%)</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill progress-protein" style="width: ${proteinPct}%;"></div>
              </div>
            </div>

            <!-- Carbohydrates -->
            <div class="macro-bar-item">
              <div class="macro-bar-info">
                <span class="macro-name text-carbs">🌾 Carbohydrates</span>
                <span class="macro-stat"><strong>${totals.carbs}g</strong> / ${goals.carbs}g (${carbsPct}%)</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill progress-carbs" style="width: ${carbsPct}%;"></div>
              </div>
            </div>

            <!-- Healthy Fats -->
            <div class="macro-bar-item">
              <div class="macro-bar-info">
                <span class="macro-name text-fats">🥑 Healthy Fats</span>
                <span class="macro-stat"><strong>${totals.fat}g</strong> / ${goals.fat}g (${fatPct}%)</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill progress-fats" style="width: ${fatPct}%;"></div>
              </div>
            </div>
          </div>

          <!-- Micronutrients row -->
          <div class="micros-divider"></div>
          <div class="micros-grid">
            <div class="micro-badge">
              <span class="micro-title">🌾 Dietary Fiber</span>
              <span class="micro-val"><strong>${totals.fiber}g</strong> / ${goals.fiber}g</span>
              <div class="progress-bar-track mini-track">
                <div class="progress-bar-fill progress-fiber" style="width: ${fiberPct}%;"></div>
              </div>
            </div>
            <div class="micro-badge">
              <span class="micro-title">🧂 Sodium Limit</span>
              <span class="micro-val"><strong>${totals.sodium}mg</strong> / ${goals.sodium}mg</span>
              <div class="progress-bar-track mini-track">
                <div class="progress-bar-fill ${totals.sodium > goals.sodium ? 'progress-danger' : 'progress-amber'}" style="width: ${sodiumPct}%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Water Tracker Card -->
      <div id="water-tracker-mount"></div>

      <!-- Transparency & Medical Disclaimer Banner -->
      <div class="transparency-disclaimer-banner glass-panel">
        <div class="disclaimer-icon">ℹ️</div>
        <div class="disclaimer-content">
          <h4>Nutritional Estimation Transparency & Medical Disclaimer</h4>
          <p>
            Photo-based recognition and visual portion tools calculate <strong>approximate estimations</strong> using geometric volume heuristics. Actual calories and micronutrient bioavailability vary significantly by ingredients, cooking oils, and individual metabolisms. These metrics are designed for personal habit awareness and are <strong>not medically precise</strong>. Always adjust portion sizes and ingredients to reflect your exact meal.
          </p>
        </div>
      </div>

      <!-- Meals Logged Timeline -->
      <div class="meals-timeline-section">
        <div class="timeline-header">
          <h3>Today's Food Journal</h3>
          <div class="meal-filter-tabs">
            ${['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'].map(m => `
              <button class="meal-tab-btn ${this.activeMealFilter === m ? 'active' : ''}" data-meal="${m}">${m}</button>
            `).join('')}
          </div>
        </div>

        <div class="meals-list" id="meals-list-container">
          ${this.renderMealsList(logs)}
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.renderWaterSection();
    this.attachEventListeners();
  }

  renderWaterSection() {
    const mount = document.getElementById('water-tracker-mount');
    if (!mount) return;

    const currentMl = this.getWater();
    const goalMl = this.getGoals().water;
    const pct = Math.min(100, Math.round((currentMl / goalMl) * 100));

    mount.innerHTML = `
      <div class="water-card glass-panel">
        <div class="water-info">
          <div class="water-header">
            <span class="water-icon">💧</span>
            <div>
              <h4>Hydration Target</h4>
              <p class="water-sub">${currentMl} ml of ${goalMl} ml daily goal (${pct}%)</p>
            </div>
          </div>
          <div class="progress-bar-track water-track">
            <div class="progress-bar-fill progress-water" style="width: ${pct}%;"></div>
          </div>
        </div>
        <div class="water-actions">
          <button class="btn btn-outline btn-sm" id="btn-add-water-250">+250 ml</button>
          <button class="btn btn-outline btn-sm" id="btn-add-water-500">+500 ml</button>
          <button class="btn btn-subtle btn-sm" id="btn-reset-water" title="Reset water intake">↺</button>
        </div>
      </div>
    `;

    mount.querySelector('#btn-add-water-250')?.addEventListener('click', () => this.updateWater(250));
    mount.querySelector('#btn-add-water-500')?.addEventListener('click', () => this.updateWater(500));
    mount.querySelector('#btn-reset-water')?.addEventListener('click', () => {
      if (confirm('Reset today\'s logged water to 0ml?')) this.updateWater('reset');
    });
  }

  renderMealsList(logs) {
    const filtered = this.activeMealFilter === 'All'
      ? logs
      : logs.filter(l => l.mealType === this.activeMealFilter);

    if (filtered.length === 0) {
      return `
        <div class="empty-state glass-panel">
          <div class="empty-icon">🥗</div>
          <h4>No meals logged ${this.activeMealFilter !== 'All' ? `for ${this.activeMealFilter}` : 'today'}</h4>
          <p>Tap "Search Food" or "Photo Scan" above to log what you nourish your body with.</p>
        </div>
      `;
    }

    return filtered.map(item => `
      <div class="meal-log-card glass-panel" data-id="${item.id}">
        <div class="meal-type-pill pill-${item.mealType.toLowerCase()}">${item.mealType}</div>
        <div class="meal-main-info">
          <div class="meal-title-row">
            <span class="meal-name">${item.name}</span>
            ${item.isEstimate ? `
              <span class="estimate-tag" title="Visual estimate with ${item.confidence || 85}% algorithmic confidence">
                📷 Est. ${item.confidence ? `${item.confidence}%` : ''}
              </span>
            ` : ''}
          </div>
          <div class="meal-meta-row">
            <span>⚖️ ${item.portion}</span>
            <span>🕒 ${item.time}</span>
            ${item.source ? `<span class="source-tag">${item.source}</span>` : ''}
          </div>
        </div>

        <div class="meal-macro-badges">
          <div class="macro-cell">
            <span class="lbl">KCAL</span>
            <span class="val text-emerald">${item.calories}</span>
          </div>
          <div class="macro-cell">
            <span class="lbl">P</span>
            <span class="val text-protein">${item.protein}g</span>
          </div>
          <div class="macro-cell">
            <span class="lbl">C</span>
            <span class="val text-carbs">${item.carbs}g</span>
          </div>
          <div class="macro-cell">
            <span class="lbl">F</span>
            <span class="val text-fats">${item.fat}g</span>
          </div>
        </div>

        <button class="btn-icon btn-delete-meal" data-id="${item.id}" title="Remove entry">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `).join('');
  }

  attachEventListeners() {
    const container = document.getElementById('nutrition-view-content');
    if (!container) return;

    // Quick action buttons
    container.querySelector('#btn-quick-search-food')?.addEventListener('click', () => {
      this.app.openFoodModal('search');
    });
    container.querySelector('#btn-quick-photo-food')?.addEventListener('click', () => {
      this.app.openFoodModal('photo');
    });
    container.querySelector('#btn-quick-manual-food')?.addEventListener('click', () => {
      this.app.openFoodModal('manual');
    });

    // Meal filter tabs
    container.querySelectorAll('.meal-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeMealFilter = e.currentTarget.dataset.meal;
        this.render();
      });
    });

    // Delete meal buttons
    container.querySelectorAll('.btn-delete-meal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.removeFoodLog(id);
      });
    });
  }
}


  // --- 7. Academic Hub ---
  /**
 * Zenith Life & Wellness OS - Academic Dashboard & Knowledge Repository
 */




class AcademicDashboard {
  constructor(app) {
    this.app = app;
    this.activeTab = 'courses'; // 'courses' | 'deadlines' | 'dues' | 'notes'
    this.notesSearchQuery = '';
    this.notesSelectedFolder = 'All';
    this.notesSelectedCourse = 'All';
  }

  getAcademics() {
    return storage.state.academics || { courses: [], deadlines: [], todos: [], dues: [], notes: [] };
  }

  calculateGpa() {
    const courses = this.getAcademics().courses || [];
    if (courses.length === 0) return { gpa: '0.00', totalCredits: 0 };

    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const credits = Number(c.credits) || 3;
      const points = gradePoints[c.currentGrade] !== undefined ? gradePoints[c.currentGrade] : 3.5;
      totalPoints += points * credits;
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    return { gpa, totalCredits };
  }

  // --- Course Operations ---
  addCourse(course) {
    const academics = this.getAcademics();
    const newCourse = {
      id: 'crs_' + Date.now(),
      code: course.code.trim().toUpperCase(),
      name: course.name.trim(),
      professor: course.professor || 'Faculty Lead',
      credits: Number(course.credits) || 3,
      currentGrade: course.currentGrade || 'A',
      gradePercentage: Number(course.gradePercentage) || 92,
      color: course.color || '#34d399',
      schedule: course.schedule || 'TBA',
      location: course.location || 'Campus Center'
    };

    academics.courses.push(newCourse);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Enrolled in ${newCourse.code}`, 'success');
  }

  deleteCourse(courseId) {
    const academics = this.getAcademics();
    academics.courses = academics.courses.filter(c => c.id !== courseId);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast('Course removed.', 'info');
  }

  // --- Deadline & Task Operations ---
  addDeadline(deadline) {
    const academics = this.getAcademics();
    const newDl = {
      id: 'dl_' + Date.now(),
      courseCode: deadline.courseCode,
      title: deadline.title.trim(),
      dueDate: deadline.dueDate,
      type: deadline.type || 'Assignment',
      priority: deadline.priority || 'Medium',
      completed: false,
      weight: deadline.weight || '10%'
    };

    academics.deadlines.push(newDl);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Deadline added: ${newDl.title}`, 'success');
  }

  toggleDeadline(id) {
    const dl = (this.getAcademics().deadlines || []).find(d => d.id === id);
    if (!dl) return;
    dl.completed = !dl.completed;
    storage.saveState();
    if (dl.completed) sound.playChime();
    else sound.playPop();
    this.render();
    this.app.renderOverview();
  }

  deleteDeadline(id) {
    const academics = this.getAcademics();
    academics.deadlines = academics.deadlines.filter(d => d.id !== id);
    storage.saveState();
    this.render();
    this.app.renderOverview();
  }

  // --- To-Do Operations ---
  addTodo(title, course = 'General') {
    if (!title.trim()) return;
    const academics = this.getAcademics();
    academics.todos.push({
      id: 'td_' + Date.now(),
      title: title.trim(),
      course: course,
      dueDate: new Date().toISOString().split('T')[0],
      completed: false
    });
    storage.saveState();
    this.render();
    this.app.renderOverview();
  }

  toggleTodo(id) {
    const td = (this.getAcademics().todos || []).find(t => t.id === id);
    if (!td) return;
    td.completed = !td.completed;
    storage.saveState();
    if (td.completed) sound.playChime();
    else sound.playPop();
    this.render();
  }

  deleteTodo(id) {
    const academics = this.getAcademics();
    academics.todos = academics.todos.filter(t => t.id !== id);
    storage.saveState();
    this.render();
  }

  // --- Dues & Payments Operations ---
  addDue(dueData) {
    const academics = this.getAcademics();
    const newDue = {
      id: 'due_' + Date.now(),
      title: dueData.title.trim(),
      category: dueData.category || 'Tuition',
      amount: Number(dueData.amount) || 0,
      currency: dueData.currency || '$',
      dueDate: dueData.dueDate,
      status: dueData.status || 'Pending',
      institution: dueData.institution || 'University Bursar',
      notes: dueData.notes || ''
    };

    academics.dues.push(newDue);
    storage.saveState();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Recorded fee: ${newDue.title}`, 'success');
  }

  markDuePaid(id) {
    const due = (this.getAcademics().dues || []).find(d => d.id === id);
    if (!due) return;
    due.status = 'Paid';
    storage.saveState();
    sound.playChime();
    this.render();
    this.app.renderOverview();
    this.app.showToast(`Marked ${due.title} as Paid!`, 'success');
  }

  deleteDue(id) {
    const academics = this.getAcademics();
    academics.dues = academics.dues.filter(d => d.id !== id);
    storage.saveState();
    this.render();
    this.app.renderOverview();
  }

  // --- Notes Library Operations ---
  addNote(noteData) {
    const academics = this.getAcademics();
    const newNote = {
      id: 'note_' + Date.now(),
      title: noteData.title.trim(),
      courseCode: noteData.courseCode || 'General',
      folder: noteData.folder || 'Lecture Notes',
      tags: noteData.tags || ['Study'],
      date: new Date().toISOString().split('T')[0],
      content: noteData.content || '',
      attachment: noteData.attachment || null
    };

    academics.notes.unshift(newNote);
    storage.saveState();
    this.render();
    this.app.showToast(`Saved note: "${newNote.title}"`, 'success');
    return newNote;
  }

  deleteNote(id) {
    const academics = this.getAcademics();
    academics.notes = academics.notes.filter(n => n.id !== id);
    storage.saveState();
    this.render();
    this.app.showToast('Note deleted.', 'info');
  }

  getFilteredNotes() {
    const notes = this.getAcademics().notes || [];
    const query = this.notesSearchQuery.trim().toLowerCase();

    return notes.filter(note => {
      // Folder filter
      if (this.notesSelectedFolder !== 'All' && note.folder !== this.notesSelectedFolder) {
        return false;
      }
      // Course filter
      if (this.notesSelectedCourse !== 'All' && note.courseCode !== this.notesSelectedCourse) {
        return false;
      }
      // Search query
      if (query) {
        const inTitle = note.title.toLowerCase().includes(query);
        const inCourse = note.courseCode.toLowerCase().includes(query);
        const inFolder = note.folder.toLowerCase().includes(query);
        const inContent = note.content.toLowerCase().includes(query);
        const inTags = (note.tags || []).some(t => t.toLowerCase().includes(query));
        return inTitle || inCourse || inFolder || inContent || inTags;
      }
      return true;
    });
  }

  render() {
    const container = document.getElementById('academics-view-content');
    if (!container) return;

    const { gpa, totalCredits } = this.calculateGpa();
    const academics = this.getAcademics();

    let html = `
      <!-- Academic Top Banner & Sub-Tabs -->
      <div class="academics-header-card glass-panel">
        <div class="academic-brand-col">
          <div class="gpa-badge-box">
            <span class="gpa-score">${gpa}</span>
            <div class="gpa-meta">
              <span class="gpa-lbl">Cumulative GPA</span>
              <span class="gpa-credits">${totalCredits} Enrolled Credits</span>
            </div>
          </div>
          <div class="academic-stats-mini">
            <span class="stat-pill">📚 ${academics.courses.length} Active Courses</span>
            <span class="stat-pill">⏳ ${academics.deadlines.filter(d => !d.completed).length} Upcoming Deadlines</span>
            <span class="stat-pill">📂 ${academics.notes.length} Knowledge Files</span>
          </div>
        </div>

        <!-- Academic Module Navigation Tabs -->
        <div class="academic-subnav-tabs">
          <button class="subnav-tab ${this.activeTab === 'courses' ? 'active' : ''}" data-tab="courses">
            📖 Courses & Records
          </button>
          <button class="subnav-tab ${this.activeTab === 'deadlines' ? 'active' : ''}" data-tab="deadlines">
            ⏳ Deadlines & To-Dos
          </button>
          <button class="subnav-tab ${this.activeTab === 'dues' ? 'active' : ''}" data-tab="dues">
            💳 Dues & Payments
          </button>
          <button class="subnav-tab ${this.activeTab === 'notes' ? 'active' : ''}" data-tab="notes">
            📑 Notes & Documents
          </button>
        </div>
      </div>

      <!-- Tab Content Mount -->
      <div class="academic-tab-body">
    `;

    if (this.activeTab === 'courses') {
      html += this.renderCoursesTab();
    } else if (this.activeTab === 'deadlines') {
      html += this.renderDeadlinesTab();
    } else if (this.activeTab === 'dues') {
      html += this.renderDuesTab();
    } else if (this.activeTab === 'notes') {
      html += this.renderNotesTab();
    }

    html += `</div>`;
    container.innerHTML = html;
    this.attachEventListeners();
  }

  renderCoursesTab() {
    const courses = this.getAcademics().courses || [];
    return `
      <div class="section-actions-bar">
        <div>
          <h3>Course Enrollment & Academic Standings</h3>
          <p class="section-subtitle">Real-time GPA projection and syllabus records</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btn-open-add-course">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Course
        </button>
      </div>

      <div class="courses-grid">
        ${courses.length === 0 ? `
          <div class="empty-state glass-panel">
            <div class="empty-icon">🎓</div>
            <h4>No courses enrolled yet</h4>
            <p>Add your semester subjects to calculate cumulative GPA and track assignments.</p>
          </div>
        ` : courses.map(c => `
          <div class="course-card glass-panel" style="border-top: 4px solid ${c.color}">
            <div class="course-card-top">
              <span class="course-code-pill" style="background: ${c.color}22; color: ${c.color}">
                ${c.code}
              </span>
              <div class="grade-pill">
                <span class="grade-letter">${c.currentGrade}</span>
                <span class="grade-pct">${c.gradePercentage}%</span>
              </div>
            </div>

            <h4 class="course-title">${c.name}</h4>
            <div class="course-instructor">👨‍🏫 ${c.professor}</div>

            <div class="course-schedule-row">
              <span>🗓️ ${c.schedule}</span>
              <span>📍 ${c.location}</span>
            </div>

            <div class="course-card-footer">
              <span class="credits-badge">${c.credits} Credits</span>
              <button class="btn-icon btn-delete-course" data-id="${c.id}" title="Remove course">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderDeadlinesTab() {
    const academics = this.getAcademics();
    const deadlines = academics.deadlines || [];
    const todos = academics.todos || [];

    // Sort deadlines: pending first, then by date
    const sortedDeadlines = [...deadlines].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return `
      <div class="deadlines-container-grid">
        <!-- Main Deadlines Column -->
        <div class="deadlines-main-col glass-panel">
          <div class="section-actions-bar">
            <div>
              <h3>Major Academic Deadlines</h3>
              <p class="section-subtitle">Exams, problem sets, and milestones</p>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-open-add-deadline">
              + New Deadline
            </button>
          </div>

          <div class="deadlines-list">
            ${sortedDeadlines.length === 0 ? `
              <div class="empty-state">
                <div class="empty-icon">🎉</div>
                <h4>Zero pending deadlines</h4>
                <p>Enjoy your downtime or prepare ahead for upcoming exams.</p>
              </div>
            ` : sortedDeadlines.map(d => {
              const daysLeft = Math.ceil((new Date(d.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
              let urgencyClass = 'badge-normal';
              let countdownText = `${daysLeft} days left`;
              if (daysLeft < 0) {
                urgencyClass = 'badge-overdue';
                countdownText = 'Overdue';
              } else if (daysLeft === 0) {
                urgencyClass = 'badge-urgent';
                countdownText = 'Due Today!';
              } else if (daysLeft <= 2) {
                urgencyClass = 'badge-urgent';
                countdownText = `In ${daysLeft} days`;
              }

              return `
                <div class="deadline-item ${d.completed ? 'deadline-done' : ''}" data-id="${d.id}">
                  <button class="checkbox-circle ${d.completed ? 'checked' : ''}" data-id="${d.id}" aria-label="Mark completed">
                    ${d.completed ? '✓' : ''}
                  </button>
                  <div class="deadline-body">
                    <div class="deadline-title-line">
                      <span class="deadline-name">${d.title}</span>
                      <span class="course-mini-tag">${d.courseCode}</span>
                    </div>
                    <div class="deadline-meta-line">
                      <span class="countdown-badge ${urgencyClass}">${countdownText}</span>
                      <span>📅 Due: ${d.dueDate}</span>
                      <span class="weight-badge">${d.weight}</span>
                      <span class="type-badge">${d.type}</span>
                    </div>
                  </div>
                  <button class="btn-icon btn-delete-deadline" data-id="${d.id}" title="Remove">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Academic To-Do List Sidebar -->
        <div class="todos-sidebar-col glass-panel">
          <div class="sidebar-header">
            <h4>Quick Academic Tasks</h4>
            <span class="badge-count">${todos.filter(t => !t.completed).length} pending</span>
          </div>

          <div class="add-todo-form">
            <input type="text" id="quick-todo-input" placeholder="Add study task..." class="form-input-sm" />
            <button class="btn btn-secondary btn-sm" id="btn-add-quick-todo">Add</button>
          </div>

          <div class="todos-list">
            ${todos.map(t => `
              <div class="todo-item ${t.completed ? 'todo-done' : ''}" data-id="${t.id}">
                <button class="todo-check-btn ${t.completed ? 'checked' : ''}" data-id="${t.id}">
                  ${t.completed ? '✓' : ''}
                </button>
                <div class="todo-info">
                  <span class="todo-text">${t.title}</span>
                  <span class="todo-sub">${t.course}</span>
                </div>
                <button class="btn-icon-subtle btn-delete-todo" data-id="${t.id}">×</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderDuesTab() {
    const dues = this.getAcademics().dues || [];
    const totalDues = dues.reduce((acc, d) => acc + Number(d.amount || 0), 0);
    const paidDues = dues.filter(d => d.status === 'Paid').reduce((acc, d) => acc + Number(d.amount || 0), 0);
    const pendingDues = totalDues - paidDues;

    return `
      <!-- Financial Summary Cards -->
      <div class="stats-grid">
        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Pending Balance</span>
            <span class="stat-icon">💳</span>
          </div>
          <div class="stat-main">
            <div class="stat-value text-amber">$${pendingDues.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div class="stat-sub">Outstanding dues requiring clearance</div>
          </div>
        </div>

        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Total Paid to Date</span>
            <span class="stat-icon">✅</span>
          </div>
          <div class="stat-main">
            <div class="stat-value text-emerald">$${paidDues.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div class="stat-sub">Tuition & campus fees resolved</div>
          </div>
        </div>

        <div class="stat-card glass-panel">
          <div class="stat-header">
            <span class="stat-title">Cumulative Records</span>
            <span class="stat-icon">📑</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">$${totalDues.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div class="stat-sub">${dues.length} total billing transactions</div>
          </div>
        </div>
      </div>

      <div class="section-actions-bar">
        <div>
          <h3>Tuition, Dues & Campus Payments</h3>
          <p class="section-subtitle">Keep your academic accounts in good financial standing</p>
        </div>
        <button class="btn btn-primary btn-sm" id="btn-open-add-due">
          + Record New Fee
        </button>
      </div>

      <div class="dues-table-card glass-panel">
        <div class="dues-list">
          ${dues.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">🧾</div>
              <h4>No dues or payments recorded</h4>
              <p>Add tuition installments, lab deposits, or student association memberships.</p>
            </div>
          ` : dues.map(d => {
            const isPaid = d.status === 'Paid';
            return `
              <div class="due-item-row ${isPaid ? 'due-settled' : ''}" data-id="${d.id}">
                <div class="due-info-col">
                  <span class="due-title">${d.title}</span>
                  <div class="due-meta">
                    <span class="due-category-pill">${d.category}</span>
                    <span>🏛️ ${d.institution}</span>
                    <span>📅 Due: ${d.dueDate}</span>
                    ${d.notes ? `<span>📝 ${d.notes}</span>` : ''}
                  </div>
                </div>

                <div class="due-amount-col">
                  <span class="due-amount-value">${d.currency}${Number(d.amount).toFixed(2)}</span>
                  <span class="status-pill ${isPaid ? 'status-paid' : 'status-pending'}">
                    ${d.status}
                  </span>
                </div>

                <div class="due-actions-col">
                  ${!isPaid ? `
                    <button class="btn btn-emerald btn-sm btn-mark-due-paid" data-id="${d.id}">
                      ✓ Mark Paid
                    </button>
                  ` : `
                    <span class="receipt-stamp">Cleared</span>
                  `}
                  <button class="btn-icon btn-delete-due" data-id="${d.id}" title="Remove entry">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  renderNotesTab() {
    const notes = this.getFilteredNotes();
    const academics = this.getAcademics();
    const courses = academics.courses || [];

    const folders = ['All', 'Lecture Notes', 'Study Guides', 'Cheatsheets', 'Research'];
    const courseCodes = ['All', ...courses.map(c => c.code)];

    return `
      <!-- Search, Filter & Upload Bar -->
      <div class="notes-library-controls glass-panel">
        <div class="search-input-wrap">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="notes-search-input" placeholder="Search notes, tags, concepts, or courses..." value="${this.notesSearchQuery}" class="search-field" />
        </div>

        <div class="notes-filter-dropdowns">
          <select id="notes-folder-select" class="form-select-sm">
            ${folders.map(f => `<option value="${f}" ${this.notesSelectedFolder === f ? 'selected' : ''}>Folder: ${f}</option>`).join('')}
          </select>

          <select id="notes-course-select" class="form-select-sm">
            ${courseCodes.map(c => `<option value="${c}" ${this.notesSelectedCourse === c ? 'selected' : ''}>Course: ${c}</option>`).join('')}
          </select>
        </div>

        <button class="btn btn-primary btn-sm" id="btn-open-upload-note">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Note
        </button>
      </div>

      <!-- Notes Grid -->
      <div class="notes-cards-grid">
        ${notes.length === 0 ? `
          <div class="empty-state glass-panel full-width">
            <div class="empty-icon">📁</div>
            <h4>No documents found matching "${this.notesSearchQuery || this.notesSelectedFolder}"</h4>
            <p>Upload a new PDF/image or adjust your search filters.</p>
          </div>
        ` : notes.map(note => `
          <div class="note-card glass-panel" data-id="${note.id}">
            <div class="note-card-header">
              <span class="course-mini-tag">${note.courseCode}</span>
              <span class="folder-pill">📁 ${note.folder}</span>
            </div>

            <h4 class="note-title">${note.title}</h4>
            <p class="note-snippet">${note.content.substring(0, 140).replace(/#/g, '')}...</p>

            ${note.attachment ? `
              <div class="attachment-pill" title="Attachment: ${note.attachment.name}">
                <span class="attach-icon">${note.attachment.type === 'pdf' ? '📕' : '🖼️'}</span>
                <span class="attach-name">${note.attachment.name}</span>
                <span class="attach-size">${note.attachment.size}</span>
              </div>
            ` : ''}

            <div class="note-tags-row">
              ${(note.tags || []).map(t => `<span class="note-tag">#${t}</span>`).join('')}
            </div>

            <div class="note-card-footer">
              <span class="note-date">🗓️ ${note.date}</span>
              <div class="note-action-btns">
                <button class="btn btn-secondary btn-xs btn-preview-note" data-id="${note.id}">
                  Read / Preview
                </button>
                <button class="btn-icon-subtle btn-delete-note" data-id="${note.id}" title="Delete">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  attachEventListeners() {
    const container = document.getElementById('academics-view-content');
    if (!container) return;

    // Sub-nav tab switching
    container.querySelectorAll('.subnav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.activeTab = e.currentTarget.dataset.tab;
        this.render();
      });
    });

    // Courses events
    container.querySelector('#btn-open-add-course')?.addEventListener('click', () => {
      this.app.openCourseModal();
    });
    container.querySelectorAll('.btn-delete-course').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Drop this course? Associated grades will be removed.')) {
          this.deleteCourse(e.currentTarget.dataset.id);
        }
      });
    });

    // Deadlines events
    container.querySelector('#btn-open-add-deadline')?.addEventListener('click', () => {
      this.app.openDeadlineModal();
    });
    container.querySelectorAll('.checkbox-circle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.toggleDeadline(e.currentTarget.dataset.id);
      });
    });
    container.querySelectorAll('.btn-delete-deadline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.deleteDeadline(e.currentTarget.dataset.id);
      });
    });

    // To-Do events
    const todoInput = container.querySelector('#quick-todo-input');
    const btnAddTodo = container.querySelector('#btn-add-quick-todo');
    if (btnAddTodo && todoInput) {
      const handleAdd = () => {
        if (todoInput.value.trim()) {
          this.addTodo(todoInput.value.trim());
          todoInput.value = '';
        }
      };
      btnAddTodo.addEventListener('click', handleAdd);
      todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAdd();
      });
    }
    container.querySelectorAll('.todo-check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.toggleTodo(e.currentTarget.dataset.id));
    });
    container.querySelectorAll('.btn-delete-todo').forEach(btn => {
      btn.addEventListener('click', (e) => this.deleteTodo(e.currentTarget.dataset.id));
    });

    // Dues events
    container.querySelector('#btn-open-add-due')?.addEventListener('click', () => {
      this.app.openDueModal();
    });
    container.querySelectorAll('.btn-mark-due-paid').forEach(btn => {
      btn.addEventListener('click', (e) => this.markDuePaid(e.currentTarget.dataset.id));
    });
    container.querySelectorAll('.btn-delete-due').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Delete this financial billing record?')) {
          this.deleteDue(e.currentTarget.dataset.id);
        }
      });
    });

    // Notes events
    const searchInput = container.querySelector('#notes-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.notesSearchQuery = e.target.value;
        const grid = container.querySelector('.notes-cards-grid');
        if (grid) {
          const notes = this.getFilteredNotes();
          if (notes.length === 0) {
            grid.innerHTML = `
              <div class="empty-state glass-panel full-width">
                <div class="empty-icon">📁</div>
                <h4>No documents found matching "${this.notesSearchQuery}"</h4>
                <p>Adjust your search query.</p>
              </div>
            `;
          } else {
            grid.innerHTML = notes.map(note => `
              <div class="note-card glass-panel" data-id="${note.id}">
                <div class="note-card-header">
                  <span class="course-mini-tag">${note.courseCode}</span>
                  <span class="folder-pill">📁 ${note.folder}</span>
                </div>
                <h4 class="note-title">${note.title}</h4>
                <p class="note-snippet">${note.content.substring(0, 140).replace(/#/g, '')}...</p>
                ${note.attachment ? `
                  <div class="attachment-pill">
                    <span class="attach-icon">${note.attachment.type === 'pdf' ? '📕' : '🖼️'}</span>
                    <span class="attach-name">${note.attachment.name}</span>
                    <span class="attach-size">${note.attachment.size}</span>
                  </div>
                ` : ''}
                <div class="note-tags-row">
                  ${(note.tags || []).map(t => `<span class="note-tag">#${t}</span>`).join('')}
                </div>
                <div class="note-card-footer">
                  <span class="note-date">🗓️ ${note.date}</span>
                  <div class="note-action-btns">
                    <button class="btn btn-secondary btn-xs btn-preview-note" data-id="${note.id}">Read / Preview</button>
                    <button class="btn-icon-subtle btn-delete-note" data-id="${note.id}">×</button>
                  </div>
                </div>
              </div>
            `).join('');
            this.attachNoteActionListeners();
          }
        }
      });
    }

    container.querySelector('#notes-folder-select')?.addEventListener('change', (e) => {
      this.notesSelectedFolder = e.target.value;
      this.render();
    });

    container.querySelector('#notes-course-select')?.addEventListener('change', (e) => {
      this.notesSelectedCourse = e.target.value;
      this.render();
    });

    container.querySelector('#btn-open-upload-note')?.addEventListener('click', () => {
      this.app.openNoteModal();
    });

    this.attachNoteActionListeners();
  }

  attachNoteActionListeners() {
    const container = document.getElementById('academics-view-content');
    if (!container) return;

    container.querySelectorAll('.btn-preview-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const note = (this.getAcademics().notes || []).find(n => n.id === id);
        if (note) this.app.openNotePreviewModal(note);
      });
    });

    container.querySelectorAll('.btn-delete-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (confirm('Permanently delete this note?')) {
          this.deleteNote(e.currentTarget.dataset.id);
        }
      });
    });
  }
}


  // --- 8. Core Application Controller & UI Bootstrap ---
  /**
 * Zenith Life & Wellness OS - Main Application Controller
 */









class ZenithApp {
  constructor() {
    this.currentView = 'overview'; // 'overview' | 'habits' | 'nutrition' | 'academics' | 'settings'
    this.habits = new HabitTracker(this);
    this.nutrition = new NutritionTracker(this);
    this.academics = new AcademicDashboard(this);
    this.init();
  }

  init() {
    this.applyTheme(storage.state.settings.theme || 'sage');
    sound.setEnabled(storage.state.settings.soundEnabled ?? true);

    this.bindNavigation();
    this.bindTopBarEvents();
    this.bindModals();
    this.renderMotivationalBanner(quotesEngine.getCurrent());
    this.switchView('overview');

    // Subscribe to state changes for auto-sync reflection
    storage.subscribe(() => {
      this.updateSyncStatus();
    });

    // Check if initial modal open requested or first visit
    this.updateUserHeader();
  }

  updateSyncStatus() {
    const el = document.getElementById('cloud-sync-status');
    if (!el) return;
    el.innerHTML = '<span class="sync-dot pulsing"></span> Cloud Synced • Just now';
    setTimeout(() => {
      if (el) el.innerHTML = '<span class="sync-dot"></span> Cloud Synced';
    }, 2000);
  }

  updateUserHeader() {
    const user = storage.currentUser || { name: 'Guest Explorer', role: 'Personal OS' };
    const nameEl = document.getElementById('header-user-name');
    const roleEl = document.getElementById('header-user-role');
    const avatarEl = document.getElementById('header-user-avatar');

    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role;
    if (avatarEl && user.avatar) avatarEl.src = user.avatar;
  }

  // --- View Router ---
  switchView(viewName) {
    this.currentView = viewName;

    // Update nav active classes (both sidebar & mobile bottom bar)
    document.querySelectorAll('.nav-link, .mobile-nav-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Hide all view sections, show active
    document.querySelectorAll('.app-view').forEach(view => {
      if (view.id === `view-${viewName}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Render target view
    if (viewName === 'overview') this.renderOverview();
    else if (viewName === 'habits') this.habits.render();
    else if (viewName === 'nutrition') this.nutrition.render();
    else if (viewName === 'academics') this.academics.render();
    else if (viewName === 'settings') this.renderSettings();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindNavigation() {
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        if (view) this.switchView(view);
      });
    });
  }

  bindTopBarEvents() {
    // Theme toggle button in header
    document.getElementById('btn-toggle-theme')?.addEventListener('click', () => {
      const current = storage.state.settings.theme || 'sage';
      const order = ['sage', 'obsidian', 'light', 'ocean'];
      const next = order[(order.indexOf(current) + 1) % order.length];
      this.applyTheme(next);
      this.showToast(`Theme changed to ${this.getThemeDisplayName(next)}`, 'info');
    });

    // Profile button opens auth or profile modal
    document.getElementById('header-profile-btn')?.addEventListener('click', () => {
      this.openAuthModal();
    });

    // Spark Another Thought button
    document.getElementById('btn-spark-quote')?.addEventListener('click', () => {
      const nextThought = quotesEngine.nextThought();
      this.renderMotivationalBanner(nextThought, true);
      sound.playPop();
    });
  }

  getThemeDisplayName(t) {
    switch (t) {
      case 'sage': return 'Nordic Sage (Dark)';
      case 'obsidian': return 'Obsidian Ember (Dark)';
      case 'light': return 'Ethereal Clean (Light)';
      case 'ocean': return 'Oceanic Calm (Dark)';
      default: return t;
    }
  }

  applyTheme(theme) {
    storage.state.settings.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    storage.saveState();
  }

  // --- Motivational Banner ---
  renderMotivationalBanner(thought, animated = false) {
    const banner = document.getElementById('motivational-banner');
    if (!banner) return;

    const quoteEl = banner.querySelector('.quote-text');
    const authorEl = banner.querySelector('.quote-author');
    const categoryEl = banner.querySelector('.quote-category');
    const contextEl = banner.querySelector('.quote-context');

    if (animated) {
      banner.classList.add('quote-updating');
      setTimeout(() => {
        if (quoteEl) quoteEl.textContent = `“${thought.quote}”`;
        if (authorEl) authorEl.textContent = `— ${thought.author}`;
        if (categoryEl) categoryEl.textContent = thought.category;
        if (contextEl) contextEl.textContent = thought.context;
        banner.classList.remove('quote-updating');
      }, 200);
    } else {
      if (quoteEl) quoteEl.textContent = `“${thought.quote}”`;
      if (authorEl) authorEl.textContent = `— ${thought.author}`;
      if (categoryEl) categoryEl.textContent = thought.category;
      if (contextEl) contextEl.textContent = thought.context;
    }
  }

  // --- Overview / Dashboard View ---
  renderOverview() {
    const container = document.getElementById('overview-view-content');
    if (!container) return;

    const habits = this.habits.getHabits();
    const habitStats = this.habits.calculateStats();

    const nutritionTotals = this.nutrition.calculateTotals();
    const nutritionGoals = this.nutrition.getGoals();
    const caloriesLeft = nutritionGoals.calories - nutritionTotals.calories;

    const academics = this.academics.getAcademics();
    const gpaInfo = this.academics.calculateGpa();
    const pendingDeadlines = (academics.deadlines || []).filter(d => !d.completed);
    const pendingDues = (academics.dues || []).filter(d => d.status !== 'Paid');
    const pendingDuesAmount = pendingDues.reduce((acc, d) => acc + Number(d.amount || 0), 0);

    const widgets = storage.state.settings.dashboardWidgets || {
      habits: true, nutrition: true, academics: true, dues: true, water: true
    };

    let html = `
      <!-- Greeting & Daily Status Strip -->
      <div class="overview-welcome-row">
        <div>
          <h2 class="welcome-heading">Welcome back, ${storage.currentUser?.name.split(' ')[0] || 'Friend'}</h2>
          <p class="welcome-sub">Here is your life & wellness snapshot for ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}.</p>
        </div>
        <div class="welcome-quick-actions">
          <button class="btn btn-primary btn-sm" id="btn-dash-quick-log">
            + Log Food
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-dash-new-habit">
            + New Habit
          </button>
        </div>
      </div>

      <!-- Core Vitals Summary Cards (Responsive 4-Grid) -->
      <div class="stats-grid">
        <!-- Habits Today -->
        <div class="stat-card glass-panel cursor-pointer" id="dash-card-habits">
          <div class="stat-header">
            <span class="stat-title">Habits Done</span>
            <span class="stat-icon">🔥</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${habitStats.completedToday}/${habitStats.total}</div>
            <div class="stat-sub">${habitStats.percentage}% completion today</div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill progress-emerald" style="width: ${habitStats.percentage}%;"></div>
          </div>
        </div>

        <!-- Calories Remaining -->
        <div class="stat-card glass-panel cursor-pointer" id="dash-card-nutrition">
          <div class="stat-header">
            <span class="stat-title">Energy Consumed</span>
            <span class="stat-icon">🥗</span>
          </div>
          <div class="stat-main">
            <div class="stat-value">${nutritionTotals.calories} <span class="stat-unit">kcal</span></div>
            <div class="stat-sub ${caloriesLeft < 0 ? 'text-danger' : ''}">
              ${caloriesLeft >= 0 ? `${caloriesLeft} kcal left` : `${Math.abs(caloriesLeft)} kcal over`}
            </div>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill progress-amber" style="width: ${Math.min(100, Math.round((nutritionTotals.calories / nutritionGoals.calories) * 100))}%;"></div>
          </div>
        </div>

        <!-- Academic Standing -->
        <div class="stat-card glass-panel cursor-pointer" id="dash-card-academics">
          <div class="stat-header">
            <span class="stat-title">Current GPA</span>
            <span class="stat-icon">🎓</span>
          </div>
          <div class="stat-main">
            <div class="stat-value text-blue">${gpaInfo.gpa}</div>
            <div class="stat-sub">${pendingDeadlines.length} pending deadlines</div>
          </div>
          <div class="stat-badge badge-blue">${academics.courses.length} Active Courses</div>
        </div>

        <!-- Financial Status -->
        <div class="stat-card glass-panel cursor-pointer" id="dash-card-dues">
          <div class="stat-header">
            <span class="stat-title">Pending Dues</span>
            <span class="stat-icon">💳</span>
          </div>
          <div class="stat-main">
            <div class="stat-value ${pendingDuesAmount > 0 ? 'text-amber' : 'text-emerald'}">
              $${pendingDuesAmount.toFixed(2)}
            </div>
            <div class="stat-sub">${pendingDues.length} unresolved campus fees</div>
          </div>
          <div class="stat-badge ${pendingDuesAmount > 0 ? 'badge-amber' : 'badge-emerald'}">
            ${pendingDuesAmount > 0 ? 'Action required' : 'All clear'}
          </div>
        </div>
      </div>

      <!-- Main Dashboard Grid Layout -->
      <div class="dashboard-sections-grid">
        <!-- Left / Top Primary Column -->
        <div class="dashboard-col-main">
          <!-- Widget: Habits Quick Check-in Strip -->
          ${widgets.habits ? `
            <div class="dash-widget glass-panel">
              <div class="widget-header">
                <div>
                  <h3 class="widget-title">Today's Atomic Routines</h3>
                  <p class="widget-sub">1-tap check-in on desktop or phone</p>
                </div>
                <button class="btn-subtle-link" id="link-view-all-habits">View All →</button>
              </div>

              <div class="dash-habits-strip">
                ${habits.slice(0, 5).map(h => {
                  const done = Boolean(h.history && h.history[this.habits.currentDate]);
                  return `
                    <div class="dash-habit-item ${done ? 'item-checked' : ''}" data-id="${h.id}">
                      <button class="habit-quick-check-btn ${done ? 'checked' : ''}" data-id="${h.id}">
                        <span class="habit-icon">${h.icon}</span>
                        <span class="check-indicator">✓</span>
                      </button>
                      <div class="item-text">
                        <span class="item-title">${h.name}</span>
                        <span class="item-meta">🔥 ${h.currentStreak || 0}d streak • ${h.category}</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Widget: Nutrition & Macros Quick Overview -->
          ${widgets.nutrition ? `
            <div class="dash-widget glass-panel">
              <div class="widget-header">
                <div>
                  <h3 class="widget-title">Daily Nutrition & Macros</h3>
                  <p class="widget-sub">Target balance: ${nutritionGoals.calories} kcal</p>
                </div>
                <button class="btn-subtle-link" id="link-view-all-nutrition">Food Journal →</button>
              </div>

              <div class="dash-nutrition-row">
                <div class="macro-pill-summary">
                  <span class="macro-badge text-protein">🥩 P: ${nutritionTotals.protein}g / ${nutritionGoals.protein}g</span>
                  <span class="macro-badge text-carbs">🌾 C: ${nutritionTotals.carbs}g / ${nutritionGoals.carbs}g</span>
                  <span class="macro-badge text-fats">🥑 F: ${nutritionTotals.fat}g / ${nutritionGoals.fat}g</span>
                  <span class="macro-badge">🧂 Sodium: ${nutritionTotals.sodium}mg</span>
                </div>
                <div class="dash-food-actions">
                  <button class="btn btn-secondary btn-sm" id="dash-btn-search-food">🔍 Search</button>
                  <button class="btn btn-secondary btn-sm" id="dash-btn-photo-food">📷 Photo Scan</button>
                </div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Right / Secondary Column -->
        <div class="dashboard-col-side">
          <!-- Widget: Imminent Deadlines -->
          ${widgets.academics ? `
            <div class="dash-widget glass-panel">
              <div class="widget-header">
                <h3 class="widget-title">Upcoming Deadlines</h3>
                <button class="btn-subtle-link" id="link-view-all-deadlines">All Tasks →</button>
              </div>

              <div class="dash-deadlines-list">
                ${pendingDeadlines.slice(0, 3).map(d => `
                  <div class="dash-deadline-card">
                    <div class="dl-top">
                      <span class="course-mini-tag">${d.courseCode}</span>
                      <span class="dl-date">📅 ${d.dueDate}</span>
                    </div>
                    <h5 class="dl-name">${d.title}</h5>
                  </div>
                `).join('') || `
                  <div class="empty-state-sm">No imminent deadlines.</div>
                `}
              </div>
            </div>
          ` : ''}

          <!-- Widget: Quick Water Tracker -->
          ${widgets.water ? `
            <div class="dash-widget glass-panel">
              <div class="widget-header">
                <h3 class="widget-title">Hydration Monitor</h3>
                <span class="water-ml-label">${this.nutrition.getWater()} / ${nutritionGoals.water} ml</span>
              </div>
              <div class="progress-bar-track water-track">
                <div class="progress-bar-fill progress-water" style="width: ${Math.min(100, Math.round((this.nutrition.getWater() / nutritionGoals.water) * 100))}%;"></div>
              </div>
              <div class="water-quick-buttons">
                <button class="btn btn-outline btn-xs" id="dash-water-add-250">+250ml</button>
                <button class="btn btn-outline btn-xs" id="dash-water-add-500">+500ml</button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachOverviewEvents(container);
  }

  attachOverviewEvents(container) {
    // Stat cards navigate to corresponding tabs
    container.querySelector('#dash-card-habits')?.addEventListener('click', () => this.switchView('habits'));
    container.querySelector('#dash-card-nutrition')?.addEventListener('click', () => this.switchView('nutrition'));
    container.querySelector('#dash-card-academics')?.addEventListener('click', () => {
      this.switchView('academics');
      this.academics.activeTab = 'courses';
      this.academics.render();
    });
    container.querySelector('#dash-card-dues')?.addEventListener('click', () => {
      this.switchView('academics');
      this.academics.activeTab = 'dues';
      this.academics.render();
    });

    // Sub-links
    container.querySelector('#link-view-all-habits')?.addEventListener('click', () => this.switchView('habits'));
    container.querySelector('#link-view-all-nutrition')?.addEventListener('click', () => this.switchView('nutrition'));
    container.querySelector('#link-view-all-deadlines')?.addEventListener('click', () => {
      this.switchView('academics');
      this.academics.activeTab = 'deadlines';
      this.academics.render();
    });

    // Quick buttons
    container.querySelector('#btn-dash-quick-log')?.addEventListener('click', () => this.openFoodModal('search'));
    container.querySelector('#btn-dash-new-habit')?.addEventListener('click', () => this.openHabitModal());
    container.querySelector('#dash-btn-search-food')?.addEventListener('click', () => this.openFoodModal('search'));
    container.querySelector('#dash-btn-photo-food')?.addEventListener('click', () => this.openFoodModal('photo'));

    // Habit check-in from dashboard
    container.querySelectorAll('.dash-habit-item .habit-quick-check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.habits.toggleCheckIn(id);
      });
    });

    // Water buttons
    container.querySelector('#dash-water-add-250')?.addEventListener('click', () => this.nutrition.updateWater(250));
    container.querySelector('#dash-water-add-500')?.addEventListener('click', () => this.nutrition.updateWater(500));
  }

  // --- Settings View ---
  renderSettings() {
    const container = document.getElementById('settings-view-content');
    if (!container) return;

    const s = storage.state.settings;
    const currentTheme = s.theme || 'sage';
    const widgets = s.dashboardWidgets || {
      habits: true, nutrition: true, academics: true, dues: true, water: true
    };

    container.innerHTML = `
      <div class="settings-grid">
        <!-- Appearance & Theme Preferences -->
        <div class="settings-card glass-panel">
          <div class="settings-card-header">
            <h3>🎨 Visual Appearance & Palette</h3>
            <p class="settings-sub">Choose a calming, high-contrast aesthetic that fits your flow.</p>
          </div>

          <div class="theme-options-grid">
            <button class="theme-select-card ${currentTheme === 'sage' ? 'active' : ''}" data-theme="sage">
              <div class="theme-preview sage-preview"></div>
              <span class="theme-name">Nordic Sage</span>
              <span class="theme-desc">Calming slate & eucalyptus (Dark)</span>
            </button>

            <button class="theme-select-card ${currentTheme === 'obsidian' ? 'active' : ''}" data-theme="obsidian">
              <div class="theme-preview obsidian-preview"></div>
              <span class="theme-name">Obsidian Ember</span>
              <span class="theme-desc">Deep obsidian & amber bronze (Dark)</span>
            </button>

            <button class="theme-select-card ${currentTheme === 'light' ? 'active' : ''}" data-theme="light">
              <div class="theme-preview light-preview"></div>
              <span class="theme-name">Ethereal Porcelain</span>
              <span class="theme-desc">Crisp, serene contrast (Light)</span>
            </button>

            <button class="theme-select-card ${currentTheme === 'ocean' ? 'active' : ''}" data-theme="ocean">
              <div class="theme-preview ocean-preview"></div>
              <span class="theme-name">Oceanic Calm</span>
              <span class="theme-desc">Deep navy & seafoam cyan (Dark)</span>
            </button>
          </div>
        </div>

        <!-- Nutrition Targets Settings -->
        <div class="settings-card glass-panel">
          <div class="settings-card-header">
            <h3>🥗 Daily Nutrition & Hydration Goals</h3>
            <p class="settings-sub">Set personalized macronutrient thresholds and calorie budgets.</p>
          </div>

          <form id="settings-nutrition-form" class="settings-form-grid">
            <div class="form-group">
              <label>Daily Calorie Target (kcal)</label>
              <input type="number" id="setting-cal" value="${s.dailyCalorieGoal || 2150}" min="1000" max="6000" class="form-input" />
            </div>

            <div class="form-group">
              <label>Protein Target (g)</label>
              <input type="number" id="setting-protein" value="${s.dailyProteinGoal || 135}" min="20" max="400" class="form-input" />
            </div>

            <div class="form-group">
              <label>Carbohydrates Target (g)</label>
              <input type="number" id="setting-carbs" value="${s.dailyCarbsGoal || 220}" min="20" max="600" class="form-input" />
            </div>

            <div class="form-group">
              <label>Healthy Fats Target (g)</label>
              <input type="number" id="setting-fat" value="${s.dailyFatGoal || 65}" min="15" max="250" class="form-input" />
            </div>

            <div class="form-group">
              <label>Dietary Fiber Target (g)</label>
              <input type="number" id="setting-fiber" value="${s.dailyFiberGoal || 32}" min="10" max="100" class="form-input" />
            </div>

            <div class="form-group">
              <label>Sodium Daily Limit (mg)</label>
              <input type="number" id="setting-sodium" value="${s.dailySodiumMax || 2200}" min="500" max="5000" class="form-input" />
            </div>

            <div class="form-group">
              <label>Hydration Goal (ml)</label>
              <input type="number" id="setting-water" value="${s.dailyWaterGoal || 2500}" min="500" max="6000" step="100" class="form-input" />
            </div>

            <div class="form-actions-full">
              <button type="submit" class="btn btn-primary btn-sm">Save Nutrition Goals</button>
            </div>
          </form>
        </div>

        <!-- Modular Dashboard & Audio Toggles -->
        <div class="settings-card glass-panel">
          <div class="settings-card-header">
            <h3>🧩 Modular Widgets & Feedback</h3>
            <p class="settings-sub">Customize which sections appear on your overview screen.</p>
          </div>

          <div class="toggle-list">
            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Habits Widget</span>
                <span class="toggle-sub">Show atomic routines check-in on overview</span>
              </div>
              <input type="checkbox" id="toggle-widget-habits" class="switch-input" ${widgets.habits ? 'checked' : ''} />
            </label>

            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Nutrition & Macro Balance</span>
                <span class="toggle-sub">Show calories and macro distribution rings</span>
              </div>
              <input type="checkbox" id="toggle-widget-nutrition" class="switch-input" ${widgets.nutrition ? 'checked' : ''} />
            </label>

            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Academic Deadlines</span>
                <span class="toggle-sub">Show exam countdowns and assignment milestones</span>
              </div>
              <input type="checkbox" id="toggle-widget-academics" class="switch-input" ${widgets.academics ? 'checked' : ''} />
            </label>

            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Campus Dues & Billing Alert</span>
                <span class="toggle-sub">Display pending fees balance and payment reminders</span>
              </div>
              <input type="checkbox" id="toggle-widget-dues" class="switch-input" ${widgets.dues ? 'checked' : ''} />
            </label>

            <label class="toggle-row">
              <div class="toggle-text">
                <span class="toggle-title">Audio Feedback & Chimes</span>
                <span class="toggle-sub">Play gentle resonant chord on completing habits</span>
              </div>
              <input type="checkbox" id="toggle-sound" class="switch-input" ${s.soundEnabled ? 'checked' : ''} />
            </label>
          </div>
        </div>

        <!-- Data Management & Privacy -->
        <div class="settings-card glass-panel">
          <div class="settings-card-header">
            <h3>🔒 Account, Data Privacy & Backup</h3>
            <p class="settings-sub">Export your data to JSON, switch accounts, or restore defaults.</p>
          </div>

          <div class="data-actions-grid">
            <div class="data-action-item">
              <div>
                <h5>Export Personal Backup</h5>
                <p>Download a complete JSON snapshot of habits, nutrition, and notes.</p>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-export-json">📥 Export JSON</button>
            </div>

            <div class="data-action-item">
              <div>
                <h5>Restore from Backup</h5>
                <p>Upload a previously exported JSON backup file.</p>
              </div>
              <label class="btn btn-secondary btn-sm file-upload-label">
                📤 Import JSON
                <input type="file" id="file-import-json" accept=".json" style="display: none;" />
              </label>
            </div>

            <div class="data-action-item">
              <div>
                <h5>Reset to Showcase Data</h5>
                <p>Reload realistic sample habits, courses, and meal logs.</p>
              </div>
              <button class="btn btn-outline btn-sm text-amber" id="btn-reset-demo">↺ Reload Demo Data</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach Settings Events
    container.querySelectorAll('.theme-select-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const theme = e.currentTarget.dataset.theme;
        this.applyTheme(theme);
        this.renderSettings();
        this.showToast(`Active theme: ${this.getThemeDisplayName(theme)}`, 'success');
      });
    });

    // Nutrition Form
    container.querySelector('#settings-nutrition-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      storage.state.settings.dailyCalorieGoal = Number(document.getElementById('setting-cal').value);
      storage.state.settings.dailyProteinGoal = Number(document.getElementById('setting-protein').value);
      storage.state.settings.dailyCarbsGoal = Number(document.getElementById('setting-carbs').value);
      storage.state.settings.dailyFatGoal = Number(document.getElementById('setting-fat').value);
      storage.state.settings.dailyFiberGoal = Number(document.getElementById('setting-fiber').value);
      storage.state.settings.dailySodiumMax = Number(document.getElementById('setting-sodium').value);
      storage.state.settings.dailyWaterGoal = Number(document.getElementById('setting-water').value);
      storage.saveState();
      this.showToast('Nutrition goals updated successfully.', 'success');
    });

    // Widget toggles
    const bindToggle = (id, key) => {
      container.querySelector(id)?.addEventListener('change', (e) => {
        storage.state.settings.dashboardWidgets[key] = e.target.checked;
        storage.saveState();
      });
    };
    bindToggle('#toggle-widget-habits', 'habits');
    bindToggle('#toggle-widget-nutrition', 'nutrition');
    bindToggle('#toggle-widget-academics', 'academics');
    bindToggle('#toggle-widget-dues', 'dues');

    container.querySelector('#toggle-sound')?.addEventListener('change', (e) => {
      storage.state.settings.soundEnabled = e.target.checked;
      sound.setEnabled(e.target.checked);
      storage.saveState();
      if (e.target.checked) sound.playChime();
    });

    // Export/Import/Reset
    container.querySelector('#btn-export-json')?.addEventListener('click', () => {
      storage.exportDataJson();
      this.showToast('Data exported successfully.', 'success');
    });

    container.querySelector('#file-import-json')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = storage.importDataJson(event.target.result);
        if (res.success) {
          this.showToast('Data successfully imported!', 'success');
          this.renderSettings();
        } else {
          this.showToast(`Import failed: ${res.message}`, 'error');
        }
      };
      reader.readAsText(file);
    });

    container.querySelector('#btn-reset-demo')?.addEventListener('click', () => {
      if (confirm('Reload the complete sample dataset for this account? Current unbacked changes will be replaced with fresh showcase data.')) {
        storage.resetCurrentUserData();
        this.renderSettings();
        this.renderOverview();
        this.showToast('Reset to rich demo data.', 'success');
      }
    });
  }

  // --- Modals Controller ---
  bindModals() {
    // ESC and backdrop click handling for all dialog elements
    document.querySelectorAll('dialog').forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          dialog.close();
        }
      });

      dialog.querySelectorAll('.btn-close-dialog').forEach(btn => {
        btn.addEventListener('click', () => dialog.close());
      });
    });

    this.bindHabitModal();
    this.bindFoodModal();
    this.bindCourseModal();
    this.bindDeadlineModal();
    this.bindDueModal();
    this.bindNoteModal();
    this.bindAuthModal();
  }

  // --- Habit Modal ---
  openHabitModal(existingHabit = null) {
    const dialog = document.getElementById('habit-dialog');
    if (!dialog) return;

    const titleEl = dialog.querySelector('#habit-modal-title');
    const form = dialog.querySelector('#habit-form');
    form.reset();

    if (existingHabit) {
      titleEl.textContent = 'Edit Atomic Habit';
      form.dataset.editId = existingHabit.id;
      document.getElementById('habit-input-name').value = existingHabit.name;
      document.getElementById('habit-input-category').value = existingHabit.category;
      document.getElementById('habit-input-icon').value = existingHabit.icon;
      document.getElementById('habit-input-time').value = existingHabit.targetTime;
      document.getElementById('habit-input-freq').value = existingHabit.frequency;
      document.getElementById('habit-check-today-wrap').style.display = 'none';
    } else {
      titleEl.textContent = 'Forge a New Habit';
      delete form.dataset.editId;
      document.getElementById('habit-check-today-wrap').style.display = 'block';
    }

    dialog.showModal();
  }

  bindHabitModal() {
    const dialog = document.getElementById('habit-dialog');
    const form = dialog?.querySelector('#habit-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const habitData = {
        name: document.getElementById('habit-input-name').value,
        category: document.getElementById('habit-input-category').value,
        icon: document.getElementById('habit-input-icon').value,
        targetTime: document.getElementById('habit-input-time').value,
        frequency: document.getElementById('habit-input-freq').value,
        checkedToday: document.getElementById('habit-check-today')?.checked
      };

      if (form.dataset.editId) {
        this.habits.updateHabit(form.dataset.editId, habitData);
      } else {
        this.habits.createHabit(habitData);
      }

      dialog.close();
    });
  }

  // --- Food Modal (Search, Photo AI Scan, Manual) ---
  openFoodModal(activeTab = 'search') {
    const dialog = document.getElementById('food-dialog');
    if (!dialog) return;

    this.switchFoodModalTab(activeTab);
    this.renderFoodDatabaseResults('');
    dialog.showModal();
  }

  switchFoodModalTab(tabName) {
    const dialog = document.getElementById('food-dialog');
    if (!dialog) return;

    dialog.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    dialog.querySelectorAll('.food-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `food-pane-${tabName}`);
    });
  }

  bindFoodModal() {
    const dialog = document.getElementById('food-dialog');
    if (!dialog) return;

    // Tab buttons
    dialog.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchFoodModalTab(e.currentTarget.dataset.tab);
      });
    });

    // 1. Search Database Tab
    const searchInput = dialog.querySelector('#food-db-search-input');
    searchInput?.addEventListener('input', (e) => {
      this.renderFoodDatabaseResults(e.target.value);
    });

    // 2. Photo Scan Tab Preset Buttons
    this.renderPhotoPresets();

    // Custom File upload / Camera take photo input
    const photoInput = dialog.querySelector('#food-camera-input');
    photoInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        this.simulatePhotoAnalysis({
          label: file.name,
          imageUrl: event.target.result,
          detectedFood: 'Home-Prepared Balanced Dish',
          confidence: 82,
          portion: '1 bowl / plate (approx 340g)',
          estimatedCalories: 460,
          protein: 30,
          carbs: 45,
          fat: 16,
          fiber: 5,
          sodium: 480,
          notes: 'Estimated from visual contours and portion density. Please verify components before logging.'
        });
      };
      reader.readAsDataURL(file);
    });

    // Manual Food Form
    const manualForm = dialog.querySelector('#food-manual-form');
    manualForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.nutrition.addFoodLog({
        mealType: document.getElementById('food-manual-type').value,
        name: document.getElementById('food-manual-name').value,
        portion: document.getElementById('food-manual-portion').value,
        calories: document.getElementById('food-manual-cal').value,
        protein: document.getElementById('food-manual-protein').value,
        carbs: document.getElementById('food-manual-carbs').value,
        fat: document.getElementById('food-manual-fat').value,
        fiber: document.getElementById('food-manual-fiber').value,
        sodium: document.getElementById('food-manual-sodium').value,
        isEstimate: false,
        source: 'Manual'
      });
      dialog.close();
    });
  }

  renderFoodDatabaseResults(query) {
    const list = document.getElementById('food-db-results-list');
    if (!list) return;

    const q = query.trim().toLowerCase();
    const filtered = q
      ? FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
      : FOOD_DATABASE;

    list.innerHTML = filtered.map(item => `
      <div class="food-db-item" data-id="${item.id}">
        <span class="food-db-icon">${item.icon}</span>
        <div class="food-db-info">
          <span class="food-db-name">${item.name}</span>
          <span class="food-db-portion">⚖️ ${item.portion} • ${item.category}</span>
        </div>
        <div class="food-db-macros">
          <span class="food-db-cal"><strong>${item.calories}</strong> kcal</span>
          <span class="food-db-pcf">P: ${item.protein}g | C: ${item.carbs}g | F: ${item.fat}g</span>
        </div>
        <button class="btn btn-primary btn-xs btn-log-db-food" data-id="${item.id}">
          + Log
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.btn-log-db-food').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const item = FOOD_DATABASE.find(f => f.id === id);
        if (item) {
          const mealType = document.getElementById('food-db-meal-type')?.value || item.category;
          this.nutrition.addFoodLog({
            ...item,
            mealType,
            isEstimate: false,
            source: 'Database'
          });
          document.getElementById('food-dialog')?.close();
        }
      });
    });
  }

  renderPhotoPresets() {
    const mount = document.getElementById('photo-presets-mount');
    if (!mount) return;

    mount.innerHTML = PHOTO_SAMPLE_PRESETS.map(p => `
      <div class="photo-preset-card" data-id="${p.id}">
        <img src="${p.imageUrl}" alt="${p.label}" class="preset-img" />
        <span class="preset-title">${p.label}</span>
      </div>
    `).join('');

    mount.querySelectorAll('.photo-preset-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const preset = PHOTO_SAMPLE_PRESETS.find(p => p.id === id);
        if (preset) {
          this.simulatePhotoAnalysis(preset);
        }
      });
    });
  }

  simulatePhotoAnalysis(preset) {
    const analysisCard = document.getElementById('photo-analysis-results-card');
    if (!analysisCard) return;

    // Show simulated AI scanning animation
    analysisCard.innerHTML = `
      <div class="photo-scanning-animation">
        <div class="scanner-spinner"></div>
        <h4>Analyzing Visual Portions & Density...</h4>
        <p>Detecting macronutrient markers and volumetric contours</p>
      </div>
    `;
    analysisCard.style.display = 'block';

    setTimeout(() => {
      analysisCard.innerHTML = `
        <div class="analysis-result-box">
          <div class="analysis-preview-row">
            <img src="${preset.imageUrl}" class="analyzed-dish-thumb" alt="Dish photo" />
            <div class="analysis-dish-details">
              <div class="confidence-badge">
                <span class="confidence-dot"></span>
                <span>Visual Estimation: ~${preset.confidence}% confidence</span>
              </div>
              <h4 class="detected-title">${preset.detectedFood}</h4>
              <p class="detected-notes">${preset.notes}</p>
            </div>
          </div>

          <!-- Medical Disclaimer for Photo Results -->
          <div class="modal-disclaimer-callout">
            ⚠️ <strong>Approximation Notice:</strong> Photographic volume heuristics provide broad estimates. Actual caloric and macronutrient density depends on preparation and oils. <em>Adjust portions and values below before logging.</em>
          </div>

          <!-- Editable Fields Before Saving -->
          <form id="form-confirm-photo-food" class="photo-confirm-grid">
            <div class="form-group">
              <label>Meal Category</label>
              <select id="photo-confirm-meal-type" class="form-select">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch" selected>Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            <div class="form-group">
              <label>Dish Description</label>
              <input type="text" id="photo-confirm-name" value="${preset.detectedFood}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Serving Portion</label>
              <input type="text" id="photo-confirm-portion" value="${preset.portion}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Estimated Calories (kcal)</label>
              <input type="number" id="photo-confirm-cal" value="${preset.estimatedCalories}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Protein (g)</label>
              <input type="number" id="photo-confirm-protein" value="${preset.protein}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Carbohydrates (g)</label>
              <input type="number" id="photo-confirm-carbs" value="${preset.carbs}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Fat (g)</label>
              <input type="number" id="photo-confirm-fat" value="${preset.fat}" class="form-input" />
            </div>

            <div class="form-group">
              <label>Fiber (g)</label>
              <input type="number" id="photo-confirm-fiber" value="${preset.fiber}" class="form-input" />
            </div>

            <div class="form-actions-full">
              <button type="submit" class="btn btn-primary btn-sm">
                ✓ Confirm & Log Estimated Meal
              </button>
            </div>
          </form>
        </div>
      `;

      analysisCard.querySelector('#form-confirm-photo-food')?.addEventListener('submit', (ev) => {
        ev.preventDefault();
        this.nutrition.addFoodLog({
          mealType: document.getElementById('photo-confirm-meal-type').value,
          name: document.getElementById('photo-confirm-name').value,
          portion: document.getElementById('photo-confirm-portion').value,
          calories: document.getElementById('photo-confirm-cal').value,
          protein: document.getElementById('photo-confirm-protein').value,
          carbs: document.getElementById('photo-confirm-carbs').value,
          fat: document.getElementById('photo-confirm-fat').value,
          fiber: document.getElementById('photo-confirm-fiber').value,
          sodium: preset.sodium,
          isEstimate: true,
          confidence: preset.confidence,
          source: 'Photo Estimate'
        });
        document.getElementById('food-dialog')?.close();
      });
    }, 600);
  }

  // --- Course Modal ---
  openCourseModal() {
    const dialog = document.getElementById('course-dialog');
    dialog?.querySelector('#course-form')?.reset();
    dialog?.showModal();
  }

  bindCourseModal() {
    const dialog = document.getElementById('course-dialog');
    const form = dialog?.querySelector('#course-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.academics.addCourse({
        code: document.getElementById('course-input-code').value,
        name: document.getElementById('course-input-name').value,
        professor: document.getElementById('course-input-prof').value,
        credits: document.getElementById('course-input-credits').value,
        currentGrade: document.getElementById('course-input-grade').value,
        gradePercentage: document.getElementById('course-input-pct').value,
        color: document.getElementById('course-input-color').value,
        schedule: document.getElementById('course-input-schedule').value,
        location: document.getElementById('course-input-loc').value
      });
      dialog.close();
    });
  }

  // --- Deadline Modal ---
  openDeadlineModal() {
    const dialog = document.getElementById('deadline-dialog');
    const select = dialog?.querySelector('#deadline-course-select');
    if (select) {
      const courses = this.academics.getAcademics().courses || [];
      select.innerHTML = courses.map(c => `<option value="${c.code}">${c.code} - ${c.name}</option>`).join('') || '<option value="General">General Academic</option>';
    }
    // Set default due date to 3 days from now
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const dateInput = dialog?.querySelector('#deadline-due-date');
    if (dateInput) dateInput.value = d.toISOString().split('T')[0];

    dialog?.showModal();
  }

  bindDeadlineModal() {
    const dialog = document.getElementById('deadline-dialog');
    const form = dialog?.querySelector('#deadline-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.academics.addDeadline({
        courseCode: document.getElementById('deadline-course-select').value,
        title: document.getElementById('deadline-title').value,
        dueDate: document.getElementById('deadline-due-date').value,
        type: document.getElementById('deadline-type').value,
        priority: document.getElementById('deadline-priority').value,
        weight: document.getElementById('deadline-weight').value
      });
      dialog.close();
    });
  }

  // --- Due Modal ---
  openDueModal() {
    const dialog = document.getElementById('due-dialog');
    const form = dialog?.querySelector('#due-form');
    form?.reset();
    const d = new Date();
    d.setDate(d.getDate() + 14);
    const dateInput = dialog?.querySelector('#due-input-date');
    if (dateInput) dateInput.value = d.toISOString().split('T')[0];

    dialog?.showModal();
  }

  bindDueModal() {
    const dialog = document.getElementById('due-dialog');
    const form = dialog?.querySelector('#due-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.academics.addDue({
        title: document.getElementById('due-input-title').value,
        category: document.getElementById('due-input-category').value,
        amount: document.getElementById('due-input-amount').value,
        currency: document.getElementById('due-input-currency').value,
        dueDate: document.getElementById('due-input-date').value,
        institution: document.getElementById('due-input-inst').value,
        notes: document.getElementById('due-input-notes').value
      });
      dialog.close();
    });
  }

  // --- Note Modal ---
  openNoteModal() {
    const dialog = document.getElementById('note-dialog');
    const select = dialog?.querySelector('#note-course-select');
    if (select) {
      const courses = this.academics.getAcademics().courses || [];
      select.innerHTML = '<option value="General">General / Cross-Disciplinary</option>' +
        courses.map(c => `<option value="${c.code}">${c.code} - ${c.name}</option>`).join('');
    }
    dialog?.querySelector('#note-form')?.reset();
    dialog?.showModal();
  }

  bindNoteModal() {
    const dialog = document.getElementById('note-dialog');
    const form = dialog?.querySelector('#note-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const tagsRaw = document.getElementById('note-tags').value;
      const tags = tagsRaw.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

      const fileInput = document.getElementById('note-attachment-file');
      let attachment = null;
      if (fileInput?.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const isPdf = file.name.endsWith('.pdf');
        attachment = {
          name: file.name,
          type: isPdf ? 'pdf' : 'image',
          size: `${(file.size / 1024).toFixed(0)} KB`,
          previewUrl: isPdf ? null : URL.createObjectURL(file)
        };
      }

      this.academics.addNote({
        title: document.getElementById('note-title').value,
        courseCode: document.getElementById('note-course-select').value,
        folder: document.getElementById('note-folder-select').value,
        tags: tags.length ? tags : ['Study'],
        content: document.getElementById('note-content').value,
        attachment
      });

      dialog.close();
    });
  }

  // --- Note Preview Modal ---
  openNotePreviewModal(note) {
    const dialog = document.getElementById('note-preview-dialog');
    if (!dialog) return;

    dialog.querySelector('#preview-note-title').textContent = note.title;
    dialog.querySelector('#preview-note-course').textContent = note.courseCode;
    dialog.querySelector('#preview-note-folder').textContent = `📁 ${note.folder}`;
    dialog.querySelector('#preview-note-date').textContent = `🗓️ ${note.date}`;

    // Render markdown-like content cleanly
    const contentMount = dialog.querySelector('#preview-note-body');
    const parsed = note.content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>');
    contentMount.innerHTML = parsed;

    // Attachment section
    const attachMount = dialog.querySelector('#preview-note-attachment');
    if (note.attachment) {
      if (note.attachment.type === 'image' && note.attachment.previewUrl) {
        attachMount.innerHTML = `
          <div class="note-attached-image-view">
            <span class="attach-label">🖼️ Attached Diagram / Image (${note.attachment.name}):</span>
            <img src="${note.attachment.previewUrl}" alt="Note attachment" class="full-note-img" />
          </div>
        `;
      } else {
        attachMount.innerHTML = `
          <div class="note-attached-doc-view">
            <span class="doc-icon">📕</span>
            <div>
              <strong>${note.attachment.name}</strong> (${note.attachment.size})
              <p class="doc-hint">Native PDF Document • Secured in browser memory</p>
            </div>
            <button class="btn btn-secondary btn-xs" onclick="alert('Viewing PDF document in sandbox...')">Open PDF</button>
          </div>
        `;
      }
      attachMount.style.display = 'block';
    } else {
      attachMount.style.display = 'none';
      attachMount.innerHTML = '';
    }

    dialog.showModal();
  }

  // --- Auth & Account Modal ---
  openAuthModal() {
    const dialog = document.getElementById('auth-dialog');
    if (!dialog) return;

    const users = storage.getUsers();
    const usersMount = dialog.querySelector('#auth-existing-users-list');
    if (usersMount) {
      usersMount.innerHTML = users.map(u => `
        <div class="user-switch-item ${u.id === storage.activeUserId ? 'active-user' : ''}" data-id="${u.id}">
          <img src="${u.avatar}" class="user-item-avatar" alt="${u.name}" />
          <div class="user-item-info">
            <span class="user-item-name">${u.name} ${u.id === storage.activeUserId ? '(Active)' : ''}</span>
            <span class="user-item-email">${u.email}</span>
          </div>
          ${u.id !== storage.activeUserId ? `
            <button class="btn btn-secondary btn-xs btn-switch-user" data-id="${u.id}">Switch</button>
          ` : ''}
        </div>
      `).join('');

      usersMount.querySelectorAll('.btn-switch-user').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          storage.activeUserId = id;
          storage.currentUser = storage.getUsers().find(u => u.id === id);
          localStorage.setItem('zenith_active_user_id', id);
          storage.loadActiveUserState();
          storage.notifyListeners();
          this.updateUserHeader();
          this.switchView(this.currentView);
          this.showToast(`Switched account to ${storage.currentUser.name}`, 'success');
          dialog.close();
        });
      });
    }

    dialog.showModal();
  }

  bindAuthModal() {
    const dialog = document.getElementById('auth-dialog');
    if (!dialog) return;

    // Login Form
    dialog.querySelector('#auth-login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-login-email').value;
      const pass = document.getElementById('auth-login-password').value;
      const res = storage.login(email, pass);
      if (res.success) {
        this.updateUserHeader();
        this.switchView(this.currentView);
        this.showToast(`Welcome back, ${res.user.name}!`, 'success');
        dialog.close();
      } else {
        this.showToast(res.message, 'error');
      }
    });

    // Sign Up Form
    dialog.querySelector('#auth-signup-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('auth-signup-name').value;
      const email = document.getElementById('auth-signup-email').value;
      const pass = document.getElementById('auth-signup-password').value;
      const res = storage.signUp(name, email, pass);
      if (res.success) {
        this.updateUserHeader();
        this.switchView('overview');
        this.showToast(`Account created for ${res.user.name}!`, 'success');
        dialog.close();
      } else {
        this.showToast(res.message, 'error');
      }
    });

    // 1-Click Demo Login
    dialog.querySelector('#btn-auth-demo-instant')?.addEventListener('click', () => {
      const res = storage.loginDemo();
      if (res.success) {
        this.updateUserHeader();
        this.switchView(this.currentView);
        this.showToast(`Loaded demo session for Alex Chen!`, 'success');
        dialog.close();
      }
    });

    // Forgot Password simulation
    dialog.querySelector('#btn-forgot-password')?.addEventListener('click', () => {
      const email = prompt('Enter your registered email address for password reset instructions:');
      if (email) {
        this.showToast(`Reset link simulated for ${email}. (Demo password is "demo123")`, 'info');
      }
    });
  }

  // --- Toast Notification System ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    const icons = { success: '✓', error: '⚠️', info: '💡' };
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '•'}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
}

// Instantiate and attach globally
window.addEventListener('DOMContentLoaded', () => {
  window.zenith = new ZenithApp();
});


})();
