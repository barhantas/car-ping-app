import React from "react";
import { connect } from "react-redux";

import { Container, Text, Input } from "native-base";
import { Image, View, TouchableHighlight } from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";

import {
  sendVerificationCode,
  verifyVerificationCode
} from "../../actions/member";

import verificationCodeIcon from "../../../assets/sms-verification-image.png";
import sendIcon from "../../../assets/send-icon.png";

class Home extends React.Component {
  state = {
    verificationCode: null
  };

  handleChange = (name, val) => this.setState({ [name]: val });

  SendVerificationCode = () => {
    const { phoneNumber } = this.state;
    this.props.sendVerificationCode(phoneNumber);
  };

  verifyVerificationCode = () => {
    const { smsVerificationCode } = this.state;
    this.props.verifyVerificationCode(smsVerificationCode);
  };

  render() {
    const { phoneNumber } = this.state;
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
              <Text>WELCOME :)</Text>
            </Row>
          </Col>
        </Grid>
      </Container>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  sendVerificationCode: phoneNumber =>
    dispatch(sendVerificationCode(phoneNumber)),
  verifyVerificationCode: verificationCode =>
    dispatch(verifyVerificationCode(verificationCode))
});

export default connect(
  null,
  mapDispatchToProps
)(Home);
