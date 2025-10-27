import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function BirthRegistrationScreen() {
  // TODO: Implémenter le formulaire d'enregistrement de naissance
  // TODO: Utiliser react-hook-form + zod pour la validation
  // TODO: Sauvegarder en local (AsyncStorage/SQLite)
  // TODO: Afficher file d'attente de synchronisation
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enregistrement de naissance</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Text style={styles.text}>
        Formulaire d'enregistrement à développer
      </Text>
      
      {/* TODO: Formulaire avec les champs suivants :
          - Informations de l'enfant (nom, date, lieu, sexe)
          - Informations des parents
          - Lieu de naissance (hôpital/domicile)
          - Témoins
          - Statut (en attente, vérifié, approuvé, émis)
          - etc.
      */}
      
    </View>
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

