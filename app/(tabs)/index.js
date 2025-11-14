import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Acceuille() {
  const [search, setSearch] = useState("");

  const movies = [
    {
      id: "1",
      title: "Titanic",
      poster: require("../../assets/images/titanic.jpeg"),
    },
    {
      id: "2",
      title: "The Dark Knight",
      poster: require("../../assets/images/darknight.webp"),
    },
  ];

  // 🔍 Correct filter
  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Barre de recherche */}
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un film..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {/* 🔥 Titre section */}
      <Text style={styles.sectionTitle}>Films Populaires</Text>

      {/* 🎬 Aucun résultat */}
      {filtered.length === 0 && (
        <Text style={styles.noResult}>Aucun film trouvé</Text>
      )}

      {/* 🎞️ Liste horizontale */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.poster} style={styles.poster} />

            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  searchBar: {
    width: "100%",
    height: 55,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  noResult: {
    color: "#888",
    fontSize: 16,
    marginVertical: 20,
    alignSelf: "center",
  },

  card: {
    marginRight: 14,
    width: 120,
    alignItems: "center",
  },

  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 6,
    transform: [{ scale: 1 }],
  },

  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
