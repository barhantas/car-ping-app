import React from "react";
import { connect } from "react-redux";

import {
  Container,
  Text,
  Input,
  Button,
  List,
  ListItem,
  Header,
  Right,
  Left
} from "native-base";
import { Image, View, TouchableHighlight, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";

import { Col, Row, Grid } from "react-native-easy-grid";

import {
  sendVerificationCode,
  verifyVerificationCode
} from "../../actions/member";

import sendIcon from "../../../assets/send-icon.png";
import safeChat from "../../../assets/safe-chat.png";
import strangerIcon from "../../../assets/stranger-icon.png";

class Home extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("message");
    this.unsubscribe = null;

    this.state = {
      message: null,
      messages: []
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("messages")
      .where("createdAt", ">=", new Date().getTime() - 5000)
      .orderBy("createdAt", "asc")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ messages: data });
        console.log(data);
      });
  }

  handleChange = (name, val) => this.setState({ [name]: val });

  sendMessage = () => {
    const { message } = this.state;
    const {
      userData: { phoneNumber }
    } = this.props;

    this.setState({
      message: null
    });

    firebase
      .firestore()
      .collection("messages")
      .add({
        content: message,
        createdAt: new Date().getTime(),
        from: phoneNumber,
        to: "burasi QR code dan gelicek"
      });
  };

  verifyVerificationCode = () => {
    const { smsVerificationCode } = this.state;
    this.props.verifyVerificationCode(smsVerificationCode);
  };

  render() {
    const { message, messages } = this.state;
    return (
      <Container>
        <Grid>
          <Col style={{ height: "100%" }}>
            <Row
              style={{
                backgroundColor: "#fa4e5e",
                height: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Row
                style={{
                  width: "100%",
                  height: "100%",
                  ...(messages.length && { height: "20%" }),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  source={safeChat}
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    width: 40,
                    height: 40
                  }}
                />
                <Text
                  style={{
                    marginTop: 10,
                    width: "80%",
                    color: "#FFF",
                    fontFamily: "AvenirNext-Bold",
                    textAlign: "center"
                  }}
                >
                  Your personal data is safe, we do not share with strangers
                </Text>
              </Row>
              <Row
                style={{
                  width: "100%",
                  ...(messages.length && { height: "80%" }),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  marginRight: 10
                }}
              >
                <ScrollView
                  ref={ref => (this.scrollView = ref)}
                  onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollView.scrollToEnd({ animated: true });
                  }}
                >
                  <List>
                    {messages.length > 0 &&
                      messages.map((message, index) => (
                        <ListItem
                          key={index}
                          style={{
                            marginBottom: 6,
                            backgroundColor: "#fff",
                            borderRadius: 50,
                            justifyContent: "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              margin: 4,
                              fontFamily: "AvenirNext-Bold"
                            }}
                          >
                            {message.content}
                          </Text>
                          <Image
                            source={strangerIcon}
                            style={{
                              width: 40,
                              height: 40
                            }}
                          />
                        </ListItem>
                      ))}
                  </List>
                </ScrollView>
              </Row>
            </Row>
            <Row
              style={{
                backgroundColor: "#fff",
                height: "20%",
                width: "100%",
                display: "flex"
              }}
            >
              <Col style={{ height: "100%", width: "80%" }}>
                <Input
                  style={{
                    textAlign: "center"
                  }}
                  value={message}
                  // disabled={loading}
                  onChangeText={v => this.handleChange("message", v)}
                  placeholder="Please write your message here"
                />
              </Col>
              <Col style={{ height: "100%", width: "20%" }}>
                <View
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    marginRight: 12
                  }}
                >
                  <TouchableHighlight onPress={this.sendMessage}>
                    <Image
                      source={sendIcon}
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        justifyContent: "center",
                        width: 80,
                        height: 80,
                        opacity: message ? 1 : 0.1
                      }}
                    />
                  </TouchableHighlight>
                </View>
              </Col>
            </Row>
          </Col>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({
  member: {
    verificationCodeSending,
    verificationCodeVerifying,
    confirmResult,
    userData
  }
}) => {
  console.log(
    verificationCodeSending,
    verificationCodeVerifying,
    confirmResult,
    userData.phoneNumber
  );
  return {
    verificationCodeSending,
    verificationCodeVerifying,
    confirmResult,
    userData
  };
};

const mapDispatchToProps = dispatch => ({
  verifyVerificationCode: verificationCode =>
    dispatch(verifyVerificationCode(verificationCode))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
