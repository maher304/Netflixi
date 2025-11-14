import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function Compte() {
  const [user, setUser] = useState({
    name: "Maher",
    email: "maher@example.com",
    avatar: require("../../assets/images/avatar.jpg"), // mets ton image
  });

  const savedMovies = [
    {
      id: "1",
      title: "Inception",
      poster: require("../../assets/images/nception.jpeg"),
    },
    {
      id: "2",
      title: "Interstellar",
      poster: require("../../assets/images/interstaler.webp"),
    },
  ];

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Modifier le profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Téléchargements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Paramètres</Text>
        </TouchableOpacity>
      </View>

      {/*  FILMS SAUVEGARDÉS */}
      <Text style={styles.sectionTitle}>Mes films enregistrés</Text>

      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.poster} style={styles.poster} />
            <Text style={styles.movieTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        )}
      />

      {/*  DÉCONNEXION */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  //  Header
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    color: "#aaa",
    fontSize: 15,
    marginTop: 2,
  },

  //  Sections de boutons
  buttons: {
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  //  Mes films
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  card: {
    marginRight: 12,
    width: 110,
    alignItems: "center",
  },
  poster: {
    width: 110,
    height: 160,
    borderRadius: 10,
    marginBottom: 6,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },

  //  Déconnexion
  logoutButton: {
    marginTop: 30,
    paddingVertical: 12,
    backgroundColor: "#b30000",
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
