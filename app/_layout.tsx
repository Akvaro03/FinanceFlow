import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useCallback } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

// Evitar que el splash screen desaparezca antes de cargar las fuentes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: Inter_400Regular,
    Roboto: Roboto_400Regular,
  });

  // Ocultar SplashScreen cuando las fuentes se carguen
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#121212", // Fondo oscuro
          },
          headerTintColor: "#00FF99", // Color del texto e íconos
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("settings")}>
              <Ionicons
                name="settings-outline"
                size={24}
                color="#00FF99"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color="#00FF99"
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
        })}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
