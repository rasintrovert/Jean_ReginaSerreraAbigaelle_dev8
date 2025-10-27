import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

export default function AgentDashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tableau de bord - Agent de terrain</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Actions rapides</Text>
        <Link href={"/agent/pregnancy" as any} asChild>
          <Text style={styles.link}>➕ Enregistrer une grossesse</Text>
        </Link>
        <Link href={"/agent/birth" as any} asChild>
          <Text style={styles.link}>👶 Enregistrer une naissance</Text>
        </Link>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Statistiques</Text>
        <Text style={styles.stat}>📊 Enregistrements aujourd'hui : 0</Text>
        <Text style={styles.stat}>📊 En attente de synchronisation : 0</Text>
      </View>
      
      {/* TODO: Afficher les enregistrements récents */}
      {/* TODO: Implémenter la synchronisation offline */}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
  card: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#2e78b7',
    paddingVertical: 8,
  },
  stat: {
    fontSize: 14,
    marginVertical: 5,
  },
});

