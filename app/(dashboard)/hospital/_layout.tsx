import { Stack } from 'expo-router';

export default function HospitalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Hôpital - Tableau de bord',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pregnancy"
        options={{
          title: 'Suivi des grossesses',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="birth"
        options={{
          title: 'Enregistrement de naissances',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

