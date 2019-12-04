import React from 'react';
import {connect} from 'react-redux';
//import { createStructuredSelector } from 'reselect';
import CollectionPageContainer from '../collection/collection.container';
import { Route } from 'react-router-dom';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import {  selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';

//import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

// const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class  ShopPage extends React.Component 
{
  
    componentDidMount() {
       const { fetchCollectionsStart } = this.props;
       fetchCollectionsStart();
    }

    render() {

        const { match } = this.props;        

        return (
            <div className='shop-page'> 
            <h1>SHOP PAGE HERE</h1>               
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>     
        )
    }
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(null,mapDispatchToProps)(ShopPage); 