import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function PregnancyRegistrationScreen() {
  // TODO: Implémenter le formulaire d'enregistrement de grossesse
  // TODO: Utiliser react-hook-form + zod pour la validation
  // TODO: Sauvegarder en local (AsyncStorage/SQLite)
  // TODO: Afficher file d'attente de synchronisation
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enregistrement de grossesse</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Text style={styles.text}>
        Formulaire d'enregistrement à développer
      </Text>
      
      {/* TODO: Formulaire avec les champs suivants :
          - Informations de la mère
          - Informations du père
          - Date de dernière menstruation
          - Lieu de grossesse
          - Suivi prénatal
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

