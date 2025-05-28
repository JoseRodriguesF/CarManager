import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import CarCard from '../components/CarCard';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllCars, deleteCar } from '../service/api';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    loadCars();
  }, []);

  // This will run every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadCars();
    }, [])
  );

  const loadCars = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCars();
      setCars(response.data);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePress = (car) => {
    setCarToDelete(car);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCar(carToDelete.id);
      await loadCars(); // Recarrega a lista após deletar
      setIsModalVisible(false);
      setCarToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setCarToDelete(null);
  };

  return (
    <LinearGradient
      colors={['#333', '#000']}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Text style={styles.title}>CarManager</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#2941DA" style={styles.loader} />
      ) : cars.length > 0 ? (
        <ScrollView style={styles.cardList}>
          {cars.map(car => (
            <CarCard key={car.id} car={car} navigation={navigation} onDeletePress={handleDeletePress} />
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noCarsText}>Você ainda não registrou nenhum carro na coleção</Text>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RegisterCar')}
      >
        
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este carro?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.textStyle}>Sim, Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={handleCancelDelete}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Add some padding at the top for the title
    alignItems: 'center', // Center items horizontally
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  cardList: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 10, // Add some horizontal padding
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2941DA', // A shade of blue
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  addButtonText: {
    fontSize: 35,
    color: '#fff',
    lineHeight: 35, // Adjust line height to center the plus sign vertically
  },
  noCarsText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'regular',
    textAlign: 'center',
    marginTop: 300,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent white background
  },
  modalView: {
    margin: 20,
    backgroundColor: '#000', // Black background for the modal content
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center', // Center text vertically
  },
  buttonConfirm: {
    backgroundColor: '#FF0000', // Red color for Excluir button
    marginRight: 10,
  },
  buttonCancel: {
    backgroundColor: '#ADD8E6', // Light blue color for Cancelar button
  },
  textStyle: {
    color: 'white',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
}); 