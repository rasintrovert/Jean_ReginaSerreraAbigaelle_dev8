import { Stack } from 'expo-router';

export default function AgentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Agent - Tableau de bord',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pregnancy"
        options={{
          title: 'Enregistrement de grossesse',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="birth"
        options={{
          title: 'Enregistrement de naissance',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

