import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState,useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
    const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const {userId,setUserId} = useContext(UserType)
  useEffect(() => {
    const fetchUser = async() => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }

    fetchUser();
  },[]);
  console.log(userId)
  const handleAddAddress = () => {
      const address = {
          name,
          mobileNo,
          houseNo,
          street,
          landmark,
          postalCode
      }

      axios.post("http://localhost:8000/addresses",{userId,address}).then((response) => {
          Alert.alert("Success","Addresses added successfully");
          setName("");
          setMobileNo("");
          setHouseNo("");
          setStreet("");
          setLandmark("");
          setPostalCode("");

          setTimeout(() => {
            navigation.goBack();
          },500)
      }).catch((error) => {
          Alert.alert("Error","Failed to add address")
          console.log("error",error)
      })
  }
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#ff7337" }}>
        <Text style={{marginTop: 13, textAlign: "center", fontSize: 18, fontWeight: "bold", color: "white"}}>
          Shoppe Address
        </Text>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Thêm địa chỉ mới
        </Text>

        <TextInput
          placeholderTextColor={"black"}
          placeholder="..."
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Họ và tên
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="..."
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Số điện thoại
          </Text>

          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="..."
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Căn hộ, Số nhà, Tòa nhà, Công ty
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Khu vực, Đường phố, khu vực, thôn
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Địa danh</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="..."
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="..."
          />
        </View>

        <Pressable
        onPress={handleAddAddress}
          style={{
            backgroundColor: "#ff7337",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Thêm địa chỉ</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
