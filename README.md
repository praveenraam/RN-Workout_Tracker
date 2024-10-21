# Workout Tracker App

This **Workout Tracker App** is a React Native application built with TypeScript (TSX). It helps users track their workouts and progress over time, whether they work out at home or on the go. The app offers a range of features like tracking today's home workouts, viewing the last 5 workout days, adding custom workouts, and viewing a calendar to jump to specific dates. The app also organizes preloaded workouts by muscle group for ease of use.

## Features

- **Today's Workouts at Home**: Track all the workouts done at home today and compare them to previous days.
- **Recent Workout History**: View the workouts of the last 5 workout days at home for easy reference.
- **Customizable Workouts**: Add your own custom workouts, modify them as needed, and delete if they are no longer relevant.
- **Workout by Muscle Group**: Select workouts from a predefined list of exercises based on muscle groups (e.g., chest, arms, legs, etc.).
- **Calendar View**: Navigate to any date to view or plan your workouts, giving you a clear timeline of your workout journey.

## Screenshots

<!-- Add screenshots of your app here, if available. For example: -->
- **Home Screen**: Shows today's workouts and history of the last 5 days.
- **Workout List**: Displays workouts filtered by muscle groups.
- **Calendar View**: Provides access to workouts on specific dates.

## Installation

To run this app locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/praveenraam/RN-Workout_Tracker.git
   cd workout-tracker-app
   ```
2. **Install Dependencies:** Use npm or yarn to install the required packages:

    ``` bash
    npm install
    # or
    yarn install
    ```

3. **Start the App:** You can run the app using the React Native CLI or Expo (if using Expo setup). For example, to start with React Native CLI:

    ``` bash
    npx react-native start
    ```
4. **Run on Emulator or Device:** In a separate terminal window, run:

    ``` bash
    npx react-native run-android  # for Android
    npx react-native run-ios      # for iOS
    ```
## Usage
1. **Home Screen:** Displays today's workouts at home and the last 5 days of home workout history.
2. **Adding a Workout:** From the workout screen, you can:
- Select a workout from the preloaded list by muscle group.
- Add a custom workout by entering your exercise details.
3. **Editing/Deleting a Workout:** Modify or remove a workout by tapping on it in the history or today's workout list.
4. **Using the Calendar:** Access the calendar feature to jump to a specific date and view the workout completed on that day, or plan upcoming workouts.

## Customization
#### Adding More Workouts
To add more predefined workouts by muscle group, you can modify the workoutData.ts (or relevant data file) and include new exercises under each muscle group.

#### Adding Custom Workouts
Users can also add their custom exercises via the "Add Custom Workout" feature from the app interface.

## Contributing
We welcome contributions to improve this app. Here's how you can help:

1. Fork the repository.
2. Create a new branch with your feature or bugfix (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature/new-feature`).
5. Open a Pull Request and describe your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.