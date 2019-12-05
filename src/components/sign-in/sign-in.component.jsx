import React , {useState} from 'react';
import {connect} from 'react-redux';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth , signInWithGoogle} from '../../firebase/firebase.utils';
import { googleSignInStart , emailSignInStart } from '../../redux/user/user.actions';

const SignIn = ({emailSignInStart , googleSignInStart}) => {

   const[userCredentials , setCredentials] = useState({email:`` , password:``});

   const { email , password } = userCredentials;

   const handleSubmit = async event => {
        event.preventDefault();        
        
        emailSignInStart(email , password);

      /*  try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email:`` , password: ``});
        }
        catch(err) {
            console.log(err);
        } */
        
    }

  const  handleChange = (event) => {
        
        const { name , value } = event.target;
        //this.setState({[name]: value});
        setCredentials({...userCredentials , [name]:value})
    }

           // const {  googleSignInStart } = this.props;

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>

                    < FormInput
                        name='email'
                        type='email'
                        handleChange={handleChange}
                        value={email} required
                        label='Email' />
                    

                    <FormInput 
                    name='password' 
                    type='password'
                    handleChange={handleChange}
                    value={password} required
                    label='Password' />
                    
                    <div className='buttons'>
                        <CustomButton type='submit' >Sign in</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in with Google</CustomButton>
                    </div>

                </form>
            </div>
        )

}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email , password) => dispatch(emailSignInStart({email , password}))
})

export default connect(null,mapDispatchToProps)(SignIn);