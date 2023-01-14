import * as React from 'react';
import { Image, ScrollView, StyleSheet, Modal, useWindowDimensions, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, Dialog, Headline, Portal, Subheading } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import { ICoin } from '../models/coin';
import CoinMarketChart from './CoinMarketChart';

interface CoinDialogProps {
  coin?: ICoin;
  onClose: (() => void);
}

export const CoinDialog = (props: CoinDialogProps) => {
  const hideDialog = () => {
    props.onClose();
  };
  const { width, height } = useWindowDimensions();

  return (
    <Portal>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={!!props.coin}
        onDismiss={hideDialog}
        onRequestClose={hideDialog}
      >
        {props.coin ?
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)', justifyContent: 'flex-end' }}>
            <View style={{ flexGrow: 1 }}>
              <TouchableWithoutFeedback onPress={hideDialog} containerStyle={{ flex: 1 }}></TouchableWithoutFeedback>
            </View>
            <View style={{ height: height * 0.7, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: 'rgb(0,0,0,0.2)', overflow: 'hidden' }}>
              <ScrollView contentContainerStyle={{ padding: 15 }}>
                <Headline style={styles.headline}>
                  {props.coin.name} ({props.coin.symbol})
                  <Image
                    source={{
                      uri: props.coin.image.large,
                    }}
                    style={styles.image}
                  />
                </Headline>
                <Subheading>Current price: {props.coin.market_data.current_price.usd}$ (CHF {props.coin.market_data.current_price.chf})</Subheading>
                <Subheading>Market cap: {props.coin.market_data.market_cap.usd}$ (Rank:{props.coin.market_cap_rank})</Subheading>
                <RenderHtml
                  contentWidth={width * 0.9}
                  source={{ html: props.coin.description.en }}
                />
                <CoinMarketChart coin={props.coin} />
              </ScrollView>
            </View>
          </View>
          : null
        }
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  headline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: 40,
    height: 40
  },
});