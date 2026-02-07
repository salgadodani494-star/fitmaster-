
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  description: string;
  proTips?: string[];
  videoUrl?: string;
  muscleGroup: string;
  imageKey?: string;
  completed?: boolean;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  imageKey: string;
  description: string;
  ingredients: string[];
}

export interface MealPlan {
  id: string;
  title: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  meals: Meal[];
}

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: number;
}

export interface WaterLog {
  id: string;
  amountMl: number;
  timestamp: number;
}

export interface BiometricData {
  heartRate: number;
  spo2: number;
  hrv: number;
  bodyTemp: number;
  isSynced: boolean;
  lastSync: number;
}

export interface SleepLog {
  hours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  deepSleepPercent: number;
  remSleepPercent: number;
  timestamp: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  exercises: Exercise[];
  date: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  rewardPoints: number;
  type: string;
  expiresInDays: number;
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface Reminder {
  id: string;
  type: 'water' | 'workout' | 'meal' | 'sleep';
  time: string;
  active: boolean;
  label: string;
}

export interface UserProfile {
  name: string;
  weight: number;
  height: number;
  age: number;
  goal: 'lose_weight' | 'build_muscle' | 'fitness';
  dailyStepGoal: number;
  dailyCalorieGoal: number;
  dailyWaterGoalMl: number;
  dailySleepGoalHours: number;
  theme: 'cyber' | 'neon' | 'sunset';
  connectedDevice?: 'apple_watch' | 'garmin' | 'whoop' | 'none';
}

export interface CommunityPost {
  id: string;
  userName: string;
  userImage: string;
  content: string;
  timestamp: number;
  likes: number;
  type: 'achievement' | 'motivation' | 'question';
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  WORKOUTS = 'workouts',
  CALORIES = 'calories',
  COACH = 'coach',
  COMMUNITY = 'community',
  MINDSET = 'mindset',
  PROFILE = 'profile'
}
