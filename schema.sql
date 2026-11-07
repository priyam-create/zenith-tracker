-- ============================================================================
-- Zenith Life & Wellness OS - PostgreSQL Relational Database Schema
-- Multi-tenant, secure, normalized schema prepared for Stripe monetization
-- ============================================================================

-- 0. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & SUBSCRIPTION STATE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(120) NOT NULL,
    role VARCHAR(150) DEFAULT 'Zenith Member',
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    
    -- Stripe Subscription Fields
    stripe_customer_id VARCHAR(100) UNIQUE,
    subscription_status VARCHAR(50) DEFAULT 'free' CHECK (subscription_status IN ('free', 'active', 'past_due', 'canceled', 'trialing')),
    subscription_tier VARCHAR(50) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'elite')),
    subscription_period_end TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe ON users(stripe_customer_id);

-- 2. USER PREFERENCES & HEALTH GOALS
CREATE TABLE IF NOT EXISTS user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(50) DEFAULT 'sage',
    sound_enabled BOOLEAN DEFAULT true,
    daily_calorie_goal INT DEFAULT 2150,
    daily_protein_goal INT DEFAULT 135,
    daily_carbs_goal INT DEFAULT 220,
    daily_fat_goal INT DEFAULT 65,
    daily_fiber_goal INT DEFAULT 32,
    daily_sodium_max INT DEFAULT 2200,
    daily_water_goal INT DEFAULT 2500,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HABIT TRACKER MODULE
CREATE TABLE IF NOT EXISTS habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(60) NOT NULL,
    icon VARCHAR(10) DEFAULT '🧘',
    target_time VARCHAR(20) DEFAULT 'All Day',
    frequency VARCHAR(50) DEFAULT 'Everyday',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_habits_user ON habits(user_id);

CREATE TABLE IF NOT EXISTS habit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    completed BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(habit_id, log_date)
);

CREATE INDEX IF NOT EXISTS idx_habit_logs_user_date ON habit_logs(user_id, log_date);

-- 4. NUTRITION TRACKER MODULE
CREATE TABLE IF NOT EXISTS nutrition_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    meal_type VARCHAR(50) NOT NULL CHECK (meal_type IN ('Breakfast', 'Lunch', 'Dinner', 'Snack')),
    name VARCHAR(200) NOT NULL,
    portion VARCHAR(100),
    calories INT NOT NULL DEFAULT 0,
    protein NUMERIC(6, 2) DEFAULT 0,
    carbs NUMERIC(6, 2) DEFAULT 0,
    fat NUMERIC(6, 2) DEFAULT 0,
    fiber NUMERIC(6, 2) DEFAULT 0,
    sodium INT DEFAULT 0,
    is_estimate BOOLEAN DEFAULT false,
    confidence INT,
    source VARCHAR(50) DEFAULT 'Manual',
    logged_time VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nutrition_user_date ON nutrition_logs(user_id, log_date);

CREATE TABLE IF NOT EXISTS water_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    amount_ml INT NOT NULL DEFAULT 0,
    UNIQUE(user_id, log_date)
);

CREATE INDEX IF NOT EXISTS idx_water_user_date ON water_logs(user_id, log_date);

-- 5. ACADEMIC DASHBOARD MODULE
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    professor VARCHAR(120),
    credits NUMERIC(3, 1) DEFAULT 3.0,
    current_grade VARCHAR(5) DEFAULT 'A',
    grade_percentage NUMERIC(5, 2) DEFAULT 100.0,
    color VARCHAR(20) DEFAULT '#34d399',
    schedule VARCHAR(100),
    location VARCHAR(120),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_user ON courses(user_id);

CREATE TABLE IF NOT EXISTS academic_deadlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    course_code VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    type VARCHAR(50) DEFAULT 'Assignment',
    priority VARCHAR(20) DEFAULT 'Medium',
    completed BOOLEAN DEFAULT false,
    weight VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deadlines_user ON academic_deadlines(user_id);

