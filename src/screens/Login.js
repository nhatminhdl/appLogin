import { View, Text, StatusBar, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'


//formik
import { Formik } from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

//Keyboard avoiding view

import KeyboardAvoidingWrapper from '../Components/Keyboard/KeyboardAvoidingWrapper';

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
    
    
}from '../Components/styles'

const {brand, darklight, primary} = Colors;

import axios from 'axios';

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
   
    
    const handleLogin = (credentials, setSubmitting) => {
        const url = 'https://restful-booker.herokuapp.com/auth';
        
        axios
        .post(url, credentials)
        .then((response)=>{
            const result = response.data
            
            console.log(result)
            if(result.hasOwnProperty('token')){
                navigation.navigate('Welcome', {...result});
                handleMessage('SUCCESS','SUCCESS');
                
            }else{
                handleMessage('Fail','FAIL');
            }

            setSubmitting(false);
        })
        .catch(
            (error) => {
                // console.log(error.JSON())
                setSubmitting(false);
            }
          
        )
    }

    const handleMessage = (message,type ='FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
  return (
    <ScrollView>
    <StylesContainer>
        <StatusBar
            style='dark'
        />
    

      <InnerContainer>
            <PageLogo resizeMode='cover' source ={require('../assets/images/ACVA-logo.png')}/>
            <PageTitle>Flowe Crib</PageTitle>
            <SubTitle>Account Login</SubTitle>
            <SafeAreaView>
            
            <Formik
                initialValues={{username:'', password:''}}
                onSubmit={(values, {setSubmitting})=>{
                   
                    if(values.username == ''||values.password ==''){
                        handleMessage('Please fill all the input');
                      
                    }else{
                        handleLogin(values, setSubmitting)
                    }
                  
                }}
            >
                {
                    ({handleChange, handleBlur, handleSubmit,values, isSubmitting}) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder = "example@gmail.com"
                                placeholderTextColor={darklight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                               
                            />

                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholder = " * * * * * * * * "
                                placeholderTextColor={darklight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                            
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Login
                                </ButtonText>
                            </StyledButton>}

                            {isSubmitting && <StyledButton disabled>
                                <ActivityIndicator size='large' color={primary}/>
                            </StyledButton>}
                            <Line />

                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name='google' color={primary} size={25}/>
                                <ButtonText >
                                    Sign in with Google
                                </ButtonText>
                            </StyledButton>

                            <ExtraView>
                                <ExtraText>Dont have an account already?</ExtraText>
                                <TextLink onPress={() => navigation.navigate('Signup')}>
                                    <TextLinkContent>
                                        Signup
                                    </TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )
                }
            </Formik>
            </SafeAreaView>
        </InnerContainer>
        
    </StylesContainer>
    </ScrollView>
  )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
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
            <StyledTextInput {...props}/>
            {isPassword &&(
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darklight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Login