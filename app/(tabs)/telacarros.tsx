import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Lista inicial de carros
const initialCars = [
  {
    id: 1,
    image:
      'https://www.honda.com.br/automoveis/sites/hab/files/2022-08/New%20HR-V_0002s_0005_VENDAS_DIRETAS_FRONTAL_LADO_A_EX_BRANCO_TAFETA_300_0.jpg',
  },
  {
    id: 2,
    image:
      'https://cgi.chevrolethttps://www.nicepng.com/png/detail/162-1625191_corvette-car-transparent-background-corvette-stingray-png.png.com/mmgprod-us/dynres/prove/image.gen?i=2024/1YH67/1YH67__3LZ/...',
  },
  {
    id: 3,
    image:
      'https://blog.karvi.com.br/wp-content/uploads/2020/07/kwid-zen-1.jpg',
  },
];

export default function CarManagerScreen() {
  const [cars, setCars] = useState(initialCars);
  const [modalVisible, setModalVisible] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  // Certifique-se de que `car` está definido e possui a propriedade `id`
  const car = { id: 1, name: 'Carro A' }; // Exemplo de objeto
  const carId = car?.id; // Uso do operador opcional para evitar erros
  console.log(carId); // Deve exibir o ID do carro

  // Função para abrir modal de confirmação
  const confirmDelete = (carId) => {
    setCarToDelete(carId);
    setModalVisible(true);
  };

  // Função para excluir o carro
  const deleteCar = () => {
    const updatedCars = cars.filter((car) => car.id !== carToDelete);
    setCars(updatedCars);
    setModalVisible(false);
    setCarToDelete(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="arrow-left" size={20} color="#fff" />
        <Text style={styles.title}>CarManager</Text>
      </View>

      {/* Lista de carros */}
      <ScrollView style={styles.scrollContainer}>
        {cars.map((car) => (
          <View key={car.id} style={styles.card}>
            <Image
              source={{ uri: car.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.actions}>
              <Image
                source={require('../../assets/images/informacoes.svg')}
              />

              {/* Botão de excluir com modal */}
              <TouchableOpacity onPress={() => confirmDelete(car.id)}>
                <Image
                  source={require('../../assets/images/excluir.svg')}
                />
              </TouchableOpacity>

              <Image
                source={require('../../assets/images/botao-editar.svg')}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botão de adicionar */}
      <TouchableOpacity style={styles.addButton}>
        <FontAwesome name="plus" size={24} color="#2733f0" />
      </TouchableOpacity>

      {/* Modal de confirmação */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Deseja excluir este carro?</Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={deleteCar}
              >
                <Text style={styles.deleteText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2733f0',
    paddingVertical: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    elevation: 4,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  cancelText: {
    color: '#000',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
