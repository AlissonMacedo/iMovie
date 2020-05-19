import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Animated,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import Carousel from "react-native-snap-carousel";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function App() {
  const [lista, setLista] = useState([
    {
      title: "O Justiceiro",
      text:
        "Após o assassinato de sua família, Frank Castle está traumatizado e sendo caçado. No submundo do crime, ele se tornará aquele conhecido como O Justiceiro",
      release: 2018,
      img:
        "https://sujeitoprogramador.com/wp-content/uploads/2020/05/background.jpg",
    },
    {
      title: "Bad Boys for life",
      text:
        "Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.",
      release: 2020,
      img:
        "https://sujeitoprogramador.com/wp-content/uploads/2020/05/badboy.jpg",
    },
    {
      title: "Viúva Negra",
      text:
        "Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.",
      release: 2020,
      img:
        "https://sujeitoprogramador.com/wp-content/uploads/2020/05/blackwidow.jpg",
    },
    {
      title: "Top Gun: MAVERICK",
      text:
        "Em Top Gun: Maverick, depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, o piloto à moda antiga Maverick (Tom Cruise) enfrenta drones e prova que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas.",
      release: 2020,
      img:
        "https://sujeitoprogramador.com/wp-content/uploads/2020/05/topgun.jpeg",
    },
    {
      title: "BloodShot",
      text:
        "Bloodshot é um ex-soldado com poderes especiais: o de regeneração e a capacidade de se metamorfosear. ",
      release: 2020,
      img:
        "https://sujeitoprogramador.com/wp-content/uploads/2020/05/blood.jpg",
    },
    {
      title: "Free Guy",
      text:
        "Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.",
      release: 2020,
      img:
        "https://sujeitoprogramador.com/wp-content/uploads/2020/05/freeguy.jpg",
    },
  ]);

  const carouselRef = useRef(null);
  const [background, setBackground] = useState(lista[0].img);
  const [activeIndex, setActiveIndex] = useState(0);

  const [alturaAnimated, setalturaAnimated] = useState(new Animated.Value(0));
  const [detalhesOpen, setDetalhesOpen] = useState(false);

  function trocou(index) {
    Animated.timing(alturaAnimated, {
      toValue: 150,
      duration: 750,
    }).start(() => {
      Animated.timing(alturaAnimated, {
        toValue: 0,
        duration: 750,
      }).start();
      setActiveIndex(index);
    });
  }

  function detalhes() {
    setDetalhesOpen(true);
    Animated.timing(alturaAnimated, {
      toValue: -420,
      duration: 750,
    }).start();
  }

  function fecharDetalhes() {
    setDetalhesOpen(false);
    Animated.timing(alturaAnimated, {
      toValue: 0,
      duration: 750,
    }).start();
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={styles.carousel}>
          <Image source={{ uri: item.img }} style={styles.carouselImg} />

          <Text style={styles.carouselText}>{item.title}</Text>
          <Icon
            name="play-circle-outline"
            size={30}
            color="#FFF"
            style={styles.carouselIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="black" />
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, height: screenHeight }}>
          <View style={{ ...StyleSheet.absoluteFill, backgroundColor: "#000" }}>
            <ImageBackground
              source={{ uri: background }}
              style={styles.imgBg}
              blurRadius={3}
            >
              <View style={styles.viewSearch}>
                <TextInput
                  style={styles.input}
                  placeholder="Procurando algo?"
                  placeholderTextColor="#777"
                />

                <TouchableOpacity style={styles.icon}>
                  <Icon name="search" color="#777" size={25} />
                </TouchableOpacity>
              </View>

              <Text style={styles.textAnuncio}>Acabou de chegar</Text>

              <View style={styles.slideView}>
                <Carousel
                  style={styles.container}
                  ref={carouselRef}
                  data={lista}
                  renderItem={_renderItem}
                  sliderWidth={screenWidth}
                  itemWidth={200}
                  inactiveSlideOpacity={0.5}
                  onSnapToItem={(index) => {
                    setBackground(lista[index].img);

                    trocou(index);
                  }}
                />
              </View>

              <Animated.View
                style={{
                  marginTop: alturaAnimated,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  width: screenWidth,
                  height: screenHeight,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingLeft: 10,
                }}
              >
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.movieTitle}>
                    {lista[activeIndex].title}
                  </Text>
                  <Text style={styles.movieDescription}>
                    {lista[activeIndex].text}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ marginTop: 10, marginRight: 25 }}
                  onPress={() => detalhes()}
                >
                  <Icon name="queue" color="#000" size={30} />
                </TouchableOpacity>
              </Animated.View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
    backgroundColor: "#000",
  },
  viewSearch: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    elevation: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "95%",
    flexDirection: "row",
    alignSelf: "center",
  },
  input: {
    width: "90%",
    padding: 13,
    paddingLeft: 20,
    fontSize: 17,
    fontWeight: "bold",
  },

  icon: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  textAnuncio: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginVertical: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  slideView: {
    marginTop: 20,
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    flex: 1,
    overflow: "visible",
  },
  carouselImg: {
    alignSelf: "center",
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  carouselText: {
    padding: 15,
    color: "#fff",
    position: "absolute",
    left: 2,
    fontWeight: "bold",
  },
  carouselIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  moreInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: screenWidth,
    height: screenHeight,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
  },
  movieTitle: {
    paddingLeft: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "#131313",
    marginBottom: 5,
  },
  movieDescription: {
    paddingLeft: 15,
    color: "#131313",
    fontSize: 14,
    fontWeight: "bold",
  },
});
