import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

import Loading from "../Loading";

import * as firebase from "firebase";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";

function LoginForm(props) {
  const { navigation, toastRef } = props;

  const [hidePassword, setHidePassword] = useState(true);

  const [loadingIsVisible, setLoadingIsVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //----------FIX THE NAVIGATION AFTER LOGIN----------//

  const login = async () => {
    setLoadingIsVisible(true);
    if (!email || !password) {
      toastRef.current.show("You must fill out everything");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("The email is not correct");
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate("Home");
          })
          .catch(() => {
            toastRef.current.show("Incorrect email or password");
          });
      }
    }
    setLoadingIsVisible(false);
  };

  return (
    <View style={styles.viewMain}>
      <Input
        placeholder="Email Address"
        containerStyle={styles.input}
        onChange={(elm) => setEmail(elm.nativeEvent.text)}
        leftIcon={
          <Icon
            type="material-community"
            name="email"
            iconStyle={styles.icon}
          />
        }
      />
      <Input
        placeholder="Password"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={hidePassword}
        onChange={(elm) => setPassword(elm.nativeEvent.text)}
        leftIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "lock" : "lock-open"}
            iconStyle={styles.icon}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="LOGIN"
        containerStyle={styles.btnCont}
        buttonStyle={styles.btnStyle}
        onPress={login}
      />
      <Loading text="Login Account" isVisible={loadingIsVisible} />
    </View>
  );
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  viewMain: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginTop: 10,
  },
  icon: {
    color: "#f7882f",
    marginRight: 15,
  },
  btnCont: {
    width: "100%",
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: "#6b7a8f",
  },
});
