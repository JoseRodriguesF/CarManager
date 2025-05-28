import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getCarById } from '../service/api';

export default function CarDetailScreen({ route, navigation }) {
  const { carId } = route.params;
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCarDetails();
  }, []);

  const loadCarDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getCarById(carId);
      console.log('Car data from API:', response.data);
      console.log('Photo data:', response.data.foto);
      console.log('Photo type:', typeof response.data.foto);
      setCar(response.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes do carro:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do carro');
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !car) {
    return (
      <LinearGradient
        colors={['#333', '#000']}
        style={[styles.container, styles.loadingContainer]}
      >
        <ActivityIndicator size="large" color="#2941DA" />
      </LinearGradient>
    );
  }

  // Log para verificar os dados do carro antes de renderizar
  console.log('Car data before render:', car);
  console.log('Photo data before render:', car.foto);

  return (
    <LinearGradient
      colors={['#333', '#000']}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{car.modelo || 'Detalhes do Carro'}</Text>
      </View>

      <ScrollView style={styles.detailsContainer}>
        <View style={styles.imageContainer}>
          {car.foto ? (
            <Image 
              source={{ uri: `data:image/jpeg;base64,${typeof car.foto === 'object' ? car.foto.data : car.foto}` }} 
              style={styles.carImage}
              onError={(error) => {
                console.log('Image loading error:', error.nativeEvent.error);
                console.log('Failed URI:', `data:image/jpeg;base64,${typeof car.foto === 'object' ? car.foto.data : car.foto}`);
              }}
            />
          ) : (
            <View style={[styles.carImage, styles.placeholderContainer]}>
              <MaterialIcons name="directions-car" size={50} color="#666" />
              <Text style={styles.placeholderText}>Sem imagem</Text>
            </View>
          )}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoColumnLeft}>
              <Text style={styles.infoLabel}>Marca</Text>
              <Text style={styles.infoValue}>{car.marca}</Text>
            </View>
            <View style={styles.infoColumnRight}>
              <Text style={styles.infoLabel}>Quilometragem</Text>
              <Text style={styles.infoValue}>{car.quilometragem.toLocaleString()} km</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumnLeft}>
              <Text style={styles.infoLabel}>Modelo</Text>
              <Text style={styles.infoValue}>{car.modelo}</Text>
            </View>
            <View style={styles.infoColumnRight}>
              <Text style={styles.infoLabel}>Ano de Fabricação</Text>
              <Text style={styles.infoValue}>{car.ano_fabricacao}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoColumnLeft}>
              <Text style={styles.infoLabel}>Valor</Text>
              <Text style={styles.infoValue}>R$ {car.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.infoColumnRight}></View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditarCar', { carId: car.id })}
        >
          <Text style={styles.editButtonText}>Editar Carro</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 60,
  },
  carImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    marginTop: 10,
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: '#fff', // White background for the info card
    borderRadius: 10,
    marginTop: 150,
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoColumnLeft: {
    flex: 1,
    marginRight: 10, // Add some space between columns
  },
  infoColumnRight: {
    flex: 1,
    marginLeft: 10, // Add some space between columns
    alignItems: 'flex-end', // Align content to the right
  },
  infoLabel: {
    fontSize: 14,
    color: '#666', // Grey color for labels
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Black color for values
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2941DA',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
}); 