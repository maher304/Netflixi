// app/_layout.js
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// (Optionnel) Empêcher l'écran de splash de disparaître trop tôt
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [fontsLoaded] = useFonts({
    // Exemple : 'NetflixSans': require('../assets/fonts/NetflixSans-Regular.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Attend le chargement des polices avant d'afficher
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,       // Pas d'en-tête par défaut
        contentStyle: { backgroundColor: '#000' }, // Fond global noir
      }}
    >
      {/*
        Les fichiers/écrans inclus automatiquement :
        - app/lauput.js  (page de lancement)
        - app/tabs/_layout.js + sous-pages (tabs)
        Tu peux ajouter d'autres écrans si besoin.
      */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="lauput" options={{ headerShown: false }} />
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}
