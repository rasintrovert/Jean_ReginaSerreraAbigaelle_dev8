import { Stack } from 'expo-router';

export default function AgentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Agent - Tableau de bord',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pregnancy/index"
        options={{
          title: 'Enregistrement de grossesse',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="birth/index"
        options={{
          title: 'Enregistrement de naissance',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="history/index"
        options={{
          title: 'Historique',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="emergency/index"
        options={{
          title: 'Urgence',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          title: 'Profil',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="help/index"
        options={{
          title: 'Aide',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/index"
        options={{
          title: 'Paramètres',
          headerShown: false,
        }}
      />
    </Stack>
  );
}

