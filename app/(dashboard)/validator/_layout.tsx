import { Stack } from 'expo-router';

export default function ValidatorLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="queue"
        options={{
          title: 'File de validation',
          headerShown: false,
        }}
      />
    </Stack>
  );
}

