import React from "react";
import { connect } from "react-redux";

import { Container, Text, Input } from "native-base";
import { Image, View, TouchableHighlight, TouchableOpacity,Alert } from "react-native";
import { Actions } from "react-native-router-flux";

import { Col, Row, Grid } from "react-native-easy-grid";
import Loading from "../components/UI/Loading";

import NotifyService from "../../../NotifyService";

import {
  sendVerificationCode,
  verifyVerificationCode
} from "../../actions/member";

import verificationCodeIcon from "../../../assets/sms-verification-image.png";
import sendIcon from "../../../assets/send-icon.png";
import successIcon from "../../../assets/success.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.notif = new NotifyService(
      this.onNotif.bind(this)
    );
  }
  
  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  state = {
    phoneNumber: null,
    smsVerificationCode: null
  };

  handleChange = (name, val) => this.setState({ [name]: val });

  SendVerificationCode = () => {
    const { phoneNumber } = this.state;
    this.props.sendVerificationCode(phoneNumber);
    this.setState({ phoneNumber: null });
  };

  verifyVerificationCode = () => {
    const { smsVerificationCode } = this.state;
    this.props.verifyVerificationCode(smsVerificationCode);
  };

  render() {
    const { phoneNumber, smsVerificationCode } = this.state;
    const {
      confirmResult,
      userData,
      verificationCodeSending,
      verificationCodeVerifying
    } = this.props;

    if (verificationCodeSending || verificationCodeVerifying)
      return <Loading />;

    return (
      <Container>
        <Grid>
          <Col style={{ height: "100%" }}>
            <Row
              style={{
                backgroundColor: "#fa4e5e",
                height: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image source={verificationCodeIcon} />
              <Text
                style={{ color: "white", fontSize: 30, textAlign: "center" }}
              >
                {confirmResult
                  ? "Plese write the sms verification code."
                  : "We should verify you with sms for login."}
              </Text>
            </Row>
            <Row
              style={{
                backgroundColor: "white",
                height: "50%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Input
                style={{
                  display: "flex",
                  alignSelf: "center",
                  textAlign: "center",
                  width: "100%",
                  fontSize: 50,
                  textDecorationLine: "underline",
                  flex: 5
                }}
                placeholder={
                  !confirmResult._verificationId
                    ? "Phone Number."
                    : "Verification Code"
                }
                value={phoneNumber || smsVerificationCode}
                onChangeText={v =>
                  this.handleChange(
                    !confirmResult._verificationId
                      ? "phoneNumber"
                      : "smsVerificationCode",
                    v
                  )
                }
              />
              <View
                style={{
                  display: "flex",
                  alignSelf: "center",
                  marginBottom: 80,
                  width: 100,
                  height: 100
                }}
              >
                <TouchableHighlight
                  onPress={
                    phoneNumber
                      ? this.SendVerificationCode
                      : this.verifyVerificationCode
                  }
                >
                  <Image
                    source={userData.phoneNumber ? successIcon : sendIcon}
                    style={{
                      display: "flex",
                      alignSelf: "center",
                      width: 100,
                      height: 100,
                      opacity: phoneNumber || smsVerificationCode ? 1 : 0.1
                    }}
                  />
                </TouchableHighlight>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.notif.localNotif();
                  }}
                >
                  <Text>Local Notification (now)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.notif.scheduleNotif();
                  }}
                >
                  <Text>Schedule Notification in 30s</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.notif.cancelNotif();
                  }}
                >
                  <Text>Cancel last notification (if any)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.notif.cancelAll();
                  }}
                >
                  <Text>Cancel all notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.notif.checkPermission(this.handlePerm.bind(this));
                  }}
                >
                  <Text>Check Permission</Text>
                </TouchableOpacity>
              </View>
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
    userData
  );
  return {
    verificationCodeSending,
    verificationCodeVerifying,
    confirmResult,
    userData
  };
};

const mapDispatchToProps = dispatch => ({
  sendVerificationCode: phoneNumber =>
    dispatch(sendVerificationCode(phoneNumber)),
  verifyVerificationCode: verificationCode =>
    dispatch(verifyVerificationCode(verificationCode))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
