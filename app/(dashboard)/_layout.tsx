import { useResponsive } from '@/hooks/useResponsive';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/theme';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

interface TabBarIconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}

function TabBarIcon({ name, color, size = 24 }: TabBarIconProps) {
  return <FontAwesome name={name} size={size} color={color} />;
}

export default function DashboardTabLayout() {
  const theme = useTheme();
  const { isTablet } = useResponsive();
  const { user } = useAuthStore();

  // Determine which tabs to show based on user role
  const getVisibleTabs = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'agent':
        return [
          {
            name: 'agent',
            title: 'Agent',
            icon: 'user' as const,
            headerTitle: 'Agent de Terrain',
          }
        ];
      case 'admin':
        return [
          {
            name: 'admin',
            title: 'Admin',
            icon: 'cog' as const,
            headerTitle: 'Administration',
          }
        ];
      case 'hospital':
        return [
          {
            name: 'hospital',
            title: 'Hôpital',
            icon: 'hospital-o' as const,
            headerTitle: 'Hôpital',
          }
        ];
      case 'validator':
        return [
          {
            name: 'validator',
            title: 'Validation',
            icon: 'check-circle' as const,
            headerTitle: 'Validation',
          }
        ];
      default:
        return [];
    }
  };

  const visibleTabs = getVisibleTabs();

  // Pour les agents, masquer complètement la navigation des onglets
  if (user?.role === 'agent') {
    return (
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' }, // Masquer la barre de navigation
          headerShown: false, // Masquer l'en-tête
        }}
      >
        <Tabs.Screen
          name="agent"
          options={{
            title: 'Agent',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            headerTitle: 'Agent de Terrain',
          }}
        />
      </Tabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: isTablet ? 8 : 4,
          paddingTop: 4,
          height: isTablet ? 80 : 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.medium,
          marginTop: 2,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: theme.colors.text,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold,
        },
        headerTintColor: theme.colors.primary,
      }}
    >
      {visibleTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <TabBarIcon name={tab.icon} color={color} />,
            headerTitle: tab.headerTitle,
          }}
        />
      ))}
    </Tabs>
  );
}