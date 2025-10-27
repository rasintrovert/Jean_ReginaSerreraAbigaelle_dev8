import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function CertificatesManagementScreen() {
  // TODO: Afficher la liste des certificats avec différents statuts
  // TODO: Filtrer par statut (en attente, vérifié, approuvé, émis, rejeté)
  // TODO: Permettre la modification et suppression
  // TODO: Générer PDF et envoyer par email
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gestion des certificats</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {/* TODO: Liste des certificats avec filtres */}
      <Text style={styles.text}>
        Liste des certificats à développer
      </Text>
      
      {/* TODO: Composant CertificateCard pour chaque certificat
          - Afficher numéro, nom enfant, statut, date
          - Boutons: Voir, Modifier, Générer PDF, Supprimer
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

