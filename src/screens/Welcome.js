import { View, Text, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'


//formik
import { Formik } from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

//date time Picker

import DateTimePicker from '@react-native-community/datetimepicker';


import {
    StylesContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    WelcomeContainer,
    WelcomeImage,
    Avatar
    
    
}from '../Components/styles'
import KeyboardAvoidingWrapper from '../Components/Keyboard/KeyboardAvoidingWrapper';

const {brand, darklight, primary} = Colors

const Welcome = ({navigation, route}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    //Actual date of birth to be sent 
    const {name,email} = route.params;

    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate)
    }

    const showDatePicker = () => {
        setShow(true);
    }
  return (
    <KeyboardAvoidingWrapper>
    <StylesContainer>
        <StatusBar
            style='dark'
        />
        <ScrollView>

        <InnerContainer>
         
            <SafeAreaView>

            <WelcomeContainer>
                {/* <WelcomeImage source={require('../assets/images/ACVA-logo.png')}/> */}
                <PageTitle welcome={true}>Welcome</PageTitle>
                <SubTitle welcome={true}>Account</SubTitle>
                <SubTitle welcome={true}>example@gmail.com</SubTitle>
                
                <StyledFormArea>
                    <Avatar resizeMode='cover' source={require('../assets/images/ACVA-logo.png')}/>
                    <Line />
                    <StyledButton onPress={()=> {}}>
                        <ButtonText onPress={()=> navigation.navigate('Login')}>
                            Logout
                        </ButtonText>
                    </StyledButton>   
                </StyledFormArea>
                 
            </WelcomeContainer>
            </SafeAreaView>
        </InnerContainer>
        </ScrollView>
    </StylesContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons
                    name= {icon}
                    size= {30}
                    color={brand}
                />
            </LeftIcon>

            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && 
                <TouchableOpacity onPress={showDatePicker}>
                     <StyledTextInput {...props}/>
                </TouchableOpacity>}
            {isPassword &&(
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darklight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Welcome