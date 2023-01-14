import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { FlatList, Image, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, List, Provider as PaperProvider, Searchbar } from 'react-native-paper';
import { CoinDialog } from './components/CoinDialog';
import { ICoin, ICoinResult, ICoinResults } from "./models/coin";

export default function App() {
  const [results, setResults] = React.useState<ICoinResults | undefined>(undefined);
  const [query, setQuery] = React.useState('');
  const [coin, setCoin] = React.useState<ICoin | undefined>(undefined);

  //handle pressing enter key to submit search query
  const handleKeyPress = (query: string) => {
    setQuery(query);
    if (query == '') {
      setResults(undefined)
    }
  }

  //Query cryptos
  const executeSearch = () => {
    Keyboard.dismiss();
    fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then((response) => response.json()).then((json) => {
      setResults(json);
    }).catch((error) => {
      console.error(error);
    });
  }

  //Lookup crypto with id
  const openCrypto = (item: any) => {
    fetch(`https://api.coingecko.com/api/v3/coins/${item}`).then((response) => response.json()).then((json) => {
      setCoin(json);
    }).catch((error) => {
      console.error(error);
    });
  }

  //shows search results
  const renderItem = ({ item }: { item: ICoinResult }) => (
    <List.Item
      onPress={() => openCrypto(item.id)}
      title={item.name}
      description={item.symbol}
      left={props => <Image
        style={styles.image}
        source={{
          uri: item.thumb,
        }}
      />}
    />
  );

  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Searchbar
            placeholder="Search"
            autoComplete="false"
            onChangeText={handleKeyPress}
            onSubmitEditing={executeSearch}
            value={query}
          />
          <Button
            onPress={executeSearch}
            mode="contained"
            accessibilityLabel="Learn more about some crypto's"
          >Find crypto</Button>
          {results && results.coins.length > 0 ?
            <View style={styles.list}>
              <FlatList
                data={results.coins}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View> : null
          }
        </View>
      </SafeAreaView>
      <CoinDialog coin={coin} onClose={() => { setCoin(undefined) }}></CoinDialog>
    </PaperProvider>
  )
  //if 0 show search results. Else case for details page
}


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    maxWidth: 500,
    backgroundColor: '#fff'
  },
  list: {
    flexGrow: 1,
    height: 200
  },
  image: {
    alignSelf: 'center',
    width: 25,
    height: 25
  },
});