import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function HospitalPregnancyScreen() {
  // TODO: Afficher liste des femmes enceintes en suivi
  // TODO: Permettre ajout de nouvelles grossesses
  // TODO: Suivi des rendez-vous prénatals
  // TODO: Historique médical
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suivi des grossesses</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {/* TODO: Liste des grossesses en suivi */}
      <Text style={styles.text}>
        Liste des grossesses en suivi
      </Text>
      
      {/* TODO: Composant PregnancyCard pour chaque grossesse */}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  text: {
    fontSize: 14,
  },
});

