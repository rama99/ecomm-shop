import React from 'react';
import StripCheckout from 'react-stripe-checkout';

const StripCheckoutButton = ({price}) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_0qdDt62HnKspF741ibdbQcsB009R1Bk3ZZ';

    const onToken = token => {
        console.log(token);
        alert(`Payment Done`);
    }

    return (
        <StripCheckout
         label='Pay Now'
         name='Ecomm Shop'
         billingAddress
         shippingAddress
         image='https://svgshare.com/i/CUz.svg'
         description={`Your total is $${price}`}
         amount={priceForStripe}
         panelLabel='Pay Now'
         token={onToken}
         stripeKey={publishableKey}
        />
    )
}

export default StripCheckoutButton;