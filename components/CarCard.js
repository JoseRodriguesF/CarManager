import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'; // Assuming you are using Expo and have @expo/vector-icons installed

export default function CarCard({ car, navigation, onDeletePress }) {
  let base64String = null;
  
  if (car.foto) {
    if (typeof car.foto === 'string') {
      base64String = car.foto;
    } else if (typeof car.foto === 'object') {
      base64String = car.foto.base64 || car.foto.data || car.foto.url;
    }
  }

  const imageUri = base64String ? `data:image/jpeg;base64,${base64String}` : null;

  return (
    <View style={styles.card}>
      {imageUri ? (
        <Image 
          source={{ uri: imageUri }} 
          style={styles.carImage}
        />
      ) : (
        <View style={[styles.carImage, { backgroundColor: '#666' }]}>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 80 }}>Sem imagem</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CarDetail', { carId: car.id })}>
          <MaterialIcons name="info" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => onDeletePress(car)}>
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('EditarCar', { carId: car.id })}>
          <MaterialIcons name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333', // Dark grey background for the card
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden', // Ensures the image respects the border radius
  },
  carImage: {
    width: '100%',
    height: 200, // Fixed height for the image
    resizeMode: 'cover', // Cover the area without distorting aspect ratio
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2941DA', // Blue background for the buttons
    paddingVertical: 10,
  },
  iconButton: {
    padding: 5,
  },
}); 