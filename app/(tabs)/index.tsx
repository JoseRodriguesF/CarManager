import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* Lógica para voltar (se aplicável) */ }}>
       
        </TouchableOpacity>
        <Text style={styles.title}>CarManager</Text>
        <View style={{ width: 5, }} /> {/* Espaço para alinhar o título */}
      </View>

      <View style={styles.content}>
        <Text style={styles.emptyMessage}>Você ainda não registrou nenhum carro na coleção</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/cadastro')} // Navegação usando Expo Router
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',// Fundo preto
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
     paddingBottom: 150,
   
  },
  addButton: {
    backgroundColor: '#007AFF', // Azul iOS
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90, // Aumentamos o valor para subir o botão
    right: 160,
    elevation: 5, // Sombra para Android
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
  },
});