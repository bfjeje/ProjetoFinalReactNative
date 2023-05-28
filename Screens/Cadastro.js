import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Axios from 'axios';

const Cadastro = () => {
  const [peso, setPeso] = useState();
  const [altura, setAltura] = useState();
  const [imc, setImc] = useState();
  const [condicao, setCondicao] = useState('');

  const navigation = useNavigation();

  const saveProduct = () => {
    setImc(parseFloat(peso) / Math.sqrt(parseFloat(altura)));
    if (imc < 18.5) {
      setCondicao('Magreza');
    } else if (imc > 30) {
      setCondicao('Obesidade');
    } else if (imc <= 30 && imc > 25) {
      setCondicao('Sobrepeso');
    } else {
      setCondicao('Normal');
    }
    console.log('IMCSaved: ' + imc + '. CondiçãoSaved: ' + condicao);
    Axios.post('http://192.168.0.2:3000/pesos', {
      peso: parseFloat(peso),
      altura: parseFloat(altura),
      imc: parseFloat(imc),
      condicao: condicao,
    })
      .then(res => {
        alert('Salvo com sucesso!');
        navigation.navigate('Home', {res});
      })
      .catch(() => alert('Erro ao salvar'));
  };

  return (
    <View style={{padding: 20, alignItems: 'center'}}>
      <TextInput
        value={peso}
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
        value={altura}
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

      <Button title="Cadastrar" onPress={saveProduct} />
    </View>
  );
};

export default Cadastro;
