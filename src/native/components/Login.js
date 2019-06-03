import React from "react";
import { connect } from "react-redux";

import { Container, Text, Input } from "native-base";
import { Image, View, TouchableHighlight } from "react-native";
import { Actions } from "react-native-router-flux";

import { Col, Row, Grid } from "react-native-easy-grid";

import {
  sendVerificationCode,
  verifyVerificationCode
} from "../../actions/member";

import verificationCodeIcon from "../../../assets/sms-verification-image.png";
import sendIcon from "../../../assets/send-icon.png";
import successIcon from "../../../assets/success.png";

class Login extends React.Component {
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
    const { confirmResult, userData } = this.props;
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
