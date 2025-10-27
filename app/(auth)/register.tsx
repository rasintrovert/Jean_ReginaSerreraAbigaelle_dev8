import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function RegisterScreen() {
  // TODO: Implémenter le formulaire d'inscription
  // TODO: Implémenter la validation avec zod
  // TODO: Implémenter la logique d'inscription avec l'API
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Text style={styles.text}>
        Écran d'inscription à développer
      </Text>
      
      {/* TODO: Ajouter formulaire d'inscription */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});

