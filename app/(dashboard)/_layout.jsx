import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { onAuthStateChanged } from 'firebase/auth';

export default function DashboardLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !user.emailVerified) {
        router.replace('/Login'); // kick them back to auth
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.navBackground, paddingTop: 10, height: 90 },
        tabBarActiveTintColor: theme.iconColourFocused,
        tabBarInactiveTintColor: theme.iconColour,
      }}
    >
      <Tabs.Screen 
        name="profile"
        options={{ title: "Profile", tabBarIcon: ({ focused }) => (
          <Ionicons 
            size={24} 
            name={focused ? 'person': 'person-outline'} 
            color={focused ? theme.iconColourFocused : theme.iconColour} 
          />
        )}}
      />
      <Tabs.Screen 
        name="books"
        options={{ title: "Books", tabBarIcon: ({ focused }) => (
          <Ionicons 
            size={24} 
            name={focused ? 'book': 'book-outline'} 
            color={focused ? theme.iconColourFocused : theme.iconColour} 
          />
        )}} 
      />
      <Tabs.Screen 
        name="create"
        options={{ title: "Create", tabBarIcon: ({ focused }) => (
          <Ionicons 
            size={24} 
            name={focused ? 'create': 'create-outline'} 
            color={focused ? theme.iconColourFocused : theme.iconColour} 
          />
        )}} 
      />
    </Tabs>
  )
}