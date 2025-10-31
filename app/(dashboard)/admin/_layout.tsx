import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Admin - Tableau de bord',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="certificates"
        options={{
          title: 'Gestion des certificats',
          headerShown: false,
        }}
      />
    </Stack>
  );
}

