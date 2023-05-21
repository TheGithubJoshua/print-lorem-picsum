import * as React from 'react';
import { View, StyleSheet, Platform, ImageBackground} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { ThemeProvider } from "react-native-rapi-ui";
import { Text, Button } from "react-native-rapi-ui";

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
 <iframe src="https://picsum.photos/550" style="border:0px #ffffff hidden;" name="Photo" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="550px" width="550px" allowfullscreen></iframe>
  </body>
</html>
`;


export default function App() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const image = {uri: 'https://picsum.photos/550'};

  return (
    
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}/>
    <Text size="h3" style={styles.printer}>PLP (Print Lorem Picsum)</Text>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}/>
    <View style={styles.spacer} />
    <View style={styles.spacer} />
    <View style={styles.spacer} />
    
      <Button status="primary" text="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button text="Print to PDF file" onPress={printToFile} />
      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
    
  },
  spacer: {
    height: 8,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },

  printer: {
    textAlign: 'center',
  },
});
