import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const handleSearch = () => {
    Animated.timing(animationValue, {
      toValue: searchActive ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setSearchActive(!searchActive);
  };

  const { width } = Dimensions.get("window");
  const inputWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, width - 20],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Animated.View
          style={[styles.searchInputContainer, { width: inputWidth }]}
        >
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
          {searchActive && (
            <TextInput
              autoFocus
              placeholder="Rechercher..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          )}
        </Animated.View>
      </View>
      {searchText === "" && searchActive && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Je ne trouve pas ce que tu cherches...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    padding: 10,
    paddingLeft: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  messageText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default SearchScreen;
