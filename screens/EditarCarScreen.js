import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { getCarById, updateCar } from '../service/api';

export default function EditarCarScreen({ navigation, route }) {
  const { carId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano_fabricacao: '',
    quilometragem: '',
    valor: '',
    foto: null
  });
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    loadCarData();
  }, []);

  const loadCarData = async () => {
    try {
      setIsLoading(true);
      const response = await getCarById(carId);
      const car = response.data;
      
      // Guarda os dados originais
      setOriginalData(car);
      
      setFormData({
        marca: car.marca || '',
        modelo: car.modelo || '',
        ano_fabricacao: car.ano_fabricacao ? car.ano_fabricacao.toString() : '',
        quilometragem: car.quilometragem ? car.quilometragem.toString() : '',
        valor: car.valor ? car.valor.toString() : '',
      });
      
      if (car.foto && typeof car.foto === 'string') {
        setSelectedImage(car.foto);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do carro:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do carro');
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Criar um FormData para enviar os dados
      const form = new FormData();
      
      // Adiciona todos os campos, usando os valores do formData
      form.append('marca', formData.marca);
      form.append('modelo', formData.modelo);
      form.append('ano_fabricacao', formData.ano_fabricacao);
      form.append('quilometragem', formData.quilometragem);
      form.append('valor', formData.valor);

      // Trata a imagem
      if (selectedImage) {
        // Se for uma nova imagem (local)
        if (selectedImage.startsWith('file://') || selectedImage.startsWith('content://')) {
          const imageInfo = {
            uri: selectedImage,
            type: 'image/jpeg',
            name: 'image.jpg'
          };
          form.append('file', imageInfo);
        }
        // Se for a imagem original ou uma URL, não envia novamente
      }

      console.log('Dados sendo enviados:', {
        marca: formData.marca,
        modelo: formData.modelo,
        ano_fabricacao: formData.ano_fabricacao,
        quilometragem: formData.quilometragem,
        valor: formData.valor,
        temImagem: !!selectedImage
      });

      await updateCar(carId, form);
      Alert.alert('Sucesso', 'Carro atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Erro detalhado:', error);
      let mensagem = 'Ocorreu um erro ao atualizar o carro';
      
      if (error.message.includes('Network Error')) {
        mensagem = 'Erro de conexão. Por favor, verifique sua internet e tente novamente.';
      } else if (error.response) {
        mensagem = `Erro ${error.response.status}: ${error.response.data.message || 'Erro desconhecido'}`;
      }
      
      Alert.alert('Erro', mensagem);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.marca) {
    return (
      <LinearGradient
        colors={['#333', '#000']}
        style={[styles.container, styles.loadingContainer]}
      >
        <ActivityIndicator size="large" color="#2941DA" />
      </LinearGradient>
    );
  }

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
        <Text style={styles.headerTitle}>Editar Carro</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <TouchableOpacity style={styles.addPhotoContainer} onPress={pickImage}>
          {selectedImage ? (
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.selectedImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.addPhotoText}>Alterar foto</Text>
          )}
        </TouchableOpacity>

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
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, '');
              handleInputChange('ano_fabricacao', numericValue);
            }}
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
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, '');
              handleInputChange('valor', numericValue);
            }}
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
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, '');
              handleInputChange('quilometragem', numericValue);
            }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.registerButton, isLoading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerButtonText}>Salvar Edição</Text>
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
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  addPhotoText: {
    color: '#ccc',
    fontSize: 18,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
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
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#2941DA',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  }
});