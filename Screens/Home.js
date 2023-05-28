import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import Axios from 'axios';

const Home = () => {
  const [pesos, setPesos] = useState([]);

  const route = useRoute();

  useEffect(() => {
    Axios.get('http://192.168.0.2:3000/pesos')
      .then(res => {
        setPesos(res.data);
      })
      .catch(erro => alert('Erro ao requisitar pesos: ' + erro));
  }, [route.params?.res]);

  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text style={{fontSize: 20}}>Cadastro de Pesos</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={{fontSize: 15, color: 'blue'}}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{padding: 20}}
        keyExtractor={(item, index) => item.id.toString()}
        data={pesos}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Editar', {peso: item})}
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              marginBottom: 5,
            }}>
            <View style={{paddingHorizontal: 10, marginTop: 10}}>
              <Text>Peso: {item.peso}</Text>
              <Text>Altura: {item.altura}</Text>
              <Text>IMC: {item.imc}</Text>
              <Text>Condição: {item.condition}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
