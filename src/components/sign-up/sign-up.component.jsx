import React , {useState } from 'react';
import {connect} from 'react-redux';
import './sign-up.styles.scss';

import FormInput from  '../form-input/form-input.component';
import CustomButton from  '../custom-button/custom-button.component';

// import { auth , createUserProfileDocument } from '../../firebase/firebase.utils';

import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({signUpStart}) => {

  /*  constructor(props) {
        super(props);        
        this.state = {
            displayName:``,
            email:``,
            password:``,
            confirmPassword:``
        };
    } */

    const [userCredentials , setUserCredentials] = useState({
        displayName:``,
        email:``,
        password:``,
        confirmPassword:``
    });

    const { displayName , email , password , confirmPassword } = userCredentials;

  const  handleSubmit = async event => {
        event.preventDefault();

       // const { signUpStart } = this.props;
        

        if(password !== confirmPassword){
            alert(`Passwords dont match`);
            return;
        }

        signUpStart({displayName , email , password});

       // try {
            //const {user} = await auth.createUserWithEmailAndPassword(email , password);
            // await createUserProfileDocument(user , {displayName});

          /*  this.setState({
                displayName:``,
                email:``,
                password:``,
                confirmPassword:``
            }); */

        /*}
        catch(err) {
            console.error(err);
        }*/
    }

  const  handleChange = (event) => {
        const { name , value } = event.target;
        // this.setState({[name] : value});
        setUserCredentials({...userCredentials , [name]: value})
    }

            //const { displayName , email , password , confirmPassword } = this.state;

        return (
            <div className='sign-up'>
                 <h2 className='title'>I do not have a account</h2>
                 <span>Sign up with your email and password</span>

                 <form className='sign-up-form' onSubmit={handleSubmit}>
                     <FormInput
                       type='text'
                       name='displayName'
                       value={displayName}
                       onChange={handleChange}
                       label='Display Name'
                       required
                     />

                    <FormInput
                       type='email'
                       name='email'
                       value={email}
                       onChange={handleChange}
                       label='Email'
                       required
                     />

                    <FormInput
                       type='password'
                       name='password'
                       value={password}
                       onChange={handleChange}
                       label='Password'
                       required
                     />

                    <FormInput
                       type='password'
                       name='confirmPassword'
                       value={confirmPassword}
                       onChange={handleChange}
                       label='Confirm Password'
                       required
                     />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                 </form>
            </div>
            
        )
    
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null , mapDispatchToProps )(SignUp);