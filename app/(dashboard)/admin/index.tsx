import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

export default function AdminDashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tableau de bord - Administrateur</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Statistiques en temps réel</Text>
        <Text style={styles.stat}>✅ Certificats approuvés : 0</Text>
        <Text style={styles.stat}>⏳ En attente de validation : 0</Text>
        <Text style={styles.stat}>❌ Certificats rejetés : 0</Text>
        <Text style={styles.stat}>📄 Total générés : 0</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Actions administratives</Text>
        <Link href={"/admin/certificates" as any} asChild>
          <Text style={styles.link}>📋 Gérer les certificats</Text>
        </Link>
        <Text style={styles.text}>👥 Gérer les utilisateurs</Text>
        <Text style={styles.text}>⚙️ Paramètres du système</Text>
      </View>
      
      {/* TODO: Graphiques de statistiques */}
      {/* TODO: Tableau des enregistrements récents */}
      {/* TODO: Alertes et notifications */}
      
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
  stat: {
    fontSize: 14,
    marginVertical: 5,
  },
  link: {
    fontSize: 16,
    color: '#2e78b7',
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    paddingVertical: 8,
  },
});

