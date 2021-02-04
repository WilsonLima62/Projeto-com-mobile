import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import mapMarkerImg from "../images/map-marker.png";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import api from "../services/api";
import Loading from "../components/loading";

interface PontoDetailsRouteParams {
  id: number;
}

interface Ponto {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function PontoDetails() {
  const route = useRoute();
  const params = route.params as PontoDetailsRouteParams;

  const [Ponto, setPonto] = useState<Ponto>();

  useEffect(() => {
    api
      .get(`/pontos/${params.id}`)
      .then((response) => setPonto(response.data));
  }, [params.id]);

  if (!Ponto) {
    return (
      <Loading />
    );
  }

  function handleOpenGoogleMapsRotes() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${Ponto?.latitude}, ${Ponto?.longitude}`
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {Ponto.images.map((image) => {
            return (
              <Image
                key={image.id}
                style={styles.image}
                source={{ uri: image.url }}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{Ponto.name}</Text>
        <Text style={styles.description}>{Ponto.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: Ponto.latitude,
              longitude: Ponto.longitude,
              latitudeDelta: -22.9057867,
              longitudeDelta: -47.0737174,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: Ponto.latitude,
                longitude: Ponto.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity
            onPress={handleOpenGoogleMapsRotes}
            style={styles.routesContainer}
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{Ponto.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Funcionamento {Ponto.opening_hours}
            </Text>
          </View>

          {Ponto.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                Precisa agendamento
              </Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#ff6690" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                Não precisa agendamento
              </Text>
            </View>
          )}
        </View>

       
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get("window").width,
    height: 240,
    resizeMode: "cover",
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: "#4D6F80",
    fontSize: 30,
    fontFamily: "nunito700",
  },

  description: {
    fontFamily: "Nunito_600SemiBold",
    color: "#5c8599",
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "#B3DAE2",
    marginTop: 40,
    backgroundColor: "#E6F7FB",
  },

  mapStyle: {
    width: "100%",
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  routesText: {
    fontFamily: "nunito700",
    color: "#0089a5",
  },

  separator: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#D3E2E6",
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  scheduleItem: {
    width: "48%",
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: "#E6F7FB",
    borderWidth: 1,
    borderColor: "#B3DAE2",
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: "#EDFFF6",
    borderWidth: 1,
    borderColor: "#A1E9C5",
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: "#fef6f9",
    borderWidth: 1,
    borderColor: "#ffbcd4",
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: "#5C8599",
  },

  scheduleTextGreen: {
    color: "#37C77F",
  },

  scheduleTextRed: {
    color: "#ff6690",
  },

  contactButton: {
    backgroundColor: "#3CDC8C",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#FFF",
    fontSize: 16,
    marginLeft: 16,
  },
});
