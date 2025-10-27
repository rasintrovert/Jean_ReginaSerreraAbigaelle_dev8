import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function HospitalBirthScreen() {
  // TODO: Formulaire d'enregistrement de naissance hospitalière
  // TODO: Appeler directement le système de génération de certificat
  // TODO: Enregistrement automatique dans le système
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Enregistrement de naissance</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {/* TODO: Formulaire d'enregistrement */}
      <Text style={styles.text}>
        Formulaire d'enregistrement hospitalier à développer
      </Text>
      
      {/* TODO: Même formulaire que agent/birth mais avec workflow hospitalier */}
      
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

