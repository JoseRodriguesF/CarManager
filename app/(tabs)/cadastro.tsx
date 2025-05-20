import { useNavigation } from '@react-navigation/native'; // <- Importa o hook aqui
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface Carro {
    nome: string;
    imagem: string | null;
    marca: string;
    modelo: string;
    ano: string;
    preco: string;
    quilometragem: string;
}

const CadastroCarro: React.FC = () => {
    const navigation = useNavigation();  // <- Usa o hook aqui

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [preco, setPreco] = useState('');
    const [quilometragem, setQuilometragem] = useState('');
    const [imagem, setImagem] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert(
                        'Permissão Negada',
                        'Para selecionar uma imagem, precisamos da sua permissão para acessar a biblioteca de mídia.',
                        [{ text: 'OK' }],
                        { cancelable: false }
                    );
                }
            }
        })();
    }, []);

    const handleCadastrar = () => {
        if (!marca || !modelo || !ano || !preco || !quilometragem) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (ano.length > 4) {
            Alert.alert('Erro', 'O ano de fabricação deve ter no máximo 4 dígitos.');
            return;
        }

        if (quilometragem.length > 4) {
            Alert.alert('Erro', 'A quilometragem deve ter no máximo 4 dígitos.');
            return;
        }

        const novoCarro: Carro = {
            nome: `${marca} ${modelo}`,
            imagem,
            marca,
            modelo,
            ano,
            preco,
            quilometragem,
        };

        Alert.alert('Sucesso', 'Carro cadastrado com sucesso!');

        setMarca('');
        setModelo('');
        setAno('');
        setPreco('');
        setQuilometragem('');
        setImagem(null);
    };

    const selecionarImagem = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagem(result.assets[0].uri);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../assets/images/setadireita1.png')} style={styles.backButtonIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>CarManager</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <TouchableOpacity style={styles.imagePlaceholder} onPress={selecionarImagem}>
                        {imagem ? (
                            <Image source={{ uri: imagem }} style={styles.imagemSelecionada} />
                        ) : (
                            <Text style={styles.imagePlaceholderText}>clique aqui.</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputRow}>
                            <Image source={require('../../assets/images/marca_icon.png')} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Marca"
                                placeholderTextColor="#888"
                                value={marca}
                                onChangeText={setMarca}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <Image source={require('../../assets/images/modelo_icon.png')} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Modelo"
                                placeholderTextColor="#888"
                                value={modelo}
                                onChangeText={setModelo}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <Image source={require('../../assets/images/ano_icon.png')} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ano de fabricação"
                                placeholderTextColor="#888"
                                keyboardType="numeric"
                                value={ano}
                                onChangeText={setAno}
                                maxLength={4}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <Image source={require('../../assets/images/preco_icon.png')} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Preço"
                                placeholderTextColor="#888"
                                keyboardType="numeric"
                                value={preco}
                                onChangeText={setPreco}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <Image source={require('../../assets/images/quilometragem_icon.png')} style={styles.inputIcon} />
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#888', marginRight: 5 }}>km</Text>
                                <TextInput
                                    style={[styles.input, { paddingLeft: 0 }]}
                                    placeholder="Quilometragem"
                                    placeholderTextColor="#888"
                                    keyboardType="numeric"
                                    value={quilometragem}
                                    onChangeText={setQuilometragem}
                                    maxLength={4}
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastrar}>
                        <Text style={styles.cadastrarButtonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollViewContentContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 30,
    },
    backButtonIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: '#fff',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    imagePlaceholder: {
        backgroundColor: '#222',
        borderRadius: 10,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        overflow: 'hidden',
    },
    imagePlaceholderText: {
        color: '#888',
        fontSize: 16,
    },
    imagemSelecionada: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    inputGroup: {
        marginBottom: 30,
    },
    inputRow: {
        backgroundColor: '#111',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    inputIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 15,
        tintColor: '#888',
    },
    input: {
        flex: 1,
        height: 45,
        color: '#fff',
        fontSize: 16,
    },
    cadastrarButton: {
        backgroundColor: '#3366FF',
        borderRadius: 8,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cadastrarButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CadastroCarro;