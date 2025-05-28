import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Assuming you are using Expo and have expo-linear-gradient installed
import * as ImagePicker from 'expo-image-picker';
import { createCar } from '../service/api';

export default function RegisterCarScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano_fabricacao: '',
    valor: '',
    quilometragem: '',
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    // Validação básica
    if (!formData.marca || !formData.modelo || !formData.ano_fabricacao || !formData.valor || !formData.quilometragem) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setIsLoading(true);
      
      // Criar um FormData para enviar os dados
      const form = new FormData();
      
      // Adicionar os campos conforme o modelo Carro.java
      form.append('marca', formData.marca);
      form.append('modelo', formData.modelo);
      form.append('ano_fabricacao', parseInt(formData.ano_fabricacao));
      form.append('quilometragem', parseInt(formData.quilometragem));
      form.append('valor', parseFloat(formData.valor));

      // Se tiver imagem selecionada, adiciona ao FormData
      if (selectedImage) {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        form.append('file', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'image.jpg'
        });
      } else {
        // Se não tiver imagem, envia um arquivo vazio para satisfazer o requisito do backend
        const emptyBlob = new Blob([''], { type: 'image/jpeg' });
        form.append('file', emptyBlob, 'empty.jpg');
      }

      await createCar(form);
      Alert.alert('Sucesso', 'Carro cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Erro ao cadastrar carro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o carro');
    } finally {
      setIsLoading(false);
    }
  };

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
        <Text style={styles.headerTitle}>CarManager</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        {/* Add Photo Section */}
        <TouchableOpacity style={styles.addPhotoContainer} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <Text style={styles.addPhotoText}>Adicionar foto</Text>
          )}
        </TouchableOpacity>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="car" size={20} color="white" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Marca"
            placeholderTextColor="#ccc"
            value={formData.marca}
            onChangeText={(text) => handleInputChange('marca', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <MaterialIcons name="directions-car" size={24} color="white" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            placeholderTextColor="#ccc"
            value={formData.modelo}
            onChangeText={(text) => handleInputChange('modelo', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="lightbulb-o" size={24} color="white" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ano de fabricação"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={formData.ano_fabricacao}
            onChangeText={(text) => handleInputChange('ano_fabricacao', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome name="dollar" size={24} color="white" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={formData.valor}
            onChangeText={(text) => handleInputChange('valor', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <MaterialIcons name="speed" size={24} color="white" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Quilometragem"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={formData.quilometragem}
            onChangeText={(text) => handleInputChange('quilometragem', text)}
          />
        </View>
      </ScrollView>

      {/* Register Button */}
      <TouchableOpacity 
        style={[styles.registerButton, isLoading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
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
    marginBottom: 30,
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    flex: 1,
  },
  addPhotoContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#333', // Dark grey background
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden', // Added to ensure image respects border radius
  },
  addPhotoText: {
    color: '#ccc', // Light grey text color
    fontSize: 18,
  },
  selectedImage: { // Added style for the selected image
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333', // Dark grey background
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    color: '#fff', // White text color
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#2941DA', // Blue background
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80, // Add some space at the bottom
  },
  registerButtonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  }
}); 