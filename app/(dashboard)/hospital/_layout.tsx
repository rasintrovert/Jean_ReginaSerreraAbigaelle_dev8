import { Stack } from 'expo-router';

export default function HospitalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Hôpital - Tableau de bord',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="pregnancy/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="birth/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="history/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="help/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="search/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

