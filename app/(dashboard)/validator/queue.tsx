import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function ValidationQueueScreen() {
  // TODO: Afficher la file d'attente des enregistrements à valider
  // TODO: Permettre validation multi-niveaux
  // TODO: Afficher les détails complets avant validation
  // TODO: Permettre rejet avec raison
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>File de validation</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {/* TODO: Liste des enregistrements en attente */}
      <Text style={styles.text}>
        Enregistrements en attente de validation
      </Text>
      
      {/* TODO: Composant ValidationCard pour chaque enregistrement
          - Afficher toutes les informations
          - Boutons: Approuver, Rejeter
          - Afficher niveau de validation requis
      */}
      
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

