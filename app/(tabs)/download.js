import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";

export default function Download() {
  const [items, setItems] = useState([
    { id: "1", title: "Inception", poster: require("../../assets/images/nception.jpeg"), status: "not-downloaded", progress: 0 },
    { id: "2", title: "Interstellar", poster: require("../../assets/images/interstaler.webp"), status: "not-downloaded", progress: 0 },
    { id: "3", title: "The Dark Knight", poster: require("../../assets/images/darknight.webp"), status: "downloaded", progress: 100 },
  ]);

  const timers = useRef({});
  const [refreshing, setRefreshing] = useState(false);

  function startDownload(id) {
    setItems(prev =>
      prev.map(it => (it.id === id ? { ...it, status: "downloading", progress: 0 } : it))
    );

    timers.current[id] = setInterval(() => {
      setItems(prev =>
        prev.map(it => {
          if (it.id === id) {
            let newProg = it.progress + 5;
            if (newProg >= 100) {
              clearInterval(timers.current[id]);
              delete timers.current[id];
              return { ...it, status: "downloaded", progress: 100 };
            }
            return { ...it, progress: newProg };
          }
          return it;
        })
      );
    }, 300);
  }

  function cancelDownload(id) {
    if (timers.current[id]) {
      clearInterval(timers.current[id]);
      delete timers.current[id];
    }

    setItems(prev =>
      prev.map(it =>
        it.id === id ? { ...it, status: "not-downloaded", progress: 0 } : it
      )
    );
  }

  function removeItem(id) {
    Alert.alert(
      "Supprimer",
      "Voulez-vous supprimer ce film ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            if (timers.current[id]) {
              clearInterval(timers.current[id]);
              delete timers.current[id];
            }
            setItems(prev => prev.filter(it => it.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  }

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <Image source={item.poster} style={styles.poster} />

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>

          {item.status === "downloading" && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
              <Text style={styles.progressText}>{item.progress}%</Text>
            </View>
          )}

          <View style={styles.buttonsRow}>
            {item.status === "not-downloaded" && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => startDownload(item.id)}
              >
                <Text style={styles.buttonText}>Télécharger</Text>
              </TouchableOpacity>
            )}

            {item.status === "downloading" && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#b30000" }]}
                onPress={() => cancelDownload(item.id)}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            )}

            {item.status === "downloaded" && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#444" }]}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.buttonText}>Supprimer</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Download</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 45,
    paddingHorizontal: 15,
  },

  header: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
  },

  poster: {
    width: 90,
    height: 130,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  progressContainer: {
    height: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#00bfff",
  },

  progressText: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
  },

  buttonsRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#0b84ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
