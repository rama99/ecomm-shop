import React from 'react';
import {connect} from 'react-redux';
import CollectionPage from '../collection/collection.component';
import { Route } from 'react-router-dom';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';

import { firestore , convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class  ShopPage extends React.Component 
{
    state = {
        loading:true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.get()
        .then(snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
           this.props.updateCollections(collectionsMap);
           this.setState({loading:false});
        })
        
        
      /*  onSnapshot(async snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
           this.props.updateCollections(collectionsMap);
           this.setState({loading:false});
        })   */     

    }

    render() {

        const { match } = this.props;
        const {loading} = this.state;

        return (
            <div className='shop-page'>                
            <Route exact path={`${match.path}`} render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} /> 
            )}/>
            <Route path={`${match.path}/:collectionId`} render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
            )} />
        </div>     
        )
    }
       
           

}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null,mapDispatchToProps)(ShopPage); 