import React, {useState, useEffect} from 'react';
import {View, TextInput, Button} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import Axios from 'axios';

const Editar = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState('');
  const [condicao, setCondicao] = useState();
  const [id, setId] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const pesoObject = route.params.peso;

    setPeso(pesoObject.peso);
    setAltura(pesoObject.altura);
    setImc(pesoObject.imc);
    setCondicao(pesoObject.condicao);
    setId(pesoObject.id);
  }, []);

  const saveWeight = () => {
    Axios.patch('http://192.168.0.2:3000/pesos/' + id, {
      peso: peso,
      altura: altura,
      imc: imc,
      condicao: condicao,
    })
      .then(res => {
        alert('Salvo com sucesso!');
        navigation.navigate('Home', {res});
      })
      .catch(() => alert('Erro ao salvar'));
  };

  const deleteWeight = () => {
    Axios.delete('http://192.168.0.2:3000/pesos/' + id)
      .then(res => {
        alert('Deletado com sucesso!');
        navigation.navigate('Home', {res});
      })
      .catch(() => alert('Erro ao salvar'));
  };

  return (
    <View style={{padding: 20, alignItems: 'center'}}>
      <TextInput
        value={peso.toString()}
        onChangeText={txt => setPeso(txt)}
        placeholder="Peso"
        style={{
          fontSize: 16,
          marginTop: 10,
          borderWidth: 1,
          width: '100%',
          height: 50,
          borderRadius: 10,
          padding: 7,
          marginBottom: 10,
        }}
        placeholderTextColor="#5a5a5a"
      />

      <TextInput
        value={(altura / 100).toString()}
        onChangeText={txt => setAltura(txt)}
        placeholder="Altura"
        style={{
          fontSize: 16,
          marginTop: 10,
          borderWidth: 1,
          width: '100%',
          height: 50,
          padding: 10,
          borderRadius: 7,
          marginBottom: 10,
        }}
        placeholderTextColor="#5a5a5a"
      />
      <View style={{flexDirection: 'row'}}>
        <Button title="Cadastrar" onPress={saveWeight} />
        <Button title="Deletar" onPress={deleteWeight} />
      </View>
    </View>
  );
};

export default Editar;
