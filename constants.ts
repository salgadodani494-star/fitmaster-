
import { WorkoutPlan, MealPlan } from './types';

export const INITIAL_WORKOUTS: WorkoutPlan[] = [
  {
    id: 'w1',
    title: 'Push Day - Hipertrofia',
    date: Date.now(),
    exercises: [
      {
        id: 'e1',
        name: 'Press de Banca con Barra',
        sets: 4,
        reps: 10,
        muscleGroup: 'Pecho',
        description: 'El press de banca es el rey de los ejercicios para el torso. Enfócate en una bajada controlada y una fase concéntrica explosiva.',
        proTips: [
          'Retrae las escápulas (junta los hombros atrás)',
          'Mantén los pies firmes en el suelo',
          'No bloquees los codos al subir para mantener tensión'
        ],
        videoUrl: 'https://www.youtube.com/embed/rT7DgVCn7iY', // Bench Press Tutorial
        imageKey: 'benchpress',
        completed: false
      },
      {
        id: 'e2',
        name: 'Press Militar con Mancuernas',
        sets: 3,
        reps: 12,
        muscleGroup: 'Hombros',
        description: 'Ideal para desarrollar unos hombros potentes y estables. El control del core es fundamental.',
        proTips: [
          'Aprieta el abdomen para no arquear la espalda',
          'Sube las mancuernas en forma de arco',
          'Controla el descenso hasta la altura de las orejas'
        ],
        videoUrl: 'https://www.youtube.com/embed/qEwK6jnzpxk', // Shoulder Press Tutorial
        imageKey: 'shoulder-press',
        completed: false
      }
    ]
  }
];

export const INITIAL_MEAL_PLANS: MealPlan[] = [
  {
    id: 'mp1',
    title: 'Energía Matutina',
    type: 'breakfast',
    meals: [
      {
        id: 'm1',
        name: 'Avena con Proteína y Frutos Rojos',
        calories: 450,
        protein: 30,
        carbs: 55,
        fats: 10,
        imageKey: 'oatmeal-berries',
        description: 'Avena cocida con scoop de proteína de vainilla y arándanos frescos.',
        ingredients: ['50g Avena', '1 scoop Whey', '50g Arándanos']
      }
    ]
  },
  {
    id: 'mp2',
    title: 'Proteína Pura',
    type: 'lunch',
    meals: [
      {
        id: 'm2',
        name: 'Pollo al Grill con Batata',
        calories: 550,
        protein: 45,
        carbs: 60,
        fats: 8,
        imageKey: 'grilled-chicken-sweet-potato',
        description: 'Pechuga de pollo sazonada con especias y batata asada.',
        ingredients: ['150g Pollo', '200g Batata', 'Brócoli']
      }
    ]
  }
];

export const APP_VERSION = "1.3.0-elite";
