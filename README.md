# EchoStudy

A story-driven study habit-building app that helps students build consistent study routines through gamification, focus sessions, and personalized motivation.

## Features

- **Goal Creation**: Convert study goals into achievable tasks
- **Study Scheduling**: Personalized study schedules
- **Focus Sessions**: Timer-based focus sessions with distraction management
- **Learning Avatar**: Visual progress tracking with a growing avatar
- **Quests & Achievements**: Unlock story quests and achievements
- **Progress Timeline**: Track long-term progress visually
- **AI-Powered**: Personalized study plans using OpenAI

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Firebase** - Authentication and database
- **OpenAI API** - Personalized study planning and motivation
- **React Navigation** - Navigation system

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase config values

3. **Set up OpenAI API**
   - Get an API key from https://platform.openai.com
   - Add it to your `.env` file

4. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase and OpenAI credentials:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   ```

5. **Run the App**
   ```bash
   npm start
   ```
   Then press `i` for iOS simulator, `a` for Android emulator, or scan QR code with Expo Go app.

## Project Structure

```
EchoStudy/
├── App.js                 # Root component
├── src/
│   ├── navigation/       # Navigation setup
│   ├── screens/          # Screen components
│   │   ├── Auth/         # Login/Register
│   │   ├── Home/         # Dashboard
│   │   ├── Study/        # Goals, Tasks, Focus Sessions
│   │   ├── Progress/     # Avatar, Quests, Timeline
│   │   └── Profile/      # User profile
│   ├── components/       # Reusable components
│   ├── context/          # React Context providers
│   ├── services/         # Firebase, OpenAI services
│   └── utils/            # Helper functions
└── assets/               # Images, fonts, etc.
```

## Key Features Implementation

### Authentication
- Email/password authentication via Firebase
- User profile creation with initial stats (level 1, 0 XP, 0 streak)

### Study Goals & Tasks
- Create study goals that get broken into tasks
- AI-generated study plans using OpenAI
- Task completion tracking

### Focus Sessions
- Timer-based focus sessions (15, 25, 45, 60 minutes)
- Pause/resume functionality
- Experience points (XP) rewards
- Level progression system

### Gamification
- Avatar progression (🌱 → 🌿 → 🌳 → 🌟 → 👑)
- Experience points and leveling system
- Study streak tracking
- Quest and achievement system

### Progress Tracking
- Visual timeline of completed sessions
- Statistics dashboard
- Progress bars and visual indicators

## Firebase Collections

- `users` - User profiles and stats
- `goals` - Study goals
- `tasks` - Individual study tasks
- `sessions` - Completed focus sessions

## Future Enhancements

- Classroom integration
- Community study groups
- AI-driven study analysis
- Gamified learning quests tied to school topics
- Social sharing of achievements

## License

Private project

