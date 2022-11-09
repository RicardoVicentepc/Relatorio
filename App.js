import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, TextInput, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';


export default function App() {

  function HomeScreen() {
  const [dados, setDados] = useState();
  const [turma, setTurma] = useState();
  const [serie, setSerie] = useState();
  const [componente, setComponente] = useState();
  const [aluno, setAluno ] = useState();
  const [comentario, setComentario] = useState();

    const verificar = () => {
      const valores = turma;
  
  
      fetch('http://localhost:8080/ProjetoRelatorio/ProjetoRelatorio/relatorio-json-insert.php', {
        method: 'post',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          turma: turma,
          serie: serie,
          componente: componente,
          aluno: aluno,
          comentario: comentario,
        })
      })
  
      setDados(valores)
    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <View style={styles.forms}>
        <TextInput
          placeholder='Turma'
          placeholderTextColor={'#000'}
          style={styles.TextInput}
  
          onChangeText={text => setTurma(text)}
        />
         <TextInput
          placeholder='Série'
          placeholderTextColor={'#000'}
          style={styles.TextInput}
  
          onChangeText={text => setSerie(text)}
        />
         <TextInput
          placeholder='Componente Curricular'
          placeholderTextColor={'#000'}
          style={styles.TextInput}
  
          onChangeText={text => setComponente(text)}
        />
         <TextInput
          placeholder='Aluno'
          placeholderTextColor={'#000'}
          style={styles.TextInput}
  
          onChangeText={text => setAluno(text)}
        />
         <TextInput
          placeholder='Comentarios'
          placeholderTextColor={'#000'}
          color="#000"
          style={styles.Comentarios}
          maxLength={40}
  
          onChangeText={text => setComentario(text)}
        />
        <View>
          
        <Button
        title='salvar'
        onPress={() => verificar()}
        color="#F9B5B5"
        />
          
        </View>
        </View>
      </View>
    );
  }
  function SettingsScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    const getRelatorios = async () => {
       try {
        const response = await fetch('http://localhost:8080/ProjetoRelatorio/ProjetoRelatorio/relatorio-json.php');
        const json = await response.json();
        setData(json.relatorios);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getRelatorios();
    }, []);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ idRelatorio }, index) => idRelatorio}
          renderItem={({ item }) => (
            <Text>id:{item.idRelatorio}  Aluno: {item.aluno}, Comentario:{item.comentario}</Text>
          )}
        />
      )}
    </View>
      </View>
    );
  }
  function mapa(){
    return(     
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      </View>
    )
  }



  
  const Tab = createBottomTabNavigator();
  return (

      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Relatorio" component={HomeScreen} />
        <Tab.Screen name="Consulta"  component={SettingsScreen} />
        <Tab.Screen name="Mapa"  component={mapa} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};
 
const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    flex: 1,
    paddingTop:100 
  },
  TextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily:'monospace',
    borderRadius: 48
    
  },
  StyleCadrasto: {
  },
  Comentarios: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 16

  }, 
  forms:
  {
    backgroundColor: '#fff9f9',
    width:'80%',
    
  },
  h1: 
  {
    fontSize:25,
    padding:10,
    fontFamily:'monospace'
  
  },
});