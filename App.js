import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, TextInput, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-web';

export default function App() {

  const [dados, setDados] = useState();
  const [turma, setTurma] = useState();
  const [serie, setSerie] = useState();
  const [componente, setComponente] = useState();
  const [aluno, setAluno ] = useState();
  const [comentario, setComentario] = useState();



  const verificar = () => {
    const valores = turma;


    fetch('http://localhost/ProjetoRelatorio/ProjetoRelatorio/relatorio-json-insert.php', {
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

    setDados(valores,valores2)
  }

  // const getCategorias = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/Project/categoria-json.php');
  //     const json = await response.json();
  //     setData(json.categorias);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // const getProducts = async () => {
  //   try {
  //     const responseProduct = await fetch('http://localhost:8080/Project/produto-json.php');
  //     const json = await responseProduct.json();
  //     setDataProd(json.produtos);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setProduct(false);
  //   }
  // }
  // useEffect(() => {
  //   getCategorias();
  //   getProducts();
  // }, []);

  return (
    <ScrollView>

    <View style={styles.container}>

      {/* {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ idCategoria }, index) => idCategoria}
            renderItem={({ item }) => (
              <Text>{item.idCategoria}, {item.categoria}</Text>
            )}
          />
        )}

        {isLoadingProduct ? <ActivityIndicator /> : (
          <FlatList
            data={dataProduct}
            keyExtractor={({ idProduto }, index) => idProduto}
            renderItem={({ item }) => (
              <Text>{item.idProduto}, {item.produto}: R${item.valor}  {item.categoria}</Text>
            )}
          />
        )} */
      }
      <Text>Relatório do Bimestre</Text>
      <TextInput
        placeholder='Turma'
        placeholderTextColor={'#000'}
        autoFocus={true}
        style={styles.TextInput}

        onChangeText={text => setTurma(text)}
      />
       <TextInput
        placeholder='Série'
        placeholderTextColor={'#000'}
        autoFocus={true}
        style={styles.TextInput}

        onChangeText={text => setSerie(text)}
      />
       <TextInput
        placeholder='Componente Curricular'
        placeholderTextColor={'#000'}
        autoFocus={true}
        style={styles.TextInput}

        onChangeText={text => setComponente(text)}
      />
       <TextInput
        placeholder='Aluno'
        placeholderTextColor={'#000'}
        autoFocus={true}
        style={styles.TextInput}

        onChangeText={text => setAluno(text)}
      />
       <TextInput
        placeholder='Comentarios'
        placeholderTextColor={'#000'}
        autoFocus={true}
        color="#000"
        style={styles.Comentarios}
        maxLength={40}

        onChangeText={text => setComentario(text)}
      />
      <Button
        title='salvar'
        onPress={() => verificar()}
      />

      <View style={styles.button}>
        <Text> {dados}  </Text>
      </View>
    </View>
    </ScrollView>



  );
};
 
const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    flex: 1,
    paddingTop:100 
  },
  TextInput: {
    margin:15,
    color:"#000",
  },
  button: {
    margin: 15,
    borderRadius:1000
  },
  Comentarios: {
    height:100,
    color:"#000",
    maxLength:40
  }
});