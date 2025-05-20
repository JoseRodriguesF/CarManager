import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CarDetailsScreen = () => {
  return (
    <LinearGradient
      colors={['rgba(51, 51, 51, 1)', 'rgba(41, 65, 218, 1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{flex: 1}}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Corvette C8</Text>
        </View>

        {/* Car Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/corvette.png')} // Substitua pelo seu caminho de imagem
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Marca</Text>
          <Text style={styles.infoValue}>Chevrolet</Text>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Modelo</Text>
              <Text style={styles.cellValue}>Corvette</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Quilometragem</Text>
              <Text style={styles.cellValue}>25.000km/r</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Preço</Text>
              <Text style={styles.cellValue}>100.000.0</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellLabel}>Ano de Fabricação</Text>
              <Text style={styles.cellValue}>2023</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CarDetailsScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    marginBottom: 16,
  },
  backButton: {
    borderWidth: 2,
    borderColor: '#fafafa',
    borderRadius: 12,
    padding: 6,
    marginRight: 12,
  },
  title: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 80,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 75,
  },
  carImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 20,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    marginHorizontal: 20,
  },
  infoLabel: {
    textAlign: 'center',
    color: '#B8B6B6',
    fontSize: 14,
    marginBottom: 10,
    
  },
  infoValue: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: '50%',
    marginVertical: 15,
  },
  cellLabel: {
    fontSize: 12,
    color: '#999',
  },
  cellValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101010',
  },
});