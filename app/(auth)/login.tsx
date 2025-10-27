import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  // TODO: Implémenter le formulaire de connexion avec react-hook-form
  // TODO: Implémenter la validation avec zod
  // TODO: Implémenter la logique d'authentification avec l'API
  
  const handleLogin = () => {
    // TODO: Authentifier l'utilisateur
    // Après succès :
    // router.replace('/agent');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Text style={styles.text}>
        Écran de connexion à développer
      </Text>
      
      {/* TODO: Ajouter formulaire de connexion */}
      
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

