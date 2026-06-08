# CLAUDE.md — FitCore App

> Documento de referencia para el desarrollo de FitCore, una app móvil de entrenamiento y nutrición.
> Este archivo debe ser leído por el agente de IA antes de tocar cualquier archivo del proyecto.

---

## 📋 Resumen del proyecto

**FitCore** es una aplicación móvil de fitness integral con dos módulos principales:
- **GYM**: Registro de entrenamientos, seguimiento de progresión y recomendación de pesos
- **NUTRICIÓN**: Registro de alimentos con cálculo automático de macros y calorías

**Stack técnico:**
- Frontend: React Native (Expo) + TypeScript
- Backend: Java + Spring Boot
- Base de datos: MySQL
- Gráficas: Victory Native o React Native Gifted Charts
- Iconos: Phosphor Icons (react-native-phosphor)
- Animaciones: React Native Reanimated 3 + Moti

---

## 🎨 Sistema de diseño — Identidad Visual

### Paleta de colores

```
// Primarios
--color-primary:        #E8FF47   // Lima eléctrico (acento principal)
--color-primary-dim:    #C8E000   // Lima más oscuro para estados activos

// Fondo (dark theme obligatorio)
--color-bg-base:        #0A0A0A   // Negro casi puro
--color-bg-surface:     #111111   // Superficie de tarjetas
--color-bg-elevated:    #1A1A1A   // Elementos elevados, modales
--color-bg-muted:       #222222   // Bordes, separadores

// Texto
--color-text-primary:   #F5F5F5   // Texto principal
--color-text-secondary: #888888   // Texto secundario / labels
--color-text-muted:     #444444   // Texto deshabilitado

// Semánticos
--color-success:        #22C55E   // Verde para PRs, logros
--color-warning:        #F59E0B   // Naranja para alertas
--color-danger:         #EF4444   // Rojo para eliminar
--color-info:           #3B82F6   // Azul para información
```

### Degradados

```typescript
// Degradado principal (hero, botones CTA)
export const gradientPrimary = ['#E8FF47', '#A8CC00'];

// Degradado oscuro para fondos de tarjetas
export const gradientCard = ['#1A1A1A', '#111111'];

// Degradado de progreso
export const gradientProgress = ['#E8FF47', '#22C55E'];

// Degradado de calor muscular (para mapa corporal)
export const gradientMuscle = ['#FF4444', '#FF8844', '#FFD044'];

// Degradado de macro proteína
export const gradientProtein = ['#3B82F6', '#8B5CF6'];
// Degradado de macro carbohidratos
export const gradientCarbs   = ['#F59E0B', '#EF4444'];
// Degradado de macro grasa
export const gradientFat     = ['#22C55E', '#059669'];
```

### Tipografía

```
Familia principal: "Inter" (via expo-font o @expo-google-fonts/inter)
Familia display:   "Space Grotesk" (para números grandes, títulos impactantes)

// Escala tipográfica
--text-xs:    11px / weight 400 / tracking 0.02em
--text-sm:    13px / weight 400
--text-base:  15px / weight 400
--text-md:    17px / weight 500
--text-lg:    20px / weight 600
--text-xl:    24px / weight 700
--text-2xl:   32px / weight 700 / Space Grotesk
--text-3xl:   44px / weight 800 / Space Grotesk  ← para números de peso, PR, kcal
--text-hero:  64px / weight 800 / Space Grotesk  ← portada / stats destacadas
```

### Espaciado y radios

```
// Espaciado base: múltiplos de 4
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px

// Bordes redondeados
--radius-sm:   8px    // inputs, chips
--radius-md:   12px   // tarjetas pequeñas
--radius-lg:   16px   // tarjetas principales
--radius-xl:   24px   // modales, bottom sheets
--radius-full: 9999px // badges, botones pill
```

---

## ✨ Sistema de animaciones

> Regla global: todas las animaciones de UI deben estar bajo 300ms.
> Nunca usar `ease-in` — siempre `ease-out` o curvas custom.

### Curvas de easing personalizadas

```typescript
export const easings = {
  // Para entradas de elementos
  easeOut:   [0.23, 1, 0.32, 1] as const,
  // Para movimientos en pantalla
  easeInOut: [0.77, 0, 0.175, 1] as const,
  // Para bottom sheets / drawers (iOS-like)
  drawer:    [0.32, 0.72, 0, 1] as const,
  // Para rebotes suaves (logros, PRs)
  spring:    { damping: 15, stiffness: 300 },
};
```

### Duraciones por tipo de elemento

```typescript
export const durations = {
  microFeedback:  100, // press de botón, tap
  tooltip:        150, // tooltips pequeños
  dropdown:       200, // selects, dropdowns
  card:           220, // aparición de tarjetas
  modal:          300, // modales, bottom sheets
  pageTransition: 350, // transiciones de pantalla
  celebration:    600, // animación de PR / logro
};
```

### Patrones de animación obligatorios

**Entradas de elementos (aparición):**
```typescript
// SIEMPRE: opacity 0→1 + translateY(12)→(0)
// NUNCA: scale(0) desde cero — nada en el mundo real aparece de la nada
const enterAnimation = {
  from: { opacity: 0, translateY: 12 },
  animate: { opacity: 1, translateY: 0 },
  transition: { duration: 220, easing: easings.easeOut },
};
```

**Stagger en listas (ejercicios, alimentos, historial):**
```typescript
// Delay de 40-60ms entre items — nunca más de 80ms
items.map((item, i) => ({
  delay: i * 50,
}));
```

**Feedback de botón (press):**
```typescript
// scale 1 → 0.96 en press, vuelve a 1 al soltar
// Duración: 100ms — debe sentirse instantáneo
```

**Bottom Sheet (añadir ejercicio, añadir alimento):**
```typescript
// translateY desde +100% hasta 0 con easing drawer
// Backdrop: opacity 0→0.6, blur 0→8px
```

**Animación de logro / PR:**
```typescript
// Partículas + scale 0.8→1.1→1 con spring
// Usarlo con moderación — solo en records personales reales
```

**Gráficas (líneas de progresión):**
```typescript
// Las líneas se dibujan de izquierda a derecha (strokeDashoffset)
// Duración: 600ms con ease-in-out
// Los puntos aparecen con stagger de 30ms tras la línea
```

---

## 🏋️ Módulo GYM — Funcionalidades

### Pantallas

| Pantalla | Descripción |
|---|---|
| `HomeGym` | Resumen del día: rutina activa, racha, último entreno |
| `WorkoutSession` | Pantalla activa de entrenamiento con timer |
| `ExerciseSelector` | Búsqueda + filtro por músculo/equipo de cualquier ejercicio |
| `ExerciseDetail` | Historial + gráficas de progresión de un ejercicio |
| `WorkoutHistory` | Historial de entrenamientos pasados |
| `ProgressCharts` | Gráficas globales: volumen, fuerza, frecuencia |
| `PRBoard` | Tablero de récords personales por ejercicio |

### Funcionalidades clave

**Base de ejercicios:**
- Más de 300 ejercicios con músculo principal, músculos secundarios, equipo necesario e instrucciones
- Búsqueda por nombre, filtro por grupo muscular y filtro por equipo
- Posibilidad de crear ejercicios personalizados
- Cada ejercicio tiene animación GIF de demostración (API: wger.de o ExerciseDB)

**Registro de series:**
```
Serie = {
  setNumber: number,
  weight: number (kg),
  reps: number,
  rpe: number (1-10, opcional),  // Rating of Perceived Exertion
  isWarmup: boolean,
  completedAt: timestamp
}
```

**Recomendación de pesos (algoritmo):**
```
1. Recupera el historial de las últimas 4 sesiones del ejercicio
2. Calcula la progresión media de peso por sesión
3. Si el usuario completó todos los reps del objetivo en la última sesión → +2.5kg
4. Si falló más de 2 reps → mismo peso o -5%
5. Muestra el peso recomendado con un badge "Sugerido" en el input
6. Permite al usuario ignorarlo libremente
Nota: siempre mostrar 1RM estimado (fórmula Epley: weight × (1 + reps/30))
```

**Timer entre series:**
- Timer configurable (60s / 90s / 120s / 180s / custom)
- Vibración + sonido suave al finalizar
- Se muestra en overlay flotante sin interrumpir el registro

**Gráficas de progresión (por ejercicio):**
- Peso máximo por sesión (línea)
- Volumen total por sesión (barras)
- 1RM estimado en el tiempo (línea)
- Selector de rango: 1 mes / 3 meses / 6 meses / 1 año / todo

### Modelo de datos (MySQL)

```sql
-- Ejercicios
CREATE TABLE exercises (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(100) NOT NULL,
  muscle_main VARCHAR(50),       -- chest, back, legs, shoulders, arms, core
  muscles_sec JSON,              -- array de músculos secundarios
  equipment   VARCHAR(50),       -- barbell, dumbbell, cable, bodyweight, machine
  instructions TEXT,
  gif_url     VARCHAR(255),
  is_custom   BOOLEAN DEFAULT FALSE,
  user_id     INT NULL           -- NULL = ejercicio global, ID = creado por usuario
);

-- Sesiones de entrenamiento
CREATE TABLE workout_sessions (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  name        VARCHAR(100),
  started_at  DATETIME NOT NULL,
  finished_at DATETIME,
  notes       TEXT,
  duration_s  INT               -- segundos totales
);

-- Ejercicios dentro de una sesión
CREATE TABLE session_exercises (
  id                  INT PRIMARY KEY AUTO_INCREMENT,
  session_id          INT NOT NULL,
  exercise_id         INT NOT NULL,
  order_index         INT NOT NULL,
  target_sets         INT,
  target_reps         VARCHAR(20),  -- "8-10", "5", "AMRAP"
  rest_seconds        INT DEFAULT 90
);

-- Series individuales
CREATE TABLE sets (
  id                  INT PRIMARY KEY AUTO_INCREMENT,
  session_exercise_id INT NOT NULL,
  set_number          INT NOT NULL,
  weight_kg           DECIMAL(5,2),
  reps                INT,
  rpe                 TINYINT,
  is_warmup           BOOLEAN DEFAULT FALSE,
  is_pr               BOOLEAN DEFAULT FALSE,
  completed_at        DATETIME
);

-- Récords personales
CREATE TABLE personal_records (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  exercise_id INT NOT NULL,
  weight_kg   DECIMAL(5,2),
  reps        INT,
  one_rm      DECIMAL(5,2),
  achieved_at DATETIME,
  UNIQUE KEY (user_id, exercise_id)
);
```

---

## 🥗 Módulo NUTRICIÓN — Funcionalidades

### Pantallas

| Pantalla | Descripción |
|---|---|
| `NutritionHome` | Resumen del día: anillos de macros, kcal restantes |
| `FoodLog` | Lista de alimentos del día divididos por comida |
| `FoodSearch` | Búsqueda de alimentos (API Open Food Facts) |
| `FoodDetail` | Detalle nutricional de un alimento + selector de cantidad |
| `MealPlanner` | Comidas configuradas (desayuno, media mañana, comida, merienda, cena) |
| `NutritionStats` | Gráficas semanales / mensuales de macros y calorías |
| `GoalsSetup` | Configuración de objetivos de calorías y macros |

### Funcionalidades clave

**Búsqueda de alimentos:**
- API principal: Open Food Facts (gratis, sin key)
- Endpoint: `https://world.openfoodfacts.org/cgi/search.pl?search_terms={query}&json=1`
- Fallback: base de datos local con alimentos españoles comunes
- Escaneo de código de barras via cámara (expo-barcode-scanner)
- Historial de alimentos recientes y frecuentes

**Macros mostrados por alimento:**
```
{
  calories:      kcal per 100g + kcal total (según cantidad)
  protein:       g (mostrar en azul)
  carbohydrates: g (desglosado: azúcares + fibra si disponible) (mostrar en naranja)
  fat:           g (desglosado: saturadas si disponible) (mostrar en verde)
  quantity:      g / ml (editable por el usuario)
}
```

**Resumen diario — anillos (diseño):**
```
- Anillo exterior grande: calorías (progreso del objetivo)
- 3 anillos interiores más pequeños: proteína, carbos, grasa
- En el centro: kcal restantes en texto grande (Space Grotesk)
- Si se supera el objetivo → anillo en rojo + texto en rojo
```

**Comidas del día:**
- 5 comidas configurables con nombre personalizable
- Cada comida es colapsable/expandible
- Botón "+" flotante por comida para añadir alimento rápido
- Orden drag & drop para reordenar comidas

**Objetivos nutricionales:**
```
El usuario configura:
- Calorías objetivo por día
- % de proteína (recomendado: 30%)
- % de carbohidratos (recomendado: 40%)
- % de grasa (recomendado: 30%)
La app calcula automáticamente los gramos equivalentes
```

### Modelo de datos (MySQL)

```sql
-- Alimentos (caché local de Open Food Facts)
CREATE TABLE foods (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  barcode         VARCHAR(50) UNIQUE,
  name            VARCHAR(200) NOT NULL,
  brand           VARCHAR(100),
  calories_100g   DECIMAL(6,2),
  protein_100g    DECIMAL(5,2),
  carbs_100g      DECIMAL(5,2),
  sugar_100g      DECIMAL(5,2),
  fat_100g        DECIMAL(5,2),
  fat_sat_100g    DECIMAL(5,2),
  fiber_100g      DECIMAL(5,2),
  source          ENUM('openfoodfacts', 'custom', 'local_db') DEFAULT 'openfoodfacts'
);

-- Entradas de alimentos por día
CREATE TABLE food_log_entries (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  food_id     INT NOT NULL,
  meal_type   ENUM('breakfast','mid_morning','lunch','snack','dinner','other'),
  quantity_g  DECIMAL(6,1) NOT NULL,
  logged_at   DATE NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Objetivos nutricionales del usuario
CREATE TABLE nutrition_goals (
  user_id         INT PRIMARY KEY,
  calories_target INT NOT NULL DEFAULT 2000,
  protein_pct     TINYINT DEFAULT 30,
  carbs_pct       TINYINT DEFAULT 40,
  fat_pct         TINYINT DEFAULT 30,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🏗️ Arquitectura del proyecto

### Estructura de carpetas (React Native / Expo)

```
fitcore/
├── app/                        # Expo Router (file-based routing)
│   ├── (tabs)/
│   │   ├── index.tsx           # Home / Dashboard
│   │   ├── gym.tsx             # Módulo GYM
│   │   ├── nutrition.tsx       # Módulo Nutrición
│   │   ├── progress.tsx        # Gráficas y estadísticas
│   │   └── profile.tsx         # Perfil y ajustes
│   ├── workout/
│   │   ├── session.tsx         # Sesión activa de entrenamiento
│   │   └── [id].tsx            # Detalle de sesión pasada
│   ├── exercise/
│   │   └── [id].tsx            # Detalle de ejercicio con gráficas
│   └── food/
│       └── [id].tsx            # Detalle de alimento
│
├── components/
│   ├── ui/                     # Componentes atómicos
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressRing.tsx    # Anillo de progreso (nutrición)
│   │   └── Skeleton.tsx        # Loading states
│   ├── gym/
│   │   ├── SetRow.tsx          # Fila de serie (peso + reps + completado)
│   │   ├── ExerciseCard.tsx
│   │   ├── RestTimer.tsx
│   │   └── PRBadge.tsx         # Badge animado de récord personal
│   ├── nutrition/
│   │   ├── MacroRings.tsx      # Anillos de macros del día
│   │   ├── FoodRow.tsx
│   │   ├── MealSection.tsx
│   │   └── MacroBar.tsx        # Barra de progreso de macro
│   └── charts/
│       ├── ProgressLineChart.tsx
│       ├── VolumeBarChart.tsx
│       └── MacroAreaChart.tsx
│
├── hooks/
│   ├── useWorkout.ts           # Estado de sesión activa
│   ├── useNutrition.ts         # CRUD de food log
│   ├── useExerciseHistory.ts   # Historial + recomendaciones
│   └── useWeightSuggestion.ts  # Algoritmo de peso sugerido
│
├── services/
│   ├── api.ts                  # Cliente HTTP base (axios)
│   ├── gymService.ts           # Llamadas al backend Java
│   ├── nutritionService.ts
│   └── openFoodFacts.ts        # Integración API externa
│
├── store/
│   ├── workoutStore.ts         # Zustand — sesión activa
│   └── nutritionStore.ts       # Zustand — log del día
│
├── constants/
│   ├── colors.ts               # Paleta completa
│   ├── typography.ts           # Escala tipográfica
│   ├── animations.ts           # Duraciones y curvas
│   └── muscles.ts              # Enum de grupos musculares
│
└── utils/
    ├── macroCalc.ts            # Cálculo de macros según cantidad
    ├── oneRM.ts                # Fórmulas 1RM (Epley, Brzycki)
    └── weightSuggestion.ts     # Algoritmo de recomendación de peso
```

### Backend Java / Spring Boot

```
fitcore-api/
├── src/main/java/com/fitcore/
│   ├── controller/
│   │   ├── ExerciseController.java
│   │   ├── WorkoutController.java
│   │   ├── NutritionController.java
│   │   └── UserController.java
│   ├── service/
│   │   ├── ExerciseService.java
│   │   ├── WorkoutService.java
│   │   ├── WeightSuggestionService.java   ← lógica del algoritmo
│   │   └── NutritionService.java
│   ├── repository/
│   │   └── (JPA repositories)
│   ├── model/
│   │   └── (entidades JPA)
│   └── dto/
│       └── (DTOs de request/response)
└── src/main/resources/
    └── application.properties   ← config MySQL, puerto, JWT secret
```

### Endpoints REST principales

```
// GYM
GET    /api/exercises?search=&muscle=&equipment=  → Lista de ejercicios
GET    /api/exercises/{id}                        → Detalle + historial del usuario
GET    /api/exercises/{id}/suggestion             → Peso sugerido para siguiente sesión
POST   /api/workouts                              → Crear sesión
PUT    /api/workouts/{id}                         → Actualizar sesión (añadir sets)
POST   /api/workouts/{id}/finish                  → Finalizar sesión
GET    /api/workouts/history                      → Historial de sesiones

// NUTRICIÓN
GET    /api/foods/search?q=                       → Buscar alimentos (proxy Open Food Facts)
GET    /api/foods/barcode/{code}                  → Buscar por código de barras
POST   /api/nutrition/log                         → Añadir alimento al día
GET    /api/nutrition/log?date=YYYY-MM-DD         → Log del día con macros totales
DELETE /api/nutrition/log/{id}                    → Eliminar entrada
GET    /api/nutrition/goals                       → Obtener objetivos del usuario
PUT    /api/nutrition/goals                       → Actualizar objetivos
```

---

## 📱 Pantallas clave — Especificación visual

### Tab Bar (navegación principal)

```
- 5 tabs: Home, Gym, Nutrition, Progress, Profile
- Tab activo: icono + label en --color-primary (#E8FF47)
- Tab inactivo: icono en --color-text-muted
- Fondo: --color-bg-surface con blur (BlurView)
- Indicador: punto o línea bajo el icono activo, animado con spring
```

### WorkoutSession — Pantalla de entrenamiento activo

```
Header:
  - Nombre del workout + timer total (cronómetro en curso)
  - Botón "Finalizar" en esquina superior derecha

Lista de ejercicios:
  - Cada ejercicio es una tarjeta expandible
  - Header de tarjeta: nombre + gif pequeño + músculos
  - Tabla de series: columnas Set / Kg / Reps / ✓
  - Input de Kg y Reps: grandes, fáciles de tocar (mínimo 48px altura)
  - Badge "Sugerido: 80kg" en input de peso al abrir un ejercicio nuevo
  - Fila nueva serie: botón "+" al final de la tabla
  - Animación: cada fila aparece con slide-in desde abajo (220ms easeOut)

Rest Timer overlay:
  - Aparece desde abajo (bottom sheet pequeño) al completar una serie
  - Anillo de cuenta atrás + tiempo restante grande
  - Botón para saltarlo / añadir tiempo

Detección de PR:
  - Si el peso supera el récord → overlay celebración (500ms)
  - Confeti simple + badge "🏆 Nuevo Récord" con spring animation
```

### NutritionHome — Resumen del día

```
Hero section:
  - Anillos de macros centrados (componente MacroRings)
  - Anillo exterior: calorías (grande, ~200px diámetro)
  - 3 anillos interiores: proteína (azul), carbos (naranja), grasa (verde)
  - Centro: número grande de kcal restantes (--text-hero, Space Grotesk)
  - Subtexto: "de 2000 kcal objetivo"

Cards de resumen rápido:
  - Grid 3 columnas: Proteína / Carbos / Grasa
  - Cada card: icono + gramos consumidos / objetivo + barra de progreso

Comidas del día:
  - Secciones colapsables: Desayuno / Media mañana / Comida / Merienda / Cena
  - Cada sección muestra kcal totales de esa comida
  - Al expandir: lista de alimentos con kcal + macros a la derecha
  - Botón "Añadir alimento" al final de cada sección
```

---

## ⚠️ Reglas de desarrollo (NO negociables)

1. **Dark theme siempre** — No hay modo claro. El fondo nunca puede ser blanco.
2. **Nunca `transition: all`** — Especificar siempre la propiedad exacta.
3. **Nunca `scale(0)` como estado inicial** — Usar `scale(0.95) + opacity: 0`.
4. **Nunca `ease-in` en animaciones de UI** — Siempre `ease-out` o curva custom.
5. **Duraciones sobre 300ms solo para celebraciones** — UI rápida = UI que se siente viva.
6. **Inputs de series mínimo 48px de altura** — La app se usa en el gym, con las manos sudadas.
7. **Siempre mostrar loading skeleton** — Nunca pantalla en blanco mientras carga.
8. **El peso sugerido es sugerencia, no obligación** — El usuario puede cambiarlo siempre.
9. **Los macros se recalculan en tiempo real** — Al cambiar gramos, los valores cambian al instante.
10. **Un solo bottom sheet a la vez** — No apilar modales.
11. **Feedback háptico en acciones importantes** — PR conseguido, serie completada, alimento añadido.
12. **Los gráficos se dibujan con animación** — Nunca aparecen de golpe.

---

## 🔐 Autenticación

- JWT almacenado en SecureStore (expo-secure-store)
- Refresh token con expiración de 30 días
- Login con email + password (no social login en v1)
- Pantalla de onboarding (peso, altura, objetivo: volumen / definición / mantenimiento)

---

## 📦 Dependencias principales

```json
{
  "dependencies": {
    "expo": "~51.x",
    "expo-router": "^3.x",
    "react-native-reanimated": "^3.x",
    "moti": "^0.x",
    "zustand": "^4.x",
    "axios": "^1.x",
    "react-native-gifted-charts": "^1.x",
    "expo-barcode-scanner": "latest",
    "expo-haptics": "latest",
    "expo-secure-store": "latest",
    "@expo-google-fonts/inter": "latest",
    "@expo-google-fonts/space-grotesk": "latest",
    "phosphor-react-native": "^2.x",
    "@gorhom/bottom-sheet": "^4.x",
    "react-native-svg": "latest"
  }
}
```

---

## 🚀 Roadmap de versiones

| Versión | Incluye |
|---|---|
| v0.1 (MVP) | Auth, módulo gym básico (registro de series), historial |
| v0.2 | Gráficas de progresión, algoritmo de peso sugerido |
| v0.3 | Módulo nutrición completo con Open Food Facts |
| v0.4 | Anillos de macros, gráficas nutricionales |
| v0.5 | Escaneo de código de barras |
| v1.0 | Polish de animaciones, onboarding, PRs con celebración |

---

## ORDEN
El proyecto debe tener un orden logico y bien estructurado en carpetas, 
no se permitira archivos mal ordenados y se ordenara todo de manera logica,
ordenada y que sea facil de cambiar de cara al futuro.

*Última actualización: junio 2025 — Endika / FitCore*
